const fs = require('fs');
const a = JSON.parse(fs.readFileSync('C:/Users/Marcelo/Desktop/Livro/tmp/enriched-G2.json','utf8'));
console.log('OK books='+a.length, 'bytes='+fs.readFileSync('C:/Users/Marcelo/Desktop/Livro/tmp/enriched-G2.json','utf8').length);
const ids = ['hill','gawande','duckworth','taleb','senge','csikszentmihalyi','robbins','kondo','gerber','rath','tracy','christensen','ariely','kawasaki','tolle','semler','gladwell','coyle','sinek','maxwell'];
console.log('order matches:', JSON.stringify(a.map(b=>b.id))===JSON.stringify(ids));
// per-book length report + validation
const foreign = /[a-z]{4,}/i; // not used
let problems = 0;
for (const b of a){
  const m=b.myths.length, e=b.ensinamentos.length, c=b.chapters.length;
  const types = b.myths.map(x=>x.type);
  const truthN = types.filter(t=>t==='truth').length;
  const mythN = types.filter(t=>t==='myth').length;
  const cite=b.citacoes.length, ct=b.citacoesTerceiros.length;
  const missing = [];
  if(m<12||m>15) missing.push('myths='+m);
  if(e<10||e>12) missing.push('ensin='+e);
  if(c<7||c>10) missing.push('chaps='+c);
  if(cite<4||cite>5) missing.push('cit='+cite);
  if(ct<2||ct>3) missing.push('ct='+ct);
  if(!b.summary || b.summary.length<300) missing.push('summaryLen='+(b.summary||'').length);
  // check every myth has required fields
  for(const x of b.myths){ if(!x.type||!x.title||!x.text||!x.reflection) missing.push('mythField'); }
  for(const x of b.ensinamentos){ if(!x.number||!x.title||!x.text) missing.push('ensField'); }
  for(const x of b.chapters){ if(!x.title||!x.text||!Array.isArray(x.points)||x.points.length<2) missing.push('chapField'); }
  for(const x of b.citacoes){ if(!x.texto||!x.autor||!x.obra) missing.push('citField'); }
  for(const x of b.citacoesTerceiros){ if(!x.texto||!x.autor||!x.fonte) missing.push('ctField'); }
  console.log(b.id.padEnd(18), 'myths',m,'(T'+truthN+'/M'+mythN+')','ensin',e,'chaps',c,'cit',cite,'ct',ct, missing.length?('PROBLEMS: '+missing.join(',')):'OK');
  problems+=missing.length;
}
console.log('TOTAL PROBLEMS:', problems);
