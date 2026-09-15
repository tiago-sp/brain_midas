# ScoreBetAI / Axio Vector

- Plataforma atual: https://scorebetai.com/
- Rebrand e proposta de pivot: https://axiovector.com/
- Relação declarada: projeto do portfólio Ax6Pro.
- Dados internos: relatos de Tiago entre 2026-09-11 e 2026-09-15; não auditados.

## Operação atual — ScoreBetAI

- Projeto com aproximadamente 3 anos e 11 clientes investidores.
- Total declarado na plataforma: 13,995.68 USD, composto por aportes de clientes e receita da empresa reinvestida. Não é o saldo real disponível.
- Existe diferença aproximada de 8K CAD entre saldo declarado e dinheiro real em caixa.
- A diferença foi causada por erro no algoritmo de distribuição dos lucros. O algoritmo foi corrigido e os saldos recalculados segundo Tiago; validação independente ainda não informada.
- Aproximadamente 1K CAD do déficit pertence a clientes externos; o restante está associado a valores investidos pelos próprios sócios.
- Não há saques pendentes nem pagamentos vencidos, segundo Tiago.
- Empresa registrada na Costa Rica; clientes em Portugal, Canadá, Estados Unidos e Brasil.
- Não existe contrato definindo perdas, custódia e saques.
- Taxa da empresa: 30% dos ganhos semanais. Não há taxa em semanas negativas; a taxa volta a ser cobrada em semana positiva mesmo que perdas anteriores ainda não tenham sido recuperadas.
- Dinheiro da empresa é reinvestido na operação e também fica exposto às perdas.
- Existe histórico semanal de ganhos/perdas, comissões, depósitos e saques; Midas ainda não recebeu ou auditou os dados.

## Sociedade e operação

- Marvin: CEO, 41%.
- Tiago: 10%.
- Restante do cap table não detalhado.
- Custo operacional aproximado: 1.500 CAD/mês, dividido proporcionalmente às participações.

## Obrigações aproximadas

- Total: 24K CAD.
- Cerca de 8K CAD: diferença entre saldos declarados e dinheiro real, sendo aproximadamente 1K CAD de clientes externos e o restante relacionado a sócios.
- Cerca de 8K CAD: dívida com Bruno pela compra de uma máquina, sem juros.
- Cerca de 8K CAD: cartão da empresa relativo a viagens, a 24% ao ano.

## Plano de recuperação proposto

- Continuar a operação e adicionar contribuições mensais dos sócios por até três anos.
- Contribuição estimada de Tiago: aproximadamente 230 CAD/mês, incluindo operação e amortização.
- Ordem inicialmente proposta: cartão; clientes externos; obrigações internas.
- Recomendação de Midas: proteger/recompor primeiro aproximadamente 1K CAD de clientes externos, depois zerar o cartão e então quitar obrigações internas.
- Ver `../../analyses/scorebetai-recovery-plan.md`.
- Ainda é proposta em avaliação, não decisão formal registrada.

## Pivot proposto — Axio Vector

### Tese confirmada por Tiago

- Manter a mesma empresa e os clientes atuais da ScoreBetAI.
- Não buscar novos clientes no modelo atual.
- Continuar a operação para ampliar o track record.
- Potencialmente contratar consultoria externa para verificação independente do histórico antes de vender a grandes gestores.
- Viabilizar licenciamento B2B da tecnologia e uma blackbox para gestores, fundos e family offices.
- No modelo blackbox, contas e recursos permanecem sob titularidade e controle do cliente. A Axio Vector fornece somente o software e não pretende custodiar o capital.
- Ainda não há conversas com potenciais compradores.
- A capacidade da estratégia para volumes maiores ainda não foi medida.
- Hoje existem o track record e as correções do algoritmo; segregação institucional, múltiplos provedores, controles e demais capacidades descritas no site são roadmap segundo Tiago.

### Posicionamento público observado

O site Axio Vector se apresenta como empresa de pesquisa quantitativa e IA aplicada a mercados esportivos, com licenciamento institucional, acesso para investidores sofisticados e soluções para fundos/family offices. Publica alegações de retorno, acerto, drawdown, Sharpe, correlação, execução, segregação e provedores regulados. Essas alegações não foram validadas por Midas e algumas descrevem roadmap como capacidade atual, segundo Tiago.

### Entendimento estratégico provisório

