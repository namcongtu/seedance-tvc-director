'use strict';
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),lerp=(a,b,u)=>a+(b-a)*u;
const ease=u=>(u=clamp(u))*u*(3-2*u);
const add=(a,b)=>[a[0]+b[0],a[1]+b[1]],dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
// Hermite root curves preserve explicit speed at departure / touchdown.
function curve(keys,t){if(t<=keys[0][0])return keys[0][1];for(let i=1;i<keys.length;i++)if(t<=keys[i][0]){let [a,x,v]=keys[i-1],[b,y,w]=keys[i],u=(t-a)/(b-a),h=b-a;return (2*u**3-3*u*u+1)*x+(u**3-2*u*u+u)*h*v+(-2*u**3+3*u*u)*y+(u**3-u*u)*h*w;}return keys.at(-1)[1];}
function pose(keys,t){if(t<=keys[0][0])return keys[0][1];for(let i=1;i<keys.length;i++)if(t<=keys[i][0]){let u=ease((t-keys[i-1][0])/(keys[i][0]-keys[i-1][0]));return keys[i-1][1].map((a,k)=>lerp(a,keys[i][1][k],u));}return keys.at(-1)[1];}
const config=[{id:'red',color:'#f45e65',take:1.7,land:2.8,start:300,root:[[0,300,200],[1.7,640,240],[2.8,930,240],[3.15,962,40],[3.7,1000,130],[4.3,1100,160],[6,1440,200]]},{id:'blue',color:'#45b6f4',take:2.45,land:3.55,start:150,root:[[0,150,200],[2.45,640,240],[3.55,930,220],[4.2,1000,70],[6,1290,200]]}];
// Equal bone lengths; targets outside reach are clamped and reported for validation.
function ik(a,target,l1,l2,bend){let dx=target[0]-a[0],dy=target[1]-a[1],raw=Math.hypot(dx,dy),d=clamp(raw,.001,l1+l2-.001),ang=Math.atan2(dy,dx),off=Math.acos(clamp((l1*l1+d*d-l2*l2)/(2*l1*d),-1,1));let joint=[a[0]+l1*Math.cos(ang+bend*off),a[1]+l1*Math.sin(ang+bend*off)],end=[a[0]+dx/raw*d,a[1]+dy/raw*d];return {joint,end,error:Math.abs(raw-d)};}
function runFeet(c,t,x){const period=.52,stride=104;return [0,.5].map(offset=>{let cyc=t/period+offset,n=Math.floor(cyc),p=cyc-n,anchor=c.start+(n-offset)*stride+30;if(p<.56)return {p:[anchor,500],contact:true};let u=(p-.56)/.44;return {p:[lerp(anchor,anchor+stride,ease(u)),500-31*4*u*(1-u)],contact:false};});}
function rawRig(c,t){let x=curve(c.root,t),q=t-c.take,air=q>=0&&t<c.land,u=clamp(q/(c.land-c.take)),height=air?4*128*u*(1-u):0;
 let feet=runFeet(c,t,x),hipY=420,lean=.2,arm=[-1.1,.8,1.2,-.9],stretch=1;
 // Authored run poses: contact, compression, passing, recoil, opposite contact.
 let ph=(t/.52)%1;
 let run=pose([[0,[0,.22,-1.1,.8,1.2,-.9]],[.15,[7,.25,-.8,1.1,.9,-1.2]],[.35,[-5,.18,.1,1.5,-.2,-1.4]],[.5,[0,.22,1.2,.9,-1.1,-.8]],[.65,[7,.25,.9,1.2,-.8,-1.1]],[.85,[-5,.18,-.2,1.4,.1,-1.5]],[1,[0,.22,-1.1,.8,1.2,-.9]]],ph);
 hipY+=run[0];lean=run[1];arm=run.slice(2);
 if(t>c.take-.3&&t<c.take){let v=(t-c.take+.3)/.3;let p=pose([[0,[0,.22,-1,.8,1,-.8]],[.65,[19,.42,-1.7,.3,-1.3,.5]],[1,[0,.28,1.1,-.6,.8,-.5]]],v);hipY=420+p[0];lean=p[1];arm=p.slice(2);let from=runFeet(c,c.take-.3,curve(c.root,c.take-.3));feet=from.map((f,i)=>({p:[lerp(f.p[0],i?655:615,ease(v)),lerp(f.p[1],500,ease(v))],contact:false}));}
 if(air){let p=pose([[0,[.28,-25,80,15,78,1.1,-.6,.8,-.5]],[.3,[.05,-37,49,36,41,-.8,-1.1,.6,-1.2]],[.65,[.12,-38,50,40,53,-1.2,-.5,.9,-1]],[1,[.3,-14,80,38,80,-.5,.7,1.2,-.9]]],u);hipY=420-height;lean=p[0];feet=[{p:[x+p[1],hipY+p[2]],contact:false},{p:[x+p[3],hipY+p[4]],contact:false}];arm=p.slice(5);stretch=1+.035*Math.max(0,1-u*5);}
 let since=t-c.land;
 if(since>=0&&since<.36){let p=pose([[0,[0,.3,-.5,.7,1.2,-.9]],[.11,[23,.58,-1.1,.4,.2,-1.4]],[.36,[4,.34,-.7,.9,.5,-1]]],since);hipY=420+p[0];lean=p[1];arm=p.slice(2);feet=[{p:[916,500],contact:true},{p:[968,500],contact:true}];stretch=1-.045*Math.sin(Math.PI*since/.36);}
 if(c.id==='red'&&since>=.36&&t<4.3){let v=(t-3.16)/1.14;let p=pose([[0,[424,.34,-.7,.9,.5,-1]],[.25,[419,.85,-1.9,-.3,.3,-1.4]],[.53,[432,.63,-1.1,-.6,-1.5,.3]],[.8,[426,.1,.5,-1.2,-.7,1]],[1,[420,.22,-1.1,.8,1.2,-.9]]],v);hipY=p[0];lean=p[1];arm=p.slice(2); // A corrective step, rather than sliding the planted leg.
 let s=clamp((t-3.16)/1.14);feet=[{p:[lerp(916,1080,ease(s)),500-30*Math.sin(Math.PI*s)],contact:s===0||s===1},{p:[lerp(968,1120,ease(clamp((s-.25)/.75))),500-24*Math.sin(Math.PI*clamp((s-.25)/.75))],contact:s<.25||s>=1}];}
 // Post-action gait is re-anchored to root motion, with short stance locks.
 if(t>=c.land+.36&&!(c.id==='red'&&t<4.3)){let period=.52,base=c.id==='red'?4.3:c.land+.36,startX=curve(c.root,base);feet=[0,.5].map(off=>{let z=(t-base)/period+off,n=Math.floor(z),p=z-n;let a=curve(c.root,base+(n-off)*period)+30,b=curve(c.root,base+(n+1-off)*period)+30;return {p:[p<.56?a:lerp(a,b,ease((p-.56)/.44)),p<.56?500:500-30*4*((p-.56)/.44)*(1-(p-.56)/.44)],contact:p<.56};});}
 for(let f of feet){let dx=Math.abs(f.p[0]-x);if(dx<91.8)hipY=Math.max(hipY,f.p[1]-Math.sqrt(91.8**2-dx**2));}
 let hip=[x,hipY],neck=[x+Math.sin(lean)*54*stretch,hipY-Math.cos(lean)*54*stretch],head=[neck[0]+Math.sin(lean)*23,neck[1]-Math.cos(lean)*23];
 let legs=feet.map(f=>ik(hip,f.p,46,46,-1));
 let arms=[0,1].map(i=>{let a=arm[i*2],b=arm[i*2+1];let elbow=add(neck,[Math.sin(a)*33,Math.cos(a)*33]),hand=add(elbow,[Math.sin(a+b)*30,Math.cos(a+b)*30]);return {joint:elbow,end:hand};});
 return {id:c.id,color:c.color,x,hip,neck,head,legs,arms,feet,air,phase:air?'flight':t<c.take-.3?'run':t<c.take?'anticipation':since<.36?'impact':c.id==='red'&&t<4.3?'stumble':'recovery',lean};}
