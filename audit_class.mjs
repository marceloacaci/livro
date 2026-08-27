import fs from 'fs';
const DIR = 'js';
const files = [
  'articles-tecnologia.js','articles-tecnologia-b2.js','articles-ia.js','articles-informatica.js',
  'articles-informatica-b2.js','articles-teses.js','articles-teses-b2.js'
];
const AREA = {
  'cs.lg':{estrato:'A1'},'cs.ai':{estrato:'A1'},'cs.cl':{estrato:'A1'},'cs.cv':{estrato:'A1'},
  'cs.ne':{estrato:'A1'},'cs.dc':{estrato:'A1'},'cs.ds':{estrato:'A1'},'cs.cr':{estrato:'A1'},
  'cs.ni':{estrato:'A1'},'cs.se':{estrato:'A1'},'cs.pl':{estrato:'A1'},'cs.os':{estrato:'A1'},
  'cs.ir':{estrato:'A2'},'cs.db':{estrato:'A2'},'cs.sy':{estrato:'A2'},'cs.ro':{estrato:'A2'},
  'cs.mm':{estrato:'A2'},'cs.hc':{estrato:'A2'},'cs.et':{estrato:'A2'},'eess.sp':{estrato:'A2'},
  'eess.sy':{estrato:'A2'},'stat.ml':{estrato:'A1'},'astro-ph.he':{estrato:'A2'},'cond-mat.mtrl-sci':{estrato:'A2'}
};
const KW = [
  {re:/seguranca|criptografia|vulnerab|malware|attack|jailbreak|privac|hsm/i,estrato:'A1'},
  {re:/rede|comunicac|telecom|5g|6g|wifi|satel|wireless|iot|protocolo|sd[no]|dns|tcp|routing|antena|canal|rf\b|sinal|semantic communication|mimo|beam|radar|transceiver|amplifier|freq|ondas|reconfigur|localiz/i,estrato:'A1'},
  {re:/inteligencia|aprendiz|machine|ml\b|deep|neural|modelo|agente|llm|generativa|visao|linguagem|reforco|embedding|transformer|pruning|kalman|diffusion|gpt|bert|attention|redes neurais/i,estrato:'A1'},
  {re:/software|codigo|programa|engenharia|debug|teste|docker|devops|refator|multi-agent|prompt|llm coding/i,estrato:'A1'},
  {re:/banco de dados|database|sql|consulta|grafo|index|query|data mining|dados|recomend/i,estrato:'A2'},
  {re:/algoritm|otimiz|complex|computac|sistema|distribu|paralel|arquitetura|hardware|processador|memoria|cloud|computa|firmware|dna storage|nanopore/i,estrato:'A1'},
  {re:/blockchain|quantum|quantic|robo|sensor|audio|imagem|medic|saude|energia|bateria|edge|reram|memrist|fisica/i,estrato:'A2'},
  {re:/educa|sociedade|impacto|govern|etica|sustent|financ|econom/i,estrato:'A3'}
];
const LAST = /network|communication|signal|system|algorithm|learning|model|optim|comput|data|security|software|hardware|neural|channel|wave|estimation|inference|robot|sensor|cloud|graph|code|agent/;
const w = {};
for (const f of files) { new Function('window', fs.readFileSync(DIR+'/'+f,'utf8'))(w); }
let all = [];
Object.keys(w).forEach(k => { if (Array.isArray(w[k])) all = all.concat(w[k]); });
const counts = {}; let fallback = [];
for (const a of all) {
  const v = (a.venue||'').toString();
  let lab;
  if (/tese/i.test(v) && !/dissert/i.test(v)) lab='Tese(Doutorado)';
  else if (/dissert/i.test(v)) lab='Dissert(Mestrado)';
  else {
    let cat=null;
    (a.tags||[]).forEach(t=>{const s=String(t).toLowerCase(); if(s.indexOf('cs.')===0||s.indexOf('eess.')===0||s.indexOf('stat.')===0||s.indexOf('astro-ph')===0||s.indexOf('cond-mat')===0)cat=s;});
    let est = cat && AREA[cat] ? AREA[cat] : null;
    if (!est) {
      const hay = (a.tags||[]).join(' ')+' '+(a.title||'')+' '+(a.summary||'');
      for (const k of KW){ if(k.re.test(hay)){est=k;break;} }
    }
    if (!est) est = { estrato: 'A3' };
    if (est.estrato === 'A3') {
      const cs = (a.title+' '+(a.summary||'')).toLowerCase();
      if (LAST.test(cs)) est = { estrato: 'A1' };
    }
    if (est.estrato === 'A3') fallback.push(a.id+' | '+(a.title||'').slice(0,70));
    lab='Est.'+est.estrato;
  }
  counts[lab]=(counts[lab]||0)+1;
}
console.log('TOTAL', all.length);
console.log(JSON.stringify(counts,null,2));
console.log('FALLBACK A3 count', fallback.length);
if (fallback.length) console.log(fallback.slice(0,40).join('\n'));
