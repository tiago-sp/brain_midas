const pptxgen = require('/home/hermes/.hermes/profiles/midas/cache/pptxgen/node_modules/pptxgenjs');
const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Midas — consultor de negócios de Tiago Pereira';
pptx.subject = 'Comparação final do portfólio Ax6Pro';
pptx.title = 'Portfólio Ax6Pro — comparação final';
pptx.company = 'Ax6Pro';
pptx.lang = 'pt-BR';
pptx.theme = {
  headFontFace: 'Aptos Display', bodyFontFace: 'Aptos', lang: 'pt-BR'
};
pptx.defineSlideMaster({
  title: 'MASTER',
  background: { color: '08111F' },
  objects: [
    { rect: { x: 0, y: 0, w: 13.333, h: 0.08, fill: { color: '27D7C7' }, line: { color: '27D7C7' } } },
    { text: { text: 'AX6PRO  /  PORTFÓLIO', options: { x: 0.55, y: 0.2, w: 3.5, h: 0.25, fontFace: 'Aptos', fontSize: 9, bold: true, color: '27D7C7', charSpacing: 1.4, margin: 0 } } },
    { text: { text: 'Dados declarados por Tiago • não auditados', options: { x: 8.8, y: 7.12, w: 3.9, h: 0.18, fontSize: 8, color: '73839A', align: 'right', margin: 0 } } }
  ],
  slideNumber: { x: 12.78, y: 7.08, w: 0.22, h: 0.2, color: '73839A', fontSize: 8, align: 'right' }
});

const C = { bg:'08111F', panel:'101D2E', panel2:'13243A', white:'F5F7FA', muted:'A8B5C5', dim:'73839A', teal:'27D7C7', blue:'4E8CFF', gold:'F4B942', red:'FF647C', green:'5ED49A', purple:'9C7BFF', border:'243650' };
const OPT = { fontFace:'Aptos', color:C.white, margin:0, breakLine:false };
function slide(){ return pptx.addSlide('MASTER'); }
function title(s,t,sub){
  s.addText(t,{x:.55,y:.58,w:12.2,h:.48,fontFace:'Aptos Display',fontSize:27,bold:true,color:C.white,margin:0,fit:'shrink'});
  if(sub) s.addText(sub,{x:.56,y:1.12,w:11.8,h:.38,fontSize:11.5,color:C.muted,margin:0,fit:'shrink'});
}
function box(s,x,y,w,h,fill=C.panel,r=0.12){
  s.addShape(pptx.ShapeType.roundRect,{x,y,w,h,rectRadius:r,fill:{color:fill},line:{color:C.border,width:.8},radius:r});
}
function txt(s,text,x,y,w,h,size=13,color=C.white,bold=false,align='left'){
  s.addText(text,{x,y,w,h,fontFace:'Aptos',fontSize:size,color,bold,align,valign:'mid',margin:0.07,fit:'shrink',breakLine:false});
}
function pill(s,text,x,y,w,color){
  s.addShape(pptx.ShapeType.roundRect,{x,y,w,h:.32,fill:{color,transparency:83},line:{color,width:.8},radius:.16});
  s.addText(text,{x:x+.06,y:y+.04,w:w-.12,h:.22,fontSize:9,bold:true,color,align:'center',margin:0,fit:'shrink'});
}
function rankCard(s,n,name,action,x,y,w,color){
  box(s,x,y,w,.78,C.panel);
  s.addShape(pptx.ShapeType.ellipse,{x:x+.14,y:y+.17,w:.43,h:.43,fill:{color},line:{color}});
  txt(s,String(n),x+.14,y+.19,.43,.38,13,C.bg,true,'center');
  txt(s,name,x+.68,y+.11,w-.82,.26,14,C.white,true);
  txt(s,action,x+.68,y+.4,w-.82,.22,9.5,C.muted,false);
}
function metric(s,value,label,x,y,w,color=C.teal){
  box(s,x,y,w,.92,C.panel);
  txt(s,value,x+.12,y+.11,w-.24,.34,22,color,true);
  txt(s,label,x+.12,y+.52,w-.24,.22,9,C.muted,false);
}