// Blend recovery joins in joint space and resolve feet again, rather than snapping rigs.
function rig(c,t){let r=rawRig(c,t);let joins=[c.land+.36,...(c.id==='red'?[4.3]:[])];for(let at of joins)if(t>=at&&t<at+.18){let old=rawRig(c,at-.00001),u=ease((t-at)/.18);for(let key of ['hip','neck','head'])r[key]=r[key].map((v,i)=>lerp(old[key][i]+(i===0?r.x-old.x:0),v,u));r.feet=r.feet.map((f,i)=>({p:f.p.map((v,k)=>lerp(old.feet[i].p[k],v,u)),contact:false}));r.legs=r.feet.map(f=>ik(r.hip,f.p,46,46,-1));r.arms=r.arms.map((a,i)=>({joint:a.joint.map((v,k)=>lerp(old.arms[i].joint[k]+(k===0?r.x-old.x:0),v,u)),end:a.end.map((v,k)=>lerp(old.arms[i].end[k]+(k===0?r.x-old.x:0),v,u))}));}return r;}
function path(points,color,width=9,opacity=1){return `<polyline points="${points.map(p=>p.join(',')).join(' ')}" fill="none" stroke="${color}" stroke-width="${width}" opacity="${opacity}" stroke-linecap="round" stroke-linejoin="round"/>`;}
function draw(r){let s=`<ellipse cx="${r.x}" cy="503" rx="${r.air?24:34}" ry="5" fill="#061623" opacity=".25"/>`;r.legs.forEach((l,i)=>s+=path([r.hip,l.joint,l.end],r.color,10,i?.95:.55));s+=path([r.hip,r.neck],r.color,12);r.arms.forEach((l,i)=>s+=path([r.neck,l.joint,l.end],r.color,8,i?1:.6));s+=`<circle cx="${r.head[0]}" cy="${r.head[1]}" r="18" fill="#ffe7c5" stroke="${r.color}" stroke-width="6"/><circle cx="${r.head[0]+7}" cy="${r.head[1]-2}" r="2.6" fill="#173044"/>`;
 s+=path([[r.head[0]+3,r.head[1]+8],[r.head[0]+11,r.head[1]+(r.phase==='stumble'?4:8)]],'#173044',2);return s;}
