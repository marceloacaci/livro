// scan for stray English words inside pt-BR content
const fs=require('fs');
const a=JSON.parse(fs.readFileSync('C:/Users/Marcelo/Desktop/Livro/tmp/enriched-G2.json','utf8'));
// common english words that should not appear outside proper nouns/quotes
const bad=new Set(['the','and','you','your','with','for','this','that','from','have','will','are','was','were','they','their','what','when','how','why','only','never','anyone','multiple','socialnorm','inspections','viraritmo','planilra','controlar a experiência','mora no']);
let hits=0;
const dump=(s)=>{ const words=String(s).toLowerCase().split(/[^a-záéíóúâêôãõàüç]+/); for(const w of words){ if(bad.has(w)){ console.log('HIT:',w,'| in:',String(s).slice(0,80)); hits++; } } };
for(const b of a){
  dump(b.summary);
  for(const x of b.myths){ dump(x.title); dump(x.text); dump(x.reflection); }
  for(const x of b.ensinamentos){ dump(x.title); dump(x.text); }
  for(const x of b.chapters){ dump(x.title); dump(x.text); for(const p of x.points) dump(p); }
  for(const x of b.citacoes) dump(x.texto);
  for(const x of b.citacoesTerceiros) dump(x.texto);
}
console.log('stray english hits:', hits);