// 1 — cover
{
  const s=slide();
  s.background={color:C.bg};
  s.addShape(pptx.ShapeType.ellipse,{x:8.7,y:.8,w:3.8,h:3.8,fill:{color:C.teal,transparency:88},line:{color:C.teal,transparency:100}});
  s.addShape(pptx.ShapeType.ellipse,{x:9.8,y:2.0,w:2.9,h:2.9,fill:{color:C.blue,transparency:84},line:{color:C.blue,transparency:100}});
  s.addText('PORTFÓLIO\nAX6PRO',{x:.7,y:1.35,w:7.4,h:1.65,fontFace:'Aptos Display',fontSize:43,bold:true,color:C.white,margin:0,breakLine:false,fit:'shrink'});
  s.addText('Comparação final e recomendação de foco',{x:.73,y:3.2,w:6.6,h:.45,fontSize:20,color:C.teal,bold:true,margin:0});
  s.addText('Decisões para o próximo ciclo de 6 semanas',{x:.74,y:3.82,w:5.4,h:.35,fontSize:13,color:C.muted,margin:0});
  s.addText('15 SET 2026',{x:.74,y:5.78,w:2.2,h:.3,fontSize:11,bold:true,color:C.gold,charSpacing:1.5,margin:0});
  s.addText('Midas  •  Estratégia, caixa e execução',{x:.74,y:6.2,w:4.8,h:.28,fontSize:10.5,color:C.dim,margin:0});
}

// 2 — executive decision
{
  const s=slide(); title(s,'A decisão em uma página','Dois focos de crescimento, uma opção em validação e menos dispersão operacional.');
  const cards=[
    ['INVESTIR TEMPO','Pingys + Vant Clinic',C.green],
    ['RECUPERAR + VALIDAR','ScoreBetAI / Axio Vector',C.gold],
    ['DELEGAR + MEDIR','WLKMe',C.blue],
    ['TESTAR RAPIDAMENTE','Bit2Connect',C.teal],
    ['PAUSAR DESENVOLVIMENTO','Tutufi',C.red],
    ['INTEGRAR OU PAUSAR','PingysTV',C.purple]
  ];
  cards.forEach((d,i)=>{
    const col=i%3,row=Math.floor(i/3),x=.58+col*4.18,y=1.72+row*2.05;
    box(s,x,y,3.75,1.55,C.panel);
    pill(s,d[0],x+.18,y+.17,2.05,d[2]);
    txt(s,d[1],x+.18,y+.62,3.38,.46,17,C.white,true);
    const notes=['Aprendizado comercial + avanço por marcos','Passivo separado do capital de crescimento','Lucas mantém a liderança','Uma proposta paga antes de mais produto','Discovery com pais antes de construir','Canal mensurável do Pingys'][i];
    txt(s,notes,x+.18,y+1.12,3.35,.24,9.5,C.muted,false);
  });
  box(s,.58,6.1,12.15,.56,'0D1929');
  txt(s,'Regra central',.78,6.25,1.35,.22,10,C.teal,true);
  txt(s,'Nenhum projeto ganha tempo ou capital por atividade; ganha por evidência que reduz incerteza.',2.12,6.18,9.95,.3,13,C.white,true);
}

// 3 — final ranking
{
  const s=slide(); title(s,'Ranking final de prioridade de crescimento','Ordem para alocação de atenção — não confundir com prioridade de controle de risco.');
  const list=[
    ['Pingys','Validar retenção e aquisição',C.green],
    ['Vant Clinic','Avançar por marcos',C.green],
    ['Axio Vector','Preservar e validar',C.gold],
    ['WLKMe','Delegar e medir',C.blue],
    ['Bit2Connect','Teste comercial curto',C.teal],
    ['Tutufi','Pausar; somente discovery',C.red],
    ['PingysTV','Canal do Pingys ou pausa',C.purple]
  ];
  list.forEach((d,i)=>{
    const col=i<4?0:1,row=i<4?i:i-4;
    rankCard(s,i+1,d[0],d[1],.62+col*6.25,1.62+row*1.05,5.78,d[2]);
  });
  box(s,6.87,4.78,5.78,1.02,'0D1929');
  txt(s,'Leitura correta',7.08,4.94,1.55,.23,10,C.gold,true);
  txt(s,'Axio é #1 em controle de risco,\nmas ainda #3 em crescimento.',8.65,4.83,3.72,.55,14,C.white,true);
}