function render(t){t=clamp(t,0,6);let rigs=config.map(c=>rig(c,t));let cam=curve([[0,30,170],[1.7,310,160],[3,520,100],[4.3,630,160],[6,940,180]],t);let out='<rect width="1280" height="720" fill="url(#sky)"/>';
 for(let i=0;i<14;i++){let x=((i*240-t*60-cam*.13)%3200+3200)%3200-250;out+=`<path d="M${x} 490l160 -220 190 220" fill="#617c89" opacity=".45"/>`;}
 for(let i=0;i<24;i++){let x=((i*120-t*220-cam*.4)%3000+3000)%3000-130;out+=`<path d="M${x} 530v-95l30 -20 40 20v95" fill="#244b5b" opacity=".5"/>`;}
 out+=`<g transform="translate(${-cam+150} 0)">`;
 for(let [x,w] of [[-1000,1700],[870,2400]]){out+=`<rect x="${x}" y="502" width="${w}" height="240" rx="14" fill="#214458"/><path d="M${x} 500h${w}" stroke="#a1b7bb" stroke-width="12"/>`;for(let j=x+40;j<x+w-60;j+=110)out+=`<rect x="${j}" y="554" width="70" height="75" rx="8" fill="#e6bd83" stroke="#142e3f" stroke-width="7"/>`;}
 out+=`<path d="M700 550q85 25 170 0" fill="none" stroke="#162e3c" stroke-width="12"/>`;
 for(let r of [...rigs].reverse())out+=draw(r);
 for(let c of config){let a=t-c.land;if(a>=0&&a<.28){let u=a/.28;out+=`<ellipse cx="950" cy="499" rx="${15+u*45}" ry="${3+u*4}" fill="none" stroke="#ffe3ac" stroke-width="2" opacity="${1-u}"/>`;}}
 out+='</g>';for(let i=0;i<9;i++){let x=((i*190-t*620)%1800+1800)%1800-200;out+=path([[x,220+i*30],[x+55,220+i*30]],'#d6d8c9',1,.17);}
 document.querySelector('#picture').innerHTML=out;document.querySelector('#time').textContent=t.toFixed(3)+' / 6.000';document.querySelector('#seek').value=t;document.querySelector('#caption').textContent=t<1.4?'Rượt đuổi • pha trụ và pha vung chân':t<2.8?'Lấy đà → bật → bay':t<3.55?'Đỏ hấp thụ lực; Xanh tiếp tục bay':t<4.3?'Bước sửa thăng bằng': 'Ổn định và tiếp tục rượt đuổi';return rigs;}
let current=0,playing=false,last=0;function tick(now){if(playing){current=Math.min(6,current+(now-last)/1000);render(current);if(current===6)playing=false;}last=now;requestAnimationFrame(tick);}document.querySelector('#play').onclick=()=>{if(current>=6)current=0;last=performance.now();playing=true;};document.querySelector('#pause').onclick=()=>playing=false;document.querySelector('#restart').onclick=()=>{playing=false;current=0;render(0);};document.querySelector('#seek').oninput=e=>{current=+e.target.value;render(current);};window.pilot={render,rig,config,seek(t){playing=false;current=clamp(t,0,6);return render(current);},get time(){return current;},get playing(){return playing;}};render(0);requestAnimationFrame(tick);
