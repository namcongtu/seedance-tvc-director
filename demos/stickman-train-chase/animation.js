'use strict';
// All motion is a pure function of time: seeking and offline rendering share poses.
const DURATION=30, picture=document.querySelector('#picture');
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const mix=(a,b,u)=>a+(b-a)*u;
const smooth=u=>(u=clamp(u))*u*(3-2*u);
const arc=u=>Math.sin(Math.PI*clamp(u));
const scenes=[
 [0,3,'01 / LE DÉPART','Chiếc vé bay mất — cuộc đuổi bắt bắt đầu.'],
 [3,7,'02 / PURSUIT','Đỏ chạy trước; Xanh giữ vé đuổi theo.'],
 [7,11,'03 / LE GRAND SAUT','Khoảng trống giữa hai toa!'],
 [11,15,'04 / JUSTE À TEMPS','Suýt ngã — lấy lại thăng bằng.'],
 [15,19,'05 / OBSTACLE','Cúi thấp né biển báo đường sắt.'],
 [19,23,'06 / DERNIER SPRINT','Một lần tăng tốc cuối cùng.'],
 [23,26,'07 / LE MALENTENDU','Khoan đã… tôi chỉ muốn trả vé!'],
 [26,30,'08 / BON VOYAGE','Hóa ra đuổi cả chuyến chỉ để trả một chiếc vé.']
];
function line(x1,y1,x2,y2,c,w=9){return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;}
function person(x,y,color,phase,pose='run',u=0,ticket=false,face=1){
 let hip=[0,-64],neck=[14,-116],head=[17,-139],a,b,c,d;
 const s=Math.sin(phase), k=Math.cos(phase);
 if(pose==='run'){
 a=[14+32*s,-93];b=[14+49*s,-104+17*k];c=[-32*s,-34];d=[-48*s,-3-Math.max(0,k)*20];
 }else{a=[-28,-96];b=[-45,-115];c=[-18,-30];d=[-26,0];}
 let elbow2=[28-32*s,-88],hand2=[24-47*s,-90-16*k],knee2=[32*s,-32],foot2=[48*s,-3-Math.max(0,-k)*20];
 if(pose==='jump'){a=[-20,-125];b=[-43,-148];elbow2=[43,-120];hand2=[61,-137];c=[-30,-37];d=[-55,-49];knee2=[38,-55];foot2=[59,-31];}
 if(pose==='slip'){neck=[-15,-108];head=[-22,-131];a=[-44,-119];b=[-60,-137+8*Math.sin(phase)];elbow2=[30,-130];hand2=[53,-154];c=[-10,-27];d=[-20,0];knee2=[43,-65];foot2=[65,-72];}
 if(pose==='duck'){neck=[42,-83];head=[61,-88];a=[45,-63];b=[63,-65];elbow2=[18,-76];hand2=[38,-58];c=[-22,-28];d=[-38,0];knee2=[32,-28];foot2=[50,0];}
 if(pose==='stop'||pose==='offer'||pose==='laugh'){neck=[0,-117];head=[0,-141];a=[-20,-92];b=[-24,-68];elbow2=[26,-102];hand2=[49,-105];c=[-14,-32];d=[-18,0];knee2=[15,-32];foot2=[22,0];if(pose==='laugh'){head[1]+=3*Math.sin(phase);neck[1]+=2*Math.sin(phase);}}
 // Xanh's right arm owns the ticket until the visible handoff.
 if(ticket&&color!=='#ec5058'){elbow2=[33,-105];hand2=[56,-111];}
 if(color==='#ec5058'&&(pose==='stop'||pose==='laugh')){a=[-38,-101];b=[-69,-105];}
 let out=`<g transform="translate(${x} ${y})"><ellipse cx="0" cy="4" rx="40" ry="7" fill="#071722" opacity=".25"/><g transform="scale(${face} 1)" stroke-linejoin="round">`;
 out+=line(...hip,...neck,color,10)+line(...hip,...c,color)+line(...c,...d,color)+line(...hip,...knee2,color)+line(...knee2,...foot2,color)+line(...neck,...a,color)+line(...a,...b,color)+line(...neck,...elbow2,color)+line(...elbow2,...hand2,color);
 out+=`<circle cx="${head[0]}" cy="${head[1]}" r="20" fill="#f4e8cf" stroke="${color}" stroke-width="7"/><circle cx="${head[0]+8}" cy="${head[1]-3}" r="2.7" fill="#132938"/>`;
 out+=pose==='laugh'?`<path d="M${head[0]+3} ${head[1]+5}q8 12 13 -1" fill="none" stroke="#132938" stroke-width="3"/>`:`<path d="M${head[0]+5} ${head[1]+8}l8 ${pose==='slip'?-5:0}" stroke="#132938" stroke-width="2.5"/>`;
 if(ticket)out+=`<g transform="translate(${color==='#ec5058'?b[0]:hand2[0]} ${color==='#ec5058'?b[1]:hand2[1]}) rotate(-12)"><rect x="-4" y="-13" width="31" height="19" rx="3" fill="#ffdc72" stroke="#a77b26" stroke-width="2"/></g>`;
 return out+'</g></g>';
}
function render(time){
 const t=clamp(time,0,30),scene=scenes.find(s=>t>=s[0]&&t<s[1])||scenes[7];
 let redX=790,blueX=540,ry=0,by=0,rpose='run',bpose='run',zoom=1,camY=0;
 if(t<3){redX=mix(720,790,smooth(t/3));blueX=mix(440,540,smooth(t/3));}
 if(t>=7&&t<11){let ur=(t-7.3)/1.4,ub=(t-8.2)/1.4;redX=mix(720,980,smooth(ur))+150*smooth((t-8.7)/2.3);blueX=mix(530,970,smooth(ub));ry=-145*arc(ur);by=-145*arc(ub);if(ur>0&&ur<1)rpose='jump';if(ub>0&&ub<1)bpose='jump';zoom=.88;}
 if(t>=11&&t<15){rpose=t<13.1?'slip':'run';ry=t<13.1?8*Math.sin((t-11)*5):0;blueX=mix(540,640,smooth((t-11)/4));zoom=1.08;}
 if(t>=15&&t<19){rpose=t>15.7&&t<17.1?'duck':'run';bpose=t>16.3&&t<17.7?'duck':'run';}
 if(t>=19&&t<23){blueX=mix(540,690,smooth((t-19)/4));zoom=1.03;}
 if(t>=23){redX=790;blueX=mix(690,665,smooth((t-23)/1));rpose=t<24?'slip':t<26?'stop':'laugh';bpose=t<26?'offer':'laugh';zoom=t<26?1.22:1.08;}
 const roof=500,phase=t*17;
 let o=`<rect width="1280" height="720" fill="url(#sky)"/><circle cx="1040" cy="145" r="57" fill="#ffd7a0" opacity=".8"/>`;
 for(let i=0;i<8;i++){let x=((i*240-t*12)%1800+1800)%1800-250;o+=`<path d="M${x} 365l145 -160 155 160" fill="#617e8c" opacity=".5"/>`;}
 for(let i=0;i<15;i++){let x=((i*130-t*105)%1950+1950)%1950-170;o+=`<path d="M${x} 460v-90l24 -24 32 24v90" fill="#234a5e" opacity=".5"/>`;}
 for(let i=0;i<16;i++){let x=((i*103-t*430)%1650+1650)%1650-150;o+=`<path d="M${x} ${390+(i%5)*56}h${45+i%3*22}" stroke="#e9d4b3" opacity=".22" stroke-width="2"/>`;}
 // Camera changes are deliberate cuts; the camera never crosses the action axis.
 o+=`<g transform="translate(640 430) scale(${zoom}) translate(-640 -430)">`;
 let gap=t>=7&&t<11?mix(800,380,(t-7)/4):t>=11&&t<15?mix(750,250,(t-11)/4):-200;
 // Roof gap traverses under the leaps; solid roof remains beneath landings.
 if(t>=7&&t<11)gap=800;
 if(t>=11&&t<15)gap=-200;
 for(const [x,w] of [[-500,gap+500],[gap+105,2200-gap]]){
 o+=`<rect x="${x}" y="500" width="${w}" height="220" rx="20" fill="url(#metal)"/><rect x="${x}" y="490" width="${w}" height="20" rx="10" fill="#9bb6bd"/><path d="M${x+10} 521h${w-20}" stroke="#c6d1cd" stroke-width="3"/>`;
 for(let j=x+35;j<x+w-30;j+=110)o+=`<rect x="${j}" y="555" width="72" height="65" rx="9" fill="#e8bb7e" stroke="#142f42" stroke-width="7"/>`;
 }
 if(t>=15&&t<19){let x=mix(1550,-200,(t-15)/4);o+=`<path d="M${x+160} 500V210h-340" stroke="#263e50" stroke-width="18" fill="none"/><rect x="${x-180}" y="295" width="360" height="90" rx="7" fill="#e2b24c" stroke="#263e50" stroke-width="7"/><path d="M${x-150} 308l50 64m20 -64l50 64m20 -64l50 64m20 -64l50 64" stroke="#263e50" stroke-width="15"/>`;}
 let bobR=rpose==='run'?Math.abs(Math.sin(phase))*7:0,bobB=bpose==='run'?Math.abs(Math.sin(phase+1))*7:0;
 o+=person(blueX,roof+by-bobB,'#248edf',phase+1,bpose,0,t>=.7&&t<25.3);
 o+=person(redX,roof+ry-bobR,'#ec5058',phase,rpose,0,t>=25.3);
 if(t<.7){let u=t/.7;o+=`<rect x="${mix(700,510,u)}" y="${mix(405,389,u)+20*arc(u)}" width="30" height="18" rx="3" fill="#ffdc72" transform="rotate(${t*90} ${mix(700,510,u)} 390)"/>`;}
 o+='</g>';
 o+=`<rect y="0" width="1280" height="42" fill="#091925" opacity=".85"/><text x="28" y="28" fill="#f3ddbb" font-family="monospace" font-size="16" letter-spacing="3">${scene[2]}</text><text x="1245" y="28" text-anchor="end" fill="#b6ccd7" font-family="monospace" font-size="14">${t.toFixed(2)} / 30.00</text>`;
 picture.innerHTML=o;
 document.querySelector('#caption').textContent=scene[3];document.querySelector('#seek').value=t;document.querySelector('#time').textContent=`${t.toFixed(2).padStart(5,'0')} / 30.00`;
 return {t,redX,blueX,ry,by,rpose,bpose,gap};
}
let current=0,playing=false,last=0;
function tick(now){if(playing){current=Math.min(30,current+(now-last)/1000);render(current);if(current>=30)playing=false;}last=now;requestAnimationFrame(tick);}
document.querySelector('#play').onclick=()=>{if(current>=30)current=0;playing=true;last=performance.now();};
document.querySelector('#pause').onclick=()=>playing=false;
document.querySelector('#restart').onclick=()=>{current=0;playing=false;render(0);};
document.querySelector('#seek').oninput=e=>{current=Number(e.target.value);render(current);};
window.chase={render,seek(t){playing=false;current=clamp(t,0,30);return render(current);},get time(){return current;},get playing(){return playing;},duration:DURATION};
render(0);requestAnimationFrame(tick);