// 4 — comparison matrix
{
  const s=slide(); title(s,'Comparação estratégica','Posicionamento qualitativo com base nas evidências atuais — não é uma avaliação financeira auditada.');
  const x0=1.15,y0=6.25,w=10.95,h=4.42;
  s.addShape(pptx.ShapeType.line,{x:x0,y:y0-h,w:w,h:0,line:{color:C.border,width:1.2}});
  s.addShape(pptx.ShapeType.line,{x:x0,y:y0-h,w:0,h:h,line:{color:C.border,width:1.2}});
  for(let i=1;i<5;i++){
    s.addShape(pptx.ShapeType.line,{x:x0+i*w/5,y:y0-h,w:0,h:h,line:{color:C.border,width:.5,dash:'dash',transparency:35}});
    s.addShape(pptx.ShapeType.line,{x:x0,y:y0-i*h/5,w:w,h:0,line:{color:C.border,width:.5,dash:'dash',transparency:35}});
  }
  txt(s,'MAIOR EVIDÊNCIA / TRAÇÃO',8.95,6.38,3.15,.22,9,C.muted,true,'right');
  txt(s,'MENOR EVIDÊNCIA',1.14,6.38,2.0,.22,9,C.muted,true);
  s.addText('POTENCIAL / IMPACTO',{x:.38,y:2.4,w:.3,h:2.8,fontSize:9,bold:true,color:C.muted,vert:'vert270',margin:0,align:'center'});
  const dots=[
    ['Pingys',8.85,3.14,C.green],['Vant',6.7,2.35,C.green],['Axio',4.55,1.87,C.gold],
    ['WLKMe',7.7,4.15,C.blue],['Bit2',4.4,4.7,C.teal],['Tutufi',2.65,4.25,C.red],['PingysTV',2.2,5.28,C.purple]
  ];
  dots.forEach(d=>{
    s.addShape(pptx.ShapeType.ellipse,{x:d[1],y:d[2],w:.34,h:.34,fill:{color:d[3]},line:{color:d[3]}});
    txt(s,d[0],d[1]+.42,d[2]-.02,1.2,.28,10,C.white,true);
  });
  pill(s,'FOCOS',9.65,1.72,1.15,C.green);
  pill(s,'OPÇÃO',4.15,1.35,1.15,C.gold);
  pill(s,'PAUSAR',1.35,5.65,1.15,C.red);
}

// 5 — two priorities
{
  const s=slide(); title(s,'Dois motores de progresso','Pingys acelera aprendizado comercial. Vant converte capital já disponível em marcos verificáveis.');
  box(s,.62,1.62,5.93,4.82,C.panel);
  pill(s,'PRIORIDADE 1',.86,1.88,1.35,C.green);
  txt(s,'Pingys',.86,2.38,2.7,.45,27,C.white,true);
  metric(s,'7','pagantes',.86,3.02,1.55,C.green);
  metric(s,'382 BRL','MRR declarado',2.57,3.02,1.76,C.green);
  metric(s,'20%','participação',4.5,3.02,1.55,C.green);
  txt(s,'Decisão',.86,4.17,1.1,.25,10,C.green,true);
  txt(s,'Medir retenção, atividade, conversão\ne custo antes de escalar aquisição.',.86,4.5,4.95,.75,15,C.white,true);
  txt(s,'Gate: dados de 3 meses + entrevistas + 1 experimento rastreável.',.86,5.7,4.95,.42,10,C.muted,false);

  box(s,6.79,1.62,5.93,4.82,C.panel);
  pill(s,'PRIORIDADE 2',7.03,1.88,1.35,C.green);
  txt(s,'Vant Clinic',7.03,2.38,3.3,.45,27,C.white,true);
  metric(s,'>95%','aporte disponível',7.03,3.02,1.72,C.green);
  metric(s,'20%','participação',8.92,3.02,1.55,C.green);
  metric(s,'CEO','papel de Tiago',10.64,3.02,1.78,C.green);
  txt(s,'Decisão',7.03,4.17,1.1,.25,10,C.green,true);
  txt(s,'Avançar por critérios técnicos,\nregulatórios e orçamento por etapa.',7.03,4.5,4.95,.75,15,C.white,true);
  txt(s,'Gate: protocolo, critérios de aprovação e caminho regulatório.',7.03,5.7,4.95,.42,10,C.muted,false);
}

