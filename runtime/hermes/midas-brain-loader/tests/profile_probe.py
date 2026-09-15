"""Read back active Midas config/deployment and exercise discovered first-turn hook.

This is a labelled installation probe, not a Desktop conversation or model call.
"""
import hashlib
import json
import os
from pathlib import Path
import socket
from unittest.mock import patch
import uuid

PROFILE = Path(os.environ['HERMES_HOME']).resolve()
ARTIFACT = Path(__file__).resolve().parents[1]
assert PROFILE.name == 'midas'
with patch.object(socket.socket, 'connect', side_effect=RuntimeError('OFFLINE installation probe')):
    from hermes_cli.config import load_config
    from hermes_cli.plugins import get_plugin_manager
    config = load_config()
    assert 'midas-brain-loader' in config['plugins']['enabled']
    assert config['hooks']['output_spill']['max_chars'] == 65536
    for name in ('__init__.py', 'plugin.yaml'):
        assert (ARTIFACT / name).read_bytes() == (PROFILE / 'plugins/midas-brain-loader' / name).read_bytes()
    manager = get_plugin_manager()
    manager.discover_and_load()
    sid = 'midas-installation-probe-' + uuid.uuid4().hex
    results = manager.invoke_hook('pre_llm_call', session_id=sid, task_id=sid,
                                  is_first_turn=True, platform='installation-probe')
    context = next(r['context'] for r in results if isinstance(r, dict) and '[MIDAS_CANONICAL_BRAIN v1]' in r.get('context', ''))
    prefix = hashlib.sha256(sid.encode()).hexdigest()
    receipt_path = next((PROFILE / 'logs/midas-brain-loader').glob(prefix + '-*.json'))
    receipt = json.loads(receipt_path.read_text())
    assert receipt['status'] == 'ready'
    assert hashlib.sha256(context.encode()).hexdigest() == receipt['context_sha256']
    for row in receipt['files']:
        raw = Path(row['path']).read_bytes()
        assert hashlib.sha256(raw).hexdigest() == row['sha256']
        assert raw.decode('utf-8') in context
    print('PASS active-profile: fresh process discovery; deployed/source bytes equal; exact canonical context and persisted hashes verified; no API call')
    print(json.dumps({'audit_path': str(receipt_path), 'session_id': sid,
                      'context_chars': len(context), 'context_sha256': receipt['context_sha256'],
                      'config': {'plugins.enabled': config['plugins']['enabled'],
                                 'hooks.output_spill.max_chars': config['hooks']['output_spill']['max_chars']}}, indent=2))
