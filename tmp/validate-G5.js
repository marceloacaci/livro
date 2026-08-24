const fs = require('fs');
const a = JSON.parse(fs.readFileSync('C:/Users/Marcelo/Desktop/Livro/tmp/enriched-G5.json','utf8'));
function wc(s){ return s.trim().split(/\s+/).length; }
let ok = true;
for (const b of a) {
  const sErr = wc(b.summary) < 150 || wc(b.summary) > 260 ? ` SUMMARY_WORDS=${wc(b.summary)}` : '';
  const m = b.myths.length, e = b.ensinamentos.length, c = b.citacoes.length, t = b.citacoesTerceiros.length, ch = b.chapters.length;
  const mErr = (m<12||m>15)?` MYTHS=${m}`:'';
  const eErr = (e<10||e>12)?` ENS=${e}`:'';
  const cErr = (c<4||c>5)?` CIT=${c}`:'';
  const tErr = (t<2||t>3)?` THIRD=${t}`:'';
  const chErr = (ch<7||ch>10)?` CHAP=${ch}`:'';
  // check alternating truth/myth
  let altOk = true;
  for (let i=0;i<b.myths.length;i++){ const exp = (i%2===0)?'truth':'myth'; if(b.myths[i].type!==exp) altOk=false; }
  const altErr = altOk?'':' ALT_NOT_ALTERNATING';
  // keys check
  const mKeys = b.myths.every(x=>x.type&&x.title&&x.text&&x.reflection);
  const eKeys = b.ensinamentos.every(x=>x.number&&x.title&&x.text);
  const cKeys = b.citacoes.every(x=>x.texto&&x.autor&&x.obra);
  const tKeys = b.citacoesTerceiros.every(x=>x.texto&&x.autor&&x.fonte);
  const chKeys = b.chapters.every(x=>x.title&&x.text&&Array.isArray(x.points)&&x.points.length>=2&&x.points.length<=5);
  const keyErr = (mKeys&&eKeys&&cKeys&&tKeys&&chKeys)?'':' KEY_MISSING';
  const status = (sErr||mErr||eErr||cErr||tErr||chErr||altErr||keyErr)?'FAIL':'ok';
  if(status!=='ok') ok=false;
  console.log(`${b.id.padEnd(10)} ${status}${sErr}${mErr}${eErr}${cErr}${tErr}${chErr}${altErr}${keyErr} [summary=${wc(b.summary)}w myths=${m} ens=${e} cit=${c} third=${t} chap=${ch}]`);
}
console.log(ok ? 'ALL OK' : 'SOME ISSUES');
