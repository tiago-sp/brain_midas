# Axio Vector — avaliação inicial do pivot da ScoreBetAI

Data: 2026-09-15
Status: entendimento em construção; ainda não é decisão definitiva de portfólio
Fontes: relato de Tiago e https://axiovector.com/

## Conclusão provisória

O pivot é mais defensável quando definido como negócio B2B de software quantitativo sem custódia. Ainda não existe validação comercial, verificação independente ou medição de capacidade institucional. Continuar a ScoreBetAI pode preservar tecnologia e gerar histórico, mas não deve substituir entrevistas e pilotos com compradores.

## Negócio entendido

- ScoreBetAI permanece como operação existente, com clientes atuais e sem nova aquisição nesse modelo.
- Axio Vector é o rebrand/frente B2B proposta.
- Oferta: licenciamento da tecnologia e blackbox para gestores, fundos e family offices.
- Contas e recursos permanecem sob controle e titularidade do cliente; a Axio fornece somente o software e não pretende custodiar capital.
- A blackbox pode ser modo de implantação do licenciamento, em vez de terceiro negócio.
- Não há conversas com potenciais compradores.
- Intenção de ampliar o track record e potencialmente contratar consultoria externa para validá-lo antes da venda institucional.
- Capacidade em volumes maiores não medida.

## Produto versus comunicação

Segundo Tiago, existem hoje o track record e as correções do algoritmo; o restante é roadmap. O site apresenta métricas e capacidades institucionais como atuais. Antes de prospecção, separar capacidades demonstráveis, histórico não verificado e roadmap. A comunicação de custódia deve dizer que o cliente mantém contas e capital e que a Axio fornece software.

## Definição do produto-alvo

### Responsabilidades

- **Axio Vector:** modelos, inteligência, sinais, estratégias e tecnologia de execução.
- **Cliente:** capital, contas, autorização de estratégias, provedores escolhidos entre os suportados, limites e políticas de risco.
- Credenciais permanecem localmente ou em vault do cliente/Execution Agent, com permissões de trading sem saque sempre que possível.
- O cliente controla limites e possui kill switch local e remoto.
- Em falha, o comportamento padrão será fail closed, sem abertura de novas posições.

### Arquitetura pretendida

- Cloud da Axio: Blackbox, estratégias, versionamento, telemetria, monitoramento, dashboard e auditoria.
- Execution Agent no ambiente/VPS do cliente: credenciais, conectores, revalidação de risco, execução, fills, posições e kill switch.
- Modalidades: somente sinais ou execução automática opcional.
- Private/on-premise institucional é possibilidade futura, não capacidade atual confirmada.

### Receita pretendida

- Licença recorrente mensal/anual.
- Taxa de implantação quando houver integração/onboarding específico.
- Customizações cobradas separadamente.
- Consumo pode complementar preços de clientes maiores.
- Performance fee não será base inicial; eventual adoção dependerá de análise posterior.

## Avaliação atualizada

A definição é coerente e reduz o risco de custódia, mas amplia o escopo técnico: a Axio não venderá apenas um modelo; venderá software crítico de execução, controles de risco, integração, monitoramento e auditoria. Isso eleva segurança, confiabilidade, suporte e responsabilidade contratual ao nível de requisitos centrais do produto. A arquitetura é uma especificação desejada, não evidência de produto institucional pronto.

## Sequência recomendada

1. Reconciliar e documentar o histórico existente.
2. Definir oferta inicial estreita.
3. Conversar com compradores antes de esperar mais anos de histórico.
4. Descobrir requisitos reais de diligência.
5. Contratar verificação adequada ao comprador.
6. Executar piloto pago ou com compromisso comercial.
7. Medir capacidade, liquidez, slippage e degradação.

## Direção inicial de validação

- ICP inicial: family offices e gestores de patrimônio.
- Primeiro piloto: sinais/API, sem execução automática.
- Segundo Tiago, grande parte da arquitetura já existe e precisa ser empacotada; ainda falta inventário verificável.
- Responsável comercial será outro sócio, ainda não definido.

Essa escolha reduz o escopo e evita que Execution Agent, credenciais e execução automática bloqueiem a validação de demanda. O piloto deve vender o valor do sinal, transparência e integração antes de assumir risco operacional de execução.

## Lacunas abertas

- País inicial, perfil detalhado do comprador e responsável comercial nomeado.
- Preço e unit economics.
- Inventário do produto existente, escopo do empacotamento e esforço de engenharia.
- Provedores iniciais e limitações de API.
- Verificador independente, escopo e orçamento.
- Capacidade, liquidez e impacto de escala.
- Segurança, SLA, suporte, resposta a incidentes e alocação contratual de responsabilidade.
- Exigências jurídicas aplicáveis a sinais e execução automatizada.

## Implicação para o portfólio

A nova visão adiciona potencial B2B, mas ainda é hipótese. ScoreBetAI/Axio Vector não deve subir no ranking apenas pelo rebrand; a reavaliação depende de evidência comercial, histórico reconciliado, capacidade e custo do pivot.