- O pivot mais coerente é Axio Vector como fornecedora de software quantitativo sem custódia.
- A blackbox pode ser um modo de implantação/licenciamento B2B, não necessariamente um negócio separado.
- ScoreBetAI permanece como operação legada e fonte de histórico.
- Mudar linguagem não altera automaticamente o enquadramento jurídico; oferta, execução e jurisdições exigem análise especializada.
- O pivot ainda não foi incorporado como visão definitiva nem usado para reordenar o portfólio.

### Produto-alvo definido por Tiago — ainda não tratado como capacidade implementada

#### Execução e controle

- A Blackbox será o motor de inteligência e decisão: processará dados e modelos e produzirá sinais/instruções.
- Deve suportar duas modalidades: sinais e execução automática opcional.
- Na execução automática, a Blackbox enviará instruções para um **Axio Execution Agent** conectado às contas do cliente.
- Credenciais permanecerão sob controle do cliente, preferencialmente no ambiente dele ou em vault usado pelo agente. A infraestrutura central da Axio não deverá precisar acessar credenciais privadas.
- Sempre que possível, integrações usarão API keys/OAuth limitadas a trading, sem saque ou transferência.
- A Axio definirá provedores tecnicamente suportados; o cliente escolherá contas e provedores dentre eles.
- O cliente definirá limites de risco e exposição, incluindo posição, perda diária, drawdown, simultaneidade e mercados. A Blackbox não poderá excedê-los.
- A Axio disponibilizará estratégias; o cliente deverá habilitar explicitamente quais podem operar.
- O cliente terá kill switch na interface e localmente no Execution Agent.
- Falhas deverão seguir **fail closed**: nenhuma nova posição até normalização.

#### Arquitetura híbrida pretendida

- **Axio Vector Cloud:** modelos/Blackbox, sinais, estratégias, versionamento, telemetria, monitoramento, dashboards e trilha de auditoria.
- **Axio Execution Agent:** componente no ambiente/VPS do cliente para credenciais, conectores, segunda validação de risco, execução, fills/posições, kill switch e proteção durante perda de comunicação.
- Fluxo pretendido: `Market Data → Axio Vector Blackbox → Signal/Instruction → Execution Agent → Broker/Exchange`, com telemetria de retorno.
- Private deployment/on-premise poderá ser oferecido futuramente a clientes institucionais; é roadmap.

#### Modelo comercial pretendido

- Receita principal inicial: licença mensal ou anual mais taxa de implantação quando necessária.
- Licença poderá incluir Blackbox, estratégias contratadas, API, Execution Agent, dashboard, monitoramento, atualizações e infraestrutura.
- Tiers poderão variar por contas, estratégias, mercados ou capacidade.
- Componentes de consumo poderão ser adicionados para grande escala: contas, estratégias, processamento, sinais, infraestrutura, market data ou computação.
- Integrações e estratégias exclusivas poderão ser cobradas como desenvolvimento customizado.
- Participação sobre performance não será componente principal inicial; somente poderá ser avaliada posteriormente após análise comercial, contratual e regulatória.

### Direção inicial de validação confirmada

- Primeiro ICP: family offices e gestores de patrimônio. Geografia inicial ainda não definida.
- Primeiro piloto: sinais/API, sem execução automática.
- Grande parte da arquitetura já existe no sistema atual e precisa ser empacotada, segundo Tiago; inventário funcional e esforço remanescente ainda não fornecidos.
- Responsável pelas entrevistas, prospecção, pilotos e negociação: outro sócio ainda a definir.

### Lacunas remanescentes para concluir a avaliação

- País-alvo, perfil detalhado do comprador econômico e responsável comercial nomeado.
- Preços, custo de implantação/suporte, margem e unit economics.
- Inventário do que já existe, escopo exato do MVP e esforço para empacotamento.
- Primeiros provedores suportados e viabilidade de suas APIs/permissões.
- Escopo, custo e entidade para verificação independente.
- Capacidade, liquidez, slippage e degradação do edge com aumento do capital.
- Segurança, SLA, suporte, incidentes e responsabilidades contratuais.
- Análise jurídica/regulatória da geração de sinais e execução automatizada nos mercados-alvo.
- Separação no site entre capacidades atuais, métricas verificadas e roadmap.

## Riscos materiais

Regulação, KYC/AML, publicidade, proteção ao consumidor, responsabilidades do software e execução, ausência de contratos atuais, credibilidade institucional, capacidade não medida e continuidade financiada pelos sócios sem validação comercial.