// 6 — Axio
{
  const s=slide(); title(s,'Axio Vector: obrigação e oportunidade','O passivo exige controle; o pivot exige validação. Os dois orçamentos não devem se misturar.');
  metric(s,'24K CAD','obrigações aproximadas',.62,1.65,2.55,C.red);
  metric(s,'230 CAD','compromisso mensal de Tiago',3.36,1.65,2.55,C.gold);
  metric(s,'88,46%','do teto pessoal',6.10,1.65,2.55,C.gold);
  metric(s,'30 CAD','sobra para outros projetos',8.84,1.65,2.55,C.red);
  box(s,.62,2.86,5.75,2.83,C.panel);
  pill(s,'RECUPERAÇÃO',.88,3.12,1.45,C.red);
  txt(s,'Pode receber os 230 CAD se…',.88,3.62,4.8,.35,17,C.white,true);
  const left=['Sócios formalizam contribuições','Déficit externo é protegido','Nenhuma nova dívida','Receita acelera amortização'];
  left.forEach((v,i)=>{txt(s,'•  '+v,.95,4.15+i*.35,4.95,.28,11,C.muted,false);});
  box(s,6.62,2.86,6.1,2.83,C.panel);
  pill(s,'CRESCIMENTO B2B',6.88,3.12,1.78,C.gold);
  txt(s,'Só recebe capital após…',6.88,3.62,4.8,.35,17,C.white,true);
  const right=['Owner comercial nomeado','MVP sinais/API inventariado','Entrevistas com family offices','Caminho concreto para piloto'];
  right.forEach((v,i)=>{txt(s,'•  '+v,6.95,4.15+i*.35,5.1,.28,11,C.muted,false);});
  box(s,.62,5.95,12.1,.52,'0D1929');
  txt(s,'Posição atual',.86,6.09,1.25,.23,10,C.teal,true);
  txt(s,'Preservar o ativo • corrigir comunicação • validar antes de construir',2.1,6.03,9.9,.3,14,C.white,true);
}

// 7 — remaining portfolio
{
  const s=slide(); title(s,'Demais projetos: preservar opções sem dispersão','Cada projeto recebe uma única próxima decisão — não um roadmap paralelo.');
  const items=[
    ['WLKMe','DELEGAR + MEDIR','7 pagantes • 223 BRL MRR • Tiago 5%','Lucas entrega retenção, atividade e desempenho da mídia.',C.blue],
    ['Bit2Connect','TESTAR','1 usuário gratuito há >1 ano • custo <15 CAD/mês','Proposta paga/contrapartida e teste com empresas semelhantes.',C.teal],
    ['Tutufi','PAUSAR BUILD','Protótipo + backend • sem teste com pais','Definir owner/cap table e validar intenção de pagamento.',C.red],
    ['PingysTV','INTEGRAR OU PAUSAR','Audiência pública sem atribuição econômica','Virar canal do Pingys com funil mensurável — ou parar.',C.purple]
  ];
  items.forEach((d,i)=>{
    const col=i%2,row=Math.floor(i/2),x=.62+col*6.15,y=1.62+row*2.4;
    box(s,x,y,5.75,2.0,C.panel);
    pill(s,d[1],x+.2,y+.18,1.55,d[4]);
    txt(s,d[0],x+.2,y+.6,2.5,.36,20,C.white,true);
    txt(s,d[2],x+.2,y+1.03,5.2,.27,10,C.muted,false);
    txt(s,d[3],x+.2,y+1.42,5.18,.38,11,C.white,true);
  });
}

