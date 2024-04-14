const t=new class{constructor(){this.isCalibrating=!1,this.isDrawing=!1,this.betaOffset=0,this.gammaOffset=0,this.betaMax=45,this.gammaMax=45,this.beta=0,this.gamma=0,this.betaPercent=0,this.gammaPercent=0,this.calibrateCenter(),window.addEventListener("deviceorientation",t=>{t.beta&&t.gamma&&(this.beta=t.beta-this.betaOffset,this.beta>180?this.beta=-180-this.beta:this.beta<-180&&(this.beta=-(180-this.beta)),this.gamma=t.gamma-this.gammaOffset,this.gamma>90?this.gamma=-90-this.gamma:this.gamma<-90&&(this.gamma=-(90-this.gamma)),this.betaPercent=0,this.beta<0?this.betaPercent=Math.max(-this.betaMax,this.beta)/this.betaMax:this.beta>0&&(this.betaPercent=Math.min(this.betaMax,this.beta)/this.betaMax),this.gammaPercent=0,this.gamma<0?this.gammaPercent=Math.max(-this.gammaMax,this.gamma)/this.gammaMax:this.gamma>0&&(this.gammaPercent=Math.min(this.gammaMax,this.gamma)/this.gammaMax))},!1)}calibrateCenter(){window.addEventListener("deviceorientation",t=>{this.betaOffset=t.beta??0,this.gammaOffset=t.gamma??0},{once:!0})}calibrateMax(){this.betaMax=Math.max(this.betaMax,Math.abs(this.betaMax)),this.gammaMax=Math.max(this.gammaMax,Math.abs(this.gammaMax))}},a=new class{constructor(){this.squarePixels=1e3,this.registerParent=t=>{if(t){let a=Math.min(window.innerHeight,window.innerWidth);t.style.setProperty("--canvas-size",a+"px"),t.appendChild(this.drawCtx.canvas),t.appendChild(this.pointerCtx.canvas)}};let t=document.createElement("canvas"),a=document.createElement("canvas");this.drawCtx=t.getContext("2d"),this.pointerCtx=a.getContext("2d"),t.height=t.width=a.height=a.width=this.squarePixels,t.className=a.className="canvas",t.id="canvas",a.id="pointerCanvas"}};window.onload=()=>{a.registerParent(document.querySelector("#canvas-container")),document.querySelector("#draw-button")?.addEventListener("pointerdown",a=>{t.isDrawing=!0}),document.querySelector("#draw-button")?.addEventListener("pointerleave",a=>{t.isDrawing=!1}),document.querySelector("#calibrate-button")?.addEventListener("pointerdown",a=>{t.betaMax=0,t.gammaMax=0,t.isCalibrating=!0}),document.querySelector("#calibrate-button")?.addEventListener("pointerleave",a=>{t.isCalibrating=!1}),window.requestAnimationFrame(e)};const e=()=>{t.isCalibrating&&t.calibrateMax();let i=a.squarePixels/2,s=a.squarePixels/2,n=i+a.squarePixels*t.gammaPercent/2,r=s+a.squarePixels*t.betaPercent/2;t.isDrawing&&(a.drawCtx.beginPath(),a.drawCtx.arc(n,r,5,0,2*Math.PI,!0),a.drawCtx.fillStyle="#000",a.drawCtx.fill()),a.pointerCtx.clearRect(0,0,a.squarePixels,a.squarePixels),a.pointerCtx.beginPath(),a.pointerCtx.arc(n,r,20,0,2*Math.PI,!0),a.pointerCtx.strokeStyle="#333",a.pointerCtx.stroke(),a.pointerCtx.beginPath(),a.pointerCtx.arc(n,r,5,0,2*Math.PI,!0),a.pointerCtx.fillStyle="#000",a.pointerCtx.fill(),window.requestAnimationFrame(e)};
//# sourceMappingURL=index.8f8b341b.js.map
