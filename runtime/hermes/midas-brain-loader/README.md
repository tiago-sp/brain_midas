# Midas Brain Loader

Plugin nativo do perfil Hermes `midas`.

## Fonte canônica

`/Volumes/External/tiago/Developer/brains/brain_midas`

Arquivos injetados no primeiro turno:

- `SOUL.md`
- `memory/USER.md`
- `memory/MEMORY.md`
- `MAPA.md`

Cada preparação gera um recibo SHA-256 em `~/.hermes/profiles/midas/logs/midas-brain-loader/`.
Arquivos vazios são válidos; ausentes ou ilegíveis geram falha explícita.

## Limite técnico

Os hooks bloqueiam ferramentas e substituem o texto final quando o boot falha, mas não conseguem impedir a chamada inicial ao provedor nem tokens de streaming. Portanto, não representam fail-closed no limite da API.

## Operação

```bash
midas plugins doctor midas-brain-loader --ci
midas chat -q "Quem é você?"
```

O perfil não recebe credenciais ou integrações copiadas de outros agentes.
