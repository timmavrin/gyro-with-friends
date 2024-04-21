class t{constructor(){this._isCalibrating=!1,this._hasPermission=!1,this.isCalibrating=()=>this._isCalibrating,this.betaPercent=0,this.gammaPercent=0,this.beta=0,this.betaOffset=0,this.betaMax=45,this.gamma=0,this.gammaOffset=0,this.gammaMax=45,this.calibrateCenter(),window.addEventListener("deviceorientation",()=>this._hasPermission=!0,{once:!0})}[Symbol.dispose](){window.removeEventListener("deviceorientation",this.listenToOrientation.bind(this),!0)}listen(){window.removeEventListener("deviceorientation",this.listenToOrientation.bind(this),!0),window.addEventListener("deviceorientation",this.listenToOrientation.bind(this),!0)}listenToOrientation(t){t.beta&&t.gamma&&(this.beta=t.beta-this.betaOffset,this.beta>180?this.beta=-180-this.beta:this.beta<-180&&(this.beta=-(180-this.beta)),this.gamma=t.gamma-this.gammaOffset,this.gamma>90?this.gamma=-90-this.gamma:this.gamma<-90&&(this.gamma=-(90-this.gamma)),this.betaPercent=0,this.beta<0?this.betaPercent=Math.max(-this.betaMax,this.beta)/this.betaMax:this.beta>0&&(this.betaPercent=Math.min(this.betaMax,this.beta)/this.betaMax),this.gammaPercent=0,this.gamma<0?this.gammaPercent=Math.max(-this.gammaMax,this.gamma)/this.gammaMax:this.gamma>0&&(this.gammaPercent=Math.min(this.gammaMax,this.gamma)/this.gammaMax))}calibrateCenter(){window.addEventListener("deviceorientation",t=>{this.betaOffset=t.beta??0,this.gammaOffset=t.gamma??0},{once:!0})}startCalibration(){this._isCalibrating=!0,this.calibrateCenter(),this.betaMax=5,this.gammaMax=5}endCalibration(){this._isCalibrating=!1}calibrateMax(){this.betaMax=Math.max(this.betaMax,Math.abs(this.beta)),this.gammaMax=Math.max(this.gammaMax,Math.abs(this.gamma))}}const e=new t,i=new class{constructor(){this.squarePixels=1e3,this.isDrawing=!1,this.color="rgb(0,0,0)";let t=document.createElement("canvas"),e=document.createElement("canvas");this.drawCtx=t.getContext("2d"),this.pointerCtx=e.getContext("2d"),t.height=t.width=e.height=e.width=this.squarePixels,t.className=e.className="canvas",t.id="canvas",e.id="pointerCanvas"}registerParent(t){if(t){let e=Math.min(window.innerHeight,window.innerWidth);t.style.setProperty("--canvas-size",e+"px"),t.appendChild(this.drawCtx.canvas),t.appendChild(this.pointerCtx.canvas)}}};window.onload=()=>{i.registerParent(document.querySelector("#canvas-container"));let t=document.querySelector("#draw-button"),n=document.querySelector("#permission");t?.addEventListener("touchstart",t=>{i.isDrawing=!0,i.color=a(t.touches[0].clientX)}),t?.addEventListener("touchmove",t=>{i.color=a(t.touches[0].clientX)}),t?.addEventListener("touchend",()=>{i.isDrawing=!1}),setTimeout(()=>{e._hasPermission?e.listen():(t.style.display="none",n.style.display="block",n.addEventListener("touchend",()=>{"requestPermission"in DeviceOrientationEvent&&"function"==typeof DeviceOrientationEvent.requestPermission&&DeviceOrientationEvent.requestPermission().then(i=>{"granted"===i&&(e.listen(),t.style.display="block",n.style.display="none")})}))},100),document.querySelector("#calibrate-button")?.addEventListener("touchstart",t=>{e.startCalibration()}),document.querySelector("#calibrate-button")?.addEventListener("touchend",t=>{e.endCalibration()}),window.requestAnimationFrame(s)};const a=t=>`hsl(${360*t/window.innerWidth} 100 50)`,s=()=>{if(e.isCalibrating())e.calibrateMax();else{let t=i.squarePixels/2,a=i.squarePixels/2,s=t+i.squarePixels*e.gammaPercent/2,n=a+i.squarePixels*e.betaPercent/2;i.isDrawing&&(i.drawCtx.beginPath(),i.drawCtx.arc(s,n,5,0,2*Math.PI,!0),i.drawCtx.fillStyle=i.color,i.drawCtx.fill()),i.pointerCtx.clearRect(0,0,i.squarePixels,i.squarePixels),i.pointerCtx.beginPath(),i.pointerCtx.arc(s,n,20,0,2*Math.PI,!0),i.pointerCtx.strokeStyle="#333",i.pointerCtx.stroke(),i.pointerCtx.beginPath(),i.pointerCtx.arc(s,n,5,0,2*Math.PI,!0),i.pointerCtx.fillStyle="#000",i.pointerCtx.fill()}window.requestAnimationFrame(s)};
//# sourceMappingURL=index.759de219.js.map
