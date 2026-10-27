'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const I=require('./integration.js');
const tests=[];
function test(name,fn){try{const detail=fn();tests.push({name,status:'APROBADA',detail:detail??'Coincide con el valor esperado.'});}catch(e){tests.push({name,status:'FALLIDA',detail:e.message});}}
function near(a,b,tol=1e-10){assert.ok(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${a} ≠ ${b}`);}
function sampleResult(expr,a,b,n,m){const d=I.sample(expr,a,b,n);return I.integrate(d.x,d.y,m).result;}
for(const [n,t] of [[4,2.75],[8,2.6875]]){
  test(`x² en [0,2], trapecio n=${n}`,()=>{const v=sampleResult('x^2',0,2,n,'T');near(v,t);return `Resultado ${v.toFixed(12)}; exacto 8/3; error ${Math.abs(v-8/3).toFixed(12)}.`;});
  test(`x² en [0,2], Simpson 1/3 n=${n}`,()=>{const v=sampleResult('x^2',0,2,n,'S13');near(v,8/3);return `Resultado ${v.toFixed(12)}; referencia 2.666666666667.`;});
}
for(const n of [6,12])test(`x² en [0,2], Simpson 3/8 n=${n}`,()=>{near(sampleResult('x^2',0,2,n,'S38'),8/3);});
for(const [n,m] of [[4,'S13'],[6,'S38'],[7,'M7'],[11,'MIX']])test(`Exactitud cúbica ${m}, n=${n}`,()=>{near(sampleResult('x^3-2*x+1',0,2,n,m),2);});
test('Trapecio exacto para función lineal',()=>near(sampleResult('3*x+2',-2,4,7,'T'),30));
test('Ejercicio 19: distancia y conversión',()=>{
  const x=[0,1,2,3,4,5,6,7],y=[0,14,39,69,95,114,129,139];
  near(I.integrate(x,y,'T',1/3600).result,529.5/3600);near(I.integrate(x,y,'M7',1/3600).result,(168+1/3+361.125)/3600);
});
test('Ejercicio 20: trabajo combinado',()=>{
  const x=Array.from({length:8},(_,i)=>i*.4),y=[0,.85,1.3,1.6,1.87,2.14,2.34,2.52];
  near(I.integrate(x,y,'T').result,4.544);near(I.integrate(x,y,'M7').result,4.577166666666667);
});
test('Ejercicio 21: perfil y dos formas de Simpson',()=>{
  const x=Array.from({length:10},(_,i)=>i+1),y=[1.3,3.7,4.6,4.4,2.7,2.5,3.6,5.3,6,5.9];
  near(I.integrate(x,y,'T').result,36.4);near(I.integrate(x,y,'M9').result,36.85);near(I.integrate(x,y,'S38').result,36.6);
});
const presets=JSON.parse(fs.readFileSync(path.join(__dirname,'datos-ejercicios.json'),'utf8'));
const expected={22:[44.042043907184535,43.89921302319348],23:[11.681777915463504,12.151244190511914],24:[78.96926407782203,80.01076679793552],25:[3486620079.9852204,3486236899.848311]};
for(const p of presets.filter(p=>p.expr))test(`Ejercicio ${p.id}: función, n=8 y errores`,()=>{
  const d=I.sample(p.expr,p.a,p.b,8);const t=I.integrate(d.x,d.y,'T',1,p.ref),s=I.integrate(d.x,d.y,'S13',1,p.ref);
  near(t.result,expected[p.id][0]);near(s.result,expected[p.id][1]);near(s.absError,Math.abs(s.result-p.ref));near(s.percentError,100*s.absError/Math.abs(p.ref));
  return `T=${t.result.toFixed(6)}; S=${s.result.toFixed(6)}; referencia=${p.ref.toFixed(6)}; E% de Simpson=${s.percentError.toFixed(6)}.`;
});
test('Ejercicio 27: volumen y superficie simplificada',()=>{
  const p=presets.find(p=>p.id===27),q=presets.find(p=>p.id==='27s');
  near(I.integrate(p.x,p.y,'T').result,199.40473970497814);near(I.integrate(p.x,p.y,'S13').result,201.84209200538822);near(I.integrate(p.x,p.y,'S38').result,199.43713737921826);
  near(I.integrate(q.x,q.y,'T').result,159.27874753700252);near(I.integrate(q.x,q.y,'S13').result,162.31562043547262);
});
test('n=11, combinación 8+3 sobre datos SINTÉTICOS',()=>{near(sampleResult('1',40,260,11,'MIX'),220);return 'Función constante artificial para probar pesos; no representa anchuras del lago.';});
test('Coeficientes combinados: el nodo de unión suma ambos tramos',()=>{
  const c=I.coefficients(7,1,'M7');near(c[4],1/3+3/8);near(c.reduce((a,b)=>a+b,0),7);
});
test('Errores sin referencia no se inventan',()=>{
  const r=I.integrate([0,1,2],[0,1,4],'S13');assert.equal(r.absError,null);assert.equal(r.percentError,null);
});
test('Referencia cero: error porcentual no definido',()=>{
  const r=I.integrate([0,1],[0,2],'T',1,0);near(r.absError,1);assert.equal(r.percentError,null);
});
const invalid=[
 ['listas desiguales',()=>I.validate([0,1],[0])],
 ['x no creciente',()=>I.validate([0,2,1],[0,1,2])],
 ['x repetido',()=>I.validate([0,0,1],[0,1,2])],
 ['paso no uniforme',()=>I.validate([0,1,3],[0,1,2])],
 ['dato no numérico',()=>I.validate([0,1],[0,NaN])],
 ['dato infinito',()=>I.validate([0,1],[0,Infinity])],
 ['pareja incompleta',()=>I.parsePairs('0,0\n1,')],
 ['texto en pareja',()=>I.parsePairs('0,0\n1,abc')],
 ['lista con valor vacío',()=>I.parseList('0,,2','x')],
 ['n no entero',()=>I.sample('x^2',0,2,4.5)],
 ['n cero',()=>I.sample('x^2',0,2,0)],
 ['n negativo',()=>I.sample('x^2',0,2,-4)],
 ['n excesivo',()=>I.sample('x^2',0,2,2001)],
 ['límites invertidos',()=>I.sample('x^2',2,0,4)],
 ['n impar para 1/3',()=>sampleResult('x^2',0,2,7,'S13')],
 ['n=4 para 3/8',()=>sampleResult('x^2',0,2,4,'S38')],
 ['n=8 para 3/8',()=>sampleResult('x^2',0,2,8,'S38')],
 ['combinación 4+3 con n distinto de 7',()=>sampleResult('x',0,2,9,'M7')],
 ['función fuera de dominio',()=>I.sample('sqrt(-1)',0,2,4)],
 ['expresión con acceso a código',()=>I.compile('globalThis.process.exit()')],
 ['símbolo de función desconocido',()=>I.compile('foo(x)')],
 ['paréntesis sin cerrar',()=>I.compile('sin(x')]
];
for(const [name,fn] of invalid)test('Rechazo de '+name,()=>assert.throws(fn));
test('Parser: precedencia, potencia y radianes',()=>{
  near(I.compile('-x^2')(3),-9);near(I.compile('2^3^2')(0),512);near(I.compile('sin(pi/2)+cos(0)')(0),2);near(I.compile('1e-3*x')(2),.002);
});
test('Parser: gramática de las funciones de la guía',()=>{
  near(I.compile('cosh(x/24)')(26),Math.cosh(26/24));near(I.compile('sqrt(1+sinh(x/24)^2)')(26),Math.cosh(26/24));
});
const report={executedAt:new Date().toISOString(),runtime:process.version,passed:tests.filter(t=>t.status==='APROBADA').length,failed:tests.filter(t=>t.status==='FALLIDA').length,tests};
fs.writeFileSync(path.join(__dirname,'pruebas.json'),JSON.stringify(report,null,2)+'\n');
const md='# Evidencia de pruebas de integración numérica\n\nEjecución automática del código real de la página con Node.js.\n\n'+`Fecha UTC: ${report.executedAt}. Runtime: ${report.runtime}. Aprobadas: ${report.passed}. Fallidas: ${report.failed}.\n\n`+'Reproducción: ejecutar `node tests.js` en esta carpeta. No requiere paquetes externos.\n\n| Prueba | Estado | Evidencia |\n| --- | --- | --- |\n'+tests.map(t=>'| '+[t.name,t.status,t.detail].map(v=>String(v).replace(/\|/g,'/').replace(/\n/g,' ')).join(' | ')+' |').join('\n')+'\n\nLa verificación visual y de interacción del navegador se documenta por separado en `verificacion-web.md`. No se ejecuta un área numérica del ejercicio 26 porque faltan los datos originales.\n';
fs.writeFileSync(path.join(__dirname,'evidencia-pruebas.md'),md);
console.log(JSON.stringify({passed:report.passed,failed:report.failed,failures:tests.filter(t=>t.status==='FALLIDA')},null,2));
process.exitCode=report.failed?1:0;
