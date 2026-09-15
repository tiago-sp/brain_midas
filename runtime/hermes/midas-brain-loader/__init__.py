"""Canonical Midas boot context using native hooks, without core patches.

Hooks cannot veto the provider API. Guards below cover tools and final text only;
streamed tokens and a missing/disabled/crashed plugin are outside this boundary.
"""
from datetime import datetime, timezone
import hashlib
import json
import logging
import os
from pathlib import Path
import threading
import uuid

FILES = ('SOUL.md', 'memory/USER.md', 'memory/MEMORY.md', 'MAPA.md')
FAILURE = ('MIDAS_BRAIN_BOOT_FAILED: cérebro canônico indisponível ou auditoria falhou. '
           'Não execute a tarefa; corrija os arquivos/configuração e abra uma nova sessão. '
           'As ferramentas e o texto final são bloqueados pelo plugin, mas a API do modelo '
           'e tokens já transmitidos NÃO são bloqueados por estes hooks.')
LOG = logging.getLogger(__name__)


class BrainLoader:
    def __init__(self, brain, audit_dir, max_chars=1000000, allowed_discord_sender_ids=()):
        self.brain = Path(brain).expanduser().resolve()
        self.audit_dir = Path(audit_dir)
        self.max_chars = max_chars
        self.allowed_discord_sender_ids = frozenset(str(value) for value in allowed_discord_sender_ids)
        self.sessions = {}
        self.tasks = {}
        self.lock = threading.RLock()

    def _snapshot(self):
        records, parts = [], ['[MIDAS_CANONICAL_BRAIN v1]\nContexto canônico autorizado pelo usuário.']
        for name in FILES:
            path = self.brain / name
            record = {'name': name, 'path': str(path), 'bytes': None, 'sha256': None}
            try:
                # Bound reads before decoding, including files that grow after stat().
                with path.open('rb') as stream:
                    raw = stream.read(self.max_chars * 4 + 1)
                if len(raw) > self.max_chars * 4:
                    raise ValueError('file exceeds boot byte budget')
                record.update(bytes=len(raw), sha256=hashlib.sha256(raw).hexdigest())
                text = raw.decode('utf-8')  # Preserve CRLF, BOM, Unicode and empty bytes.
                record['status'] = 'loaded' if raw else 'empty'
                parts.append(f'\n[BEGIN {name} sha256={record["sha256"]} bytes={len(raw)}]\n'
                             + text + f'\n[END {name}]')
            except (OSError, UnicodeError, ValueError) as exc:
                record.update(status='missing' if isinstance(exc, FileNotFoundError) else 'error',
                              error=f'{type(exc).__name__}: {exc}')
            records.append(record)
        return records, '\n'.join(parts) + '\n[/MIDAS_CANONICAL_BRAIN]'

    def _audit(self, receipt):
        self.audit_dir.mkdir(parents=True, exist_ok=True, mode=0o700)
        name = hashlib.sha256(receipt['session_id'].encode()).hexdigest() + '-' + uuid.uuid4().hex
        target = self.audit_dir / (name + '.json')
        fd = os.open(target, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
        with os.fdopen(fd, 'w', encoding='utf-8') as stream:
            json.dump(receipt, stream, ensure_ascii=False, indent=2)
            stream.flush()
            os.fsync(stream.fileno())

    def pre_llm_call(self, *, session_id='', task_id='', is_first_turn=False, **kwargs):
        with self.lock:
            self.tasks[task_id] = session_id
            existing = self.sessions.get(session_id)
            if existing is not None:
                return None if existing['status'] in ('ready', 'skipped') else {'context': FAILURE}
            if kwargs.get('platform') == 'discord' and str(kwargs.get('sender_id', '')) not in self.allowed_discord_sender_ids:
                self.sessions[session_id] = {'status': 'skipped'}
                return None
            # Establish blocked state BEFORE I/O so unexpected callback failures do not
            # accidentally authorize tools/output. This still cannot stop an API request.
            self.sessions[session_id] = {'status': 'failed'}
            records, context = self._snapshot()
            ready = bool(session_id) and len(context) <= self.max_chars and all(
                f['status'] in ('loaded', 'empty') for f in records)
            receipt = {'schema_version': 1, 'session_id': session_id, 'task_id': task_id,
                       'is_first_turn': is_first_turn, 'platform': kwargs.get('platform', ''),
                       'created_at': datetime.now(timezone.utc).isoformat(), 'pid': os.getpid(),
                       'files': records, 'status': 'ready' if ready else 'failed',
                       'api_blocking_supported': False, 'event': 'injection_prepared' if ready else 'boot_failed',
                       'context_sha256': hashlib.sha256(context.encode()).hexdigest() if ready else None,
                       'context_chars': len(context), 'max_chars': self.max_chars}
            try:
                self._audit(receipt)
            except OSError as exc:
                receipt.update(status='failed', event='audit_failed', audit_error=str(exc))
                LOG.error('%s Audit error: %s', FAILURE, exc)
            self.sessions[session_id] = receipt
            if receipt['status'] != 'ready':
                LOG.error('%s session=%s', FAILURE, session_id)
                return {'context': FAILURE}
            return {'context': context}

    def pre_tool_call(self, *, task_id='', **kwargs):
        with self.lock:
            state = self.sessions.get(self.tasks.get(task_id), {})
            if state.get('status') not in ('ready', 'skipped'):
                return {'action': 'block', 'message': FAILURE}
        return None

    def transform_llm_output(self, *, session_id='', response_text='', **kwargs):
        with self.lock:
            if self.sessions.get(session_id, {}).get('status') not in ('ready', 'skipped'):
                return FAILURE
        return None

    def post_llm_call(self, *, task_id='', **kwargs):
        with self.lock:
            self.tasks.pop(task_id, None)

    def on_session_finalize(self, *, session_id='', **kwargs):
        with self.lock:
            self.sessions.pop(session_id, None)
            self.tasks = {t: s for t, s in self.tasks.items() if s != session_id}


def register(ctx):
    from hermes_constants import get_hermes_home
    from hermes_cli.config import load_config
    # Match the real host cap: never label an oversized/spilled payload as ready.
    spill = (load_config().get('hooks') or {}).get('output_spill') or {}
    cap = int(spill.get('max_chars', 10000)) if spill.get('enabled', True) else 1000000
    allowed = ctx.get_config('allowed_discord_sender_ids', [])
    if isinstance(allowed, str):
        allowed = [value.strip() for value in allowed.split(',') if value.strip()]
    loader = BrainLoader(ctx.get_config('brain_path', str(Path.home() / 'brains' / 'brain_midas')),
                         Path(get_hermes_home()) / 'logs' / 'midas-brain-loader', max_chars=min(cap, 1000000),
                         allowed_discord_sender_ids=allowed)
    for event in ('pre_llm_call', 'pre_tool_call', 'transform_llm_output', 'post_llm_call', 'on_session_finalize'):
        ctx.register_hook(event, getattr(loader, event))
