/* All calculations run locally. No analytics, requests or server are needed. */
(()=>{
  'use strict';
  const $=id=>document.getElementById(id),I=window.Integration;
  const presets=JSON.parse($('preset-data').textContent);
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const f=x=>Number(x).toFixed(6);
  const table=(head,rows)=>'<div class="table-scroll" tabindex="0" role="region" aria-label="Tabla de resultados"><table><thead><tr>'+head.map(h=>'<th scope="col">'+escape(h)+'</th>').join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr>'+r.map(c=>'<td>'+escape(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
  function setMode(){
    const mode=$('mode').value;
    for(const name of ['pairs','lists','function'])$(name+'-fields').hidden=mode!==name;
    $('convergence').hidden=true;
  }
  function loadPreset(id){
    const p=presets.find(p=>String(p.id)===String(id));if(!p)return;
    $('mode').value=p.expr?'function':'pairs';setMode();
    $('pairs').value=p.x?p.x.map((v,i)=>v+','+p.y[i]).join('\n'):'';
    $('expression').value=p.expr||'x^2';$('a').value=p.a??0;$('b').value=p.b??2;$('n').value=p.n??8;
    $('unit').value=p.unit;$('factor').value=p.factor;$('reference').value=p.ref??'';$('method').value=p.method;
    $('error').textContent='';$('output').hidden=true;
    $('preset-note').textContent=String(id)==='26'?'La guía no incluye las 12 anchuras. Ingresa las parejas entre x = 40 y 260 cada 20 mi. La combinación 1/3 + 3/8 admite sus 11 subintervalos.':String(id)==='19'?'El factor 1/3600 convierte la integral de (mi/h)·s a mi.':String(id)==='27s'?'Esta fórmula de superficie omite la pendiente. El desarrollo explica la superficie de revolución.':'Los datos provienen del documento del ejercicio. En modo función puedes cambiar n y comparar el refinamiento.';
    if(String(id)!=='26')calculate();
  }
  function read(){
    const mode=$('mode').value;let data;
    if(mode==='function')data=I.sample($('expression').value,I.numeric($('a').value,'a'),I.numeric($('b').value,'b'),I.numeric($('n').value,'n'));
    else if(mode==='pairs')data=I.parsePairs($('pairs').value);
    else{data={x:I.parseList($('x-list').value,'x'),y:I.parseList($('y-list').value,'y')};I.validate(data.x,data.y);}
    return{...data,factor:I.numeric($('factor').value,'factor de conversión'),reference:$('reference').value.trim()===''?null:I.numeric($('reference').value,'referencia'),unit:$('unit').value.trim()||'u'};
  }
  function graph(x,y){
    const W=800,H=300,pad=48,xmin=x[0],xmax=x.at(-1),low=Math.min(0,...y),high=Math.max(0,...y),range=high-low||1;
    const px=v=>pad+(v-xmin)/(xmax-xmin)*(W-2*pad),py=v=>H-pad-(v-low)/range*(H-2*pad);
    const pts=x.map((v,i)=>px(v).toFixed(2)+','+py(y[i]).toFixed(2)).join(' ');
    const zero=py(0);
    $('plot').innerHTML='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Nodos de la función y área por interpolación lineal. Los valores exactos aparecen en la tabla."><line class="axis" x1="'+pad+'" x2="'+(W-pad)+'" y1="'+zero+'" y2="'+zero+'"/><line class="axis" x1="'+pad+'" x2="'+pad+'" y1="'+pad+'" y2="'+(H-pad)+'"/><polygon class="area" points="'+px(xmin)+','+zero+' '+pts+' '+px(xmax)+','+zero+'"/><polyline class="curve" points="'+pts+'"/>'+x.filter((_,i)=>x.length<70||i%Math.ceil(x.length/60)===0).map(v=>{const i=x.indexOf(v);return'<circle class="node" cx="'+px(v)+'" cy="'+py(y[i])+'" r="3"/>';}).join('')+'<text x="'+pad+'" y="'+(H-15)+'">'+f(xmin)+'</text><text text-anchor="end" x="'+(W-pad)+'" y="'+(H-15)+'">'+f(xmax)+'</text><text x="'+pad+'" y="22">f(x), máx. '+f(high)+'</text><text text-anchor="end" x="'+(W-pad)+'" y="22">mín. '+f(low)+'</text></svg>';
  }
  function calculate(event){
    event?.preventDefault();$('error').textContent='';
    try{
      const d=read(),r=I.integrate(d.x,d.y,$('method').value,d.factor,d.reference);
      $('output').hidden=false;$('result').textContent=f(r.result)+' '+d.unit;
      $('result-detail').textContent=r.label+' · n = '+r.n+' · h = '+f(r.h)+' · suma antes de convertir = '+f(r.raw)+' · factor = '+d.factor;
      $('error-result').textContent=d.reference===null?'Sin referencia: no calculo error verdadero.':'Error absoluto: '+f(r.absError)+' '+d.unit+' · Error porcentual: '+(r.percentError===null?'no definido (referencia cero)':f(r.percentError)+' %');
      const comparison=I.compare(d.x,d.y,d.factor,d.reference);
      $('comparison').innerHTML=table(['Método','Resultado ('+d.unit+')','Eₐ ('+d.unit+')','E%'],comparison.map(v=>[v.label,f(v.result),v.absError===null?'Sin referencia':f(v.absError),v.percentError===null?'No definido':f(v.percentError)+' %']));
      $('weights').innerHTML=table(['i','xᵢ','fᵢ','Peso efectivo Cᵢ/h','Coeficiente Cᵢ','Cᵢ × fᵢ'],d.x.map((x,i)=>[i,f(x),f(d.y[i]),f(r.c[i]/r.h),f(r.c[i]),f(r.terms[i])]));
      graph(d.x,d.y);
      $('convergence').hidden=$('mode').value!=='function';
      if($('mode').value==='function'){
        const rows=[];
        for(const n of [4,8]){
          const data=I.sample($('expression').value,I.numeric($('a').value,'a'),I.numeric($('b').value,'b'),n);
          for(const method of ['T','S13']){const v=I.integrate(data.x,data.y,method,d.factor,d.reference);rows.push([n,v.label,f(v.result),v.absError===null?'Sin referencia':f(v.absError),v.percentError===null?'No definido':f(v.percentError)+' %']);}
        }
        $('convergence-table').innerHTML=table(['n','Método','Resultado ('+d.unit+')','Eₐ','E%'],rows);
      }
    }catch(e){$('output').hidden=true;$('convergence').hidden=true;$('error').textContent=e.message;}
  }
  for(const p of presets){const opt=document.createElement('option');opt.value=p.id;opt.textContent=p.name;$('preset').append(opt);}
  $('preset').addEventListener('change',()=>loadPreset($('preset').value));
  $('mode').addEventListener('change',setMode);$('calculator').addEventListener('submit',calculate);
  $('test-square').addEventListener('click',()=>{
    $('preset').value='';$('mode').value='function';setMode();$('expression').value='x^2';$('a').value=0;$('b').value=2;$('n').value=4;$('factor').value=1;$('unit').value='u³';$('reference').value=8/3;$('method').value='S13';$('preset-note').textContent='Prueba exacta: ∫ de 0 a 2 de x² dx = 8/3. Cambia n para comprobar convergencia.';calculate();
  });
  for(const button of document.querySelectorAll('[data-load]'))button.addEventListener('click',()=>{$('preset').value=button.dataset.load;loadPreset(button.dataset.load);document.querySelector('#laboratorio').scrollIntoView();});
  loadPreset(19);
})();
