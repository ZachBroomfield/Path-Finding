var Jt=Object.defineProperty;var Qt=(h,t,e)=>t in h?Jt(h,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):h[t]=e;var n=(h,t,e)=>(Qt(h,typeof t!="symbol"?t+"":t,e),e),rt=(h,t,e)=>{if(!t.has(h))throw TypeError("Cannot "+e)};var y=(h,t,e)=>(rt(h,t,"read from private field"),e?e.call(h):t.get(h)),r=(h,t,e)=>{if(t.has(h))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(h):t.set(h,e)},b=(h,t,e,i)=>(rt(h,t,"write to private field"),i?i.call(h,e):t.set(h,e),e);var a=(h,t,e)=>(rt(h,t,"access private method"),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const g of o.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&i(g)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();class d{constructor(t,e){n(this,"x");n(this,"y");if(typeof t=="object")this.x=t.x,this.y=t.y;else if(typeof t=="number"&&e)this.x=t,this.y=e;else throw new Error("Incorrect Vector2D parameters provided")}add(t){return this.x+=t.x,this.y+=t.y,this}sub(t){return this.x-=t.x,this.y-=t.y,this}mult(t){return this.x*=t,this.y*=t,this}mag(){return Math.sqrt(this.x**2+this.y**2)}magSqr(){return this.x**2+this.y**2}same(t){return this.x===t.x&&this.y===t.y}copy(){return new d(this.x,this.y)}static add(t,e){return new d({x:t.x+e.x,y:t.y+e.y})}static sub(t,e){return new d({x:t.x-e.x,y:t.y-e.y})}static mult(t,e){return new d({x:t.x*e,y:t.y*e})}static negative(t){return new d({x:-t.x,y:-t.y})}static copy(t){return new d({x:t.x,y:t.y})}}var H,ct;class Ut{constructor(t){r(this,H);n(this,"canvas");n(this,"ctx");this.canvas=document.getElementById(t.id),this.ctx=this.canvas.getContext("2d"),a(this,H,ct).call(this,{width:t.dimensions.width,height:t.dimensions.height})}getCtx(){return this.ctx}getMidPoint(){return new d({x:this.canvas.width/2,y:this.canvas.height/2})}getDimensions(){return{width:this.canvas.width,height:this.canvas.height}}clear(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)}}H=new WeakSet,ct=function(t){this.canvas.height=t.height,this.canvas.width=t.width};var c=(h=>(h[h.Blank=0]="Blank",h[h.Barrier=1]="Barrier",h[h.Start=2]="Start",h[h.End=3]="End",h[h.Path=4]="Path",h[h.Success=5]="Success",h))(c||{}),B,ut;class lt{constructor(t=0){r(this,B);n(this,"type");this.type=t}draw(t,e,i){t.beginPath(),t.lineWidth=0,t.fillStyle=a(this,B,ut).call(this),t.fillRect(e.x,e.y,i,i),t.stroke()}}B=new WeakSet,ut=function(){switch(this.type){case 2:return"green";case 3:return"red";case 4:return"blue";case 5:return"gold";case 0:return"lightgray";default:return"black"}};var A,gt,W,ft,T,wt,L,yt,v,xt,N,pt,j,Ct,F,mt,O,kt,I,bt,R,Pt;class Zt{constructor(t){r(this,A);r(this,W);r(this,T);r(this,L);r(this,v);r(this,N);r(this,j);r(this,F);r(this,O);r(this,I);r(this,R);n(this,"dimensions");n(this,"topLeft");n(this,"gridLines");n(this,"boxes");n(this,"spacing");n(this,"coordToPosition");n(this,"positionToCoord");n(this,"changed");this.dimensions=t.dimensions,this.topLeft=t.topLeft,this.gridLines=t.gridLines,this.spacing=t.spacing,this.boxes=t.boxes,this.coordToPosition=t.coordToPosition,this.positionToCoord=t.positionToCoord,this.changed=[],a(this,T,wt).call(this)}drawLines(t){a(this,A,gt).call(this,t)}get(t,e){return this.boxes.get(t,e)}set(t,e,i){this.boxes.set(t,e,i),this.changed.push({x:t,y:e})}drawChanged(t){a(this,N,pt).call(this,t)}editGrid(t){a(this,j,Ct).call(this,t)}randomiseBarriers(t){a(this,F,mt).call(this,t)}clearPath(){a(this,O,kt).call(this)}clearAll(){a(this,I,bt).call(this)}getStart(){return a(this,R,Pt).call(this)}resetChanged(){this.changed.length=0}}A=new WeakSet,gt=function(t){t.strokeStyle="gray",t.lineWidth=1,this.gridLines.forEach(e=>{t.beginPath(),t.moveTo(e.start.x,e.start.y),t.lineTo(e.end.x,e.end.y),t.stroke()})},W=new WeakSet,ft=function(){for(let t=1;t<=this.dimensions.width;t++)for(let e=1;e<=this.dimensions.height;e++)if(this.get(t,e).type===c.End)return new d(t,e);throw"No End Position"},T=new WeakSet,wt=function(){const t=this.dimensions.width,e=this.dimensions.height,i=Math.min(Math.ceil(t*.1),3),s=Math.ceil(e/2);this.set(i,s,c.Start);const o=t+1-Math.min(Math.ceil(t*.1),3),g=Math.ceil(e/2);this.set(o,g,c.End)},L=new WeakSet,yt=function(){const t=this.getStart();this.set(t.x,t.y,c.Blank)},v=new WeakSet,xt=function(){const t=a(this,W,ft).call(this);this.set(t.x,t.y,c.Blank)},N=new WeakSet,pt=function(t){this.changed.forEach(e=>{this.boxes.get(e.x,e.y).draw(t,{x:this.topLeft.x+(e.x-1)*this.spacing+1,y:this.topLeft.y+(e.y-1)*this.spacing+1},this.spacing-2)}),this.changed.length=0},j=new WeakSet,Ct=function(t){const e=this.positionToCoord({x:t.mouse.x,y:t.mouse.y});if(e!==null){const i=this.get(e.x,e.y);i.type!==t.drawType&&i.type!==2&&i.type!==3&&(t.drawType===c.Start&&a(this,L,yt).call(this),t.drawType===c.End&&a(this,v,xt).call(this),this.set(e.x,e.y,t.drawType))}},F=new WeakSet,mt=function(t){this.clearAll();for(let e=1;e<=this.dimensions.width;e++)for(let i=1;i<=this.dimensions.height;i++){const s=this.get(e,i).type;if(s===c.Start||s===c.End)continue;Math.random()<t?this.set(e,i,c.Blank):this.set(e,i,c.Barrier)}},O=new WeakSet,kt=function(){for(let t=1;t<=this.dimensions.width;t++)for(let e=1;e<=this.dimensions.height;e++){const i=this.get(t,e).type;(i===c.Path||i===c.Success)&&this.set(t,e,c.Blank)}},I=new WeakSet,bt=function(){for(let t=1;t<=this.dimensions.width;t++)for(let e=1;e<=this.dimensions.height;e++){const i=this.get(t,e).type;(i===c.Barrier||i===c.Path||i===c.Success)&&this.set(t,e,c.Blank)}},R=new WeakSet,Pt=function(){for(let t=1;t<=this.dimensions.width;t++)for(let e=1;e<=this.dimensions.height;e++)if(this.get(t,e).type===c.Start)return new d(t,e);throw"No Start Position"};var q,Et;class at{constructor(t,e){r(this,q);n(this,"values");n(this,"size");this.values=new Array(t.width*t.height),this.size=t,a(this,q,Et).call(this,e)}get(t,e){return this.values[t+e*this.size.width]}set(t,e,i){this.values[t+e*this.size.width]=i}}q=new WeakSet,Et=function(t){for(let e=0;e<this.size.width*this.size.height;e++)this.values[e]=t};class Vt{constructor(t){n(this,"boxes");this.boxes=new at(t,new lt)}get(t,e){return this.boxes.get(t-1,e-1)}set(t,e,i){this.boxes.set(t-1,e-1,new lt(i))}}class dt{constructor(t){n(this,"start");n(this,"end");this.start=new d(t.start),this.end=new d(t.end)}get(){return{start:this.start,end:this.end}}}var $,St,X,zt,Y,Mt,K,Ht,D,Bt,G,At,J,Wt,Q,Tt,U,Lt,Z,vt,V,Nt;class x{static create(t){return a(this,$,St).call(this,t.dimensions,t.canvasSize)}}$=new WeakSet,St=function(t,e){t=a(this,D,Bt).call(this,t);const i=a(this,G,At).call(this,e),s=a(this,J,Wt).call(this,t,e),o=a(this,Q,Tt).call(this,t,s,i),g=a(this,U,Lt).call(this,t,s,o),f=new Vt(t),Dt=a(this,X,zt).call(this,s,o),Gt=a(this,Y,Mt).call(this,s,o,t);return new Zt({dimensions:t,topLeft:o,gridLines:g,boxes:f,spacing:s,coordToPosition:Dt,positionToCoord:Gt})},X=new WeakSet,zt=function(t,e){const i=t/2;return s=>({x:e.x+i+t*(s.x-1),y:e.y+i+t*(s.y-1)})},Y=new WeakSet,Mt=function(t,e,i){return s=>a(this,K,Ht).call(this,s,e,i,t)?{x:Math.ceil((s.x-e.x)/t),y:Math.ceil((s.y-e.y)/t)}:null},K=new WeakSet,Ht=function(t,e,i,s){return t.x>e.x&&t.y>e.y&&t.x<e.x+i.width*s&&t.y<e.y+i.height*s},D=new WeakSet,Bt=function(t){return{width:Math.min(t.width,300),height:Math.min(t.height,180)}},G=new WeakSet,At=function(t){return new d(t.width/2,t.height/2)},J=new WeakSet,Wt=function(t,e,i=.99){const s=Math.ceil(e.width*i),o=Math.ceil(e.height*i),g=Math.ceil((s-t.width)/t.width),f=Math.ceil((o-t.height)/t.height);return Math.min(g,f)},Q=new WeakSet,Tt=function(t,e,i){return new d({x:Math.round(i.x-t.width*e/2),y:Math.round(i.y-t.height*e/2)})},U=new WeakSet,Lt=function(t,e,i){const s=[],o=a(this,Z,vt).call(this,t,e),g=a(this,V,Nt).call(this,t,e);for(let f=0;f<=t.width;f++)s.push(new dt({start:new d({x:i.x+f*e,y:i.y}),end:new d({x:i.x+f*e,y:i.y+o})}));for(let f=0;f<=t.height;f++)s.push(new dt({start:new d({x:i.x,y:i.y+f*e}),end:new d({x:i.x+g,y:i.y+f*e})}));return s},Z=new WeakSet,vt=function(t,e){return t.height*e},V=new WeakSet,Nt=function(t,e){return t.width*e},r(x,$),r(x,X),r(x,Y),r(x,K),r(x,D),r(x,G),r(x,J),r(x,Q),r(x,U),r(x,Z),r(x,V);class _t{constructor({width:t,height:e}){n(this,"mouse");n(this,"grid");n(this,"drawType");n(this,"createPath");n(this,"frame");n(this,"resetPath");n(this,"resetAll");n(this,"randomise");n(this,"diagonals");this.mouse={x:0,y:0,leftClick:!1},this.grid={width:t,height:e,changed:!1},this.drawType=c.Blank,this.createPath=!1,this.frame=0,this.resetPath=!1,this.resetAll=!1,this.randomise=!1,this.diagonals=!1}updateMousePosition(t){this.mouse.x=t.clientX,this.mouse.y=t.clientY}incrementFrame(){this.frame++}}var C,S,M,m,_,Ft,tt,Ot,et,It;class jt{constructor(t){r(this,_);r(this,tt);r(this,et);r(this,C,void 0);n(this,"pathFound");r(this,S,void 0);r(this,M,void 0);r(this,m,void 0);b(this,C,new at(t,0)),this.pathFound=!1,b(this,S,!1),b(this,M,t),b(this,m,[])}createNextStep(t,e){if(!y(this,S)){const o=t.getStart();y(this,C).set(o.x-1,o.y-1,1),y(this,m).push(o),b(this,S,!0)}const i=[],s=a(this,et,It).call(this,e);y(this,m).forEach(o=>{this.pathFound||s.forEach(g=>{a(this,_,Ft).call(this,t,o.copy(),d.add(o,g),i)})}),this.pathFound?y(this,m).length=0:b(this,m,i)}reset(){b(this,C,new at(y(this,M),0)),this.pathFound=!1,y(this,m).length=0,b(this,S,!1)}noPath(){return y(this,m).length===0&&!this.pathFound}}C=new WeakMap,S=new WeakMap,M=new WeakMap,m=new WeakMap,_=new WeakSet,Ft=function(t,e,i,s){if(y(this,C).get(i.x-1,i.y-1)!==0)return;const o=a(this,tt,Ot).call(this,t,i);if(o===1){y(this,C).set(i.x-1,i.y-1,e),t.set(i.x,i.y,c.Path),s.push(i);return}else if(o===2){this.pathFound=!0;let g=e;for(;y(this,C).get(g.x-1,g.y-1)!==1;)t.set(g.x,g.y,c.Success),g=y(this,C).get(g.x-1,g.y-1)}},tt=new WeakSet,Ot=function(t,e){return e.x<1||e.x>t.dimensions.width||e.y<1||e.y>t.dimensions.height?0:t.get(e.x,e.y).type===c.Blank?1:t.get(e.x,e.y).type===c.End?2:0},et=new WeakSet,It=function(t){const e=[{x:0,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0}];return t&&e.push({x:1,y:-1},{x:1,y:1},{x:-1,y:1},{x:-1,y:-1}),e};var it,Rt,st,qt,ht,$t;class p{constructor(t){r(this,it);r(this,st);r(this,ht);n(this,"size");n(this,"position");n(this,"text");n(this,"fillColour");n(this,"strokeColour");n(this,"selected");n(this,"action");n(this,"update");this.size=t.size,this.position=t.position,this.text=t.text,this.fillColour=t.fillColour,this.selected=t.selected,this.action=t.action,this.update=t.update,this.strokeColour="black",this.update()}draw(t){a(this,it,Rt).call(this,t),a(this,st,qt).call(this,t)}checkClick(t){a(this,ht,$t).call(this,t)&&this.action()}}it=new WeakSet,Rt=function(t){t.beginPath(),t.fillStyle=this.fillColour,t.fillRect(this.position.x,this.position.y,this.size.width,this.size.height),t.stroke(),t.lineWidth=2,t.strokeStyle=this.strokeColour,t.strokeRect(this.position.x,this.position.y,this.size.width,this.size.height),t.stroke()},st=new WeakSet,qt=function(t){t.font="30px Arial",t.fillStyle="black",t.textAlign="center",t.fillText(this.text,this.position.x+this.size.width/2,this.position.y+this.size.height*.7)},ht=new WeakSet,$t=function(t){return t.x>this.position.x&&t.x<this.position.x+this.size.width&&t.y>this.position.y&&t.y<this.position.y+this.size.height};var nt,Xt;const u=class{static setup(t,e){const i=[];return i.push(new p({size:{width:u.buttonWidth,height:u.buttonHeight},position:new d({x:t.width-240,y:0}),text:"Begin",fillColour:"gray",selected:!1,action:function(){e.createPath=!e.createPath,this.update()},update:function(){e.createPath?(this.text="Pause",this.strokeColour="white",this.fillColour="darkgray"):(this.text="Begin",this.strokeColour="black",this.fillColour="gray")}})),i.push(new p({size:{width:u.buttonWidth,height:u.buttonHeight},position:new d({x:t.width-240,y:0}),text:"Clear Path",fillColour:"gray",selected:!1,action:function(){e.resetPath=!0},update:function(){}})),i.push(new p({size:{width:u.buttonWidth,height:u.buttonHeight},position:new d({x:t.width-240,y:0}),text:"Clear All",fillColour:"gray",selected:!1,action:function(){e.resetAll=!0},update:function(){}})),i.push(new p({size:{width:u.buttonWidth,height:u.buttonHeight},position:new d({x:t.width-240,y:0}),text:"Place Start",fillColour:"green",selected:!1,action:function(){this.selected=!0,e.drawType=c.Start,this.update()},update:function(){this.strokeColour=this.selected?"white":"black",this.fillColour=this.selected?"lightgreen":"green",this.selected&&i.forEach(s=>{this!==s&&(s.selected=!1,s.update())})}})),i.push(new p({size:{width:u.buttonWidth,height:u.buttonHeight},position:new d({x:t.width-240,y:0}),text:"Place End",fillColour:"red",selected:!1,action:function(){this.selected=!0,e.drawType=c.End,this.update()},update:function(){this.strokeColour=this.selected?"white":"black",this.fillColour=this.selected?"#FF6060":"red",this.selected&&i.forEach(s=>{this!==s&&(s.selected=!1,s.update())})}})),i.push(new p({size:{width:u.buttonWidth,height:u.buttonHeight},position:new d({x:t.width-240,y:0}),text:"Draw Barriers",fillColour:"gray",selected:!1,action:function(){this.selected=!0,e.drawType=c.Barrier,this.update()},update:function(){this.strokeColour=this.selected?"white":"black",this.fillColour=this.selected?"darkgray":"gray",this.selected&&i.forEach(s=>{this!==s&&(s.selected=!1,s.update())})}})),i[i.length-1].action(),i.push(new p({size:{width:u.buttonWidth,height:u.buttonHeight},position:new d({x:t.width-240,y:0}),text:"Erase Barriers",fillColour:"gray",selected:!1,action:function(){this.selected=!0,e.drawType=c.Blank,this.update()},update:function(){this.strokeColour=this.selected?"white":"black",this.fillColour=this.selected?"darkgray":"gray",this.selected&&i.forEach(s=>{this!==s&&(s.selected=!1,s.update())})}})),i.push(new p({size:{width:u.buttonWidth,height:u.buttonHeight},position:new d({x:t.width-240,y:0}),text:"Randomise",fillColour:"gray",selected:!1,action:function(){e.randomise=!0},update:function(){}})),i.push(new p({size:{width:u.buttonWidth,height:u.buttonHeight},position:new d({x:t.width-240,y:0}),text:"Diagonals",fillColour:"gray",selected:!1,action:function(){e.diagonals=!e.diagonals,this.update()},update:function(){e.diagonals?(this.strokeColour="white",this.fillColour="darkgray"):(this.strokeColour="black",this.fillColour="gray")}})),i.push(new p({size:{width:u.buttonWidth,height:u.buttonHeight},position:new d({x:t.width-240,y:0}),text:"Size",fillColour:"gray",selected:!1,action:function(){},update:function(){}})),i.push(new p({size:{width:u.buttonWidth,height:u.buttonHeight},position:new d({x:t.width-240,y:0}),text:`-  ${e.grid.width}x${e.grid.height}  +`,fillColour:"gray",selected:!1,action:function(){e.mouse.x>=this.position.x+this.size.width/2?e.grid.width<300&&(e.grid.width+=15,e.grid.height+=9,e.grid.changed=!0):e.grid.width>15&&(e.grid.width-=15,e.grid.height-=9,e.grid.changed=!0),this.update()},update:function(){this.text=`-  ${e.grid.width}x${e.grid.height}  +`}})),a(this,nt,Xt).call(this,i,t),i}};let E=u;nt=new WeakSet,Xt=function(t,e){const i=Math.floor(e.height/2),s=t.length/2,o=u.buttonHeight+u.offset;t.forEach((g,f)=>{g.position.y=i-(s-f)*o})},r(E,nt),n(E,"buttonHeight",50),n(E,"buttonWidth",200),n(E,"offset",10);class te{constructor(t,e){n(this,"buttons");this.buttons=E.setup(t,e)}updateButtons(){this.buttons.forEach(t=>{t.update()})}drawButtons(t){this.buttons.forEach(e=>{e.draw(t)})}checkClick(t){this.buttons.forEach(e=>{e.checkClick(t)})}}const k=new Ut({dimensions:{height:innerHeight,width:innerWidth},id:"canvas"}),l=new _t({width:150,height:90});let w=x.create({dimensions:{width:l.grid.width,height:l.grid.height},canvasSize:{width:k.getDimensions().width-250,height:k.getDimensions().height}}),P=new jt(w.dimensions);const z=new te(k.getDimensions(),l);function Yt(){k.clear(),w.drawLines(k.getCtx())}function Kt(){if(l.grid.changed&&(w=x.create({dimensions:{width:l.grid.width,height:l.grid.height},canvasSize:{width:k.getDimensions().width-250,height:k.getDimensions().height}}),P=new jt(w.dimensions),l.grid.changed=!1,Yt(),z.drawButtons(k.getCtx())),l.randomise){const h=l.diagonals?.41:.59;for(ot(),w.randomiseBarriers(h);!ie(w);)P.reset(),w.resetChanged(),w.randomiseBarriers(h);l.randomise=!1,l.resetPath=!0}l.mouse.leftClick&&!l.createPath&&!P.pathFound&&w.editGrid(l),l.resetPath&&(w.clearPath(),ot(),l.resetPath=!1),l.resetAll&&(w.clearAll(),ot(),l.resetAll=!1),l.frame%5===0&&(l.createPath&&(P.pathFound?(l.createPath=!1,z.updateButtons()):P.createNextStep(w,l.diagonals)),w.drawChanged(k.getCtx()),z.drawButtons(k.getCtx())),l.incrementFrame(),requestAnimationFrame(Kt)}function ot(){P.reset(),l.createPath=!1,z.updateButtons()}function ee(){w.positionToCoord(l.mouse)!==null?l.mouse.leftClick=!0:z.checkClick(l.mouse)}function ie(h){for(l.createPath=!0;!P.pathFound;)if(P.createNextStep(h,l.diagonals),P.noPath())return!1;return l.createPath=!1,!0}Yt();Kt();document.addEventListener("mousedown",()=>{ee()});document.addEventListener("mouseup",()=>{l.mouse.leftClick=!1});document.addEventListener("mousemove",h=>{l.updateMousePosition(h)});