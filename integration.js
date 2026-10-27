(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.Integration=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const labels={T:'Trapecio compuesto',S13:'Simpson 1/3',S38:'Simpson 3/8',M7:'Simpson 1/3 (4) + 3/8 (3)',M9:'Simpson 1/3 (8) + trapecio (1)',MIX:'Simpson 1/3 + 3/8 (últimos 3)'};
  function numeric(text,name){
    if(String(text).trim()==='')throw Error('Falta '+name+'.');
    const value=Number(text);
    if(!Number.isFinite(value))throw Error(name+' debe ser un número finito.');
    return value;
  }
  function validate(x,y){
    if(!Array.isArray(x)||!Array.isArray(y)||x.length!==y.length)throw Error('Las listas x e y deben tener la misma longitud.');
    if(x.length<2)throw Error('Necesito al menos dos parejas de datos.');
    if(x.length>2001)throw Error('El máximo es de 2001 nodos.');
    if(!x.every(Number.isFinite)||!y.every(Number.isFinite))throw Error('Todos los datos deben ser números finitos.');
    for(let i=1;i<x.length;i++)if(x[i]<=x[i-1])throw Error('Los valores x deben ser estrictamente crecientes.');
    const n=x.length-1,h=(x[n]-x[0])/n;
    for(let i=1;i<x.length;i++){
      const tolerance=1e-8*Math.abs(h)+Number.EPSILON*32*Math.max(Math.abs(x[i]),Math.abs(x[i-1]));
      if(Math.abs((x[i]-x[i-1])-h)>tolerance)throw Error('El espaciamiento no es uniforme: revisa el intervalo '+i+'.');
    }
    return {n,h};
  }
  function parseList(text,name){
    if(!text.trim())throw Error('Falta la lista '+name+'.');
    if(/^[,;]|[,;]$|[,;]\s*[,;]/.test(text.trim()))throw Error('Hay un valor vacío en la lista '+name+'.');
    return text.split(/[,;\s]+/).map((s,i)=>numeric(s,name+'['+i+']'));
  }
  function parsePairs(text){
    if(!text.trim())throw Error('Ingresa las parejas x,y.');
    const x=[],y=[];
    for(const [i,line] of text.trim().split(/\r?\n/).entries()){
      const cells=line.trim().split(/[,;\t]/);
      if(cells.length!==2)throw Error('La fila '+(i+1)+' debe contener dos valores separados por coma, punto y coma o tabulación.');
      x.push(numeric(cells[0],'x de la fila '+(i+1)));y.push(numeric(cells[1],'y de la fila '+(i+1)));
    }
    validate(x,y);return {x,y};
  }
  // Small arithmetic parser. It accepts only the grammar below; no eval or Function.
  function compile(expression){
    if(!expression.trim()||expression.length>500)throw Error('La función debe tener entre 1 y 500 caracteres.');
    const tokens=[];let pos=0;
    while(pos<expression.length){
      const tail=expression.slice(pos);
      const space=tail.match(/^\s+/);if(space){pos+=space[0].length;continue;}
      const match=tail.match(/^(?:(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?|[a-zA-Z]+|[+\-*/^()])/);
      if(!match)throw Error('Símbolo no permitido en la función, posición '+(pos+1)+'.');
      tokens.push(match[0]);pos+=match[0].length;
    }
    let at=0,depth=0;
    const funcs={sin:Math.sin,cos:Math.cos,tan:Math.tan,sinh:Math.sinh,cosh:Math.cosh,sqrt:Math.sqrt,exp:Math.exp,log:Math.log,abs:Math.abs};
    function primary(){
      if(++depth>80)throw Error('La expresión está demasiado anidada.');
      const token=tokens[at++];let result;
      if(token==='('){result=sum();if(tokens[at++]!==')')throw Error('Falta cerrar un paréntesis.');}
      else if(token==='x')result=x=>x;
      else if(token==='pi')result=()=>Math.PI;
      else if(token==='e')result=()=>Math.E;
      else if(Object.hasOwn(funcs,token)){
        if(tokens[at++]!=='(')throw Error('Usa paréntesis después de '+token+'.');
        const arg=sum();if(tokens[at++]!==')')throw Error('Falta cerrar '+token+'.');
        result=x=>funcs[token](arg(x));
      }else if(token!==undefined&&/^(?:\d|\.)/.test(token))result=()=>Number(token);
      else throw Error('Función o término no reconocido: '+(token??'fin de expresión')+'.');
      depth--;return result;
    }
    function power(){const left=primary();if(tokens[at]==='^'){at++;const right=unary();return x=>left(x)**right(x);}return left;}
    function unary(){if(tokens[at]==='+'){at++;return unary();}if(tokens[at]==='-'){at++;const f=unary();return x=>-f(x);}return power();}
    function product(){let left=unary();while(tokens[at]==='*'||tokens[at]==='/'){const op=tokens[at++],a=left,b=unary();left=op==='*'?x=>a(x)*b(x):x=>a(x)/b(x);}return left;}
    function sum(){let left=product();while(tokens[at]==='+'||tokens[at]==='-'){const op=tokens[at++],a=left,b=product();left=op==='+'?x=>a(x)+b(x):x=>a(x)-b(x);}return left;}
    const fn=sum();if(at!==tokens.length)throw Error('Término inesperado: '+tokens[at]+'. Usa * para multiplicar.');
    return x=>{const y=fn(x);if(!Number.isFinite(y))throw Error('La función no produce un valor real finito en x = '+x+'.');return y;};
  }
  function sample(expression,a,b,n){
    if(!Number.isFinite(a)||!Number.isFinite(b)||b<=a)throw Error('Los límites deben ser finitos y cumplir a < b.');
    if(!Number.isInteger(n)||n<1||n>2000)throw Error('n debe ser un entero entre 1 y 2000.');
    const fn=compile(expression),h=(b-a)/n,x=Array.from({length:n+1},(_,i)=>i===n?b:a+i*h),y=x.map(fn);
    validate(x,y);return{x,y};
  }
  function coefficients(n,h,method){
    if(!Object.hasOwn(labels,method))throw Error('Método desconocido.');
    if(method==='S13'&&n%2)throw Error('Simpson 1/3 requiere n par.');
    if(method==='S38'&&n%3)throw Error('Simpson 3/8 requiere n múltiplo de 3.');
    if(method==='M7'&&n!==7)throw Error('La combinación 4 + 3 requiere n = 7.');
    if(method==='M9'&&n!==9)throw Error('La combinación 8 + 1 requiere n = 9.');
    if(method==='MIX'&&(n<5||n%2!==1))throw Error('La combinación 1/3 + 3/8 requiere n impar y n ≥ 5.');
    const c=Array(n+1).fill(0);
    function add(start,count,m){
      const factor=m==='T'?h:m==='S13'?h/3:3*h/8;
      for(let j=0;j<=count;j++){
        const w=m==='T'?(j===0||j===count?.5:1):(j===0||j===count?1:m==='S13'?(j%2?4:2):(j%3?3:2));
        c[start+j]+=factor*w;
      }
    }
    if(method==='M7'){add(0,4,'S13');add(4,3,'S38');}
    else if(method==='M9'){add(0,8,'S13');add(8,1,'T');}
    else if(method==='MIX'){add(0,n-3,'S13');add(n-3,3,'S38');}
    else add(0,n,method);
    return c;
  }
  function integrate(x,y,method,factor=1,reference=null){
    const {n,h}=validate(x,y);
    if(!Number.isFinite(factor))throw Error('El factor de conversión debe ser finito.');
    if(reference!==null&&!Number.isFinite(reference))throw Error('La referencia debe ser finita.');
    const c=coefficients(n,h,method),terms=c.map((v,i)=>v*y[i]);
    // Neumaier compensated summation keeps the accumulated roundoff small.
    let sum=0,correction=0;
    for(const term of terms){const next=sum+term;correction+=Math.abs(sum)>=Math.abs(term)?(sum-next)+term:(term-next)+sum;sum=next;}
    const raw=sum+correction,result=raw*factor;
    if(!Number.isFinite(result))throw Error('El resultado excede el rango numérico.');
    const absError=reference===null?null:Math.abs(result-reference);
    return {method,label:labels[method],n,h,c,terms,raw,result,absError,percentError:reference===null||reference===0?null:100*absError/Math.abs(reference)};
  }
  function compare(x,y,factor=1,reference=null){
    validate(x,y);
    const results=[];
    for(const method of Object.keys(labels)){try{results.push(integrate(x,y,method,factor,reference));}catch(e){/* incompatible methods are excluded from comparison */}}
    return results;
  }
  return {numeric,validate,parseList,parsePairs,compile,sample,coefficients,integrate,compare,labels};
});
