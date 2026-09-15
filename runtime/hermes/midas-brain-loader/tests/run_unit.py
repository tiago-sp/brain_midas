"""Offline contract test for the Midas canonical brain loader."""
import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile

PLUGIN = Path(__file__).resolve().parents[1] / '__init__.py'
BRAIN = Path(__file__).resolve().parents[4]
spec = importlib.util.spec_from_file_location('midas_brain_loader_tested', PLUGIN)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

with tempfile.TemporaryDirectory() as temp:
    loader = module.BrainLoader(BRAIN, Path(temp), max_chars=65536)
    result = loader.pre_llm_call(session_id='midas-unit', task_id='midas-task', is_first_turn=True, platform='test')
    context = result['context']
    assert '[MIDAS_CANONICAL_BRAIN v1]' in context
    for relative in module.FILES:
        raw = (BRAIN / relative).read_bytes()
        assert raw.decode('utf-8') in context
        assert hashlib.sha256(raw).hexdigest() in context
    receipts = list(Path(temp).glob('*.json'))
    assert len(receipts) == 1
    receipt = json.loads(receipts[0].read_text())
    assert receipt['status'] == 'ready'
    assert receipt['event'] == 'injection_prepared'
    assert receipt['context_sha256'] == hashlib.sha256(context.encode()).hexdigest()
    assert loader.pre_llm_call(session_id='midas-unit', task_id='midas-task-2', is_first_turn=False, platform='test') is None
print('PASS midas brain loader: exact files, hashes, receipt and no duplicate injection')
