(this["webpackJsonpreact-bathroom"]=this["webpackJsonpreact-bathroom"]||[]).push([[0],{24:function(e,t,a){e.exports=a(52)},29:function(e,t,a){},50:function(e,t,a){},51:function(e,t,a){},52:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),o=a(22),s=a.n(o),r=(a(29),a(10)),l=a(2),c=a(3),u=a(1),h=a(5),m=a(4),d=a(12),p=a.n(d),v=a(6),g=a.n(v),f=a(8),b=a.n(f);function y(e){var t=document.getElementById("app");new b.a(t,{selector:e,pointerEvents:!0})}function E(e){e.scrollIntoView({behavior:"smooth"})}var k=["someone","somebody","a stallmate","a person","another person","person in next stall","some person"],C=[[{time:"11:34 AM",from:"Mom",message:"I need you to help me write a complaint letter for work"},{time:"11:34 AM",from:"Mom",message:"I will call you tonight"},{time:"11:35 AM",from:"Mom",message:"And what is the password for the tablet?"},{time:"11:35 AM",from:"Mom",message:"Love, Mom \ud83d\udc36"}],[{time:"3 days ago",from:"Me",message:"Can you please send someone to take a look at our fridge? The freezer isn\u2019t working, we have it on the coldest setting but it\u2019s not cold. We\u2019ve had to throw out the food we had in there. Thanks."},{time:"1 day ago",from:"Me",message:"Hello, I\u2019m writing again re. our fridge. It\u2019s broken and the settings don\u2019t work. Can you please let me know when you are going to send someone to look at it?"},{time:"1:58 PM",from:"Landlord",message:"THE FRIDGE IS NEW SO THERE SHOULDN\u2019T BE ANY ISSUE WITH IT. HAVE YOU TRIED CHANGING IT TO THE COLDEST SETTING?"}],[{time:"10:24 AM",from:"Me",message:"I had a really nice time with you!"},{time:"10:45 AM",from:"Sky",message:"yes me too!!"},{time:"11:20 AM",from:"Sky",message:"When can I kiss u again?!"}],[{time:"11:30 PM",from:"Lily",message:"Hello! Is 6pm still good to meet tonight?"},{time:"12:01 PM",from:"Me",message:"hey sorry I don\u2019t think I can do tonite anymore\u2026 I had a really long day, I want to go home and lie down. Can we do tm?"},{time:"12:40 PM",from:"Lily",message:"Oh no, I\u2019m sorry to hear! I\u2019m busy tomorrow and the rest of this week though, tonight is the only time I have free \ud83d\ude25"}]],w="https://virtual-bathroom-assets.s3.us-east-2.amazonaws.com";g.a.config({path:".env"});var N="".concat(w,"/loading.png"),O=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={loaded:!1},n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){console.log("Loading complete"),this.setState({loaded:!0})}},{key:"componentDidUpdate",value:function(){this.state.loaded&&this.props.onLoad()}},{key:"render",value:function(){var e=[];return this.state.loaded||console.log("Loading..."),i.a.createElement("div",{className:"loading"},i.a.createElement("div",null,i.a.createElement("img",{src:N,className:"rotating"}),e))}}]),a}(n.PureComponent),x=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){var e={backgroundImage:"url('".concat(this.props.imgSrc,"')")},t=this.props.reponsive?"bg-div--responsive":"bg-div",a="content ".concat(t);return i.a.createElement("div",{className:"view layer","data-depth":"0.1"},i.a.createElement("div",{id:this.props.id,className:a,style:e},this.props.children))}}]),a}(n.PureComponent),j=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){var e=this.props,t={position:"absolute",top:e.top,left:e.left,width:e.width},a=this.props.className||"";return a+=" nav-image",this.props.noAnimate||"pulse"!==this.props.animate?this.props.noAnimate||"shake"!==this.props.animate||(a+=" animate__animated animate__infinite animate__delay-3s animate__headShake"):a+=" animate__animated animate__infinite animate__slower animate__pulse",this.props.imgSrc?i.a.createElement("img",{className:a,src:this.props.imgSrc,onClick:this.props.onClick,text:this.props.altText,style:t}):i.a.createElement("div",{className:a,onClick:this.props.onClick,style:t},this.props.children)}}]),a}(n.PureComponent);g.a.config({path:".env"});var S="".concat(w,"/actions/perspective-round-arrow-up.png"),M="".concat(w,"/actions/2_audio-guide.png"),I="".concat(w,"/images/bg-hallway.jpg"),P=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).handleEnterBathroomClick=n.handleEnterBathroomClick.bind(Object(u.a)(n)),n.handleAudioDescriptionClick=n.handleAudioDescriptionClick.bind(Object(u.a)(n)),n}return Object(c.a)(a,[{key:"handleEnterBathroomClick",value:function(e){this.props.onEnterBathroom(e)}},{key:"handleAudioDescriptionClick",value:function(e){alert("sorry! not yet implemented T__T")}},{key:"render",value:function(){return i.a.createElement(x,{id:"hallway",imgSrc:I},i.a.createElement("div",{className:"hotspots layer","data-depth":"0.1"},i.a.createElement(j,{onClick:this.handleEnterBathroomClick,altText:"Enter Bathroom",imgSrc:S,top:"75vh",left:"51vw",width:"9vw",className:"arrow--enter-bathroom blue-glow"}),i.a.createElement(j,{onClick:this.handleAudioDescriptionClick,noAnimate:!0,altText:"Audio Guide",imgSrc:M,width:"200px",top:"93vh",left:"12vw"})))}}]),a}(n.PureComponent),T=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"componentDidMount",value:function(){this.props.autoplay&&document.getElementById(this.props.id).play()}},{key:"render",value:function(){this.props.autoplay;var e={};return this.props.hidden&&(e={display:"none"}),i.a.createElement("audio",{id:this.props.id,className:"audio",style:e,loop:this.props.loop},i.a.createElement("source",{src:this.props.audioSrc}))}}]),a}(n.PureComponent);g.a.config({path:".env"});var _="".concat(w,"/actions/perspective-round-arrow-up.png"),A="".concat(w,"/sounds/outside.mp3"),D="".concat(w,"/images/bg-waiting-closed.jpg"),H="".concat(w,"/sounds/eventually.mp3"),V="".concat(w,"/images/bg-waiting-opening.gif"),L=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){var e,t={top:"86vh",left:"58vw",position:"absolute"},a=D;this.props.queuePosition>0||0===this.props.queuePosition?(console.log("Currently ".concat(this.props.queuePosition,"/").concat(this.props.inLineTotal)),this.props.queuePosition>2?e=i.a.createElement("div",{className:"please-wait neon"},"\xa0\xa0Sorry, all stalls are occupied right now.",i.a.createElement("br",null),i.a.createElement("br",null),"\xa0\xa0\xa0\xa0There are ",this.props.queuePosition," ahead of you in line. Please wait."):this.props.currentVacancies>0?(a=V,e=i.a.createElement(i.a.Fragment,null,i.a.createElement(T,{id:"enter-sound",audioSrc:H,hidden:"true",autoplay:"true"}),i.a.createElement(j,{className:"arrow--enter-stall blue-glow",onClick:this.props.handleEnterRoomClick,altText:"Enter Stall",imgSrc:_,top:t.top,left:t.left}))):e=i.a.createElement("div",{className:"please-wait neon"},"\xa0\xa0Sorry, all stalls are occupied right now.",i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement("br",null),"\xa0\xa0\xa0\xa0It looks like it will be your turn soon, though. Please wait.")):e=i.a.createElement("div",{className:"please-wait neon",style:t},"please wait...");var n=i.a.createElement(T,{id:"background-audio",audioSrc:A,hidden:"true",autoplay:"true",loop:!0});return i.a.createElement(x,{id:"waiting",imgSrc:a},n,i.a.createElement("div",{className:"hotspots"},e))}}]),a}(n.PureComponent),B=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).handleNavigationClick=n.handleNavigationClick.bind(Object(u.a)(n)),n}return Object(c.a)(a,[{key:"handleNavigationClick",value:function(e){this.props.handleNavigationClick(e)}},{key:"render",value:function(){var e="stall-".concat(this.props.direction),t="layer "+this.props.className;return i.a.createElement("div",{id:e,className:t,"data-depth":"0.2"},i.a.createElement("div",{className:"content"},this.props.children))}}]),a}(n.PureComponent);g.a.config({path:".env"});var q="".concat(w,"/CCA_RGB_colour_e.svg"),R="".concat(w,"/images/bg-mirrors.jpg"),U=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){var e=i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"col-1"},i.a.createElement("h1",null,"MAKE-BELIEVE BATHROOM"),i.a.createElement("p",null,"Created by Amy Lam",i.a.createElement("br",null),"Web developer: Naomi Cui",i.a.createElement("br",null),"3D renderings & animations: Emerson Maxwell",i.a.createElement("br",null),"Soundscape: Vic Cheong",i.a.createElement("br",null),"Graffiti: Haeahn Kwon, Caley Feeney",i.a.createElement("br",null),"Audio descriptive guide: Aliya Pabani"),i.a.createElement("p",null,"Curator: Jenn Jackson",i.a.createElement("br",null),"With contributions from Jon McCurley"),i.a.createElement("p",null,"We acknowledge the support of the Canada Council for the Arts",i.a.createElement("br",null),i.a.createElement("img",{className:"cca-logo",src:q,alt:"Canada Council for the Arts"}))),i.a.createElement("div",{className:"col-2"},i.a.createElement("h2",null,"TOILETS FOR ALL"),i.a.createElement("p",null,"Download and share window stickers created by the Toronto Bathroom Codes project. These stickers advocate for businesses and other organizations to allow their bathrooms to be used by anyone."),i.a.createElement("p",null,i.a.createElement("a",{href:"/freeourpee"},"Pee for free, free to pee.")),i.a.createElement("h2",null,"SUBMIT A POSTER"),i.a.createElement("p",null,"To post a poster or public notice to the Make-Believe Bathroom, please send a PNG file to ",i.a.createElement("strong",null,"xxemail@gmail.com"))),i.a.createElement("div",null,i.a.createElement("a",{href:"/",className:"neon"},"Try the Make-Believe Bathroom Experience Again?")));return i.a.createElement(x,{id:"mirrors",imgSrc:R},i.a.createElement("div",{className:"layer","data-depth":"0.4"},i.a.createElement("div",{className:"mirrors-content"},e)))}}]),a}(n.PureComponent),G=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){return i.a.createElement("div",{className:"hotspots layer","data-depth":"0.1"},this.props.children)}}]),a}(n.PureComponent),W=a(23),F=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).stallMap=e.stallMap,n.myHex=e.myHex,n.getColorStyle=n.getColorStyle.bind(Object(u.a)(n)),n}return Object(c.a)(a,[{key:"getColorStyle",value:function(e){return{color:e}}},{key:"render",value:function(){var e=this,t=this.props.chats.map((function(t){return i.a.createElement("div",{key:t.id,className:"row show-grid"},i.a.createElement("div",{className:"col-xs-12"},i.a.createElement("div",{className:t.userhex===e.myHex?"chatMessage self":"chatMessage"},i.a.createElement("div",{className:"box"},i.a.createElement("p",{className:"user"},i.a.createElement("strong",{style:e.getColorStyle(t.userhex)},t.userhex===e.myHex?"you":t.userName)),i.a.createElement("p",{className:"message"},t.message)))))}));return i.a.createElement("div",{id:"chatlist"},i.a.createElement("ul",null,t))}}]),a}(n.Component),z=a(9),J=a.n(z);g.a.config({path:".env"});var Q="".concat(w,"/sounds/clearly.mp3"),K=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).channel=e.channel,n.myId=e.channel.members.me.id,n.userHex=e.userHex,n.userName=e.userName,n.handleTextChange=n.handleTextChange.bind(Object(u.a)(n)),n.state={text:"",chats:[]},n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.channel.bind("message",(function(t){e.setState({chats:[].concat(Object(W.a)(e.state.chats),[t]),test:""})}))}},{key:"componentDidUpdate",value:function(){E(this.messagesEnd)}},{key:"handleTextChange",value:function(e){if(13===e.keyCode){var t,a={channel_name:this.channel.name,userId:this.myId,userName:this.userName,userhex:this.userHex,message:this.state.text};t="https://virtual-bathroom.herokuapp.com/",J.a.post(t+"message",a),this.setState({text:""}),E(this.messagesEnd)}else this.setState({text:e.target.value})}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{id:"chatbox",className:"component-box"},i.a.createElement(T,{id:"notification-sound",audioSrc:Q,hidden:"true"}),i.a.createElement("div",{className:"chatlist-container"},i.a.createElement(F,{chats:this.state.chats,myHex:this.userHex}),i.a.createElement("div",{style:{float:"left",clear:"both"},ref:function(t){e.messagesEnd=t}})),i.a.createElement("input",{type:"text",value:this.state.text,placeholder:"chat here...",onChange:this.handleTextChange,onKeyDown:this.handleTextChange}))}}]),a}(n.Component);g.a.config({path:".env"});var Y,X="".concat(w,"/images/closeup-phone.png"),$=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).conversation=C[Math.floor(Math.random()*Math.floor(C.length))],n.handleTextChange=n.handleTextChange.bind(Object(u.a)(n)),n.sendMessage=n.sendMessage.bind(Object(u.a)(n)),n.state={text:"",sentMessages:[]},n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){E(this.messagesEnd)}},{key:"componentDidUpdate",value:function(){E(this.messagesEnd)}},{key:"handleTextChange",value:function(e){13===e.keyCode?this.sendMessage():this.setState({text:e.target.value})}},{key:"sendMessage",value:function(){var e=this;if(""!==this.state.text){var t=Array.from(this.state.sentMessages);t.push(this.state.text),this.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{sentMessages:t,text:""})}),(function(){E(e.messagesEnd)}))}}},{key:"render",value:function(){var e=this,t=this.conversation.map((function(e){return i.a.createElement("div",{className:"Me"===e.from?"phone-msg self":"phone-msg"},i.a.createElement("div",{className:"user"},i.a.createElement("strong",{className:"Me"===e.from?"hide":""},e.from),i.a.createElement("span",{className:"time"},e.time)),i.a.createElement("div",{className:"box"},i.a.createElement("p",{className:"message"},e.message)))})),a=null;return this.state.sentMessages.length>0&&(a=this.state.sentMessages.map((function(e){return i.a.createElement("div",{className:"phone-msg self"},i.a.createElement("div",{className:"user"},i.a.createElement("strong",{className:"hide"},"Me"),i.a.createElement("span",{className:"time"},"just now")),i.a.createElement("div",{className:"box"},i.a.createElement("p",{className:"message"},e)))}))),i.a.createElement("div",{id:"big-phone",className:this.props.className,"data-depth":this.props.dataDepth,onClick:this.props.onClick},i.a.createElement("img",{className:"phone-img",src:X}),i.a.createElement("div",{className:"phone-convo"},i.a.createElement("div",{className:"phone-messages"},t,a,i.a.createElement("div",{className:"phone-messages-bottom",style:{float:"left",clear:"both"},ref:function(t){e.messagesEnd=t}})),i.a.createElement("div",{className:"enter-message",onClick:function(e){e.stopPropagation(),e.nativeEvent.stopImmediatePropagation()}},i.a.createElement("input",{type:"text",value:this.state.text,placeholder:"",onChange:this.handleTextChange,onKeyDown:this.handleTextChange}),i.a.createElement("div",{className:"send-button",onClick:this.sendMessage}))))}}]),a}(n.PureComponent),Z=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).classes="bg-layer",n.animatePhone=n.animatePhone.bind(Object(u.a)(n)),n.handleClick=n.handleClick.bind(Object(u.a)(n)),n.phoneVibe=null,n.state={showPhone:!1},n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.phoneVibe=setInterval((function(){e.animatePhone("#phone-layer","shakeX")}),3500)}},{key:"componentDidUpdate",value:function(){var e=this;y(".layer"),this.state.showPhone?this.animatePhone("#big-phone","rotateInUpLeft"):this.phoneVibe=setInterval((function(){e.animatePhone("#phone-layer","shakeX")}),3500)}},{key:"componentWillUnmount",value:function(){clearInterval(this.phoneVibe)}},{key:"animatePhone",value:function(e,t){new Promise((function(a,n){var i=document.querySelector(e);i.classList.add("animate__animated","animate__".concat(t)),i.addEventListener("animationend",(function e(){i.classList.remove("animate__animated","animate__".concat(t)),i.removeEventListener("animationend",e),a("Animation ended")}))}))}},{key:"handleClick",value:function(){console.log("toggling phone");var e=document.getElementsByClassName("phone-messages-bottom")[0];clearInterval(this.phoneVibe),this.setState({showPhone:!this.state.showPhone},(function(){E(e)}))}},{key:"render",value:function(){var e=i.a.createElement("div",{id:"phone-layer",className:this.classes,onClick:this.handleClick}),t=i.a.createElement($,{onClick:this.handleClick,className:"bg-layer layer",dataDepth:"0.3"});return this.state.showPhone?e=i.a.createElement("div",{id:"phone-layer",className:"hide",onClick:this.handleClick}):t=i.a.createElement($,{className:"hide",onClick:this.handleClick}),i.a.createElement(i.a.Fragment,null,t,e)}}]),a}(n.PureComponent);g.a.config({path:".env"}),Y="https://virtual-bathroom.herokuapp.com/";var ee=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).painting=!1,n.position={x:0,y:0},n.canvas=null,n.noteImg=null,n.ctx=null,n.newGraffiti=n.newGraffiti.bind(Object(u.a)(n)),n.downHandler=n.downHandler.bind(Object(u.a)(n)),n.upHandler=n.upHandler.bind(Object(u.a)(n)),n.moveHandler=n.moveHandler.bind(Object(u.a)(n)),n.getPosition=n.getPosition.bind(Object(u.a)(n)),n.resizeCanvas=n.resizeCanvas.bind(Object(u.a)(n)),n.isCanvasBlank=n.isCanvasBlank.bind(Object(u.a)(n)),n.state={noteImg:null,loaded:!1,loadedCanvas:null,newGraffiti:!1},n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e,t=this;this.canvas=document.getElementById(this.props.id),this.canvas.getContext&&(this.ctx=this.canvas.getContext("2d"),this.canvas.addEventListener("mousedown",this.downHandler),this.canvas.addEventListener("mousemove",this.moveHandler),this.canvas.addEventListener("mouseup",this.upHandler)),window.addEventListener("resize",this.resizeCanvas),J.a.get("".concat(Y,"graffiti")).then((function(a){console.log(a),a.data.length>0&&(e=a.data[Math.floor(Math.random()*a.data.length)].canvasImage),t.setState({noteImg:document.querySelector("img.note-img"),loaded:!0,loadedCanvas:e},(function(){t.resizeCanvas()}))})).catch((function(e){console.log(e)}))}},{key:"componentDidUpdate",value:function(){this.resizeCanvas()}},{key:"componentWillUnmount",value:function(){if(console.log("unmounting canvas"),console.log(this.canvas),console.log(this.isCanvasBlank(this.canvas)),!this.isCanvasBlank(this.canvas)){var e=this.canvas.toDataURL();console.log(e.length),J.a.post("".concat(Y,"draw"),{canvasImage:e}).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))}}},{key:"resizeCanvas",value:function(){if(this.canvas&&this.state.noteImg){var e={width:.8*this.state.noteImg.width,height:.9*this.state.noteImg.height};this.canvas.setAttribute("width",e.width),this.canvas.setAttribute("height",e.height);var t=document.querySelector("img.loaded-graffiti");t&&(t.style.cssText="width:".concat(e.width,"px;height:").concat(e.height,"px"))}}},{key:"getPosition",value:function(e){if(this.canvas){var t=this.canvas.getBoundingClientRect();e.originalEvent&&(e=e.originalEvent),this.position.x=e.clientX-t.left,this.position.y=e.clientY-t.top}}},{key:"downHandler",value:function(e){this.painting=!0,this.getPosition(e),e.preventDefault()}},{key:"upHandler",value:function(e){this.painting=!1,e.preventDefault()}},{key:"moveHandler",value:function(e){this.painting&&this.ctx&&(this.ctx.beginPath(),this.ctx.lineWidth=2,this.ctx.lineCap="round",this.ctx.strokeStyle="rgba(0,0,0,".concat(.2*Math.random()+.4,")"),this.ctx.moveTo(this.position.x,this.position.y),this.getPosition(e),this.ctx.lineTo(this.position.x,this.position.y),this.ctx.stroke())}},{key:"isCanvasBlank",value:function(e){var t=e.getContext("2d");return!new Uint32Array(t.getImageData(0,0,e.width,e.height).data.buffer).some((function(e){return 0!==e}))}},{key:"newGraffiti",value:function(e){var t=this;e.stopPropagation(),e.nativeEvent.stopImmediatePropagation(),this.setState({newGraffiti:!0},(function(){t.resizeCanvas()}))}},{key:"render",value:function(){var e;return this.state.loadedCanvas&&(e=i.a.createElement("img",{className:this.state.newGraffiti?"loaded-graffiti hide":"loaded-graffiti",src:this.state.loadedCanvas})),i.a.createElement(i.a.Fragment,null,e,i.a.createElement("canvas",{id:this.props.id,className:this.props.className,onClick:function(e){e.stopPropagation(),e.nativeEvent.stopImmediatePropagation()}}),i.a.createElement(j,{className:"new-graffiti neon",onClick:this.newGraffiti},"clear graffiti"))}}]),a}(n.PureComponent);g.a.config({path:".env"});var te="".concat(w,"/images/closeup-note.png"),ae=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){return Object(l.a)(this,a),t.call(this,e)}return Object(c.a)(a,[{key:"render",value:function(){return i.a.createElement("div",{id:"big-note",className:this.props.className,"data-depth":this.props.dataDepth,onClick:this.props.onClick},i.a.createElement(ee,{id:"note-canvas",className:"note-img"}),i.a.createElement("img",{className:"note-img",src:te,onClick:function(e){e.stopPropagation(),e.nativeEvent.stopImmediatePropagation()}}))}}]),a}(n.PureComponent),ne=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).classes="bg-layer",n.animateNote=n.animateNote.bind(Object(u.a)(n)),n.handleClick=n.handleClick.bind(Object(u.a)(n)),n.noteVibe=null,n.state={showNote:!1},n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.noteVibe=setInterval((function(){e.animateNote("#note-layer","pulse")}),3500)}},{key:"componentDidUpdate",value:function(){var e=this;y(".layer"),this.state.showNote?this.noteVibe=setInterval((function(){e.animateNote("#note-layer","pulse")}),3500):this.animateNote("#big-note","fadeInUp")}},{key:"componentWillUnmount",value:function(){clearInterval(this.noteVibe)}},{key:"animateNote",value:function(e,t){var a=document.querySelector(e);a&&new Promise((function(e,n){a.classList.add("animate__animated","animate__".concat(t)),a.addEventListener("animationend",(function n(){a.classList.remove("animate__animated","animate__".concat(t)),a.removeEventListener("animationend",n),e("Animation ended")}))}))}},{key:"handleClick",value:function(){console.log("toggling note"),clearInterval(this.noteVibe),this.setState({showNote:!this.state.showNote})}},{key:"render",value:function(){var e=i.a.createElement("div",{id:"note-layer",className:this.classes,onClick:this.handleClick}),t=i.a.createElement(ae,{onClick:this.handleClick,className:"bg-layer",dataDepth:"0.3"});return this.state.showNote?e=i.a.createElement("div",{id:"note-layer",className:"hide",onClick:this.handleClick}):t=i.a.createElement(ae,{className:"hide",onClick:this.handleClick}),i.a.createElement(i.a.Fragment,null,t,e)}}]),a}(n.PureComponent);g.a.config({path:".env"});var ie="".concat(w,"/actions/flat-arrow-up.png"),oe="".concat(w,"/actions/flat-arrow-down.png"),se="".concat(w,"/actions/flat-arrow-left.png"),re="".concat(w,"/actions/flat-arrow-right.png"),le="".concat(w,"/actions/flat-arrow-back.png"),ce="".concat(w,"/actions/exit.png"),ue="".concat(w,"/chat-notification.svg"),he="".concat(w,"/sounds/short-flush.mp3"),me="".concat(w,"/sounds/inside.mp3"),de=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).pusher=e.pusher,n.id=e.id,n.presenceChannel=null,n.me=null,n.state={newAlert:!1,occupants:{members:[],count:0},userHex:"#ffffff",currentView:"stall-front",showPhone:!1,userName:"a stallmate"},n.max_occupancy=e.max,n.updateOccupants=n.updateOccupants.bind(Object(u.a)(n)),n.countOccupants=n.countOccupants.bind(Object(u.a)(n)),n.handleNavigationClick=n.handleNavigationClick.bind(Object(u.a)(n)),n.handleFlush=n.handleFlush.bind(Object(u.a)(n)),n.restartParallax=n.restartParallax.bind(Object(u.a)(n)),n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.presenceChannel=this.pusher.subscribe("presence-room-".concat(this.id)),this.presenceChannel.bind("pusher:subscription_succeeded",(function(){e.me=e.presenceChannel.members.me.id,e.setState((function(t){return{userName:k[parseInt(e.me)%k.length],userHex:"#"+Math.floor(16777215*parseInt(e.presenceChannel.members.me.id)).toString(16).slice(-6)}})),e.updateOccupants(e.presenceChannel.members)})),this.presenceChannel.bind("pusher:member_added",(function(t){e.updateOccupants(e.presenceChannel.members)})),this.presenceChannel.bind("pusher:member_removed",(function(t){e.updateOccupants(e.presenceChannel.members),console.log("Stall.js: ".concat(t.id," left Stall ").concat(e.id))})),this.presenceChannel.bind("message",(function(t){t.userId!==e.presenceChannel.members.me.id&&(document.getElementById("notification-sound").play(),"stall-right"!==e.state.currentView&&e.setState({newAlert:!0}))}))}},{key:"componentDidUpdate",value:function(){y(".layer")}},{key:"countOccupants",value:function(e){var t=0;return e.count>0&&e.each((function(e){e.info.isSpy||t++})),t}},{key:"restartParallax",value:function(){var e=document.getElementById("app");new b.a(e,{selector:".layer",pointerEvents:!0});console.log("restarting parallax")}},{key:"updateOccupants",value:function(e){var t=this;this.setState({occupants:e},(function(){return t.props.onOccupancyChange(t.countOccupants(e),"room",t.id)}))}},{key:"handleFlush",value:function(){document.getElementById("flush-audio").play()}},{key:"handleNavigationClick",value:function(e){"stall-right"===e?this.setState({currentView:e,newAlert:!1}):this.setState({currentView:e})}},{key:"render",value:function(){var e,t,a=this,n=i.a.createElement(B,{direction:"front",handleNavigationClick:this.handleNavigationClick,className:"stall-front"===this.state.currentView?"bg-div":"hide"},i.a.createElement(ne,null),i.a.createElement(G,null,i.a.createElement(j,{onClick:function(){return a.handleNavigationClick("stall-up")},altText:"Stare At Ceiling",imgSrc:ie,top:"7vh",left:"50vw"}),i.a.createElement(j,{onClick:function(){return a.handleNavigationClick("stall-left")},altText:"Check Phone",imgSrc:se,top:"53vh",left:"10vw"}),i.a.createElement(j,{onClick:function(){return a.handleNavigationClick("stall-down")},altText:"Cry",imgSrc:oe,top:"88vh",left:"50vw"}),i.a.createElement(j,{onClick:function(){return a.handleNavigationClick("stall-right")},altText:"Talk to Stranger",imgSrc:re,top:"53vh",left:"90vw"}),i.a.createElement(j,{onClick:function(){return a.handleNavigationClick("stall-back")},altText:"Flush/Exit",imgSrc:le,top:"98vh",left:"23vw"}))),o=null,s=i.a.createElement(j,{className:"nav-image",onClick:this.props.onExit,top:"12vh",left:"84vw",width:"80px",imgSrc:ce}),r=i.a.createElement(j,{className:this.state.newAlert?"blue-glow msg-alert":"hide",onClick:function(){return a.handleNavigationClick("stall-right")},top:"90vh",left:"90vw",width:"80px",imgSrc:ue});switch(this.state.currentView){case"stall-up":var l=this.me%2===0?"bg-layer":"hide";o=i.a.createElement(B,{direction:"up",handleNavigationClick:this.handleNavigationClick,className:"bg-div--responsive"},i.a.createElement("div",{id:"hanging-spider",className:l}),i.a.createElement(G,null,i.a.createElement(j,{onClick:function(){return a.handleNavigationClick("stall-front")},altText:"Flush/Exit",imgSrc:oe,top:"87vh",left:"57vw"}))),this.restartParallax();break;case"stall-left":case"stall-right":this.restartParallax();break;case"stall-down":o=i.a.createElement(B,{direction:"down",handleNavigationClick:this.handleNavigationClick,className:"bg-div"},i.a.createElement(G,null,i.a.createElement(j,{onClick:function(){return a.handleNavigationClick("stall-front")},altText:"Gaze at Stall Door",imgSrc:ie,top:"7vh",left:"50vw"}))),this.restartParallax();break;case"stall-back":o=i.a.createElement(B,{direction:"back",handleNavigationClick:this.handleNavigationClick,className:"bg-div"},i.a.createElement(G,null,i.a.createElement(j,{onClick:function(){return a.handleNavigationClick("stall-front")},altText:"Gaze at Stall Door",imgSrc:le,top:"94vh",left:"76vw"}),i.a.createElement(j,{onClick:function(){return a.handleNavigationClick("stall-right")},altText:"Talk to Stranger",imgSrc:se,top:"53vh",left:"10vw"}),i.a.createElement(j,{onClick:function(){return a.handleNavigationClick("stall-left")},altText:"Check Phone",imgSrc:re,top:"53vh",left:"90vw"}),i.a.createElement(j,{onClick:function(){return a.handleFlush()},altText:"Flush",className:"flush-button neon"},"Flush"))),this.restartParallax();break;case"mirrors":o=i.a.createElement(U,null),this.restartParallax();case"stall-front":default:this.restartParallax()}return this.presenceChannel&&this.me&&(e=i.a.createElement(B,{className:"stall-right"===this.state.currentView?"bg-div":"hide",direction:"right",handleNavigationClick:this.handleNavigationClick},i.a.createElement(G,null,i.a.createElement(j,{onClick:function(){return a.handleNavigationClick("stall-up")},altText:"Stare At Ceiling",imgSrc:ie,top:"7vh",left:"50vw"}),i.a.createElement(j,{onClick:function(){return a.handleNavigationClick("stall-down")},altText:"Cry",imgSrc:oe,top:"88vh",left:"50vw"}),i.a.createElement(j,{onClick:function(){return a.handleNavigationClick("stall-front")},altText:"Gaze at Stall",imgSrc:se,top:"53vh",left:"10vw"}),i.a.createElement(j,{onClick:function(){return a.handleNavigationClick("stall-back")},altText:"Flush",imgSrc:re,top:"53vh",left:"90vw"}),i.a.createElement(K,{userName:this.state.userName,occupants:this.state.occupants,userHex:this.state.userHex,channel:this.presenceChannel}))),t=i.a.createElement(B,{direction:"left",handleNavigationClick:this.handleNavigationClick,className:"stall-left"===this.state.currentView?"bg-div--responsive":"hide"},i.a.createElement(Z,null),i.a.createElement(G,null,i.a.createElement(j,{onClick:function(){return a.handleNavigationClick("stall-up")},altText:"Stare At Ceiling",imgSrc:ie,top:"7vh",left:"50vw"}),i.a.createElement(j,{onClick:function(){return a.handleNavigationClick("stall-down")},altText:"Cry",imgSrc:oe,top:"88vh",left:"50vw"}),i.a.createElement(j,{onClick:function(){return a.handleNavigationClick("stall-front")},altText:"Gaze at Stall",imgSrc:re,top:"53vh",left:"90vw"}),i.a.createElement(j,{onClick:function(){return a.handleNavigationClick("stall-back")},altText:"Flush",imgSrc:se,top:"53vh",left:"10vw"})))),i.a.createElement("div",{className:"view"},i.a.createElement("div",{className:"hide"},i.a.createElement("h2",null,"Room ",this.id,": ",this.countOccupants(this.state.occupants)," / ",this.max_occupancy)),i.a.createElement(T,{id:"background-audio",audioSrc:me,hidden:"true",autoplay:"true",loop:!0}),i.a.createElement(T,{id:"flush-audio",audioSrc:he,hidden:"true"}),o,n,t,e,s,r)}}]),a}(n.Component);a(49),a(50),a(51);g.a.config({path:".env"});var pe=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),n=t.call(this,e),console.log("running in ".concat("production"," mode")),n.pusher=new p.a("93d5b6db6095187f5ef6",{cluster:"us2",encrypted:!0}),n.spy=new p.a("93d5b6db6095187f5ef6",{encrypted:!0,cluster:"us2",auth:{params:{isSpy:!0}}}),n.timeoutId=null,n.state={currentView:{type:"loading",id:null},rooms:[],pusher_app_members:{count:0},ahead:null,inLine:0,message:""},n.appChannel=null,n.queueChannel=null,n.countMembers=n.countMembers.bind(Object(u.a)(n)),n.spyOn=n.spyOn.bind(Object(u.a)(n)),n.startInactivityCheck=n.startInactivityCheck.bind(Object(u.a)(n)),n.userActivityDetected=n.userActivityDetected.bind(Object(u.a)(n)),n.handleExitStall=n.handleExitStall.bind(Object(u.a)(n)),n.handleEnterHallway=n.handleEnterHallway.bind(Object(u.a)(n)),n.handleEnterWaiting=n.handleEnterWaiting.bind(Object(u.a)(n)),n.handleEnterRoom=n.handleEnterRoom.bind(Object(u.a)(n)),n.handleMouseMove=n.handleMouseMove.bind(Object(u.a)(n)),n.updateAppMembers=n.updateAppMembers.bind(Object(u.a)(n)),n.updateMemberCount=n.updateMemberCount.bind(Object(u.a)(n)),n.updateQueuePosition=n.updateQueuePosition.bind(Object(u.a)(n)),n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){for(var e=this,t=[],a=0;a<5;a++)t.push({id:a,occupants:0});this.setState({rooms:t},(function(){e.spyOn("presence-queue","waiting");for(var t=0;t<5;t++)e.spyOn("presence-room-".concat(t),"room")})),this.appChannel=this.pusher.subscribe("presence-app"),this.appChannel.bind("pusher:subscription_succeeded",(function(t){e.updateAppMembers(e.appChannel.members)})),this.appChannel.bind("pusher:member_added",(function(t){e.updateAppMembers(e.appChannel.members)})),this.appChannel.bind("pusher:member_removed",(function(t){e.updateAppMembers(e.appChannel.members)}))}},{key:"componentWillUnmount",value:function(){this.pusher.unsubscribe("presence-app")}},{key:"countMembers",value:function(e){var t=0;return e.members.each((function(e){e.info.isSpy||t++})),t}},{key:"updateMemberCount",value:function(e,t,a){if("room"===t){var n=Array.from(this.state.rooms);n[a]={id:a,occupants:e},this.setState((function(e){return{rooms:n}}))}else"waiting"===t&&this.setState((function(t){return{inLine:e}}))}},{key:"updateAppMembers",value:function(e){this.setState((function(t){return{pusher_app_members:e}}))}},{key:"spyOn",value:function(e,t){var a=this,n=this.spy.subscribe(e),i=null;"room"===t&&(i=e.split("-").pop()),n.bind("pusher:subscription_succeeded",(function(){a.updateMemberCount(a.countMembers(n),t,i)})),n.bind("pusher:member_added",(function(e){a.updateMemberCount(a.countMembers(n),t,i)})),n.bind("pusher:member_removed",(function(e){e.info.isSpy,a.updateMemberCount(a.countMembers(n),t,i)}))}},{key:"startInactivityCheck",value:function(){var e=this;this.timeoutId=window.setTimeout((function(){e.pusher.disconnect()}),24e4)}},{key:"updateQueuePosition",value:function(e){var t=e.members.me.id,a=[];e.members.count>0&&(e.members.each((function(e){e.info.isSpy||a.push(e)})),a=function(e){var t=[];return e.forEach((function(e){t.push(e)})),t.sort((function(e,t){return parseInt(e.info.entry_time)<parseInt(t.info.entry_time)?-1:parseInt(e.info.entry_time)>parseInt(t.info.entry_time)?1:0}))}(a)),console.log("trueOccupants:"),console.log(a);var n=a.map((function(e){return e.id.toString()})).indexOf(t.toString());this.setState({ahead:n})}},{key:"userActivityDetected",value:function(){null!==this.timeoutId&&window.clearTimeout(this.timeoutId),"room"===this.state.currentView.type&&this.startInactivityCheck(),"waiting"===this.state.currentView.type&&this.state.ahead<3&&this.startInactivityCheck(),"disconnected"===this.pusher.connection.state&&(alert("You've been ushered out for taking too long! Please line up again to re-enter the bathroom."),window.location.reload())}},{key:"handleExitStall",value:function(e){window.confirm("Ready to leave the bathroom?")&&this.setState((function(e){return{currentView:{type:"mirrors",id:null}}}),(function(){y(".layer")}))}},{key:"handleEnterHallway",value:function(e){this.setState((function(e){return{currentView:{type:"hallway",id:null}}}),(function(){y(".layer")}))}},{key:"handleEnterWaiting",value:function(e){var t=this;this.setState((function(e){return{currentView:{type:"waiting",id:null}}}),(function(){y(".layer"),t.queueChannel=t.pusher.subscribe("presence-queue"),t.queueChannel.bind("pusher:subscription_succeeded",(function(){console.log("Joined Waiting Room"),t.updateMemberCount(t.countMembers(t.queueChannel),"waiting"),t.updateQueuePosition(t.queueChannel)})),t.queueChannel.bind("pusher:member_added",(function(){t.updateMemberCount(t.countMembers(t.queueChannel),"waiting")})),t.queueChannel.bind("pusher:member_removed",(function(e){t.updateMemberCount(t.countMembers(t.queueChannel),"waiting"),t.updateQueuePosition(t.queueChannel),e.info.isSpy||console.log("WaitingRoom.js: someone left the queue")}))}))}},{key:"handleEnterRoom",value:function(e){var t=this,a=!1;this.pusher.unsubscribe("presence-queue");for(var n=function(){o=Object(r.a)({},t.state.rooms[i]);var e=i;o.occupants<3?(t.updateMemberCount(o.occupants+1,"room",i),t.setState((function(t){return{currentView:{type:"room",id:e}}}),(function(){y(".layer")})),a=!0):console.log("Room ".concat(i," full"))},i=0;!a&&i<this.state.rooms.length;i++){var o;n()}a||alert("Sorry, no vacant stalls currently available!")}},{key:"handleMouseMove",value:function(){this.userActivityDetected()}},{key:"render",value:function(){var e=!1;e="hide";var t="Initiating rooms...";5===this.state.rooms.length&&(t=this.state.rooms.map((function(e){return i.a.createElement("li",{key:e.id.toString()},i.a.createElement("strong",null,"Room ",e.id,":")," ",e.occupants,"/",3)})));var a=15-this.state.rooms.map((function(e){return e.occupants})).reduce((function(e,t){return e+t}),0),n=i.a.createElement(O,{onLoad:this.handleEnterHallway});return"hallway"===this.state.currentView.type?n=i.a.createElement(P,{onEnterBathroom:this.handleEnterWaiting}):"mirrors"===this.state.currentView.type?n=i.a.createElement(U,null):"waiting"===this.state.currentView.type&&(n=i.a.createElement(L,{queuePosition:this.state.ahead,inLineTotal:this.state.inLine,currentVacancies:a,handleEnterRoomClick:this.handleEnterRoom})),"room"===this.state.currentView.type&&(n=i.a.createElement(de,{id:this.state.currentView.id,pusher:this.pusher,max:3,onOccupancyChange:this.updateMemberCount,onExit:this.handleExitStall})),i.a.createElement("div",{id:"app",onMouseMove:this.handleMouseMove},i.a.createElement("div",{id:"debug-console",className:e?"hide":void 0},i.a.createElement("div",null,"THE APP IS RUNNING IN ",i.a.createElement("strong",null,"production")," MODE",i.a.createElement("br",null),"this box is for development purposes only"),i.a.createElement("div",null,i.a.createElement("div",null,"Number of Rooms: ",5),i.a.createElement("div",null,i.a.createElement("strong",null,"Current Users:")," ",this.state.pusher_app_members.count),i.a.createElement("div",null,i.a.createElement("strong",null,"In line:")," ",this.state.inLine),i.a.createElement("div",null,i.a.createElement("strong",null,"Vacancies:")," ",a)),i.a.createElement("div",null,i.a.createElement("strong",null,"Rooms:"),t)),n)}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(pe,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[24,1,2]]]);
//# sourceMappingURL=main.582cf365.chunk.js.map