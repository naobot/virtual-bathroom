(this["webpackJsonpreact-bathroom"]=this["webpackJsonpreact-bathroom"]||[]).push([[0],{22:function(e,t,n){e.exports=n.p+"static/media/1_enter-the-bathroom.502d7cca.png"},23:function(e,t,n){e.exports=n.p+"static/media/2_audio-guide.3e47e291.png"},24:function(e,t,n){e.exports=n.p+"static/media/3_enter-stall.cce7620f.png"},26:function(e,t,n){e.exports=n.p+"static/media/4_stare-at-ceiling.93cd2b33.png"},27:function(e,t,n){e.exports=n.p+"static/media/4_cry.868afc73.png"},28:function(e,t,n){e.exports=n.p+"static/media/4_check-phone.54827428.png"},29:function(e,t,n){e.exports=n.p+"static/media/4_talk-to-stranger.a4f44315.png"},32:function(e,t,n){e.exports=n(61)},37:function(e,t,n){},57:function(e,t,n){e.exports=n.p+"static/media/fixed-phone.492aec9b.png"},59:function(e,t,n){},60:function(e,t,n){},61:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(21),c=n.n(r),o=(n(37),n(31)),s=n(2),l=n(3),u=n(1),h=n(5),m=n(4),p=n(11),d=n.n(p),v=n(8),b=n.n(v),f=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var e=this.props,t={position:"absolute",top:e.top,left:e.left,width:e.width};if(this.props.noAnimate)var n="nav-image";else n="nav-image animate__animated animate__infinite animate__slower animate__pulse";return i.a.createElement("img",{className:n,src:this.props.imgSrc,onClick:this.props.onClick,text:this.props.altText,style:t})}}]),n}(a.PureComponent),y=n(22),g=n.n(y),E=n(23),k=n.n(E),C=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).handleEnterBathroomClick=a.handleEnterBathroomClick.bind(Object(u.a)(a)),a}return Object(l.a)(n,[{key:"handleEnterBathroomClick",value:function(e){this.props.onEnterBathroom(e)}},{key:"render",value:function(){return i.a.createElement("div",{className:"view layer","data-depth":"0.1"},i.a.createElement("div",{id:"hallway",className:"content"},i.a.createElement("div",{className:"hotspots layer","data-depth":"0.1"},i.a.createElement(f,{onClick:this.handleEnterBathroomClick,altText:"Enter Bathroom",imgSrc:g.a,width:"300px",top:"70vh",left:"29vw"}),i.a.createElement(f,{noAnimate:!0,altText:"Audio Guide",imgSrc:k.a,width:"200px",top:"12vh",left:"12vw"}))))}}]),n}(a.PureComponent),O=n(24),x=n.n(O),w=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).pusher=e.pusher,a.state={me:0,occupants:{count:0}},a.countOccupants=a.countOccupants.bind(Object(u.a)(a)),a.sortByEntryTime=a.sortByEntryTime.bind(Object(u.a)(a)),a.handleEnterRoomClick=a.handleEnterRoomClick.bind(Object(u.a)(a)),a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.presenceChannel=this.pusher.subscribe("presence-bathroom"),this.presenceChannel.bind("pusher:subscription_succeeded",(function(){e.setState({me:e.presenceChannel.members.me.id}),e.updateOccupants(e.presenceChannel.members)})),this.presenceChannel.bind("pusher:member_added",(function(){e.updateOccupants(e.presenceChannel.members)})),this.presenceChannel.bind("pusher:member_removed",(function(){e.updateOccupants(e.presenceChannel.members),console.log("WaitingRoom.js: someone left Room ".concat(e.id))}))}},{key:"countOccupants",value:function(e){var t=0;return e.count>0&&e.each((function(e){e.info.isSpy||t++})),t}},{key:"updateOccupants",value:function(e){var t=this;console.log("WaitingRoom.js updateOccupants: numOccupants ".concat(e.count)),this.setState({occupants:e},(function(){return t.props.onOccupancyChange(t.countOccupants(e),"waiting")}))}},{key:"handleEnterRoomClick",value:function(e){this.props.onEnterRoom(e)}},{key:"sortByEntryTime",value:function(e){var t=[];return e.forEach((function(e){t.push(e)})),t.sort((function(e,t){return parseInt(e.info.entry_time)<parseInt(t.info.entry_time)?-1:parseInt(e.info.entry_time)>parseInt(t.info.entry_time)?1:0}))}},{key:"render",value:function(){var e=this,t=[],n=[],a={top:"50vh",left:"60vw",width:"300px",position:"relative"};this.state.occupants.count>0&&(this.state.occupants.each((function(a){a.info.isSpy||(t.push(a),a.id.toString()===e.state.me.toString()?n.push(i.a.createElement("li",{key:a.id.toString()},i.a.createElement("strong",null,a.id)," (",a.info.entry_time,")")):n.push(i.a.createElement("li",{key:a.id.toString()},a.id," (",a.info.entry_time,")")))})),t=this.sortByEntryTime(t));var r=t.map((function(e){return e.id.toString()})).indexOf(this.state.me.toString()),c="please wait...";return c=r>0?i.a.createElement("div",{className:"please-wait",style:a},"PLEASE WAIT...",i.a.createElement("br",null),"\xa0\xa0\xa0\xa0",r," ahead of you in line"):i.a.createElement(f,{onClick:this.handleEnterRoomClick,altText:"Enter Stall",imgSrc:x.a,top:a.top,left:a.left,width:a.width}),console.log("In line:"),console.log("\t".concat(this.countOccupants(this.state.occupants))),i.a.createElement("div",{className:"view layer","data-depth":"0.1"},i.a.createElement("div",{id:"waiting",className:"content"},i.a.createElement("div",{className:"hotspots layer","data-depth":"0.1"},c)))}}]),n}(a.Component),j=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).handleNavigationClick=a.handleNavigationClick.bind(Object(u.a)(a)),a}return Object(l.a)(n,[{key:"handleNavigationClick",value:function(e){this.props.handleNavigationClick(e)}},{key:"render",value:function(){var e="stall-".concat(this.props.direction);return i.a.createElement("div",{id:e,className:"layer","data-depth":"0.2"},i.a.createElement("div",{className:"content"},this.props.children))}}]),n}(a.PureComponent),N=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).state={currentView:"bathroom"},a}return Object(l.a)(n,[{key:"render",value:function(){return i.a.createElement("div",{id:this.state.currentView,className:"view layer","data-depth":"0.2"},i.a.createElement("div",{className:"content"},null))}}]),n}(a.Component),S=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){return Object(s.a)(this,n),t.call(this,e)}return Object(l.a)(n,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){return i.a.createElement("div",{className:"hotspots layer","data-depth":"0.1"},this.props.children)}}]),n}(a.PureComponent),_=n(30),M=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).stallMap=e.stallMap,a.myHex=e.myHex,a.getColorStyle=a.getColorStyle.bind(Object(u.a)(a)),a}return Object(l.a)(n,[{key:"getColorStyle",value:function(e){return{color:e}}},{key:"render",value:function(){var e=this,t=this.props.chats.map((function(t){return i.a.createElement("div",null,i.a.createElement("div",{className:"row show-grid"},i.a.createElement("div",{className:"col-xs-12"},i.a.createElement("div",{className:"chatMessage"},i.a.createElement("div",{key:t.id,className:"box"},i.a.createElement("p",null,i.a.createElement("strong",{style:e.getColorStyle(t.userhex)},t.userhex===e.myHex?"you":t.userName)),i.a.createElement("p",null,t.message))))))}));return i.a.createElement("div",{id:"chatlist"},i.a.createElement("ul",null,t))}}]),n}(a.Component),T=n(25),I=n.n(T);b.a.config({path:".env"});var P=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).channel=e.channel,a.myId=e.channel.members.me.id,a.userName=e.userName,a.userHex=e.userHex,a.handleTextChange=a.handleTextChange.bind(Object(u.a)(a)),a.scrollToBottom=a.scrollToBottom.bind(Object(u.a)(a)),a.state={text:"",chats:[]},a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.channel.bind("message",(function(t){e.setState({chats:[].concat(Object(_.a)(e.state.chats),[t]),test:""})}))}},{key:"componentDidUpdate",value:function(){this.scrollToBottom()}},{key:"scrollToBottom",value:function(){this.messagesEnd.scrollIntoView({behavior:"smooth"})}},{key:"handleTextChange",value:function(e){if(13===e.keyCode){var t,n={channel_name:this.channel.name,userId:this.myId,userName:this.userName,userhex:this.userHex,message:this.state.text};t="https://virtual-bathroom.herokuapp.com/",I.a.post(t+"message",n),this.setState({text:""}),this.scrollToBottom()}else this.setState({text:e.target.value})}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{id:"chatbox",className:"component-box"},i.a.createElement("h2",null,"Chatbox"),i.a.createElement("div",{className:"chatlist-container"},i.a.createElement(M,{chats:this.state.chats,myHex:this.userHex}),i.a.createElement("div",{style:{float:"left",clear:"both"},ref:function(t){e.messagesEnd=t}})),i.a.createElement("input",{type:"text",value:this.state.text,placeholder:"chat here...",onChange:this.handleTextChange,onKeyDown:this.handleTextChange}))}}]),n}(a.Component),B=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){return Object(s.a)(this,n),t.call(this,e)}return Object(l.a)(n,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){return i.a.createElement("div",{id:"phone-layer",className:"bg-layer"})}}]),n}(a.Component),R=n(9),A=n.n(R),D=n(26),V=n.n(D),H=n(27),W=n.n(H),F=n(28),U=n.n(F),L=n(29),G=n.n(L),J=n(7),K=n.n(J),Y=(n(57),["someone","somebody","a stallmate","a person","another person","person in next stall","some person"]),$=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).pusher=e.pusher,a.id=e.id,a.presenceChannel=null,a.me=null,a.state={occupantsByStall:{},occupants:{count:0},userHex:"#ffffff",currentView:"stall-front",userName:"someone"},a.max_occupancy=e.max,a.updateOccupants=a.updateOccupants.bind(Object(u.a)(a)),a.countOccupants=a.countOccupants.bind(Object(u.a)(a)),a.handleNavigationClick=a.handleNavigationClick.bind(Object(u.a)(a)),a.restartParallax=a.restartParallax.bind(Object(u.a)(a)),a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.presenceChannel=this.pusher.subscribe("presence-room-".concat(this.id)),this.presenceChannel.bind("pusher:subscription_succeeded",(function(){e.me=e.presenceChannel.members.me.id,e.setState((function(t){return{userName:Y[parseInt(e.me)%Y.length],userHex:"#"+Math.floor(16777215*parseInt(e.presenceChannel.members.me.id)).toString(16).slice(-6)}}),console.log("my username: ".concat(e.state.userName))),e.updateOccupants(e.presenceChannel.members)})),this.presenceChannel.bind("pusher:member_added",(function(t){e.updateOccupants(e.presenceChannel.members)})),this.presenceChannel.bind("pusher:member_removed",(function(t){e.updateOccupants(e.presenceChannel.members),console.log("Stall.js: ".concat(t.id," left Stall ").concat(e.id))}))}},{key:"countOccupants",value:function(e){var t=0;return e.count>0&&e.each((function(e){e.info.isSpy||t++})),t}},{key:"restartParallax",value:function(){var e=document.getElementById("app");new A.a(e,{selector:".layer",pointerEvents:!0})}},{key:"updateOccupants",value:function(e){var t=this;this.setState({occupants:e},(function(){return t.props.onOccupancyChange(t.countOccupants(e),"room",t.id)}))}},{key:"handleNavigationClick",value:function(e){this.setState({currentView:e})}},{key:"render",value:function(){var e=this,t=i.a.createElement(j,{direction:"front",handleNavigationClick:this.handleNavigationClick},i.a.createElement(S,null,i.a.createElement(f,{onClick:function(){return e.handleNavigationClick("stall-up")},altText:"Stare At Ceiling",imgSrc:V.a,width:"20vw",top:"20vh",left:"50vw"}),i.a.createElement(f,{onClick:function(){return e.handleNavigationClick("stall-left")},altText:"Check Phone",imgSrc:U.a,width:"16vw",top:"60vh",left:"18vw"}),i.a.createElement(f,{onClick:function(){return e.handleNavigationClick("stall-down")},altText:"Cry",imgSrc:W.a,width:"11vw",top:"95vh",left:"51vw"}),i.a.createElement(f,{onClick:function(){return e.handleNavigationClick("stall-right")},altText:"Talk to Stranger",imgSrc:G.a,width:"23vw",top:"66vh",left:"85vw"}),i.a.createElement(f,{onClick:function(){return e.handleNavigationClick("stall-back")},altText:"Flush/Exit",imgSrc:K.a,width:"23vw",top:"77vh",left:"70vw"})));switch(this.state.currentView){case"stall-up":t=i.a.createElement(j,{direction:"up",handleNavigationClick:this.handleNavigationClick},i.a.createElement(S,null,i.a.createElement(f,{onClick:function(){return e.handleNavigationClick("stall-front")},altText:"Flush/Exit",imgSrc:K.a,width:"23vw",top:"77vh",left:"70vw"}))),this.restartParallax();break;case"stall-left":t=i.a.createElement(j,{direction:"left",handleNavigationClick:this.handleNavigationClick},i.a.createElement(B,null),i.a.createElement(S,null,i.a.createElement(f,{onClick:function(){return e.handleNavigationClick("stall-front")},altText:"Flush/Exit",imgSrc:K.a,width:"23vw",top:"77vh",left:"70vw"}))),this.restartParallax();break;case"stall-right":t=i.a.createElement(j,{direction:"right",handleNavigationClick:this.handleNavigationClick},i.a.createElement(S,null,i.a.createElement(f,{onClick:function(){return e.handleNavigationClick("stall-front")},altText:"Flush/Exit",imgSrc:K.a,width:"23vw",top:"77vh",left:"70vw"}),i.a.createElement(P,{userName:this.state.userName,userHex:this.state.userHex,occupantsByStall:this.state.occupantsByStall,channel:this.presenceChannel}))),this.restartParallax();break;case"stall-down":t=i.a.createElement(j,{direction:"down",handleNavigationClick:this.handleNavigationClick},i.a.createElement(S,null,i.a.createElement(f,{onClick:function(){return e.handleNavigationClick("stall-front")},altText:"Flush/Exit",imgSrc:K.a,width:"23vw",top:"77vh",left:"70vw"}))),this.restartParallax();break;case"stall-back":t=i.a.createElement(j,{direction:"back",handleNavigationClick:this.handleNavigationClick},i.a.createElement(S,null,i.a.createElement(f,{onClick:function(){return e.handleNavigationClick("mirrors")},altText:"Flush/Exit",imgSrc:K.a,width:"23vw",top:"41vh",left:"43vw"}))),this.restartParallax();break;case"mirrors":t=i.a.createElement(N,null),this.restartParallax();case"stall-front":default:this.restartParallax()}return i.a.createElement("div",{className:"view"},i.a.createElement("div",{className:"hide"},i.a.createElement("h2",null,"Room ",this.id,": ",this.countOccupants(this.state.occupants)," / ",this.max_occupancy)),t)}}]),n}(a.Component);n(58),n(59),n(60);b.a.config({path:".env"});var q=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).pusher=new d.a("93d5b6db6095187f5ef6",{cluster:"us2",encrypted:!0}),a.spy=new d.a("93d5b6db6095187f5ef6",{encrypted:!0,cluster:"us2",auth:{params:{isSpy:!0}}}),a.me=null,a.timeoutId=null,a.state={currentView:{type:"hallway",id:null},rooms:[],pusher_app_members:{count:0},inLine:0,message:""},a.max_occupancy=3,a.num_rooms=2,a.countMembers=a.countMembers.bind(Object(u.a)(a)),a.spyOn=a.spyOn.bind(Object(u.a)(a)),a.startInactivityCheck=a.startInactivityCheck.bind(Object(u.a)(a)),a.userActivityDetected=a.userActivityDetected.bind(Object(u.a)(a)),a.handleExitStall=a.handleExitStall.bind(Object(u.a)(a)),a.handleEnterWaiting=a.handleEnterWaiting.bind(Object(u.a)(a)),a.handleEnterRoom=a.handleEnterRoom.bind(Object(u.a)(a)),a.handleMouseMove=a.handleMouseMove.bind(Object(u.a)(a)),a.restartParallax=a.restartParallax.bind(Object(u.a)(a)),a.updateMemberCount=a.updateMemberCount.bind(Object(u.a)(a)),a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.restartParallax(),this.spyOn("presence-bathroom","waiting");for(var t=0;t<this.num_rooms;t++)this.spyOn("presence-room-".concat(t),"room");this.presenceChannel=this.pusher.subscribe("presence-app"),this.presenceChannel.bind("pusher:subscription_succeeded",(function(){e.me=e.presenceChannel.members.me.id,e.updateAppMembers(e.presenceChannel.members)})),this.presenceChannel.bind("pusher:member_added",(function(){e.updateAppMembers(e.presenceChannel.members)})),this.presenceChannel.bind("pusher:member_removed",(function(t){e.updateAppMembers(e.presenceChannel.members)}))}},{key:"componentWillUnmount",value:function(){this.pusher.unsubscribe("presence-app")}},{key:"countMembers",value:function(e){var t=0;return e.members.each((function(e){e.info.isSpy||(console.log("user: "+e.id),t++)})),t}},{key:"restartParallax",value:function(){var e=document.getElementById("app");new A.a(e,{selector:".layer",pointerEvents:!0})}},{key:"updateMemberCount",value:function(e,t,n){if("room"===t){var a=Array.from(this.state.rooms);a[n]={id:n,occupants:e},this.setState((function(e){return{rooms:a}}))}else"waiting"===t&&this.setState((function(t){return{inLine:e}}))}},{key:"updateAppMembers",value:function(e){this.setState({pusher_app_members:e})}},{key:"spyOn",value:function(e,t){var n=this,a=this.spy.subscribe(e),i=null;"room"===t&&(i=e.split("-").pop()),a.bind("pusher:subscription_succeeded",(function(){n.updateMemberCount(n.countMembers(a),t,i)})),a.bind("pusher:member_added",(function(){n.updateMemberCount(n.countMembers(a),t,i)})),a.bind("pusher:member_removed",(function(){n.updateMemberCount(n.countMembers(a),t,i)}))}},{key:"startInactivityCheck",value:function(){var e=this;this.timeoutId=window.setTimeout((function(){e.pusher.disconnect()}),6e5)}},{key:"userActivityDetected",value:function(){null!==this.timeoutId&&window.clearTimeout(this.timeoutId),"disconnected"===this.pusher.connection.state&&(alert("You've been ushered out of the bathroom for taking so long! Please line up again to re-enter the bathroom."),window.location.reload()),this.startInactivityCheck()}},{key:"handleExitStall",value:function(e){var t=this;this.setState((function(e){return{currentView:{type:"mirrors",id:null}}}),(function(){t.restartParallax()}))}},{key:"handleEnterWaiting",value:function(e){var t=this;this.setState((function(e){return{currentView:{type:"waiting",id:null}}}),(function(){t.restartParallax()}))}},{key:"handleEnterRoom",value:function(e){var t=this,n=!1;this.pusher.unsubscribe("presence-bathroom");for(var a=function(){r=Object(o.a)({},t.state.rooms[i]);var e=i;r.occupants<t.max_occupancy?(t.updateMemberCount(r.occupants+1,"room",i),t.setState((function(t){return{currentView:{type:"room",id:e}}}),(function(){t.restartParallax()})),n=!0):console.log("Room ".concat(i," full"))},i=0;!n&&i<this.state.rooms.length;i++){var r;a()}n||alert("no vacant rooms available!")}},{key:"handleMouseMove",value:function(){this.userActivityDetected()}},{key:"render",value:function(){var e=this,t="hide";console.log("running in ".concat("production"," mode"));var n=this.state.rooms.map((function(t){return i.a.createElement("li",{key:t.id.toString()},i.a.createElement("strong",null,"Room ",t.id,":")," ",t.occupants,"/",e.max_occupancy)})),a=i.a.createElement(C,{onEnterBathroom:this.handleEnterWaiting});return"bathroom"===this.state.currentView.type?a=i.a.createElement(N,{onEnterWaiting:this.handleEnterWaiting}):"waiting"===this.state.currentView.type&&(a=i.a.createElement(w,{onEnterRoom:this.handleEnterRoom,pusher:this.pusher,onOccupancyChange:this.updateMemberCount})),"room"===this.state.currentView.type&&(a=i.a.createElement($,{id:this.state.currentView.id,pusher:this.pusher,max:this.max_occupancy,onOccupancyChange:this.updateMemberCount})),i.a.createElement("div",{id:"app",onMouseMove:this.handleMouseMove},i.a.createElement("div",{id:"debug-console",className:t},i.a.createElement("div",null,"THE APP IS RUNNING IN ",i.a.createElement("strong",null,"production")," MODE",i.a.createElement("br",null),"this box is for development purposes only"),i.a.createElement("div",null,i.a.createElement("div",null,"Number of Rooms: ",this.num_rooms),i.a.createElement("div",null,i.a.createElement("strong",null,"Current Users:")," ",this.state.pusher_app_members.count),i.a.createElement("div",null,i.a.createElement("strong",null,"In line:")," ",this.state.inLine)),i.a.createElement("div",null,i.a.createElement("strong",null,"Rooms:"),n)),a)}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},7:function(e,t,n){e.exports=n.p+"static/media/5_flush.88b88b51.png"}},[[32,1,2]]]);
//# sourceMappingURL=main.a4082dcf.chunk.js.map