// 8 — time allocation
{
  const s=slide(); title(s,'Alocação recomendada: 18 horas por semana','Ciclo de seis semanas. O tempo acompanha a próxima evidência, não o tamanho da ideia.');
  const rows=[['Pingys',6,C.green],['Vant Clinic',5,C.green],['Axio Vector',3,C.gold],['Gestão do portfólio',2,C.blue],['WLKMe',1,C.blue],['Outros 3 projetos',1,C.dim]];
  const max=6;
  rows.forEach((r,i)=>{
    const y=1.7+i*.73;
    txt(s,r[0],.72,y,2.2,.32,12,C.white,true);
    s.addShape(pptx.ShapeType.roundRect,{x:2.95,y:y+.05,w:7.6,h:.28,fill:{color:C.panel2},line:{color:C.panel2},radius:.14});
    s.addShape(pptx.ShapeType.roundRect,{x:2.95,y:y+.05,w:7.6*(r[1]/max),h:.28,fill:{color:r[2]},line:{color:r[2]},radius:.14});
    txt(s,`${r[1]}h`,10.78,y,1,.32,13,r[2],true,'right');
  });
  box(s,.72,6.15,11.8,.52,'0D1929');
  txt(s,'Após 6 semanas',.94,6.29,1.55,.22,10,C.teal,true);
  txt(s,'Realocar horas somente para projetos que apresentarem evidência material.',2.47,6.22,8.95,.31,13,C.white,true);
}

// 9 — decision gates
{
  const s=slide(); title(s,'Gates do próximo ciclo','O resultado esperado não é “mais trabalho”; é uma decisão melhor sustentada.');
  const gates=[
    ['PINGYS','Retenção + atividade + conversão + experimento rastreável',C.green],
    ['VANT','Critérios dos testes + protocolo real + mapa regulatório',C.green],
    ['AXIO','Owner + inventário do MVP + entrevistas + caminho para piloto',C.gold],
    ['WLKME','Retenção + custo/origem dos pagantes + plano de Lucas',C.blue],
    ['BIT2CONNECT','Proposta paga ou contrapartida ao cliente atual',C.teal],
    ['TUTUFI / TV','Owner e discovery / atribuição ao funil ou pausa',C.red]
  ];
  gates.forEach((g,i)=>{
    const y=1.62+i*.79;
    s.addShape(pptx.ShapeType.roundRect,{x:.65,y,w:1.68,h:.47,fill:{color:g[2],transparency:80},line:{color:g[2],width:.8},radius:.12});
    txt(s,g[0],.72,y+.1,1.54,.24,10,g[2],true,'center');
    s.addShape(pptx.ShapeType.line,{x:2.55,y:y+.23,w:.58,h:0,line:{color:C.border,width:1.5}});
    box(s,3.18,y-.03,9.45,.54,C.panel);
    txt(s,g[1],3.42,y+.07,8.92,.3,12,C.white,true);
  });
}

// 10 — close
{
  const s=slide(); title(s,'Recomendação final','Um portfólio menor na prática — ainda que mantenha opções no papel.');
  box(s,.65,1.72,12.02,1.08,'0D1929');
  txt(s,'1',.91,1.96,.38,.38,19,C.green,true,'center');
  txt(s,'Pingys é a prioridade de aprendizado comercial.',1.45,1.91,10.5,.46,21,C.white,true);
  box(s,.65,3.02,12.02,1.08,'0D1929');
  txt(s,'2',.91,3.26,.38,.38,19,C.green,true,'center');
  txt(s,'Vant Clinic é a prioridade executiva e de construção.',1.45,3.21,10.5,.46,21,C.white,true);
  box(s,.65,4.32,12.02,1.08,'0D1929');
  txt(s,'3',.91,4.56,.38,.38,19,C.gold,true,'center');
  txt(s,'Axio Vector é a prioridade de controle e validação.',1.45,4.51,10.5,.46,21,C.white,true);
  s.addText('FOCO  •  EVIDÊNCIA  •  CAIXA',{x:.68,y:6.15,w:6.8,h:.38,fontSize:17,bold:true,color:C.teal,charSpacing:1.6,margin:0});
  s.addText('Reavaliar em 6 semanas',{x:9.1,y:6.18,w:3.45,h:.3,fontSize:12,bold:true,color:C.muted,align:'right',margin:0});
}

pptx.writeFile({ fileName: '/home/hermes/brains/brain_midas/presentations/portfolio-comparison-final-2026-09-15.pptx' });
