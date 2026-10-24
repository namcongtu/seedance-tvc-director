// Optional export: requires Playwright, Chromium and FFmpeg already installed.
const {chromium}=require('playwright');
const {spawn}=require('node:child_process');
const {once}=require('node:events');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1280,height:720},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.DEMO_URL||'http://127.0.0.1:8766/');
 await page.addStyleTag({content:'main{padding:0;width:1280px;max-width:none}header,.controls,p{display:none}svg{border-radius:0;box-shadow:none;width:1280px;height:720px}'});
 const output=path.join(__dirname,'pilot.mp4');
 const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate','24','-i','pipe:0','-an','-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',output],{stdio:['pipe','inherit','inherit']});
 const done=new Promise((resolve,reject)=>{ff.on('error',reject);ff.on('close',c=>c===0?resolve():reject(Error('ffmpeg exit '+c)));});
 for(let frame=0;frame<144;frame++){
  await page.evaluate(t=>window.pilot.seek(t),frame/24);
  const png=await page.locator('#stage').screenshot({type:'png'});
  if(!ff.stdin.write(png))await once(ff.stdin,'drain');
  if(frame%120===0)console.log('frame',frame,'/ 144');
 }
 ff.stdin.end();await done;await browser.close();if(errors.length)throw Error(errors.join('\n'));console.log('Exported',output);
})().catch(e=>{console.error(e);process.exit(1);});
