(this["webpackJsonpreact-bathroom"]=this["webpackJsonpreact-bathroom"]||[]).push([[0],{21:function(e,t,n){e.exports=n(46)},26:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),c=n(17),i=n.n(c),r=(n(26),n(20)),o=n(2),u=n(3),s=n(1),h=n(5),m=n(4),d=n(7),b=n.n(d),p=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){var e=this.props.onClick;return l.a.createElement("button",{onClick:e},this.props.buttonText)}}]),n}(a.PureComponent),v=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).handleEnterBathroomClick=a.handleEnterBathroomClick.bind(Object(s.a)(a)),a}return Object(u.a)(n,[{key:"handleEnterBathroomClick",value:function(e){this.props.onEnterBathroom(e)}},{key:"render",value:function(){return l.a.createElement("div",{id:"hallway",className:"view"},l.a.createElement("h2",null,"Hallway"),l.a.createElement("div",{className:"hotspots"},l.a.createElement(p,{onClick:this.handleEnterBathroomClick,buttonText:"Enter Bathroom"})))}}]),n}(a.PureComponent),k=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).pusher=e.pusher,a.state={me:0,occupants:{count:0}},a.countOccupants=a.countOccupants.bind(Object(s.a)(a)),a.handleEnterStallClick=a.handleEnterStallClick.bind(Object(s.a)(a)),a}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.presenceChannel=this.pusher.subscribe("presence-bathroom"),this.presenceChannel.bind("pusher:subscription_succeeded",(function(){e.setState({me:e.presenceChannel.members.me.id}),e.updateOccupants(e.presenceChannel.members)})),this.presenceChannel.bind("pusher:member_added",(function(){e.updateOccupants(e.presenceChannel.members)})),this.presenceChannel.bind("pusher:member_removed",(function(){e.updateOccupants(e.presenceChannel.members),console.log("WaitingRoom.js: someone left Stall ".concat(e.id))}))}},{key:"countOccupants",value:function(e){var t=0;return e.count>0&&e.each((function(e){e.info.isSpy||t++})),t}},{key:"updateOccupants",value:function(e){var t=this;console.log("WaitingRoom.js updateOccupants: numOccupants ".concat(e.count)),this.setState({occupants:e},(function(){return t.props.onOccupancyChange(t.countOccupants(e),"waiting")}))}},{key:"handleEnterStallClick",value:function(e){this.props.onEnterStall(e)}},{key:"render",value:function(){var e=[],t=[];this.state.occupants.count>0&&this.state.occupants.each((function(n){n.info.isSpy||(e.push(n.id),t.push(l.a.createElement("li",{key:n.id.toString()},n.id)))}));var n=e.length-e.indexOf(this.state.me.toString())-1,a="please wait...";return a=n>0?"".concat(n," ahead of you in line"):l.a.createElement(p,{onClick:this.handleEnterStallClick,buttonText:"Enter Stall"}),l.a.createElement("div",{id:"waiting",className:"view"},l.a.createElement("h2",null,"Waiting Room"),"In line: ",this.countOccupants(this.state.occupants),l.a.createElement("br",null),l.a.createElement("ul",null,t),a)}}]),n}(a.Component),C=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).handleNavigationClick=a.handleNavigationClick.bind(Object(s.a)(a)),a}return Object(u.a)(n,[{key:"handleNavigationClick",value:function(e){this.props.handleNavigationClick(e)}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{id:"stall-front",className:"view"},l.a.createElement("h2",null,"Stall: Front"),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-up")},buttonText:"Up"}),l.a.createElement("br",null),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-left")},buttonText:"Left"}),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-right")},buttonText:"Right"}),l.a.createElement("br",null),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-down")},buttonText:"Down"}),l.a.createElement("br",null),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-back")},buttonText:"Back"}),l.a.createElement("br",null))}}]),n}(a.PureComponent),f=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).handleNavigationClick=a.handleNavigationClick.bind(Object(s.a)(a)),a}return Object(u.a)(n,[{key:"handleNavigationClick",value:function(e){this.props.handleNavigationClick(e)}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{id:"stall-up",className:"view"},l.a.createElement("h2",null,"Stall: Up"),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-front")},buttonText:"Front"}),l.a.createElement("br",null),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-up")},buttonText:"Up"}),l.a.createElement("br",null),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-left")},buttonText:"Left"}),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-right")},buttonText:"Right"}),l.a.createElement("br",null),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-down")},buttonText:"Down"}),l.a.createElement("br",null),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-back")},buttonText:"Back"}),l.a.createElement("br",null))}}]),n}(a.PureComponent),E=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).handleNavigationClick=a.handleNavigationClick.bind(Object(s.a)(a)),a}return Object(u.a)(n,[{key:"handleNavigationClick",value:function(e){this.props.handleNavigationClick(e)}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{id:"stall-left",className:"view"},l.a.createElement("h2",null,"Stall: Left"),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-front")},buttonText:"Front"}),l.a.createElement("br",null),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-up")},buttonText:"Up"}),l.a.createElement("br",null),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-left")},buttonText:"Left"}),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-right")},buttonText:"Right"}),l.a.createElement("br",null),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-down")},buttonText:"Down"}),l.a.createElement("br",null),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-back")},buttonText:"Back"}),l.a.createElement("br",null))}}]),n}(a.PureComponent),g=n(19),O=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).getColorStyle=a.getColorStyle.bind(Object(s.a)(a)),a}return Object(u.a)(n,[{key:"getColorStyle",value:function(e){return{color:e}}},{key:"render",value:function(){var e=this,t=this.props.chats.map((function(t){return l.a.createElement("div",null,l.a.createElement("div",{className:"row show-grid"},l.a.createElement("div",{className:"col-xs-12"},l.a.createElement("div",{className:"chatMessage"},l.a.createElement("div",{key:t.id,className:"box"},l.a.createElement("p",null,l.a.createElement("strong",{style:e.getColorStyle(t.userhex)},"someone")),l.a.createElement("p",null,t.message))))))}));return l.a.createElement("div",{id:"chatlist"},l.a.createElement("ul",null,t))}}]),n}(a.Component),N=n(18),y=n.n(N),x=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).channel=e.channel,a.userHex=e.userHex,a.handleTextChange=a.handleTextChange.bind(Object(s.a)(a)),a.state={text:"",chats:[]},a}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.channel.bind("message",(function(t){e.setState({chats:[].concat(Object(g.a)(e.state.chats),[t]),test:""})}))}},{key:"handleTextChange",value:function(e){if(13===e.keyCode){var t={channel_name:this.channel.name,userhex:this.userHex,message:this.state.text};y.a.post("http://localhost:5000/message",t),this.setState({text:""})}else this.setState({text:e.target.value})}},{key:"render",value:function(){return l.a.createElement("div",{id:"chatbox",className:"component-box"},l.a.createElement("h2",null,"Chatbox"),l.a.createElement(O,{chats:this.state.chats}),l.a.createElement("input",{type:"text",value:this.state.text,placeholder:"chat here...",onChange:this.handleTextChange,onKeyDown:this.handleTextChange}))}}]),n}(a.Component),j=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).channel=e.channel,a.userHex=e.userHex,a.handleNavigationClick=a.handleNavigationClick.bind(Object(s.a)(a)),a}return Object(u.a)(n,[{key:"handleNavigationClick",value:function(e){this.props.handleNavigationClick(e)}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{id:"stall-right",className:"view"},l.a.createElement("h2",null,"Stall: Right"),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-front")},buttonText:"Front"}),l.a.createElement("br",null),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-up")},buttonText:"Up"}),l.a.createElement("br",null),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-left")},buttonText:"Left"}),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-right")},buttonText:"Right"}),l.a.createElement("br",null),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-down")},buttonText:"Down"}),l.a.createElement("br",null),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-back")},buttonText:"Back"}),l.a.createElement("br",null),l.a.createElement(x,{userHex:this.userHex,channel:this.channel}))}}]),n}(a.PureComponent),w=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).handleNavigationClick=a.handleNavigationClick.bind(Object(s.a)(a)),a}return Object(u.a)(n,[{key:"handleNavigationClick",value:function(e){this.props.handleNavigationClick(e)}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{id:"stall-down",className:"view"},l.a.createElement("h2",null,"Stall: Down"),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-front")},buttonText:"Front"}),l.a.createElement("br",null),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-up")},buttonText:"Up"}),l.a.createElement("br",null),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-left")},buttonText:"Left"}),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-right")},buttonText:"Right"}),l.a.createElement("br",null),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-down")},buttonText:"Down"}),l.a.createElement("br",null),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-back")},buttonText:"Back"}),l.a.createElement("br",null))}}]),n}(a.PureComponent),S=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).handleNavigationClick=a.handleNavigationClick.bind(Object(s.a)(a)),a}return Object(u.a)(n,[{key:"handleNavigationClick",value:function(e){this.props.handleNavigationClick(e)}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{id:"stall-front",className:"view"},l.a.createElement("h2",null,"Stall: Back"),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-front")},buttonText:"Front"}),l.a.createElement("br",null),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-up")},buttonText:"Up"}),l.a.createElement("br",null),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-left")},buttonText:"Left"}),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-right")},buttonText:"Right"}),l.a.createElement("br",null),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-down")},buttonText:"Down"}),l.a.createElement("br",null),l.a.createElement(p,{onClick:function(){return e.handleNavigationClick("stall-back")},buttonText:"Back"}),l.a.createElement("br",null))}}]),n}(a.PureComponent),T=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).pusher=e.pusher,a.id=e.id,a.presenceChannel=null,a.me=null,a.state={occupants:{count:0},userHex:"#ffffff",currentView:"stall-front"},a.max_occupancy=e.max,a.updateOccupants=a.updateOccupants.bind(Object(s.a)(a)),a.countOccupants=a.countOccupants.bind(Object(s.a)(a)),a.handleNavigationClick=a.handleNavigationClick.bind(Object(s.a)(a)),a}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.presenceChannel=this.pusher.subscribe("presence-stall-".concat(this.id)),this.presenceChannel.bind("pusher:subscription_succeeded",(function(){e.me=e.presenceChannel.members.me.id,e.setState((function(t){return{userHex:"#"+Math.floor(16777215*parseInt(e.presenceChannel.members.me.id)).toString(16).slice(-6)}})),e.updateOccupants(e.presenceChannel.members)})),this.presenceChannel.bind("pusher:member_added",(function(){e.updateOccupants(e.presenceChannel.members)})),this.presenceChannel.bind("pusher:member_removed",(function(){e.updateOccupants(e.presenceChannel.members),console.log("Stall.js: someone left Stall ".concat(e.id))}))}},{key:"countOccupants",value:function(e){var t=0;return e.count>0&&e.each((function(e){e.info.isSpy||t++})),t}},{key:"updateOccupants",value:function(e){var t=this;this.setState({occupants:e},(function(){return t.props.onOccupancyChange(t.countOccupants(e),"stall",t.id)}))}},{key:"handleNavigationClick",value:function(e){this.setState({currentView:e})}},{key:"render",value:function(){this.state.userHex;var e=l.a.createElement(C,{handleNavigationClick:this.handleNavigationClick});switch(this.state.currentView){case"stall-up":e=l.a.createElement(f,{handleNavigationClick:this.handleNavigationClick});break;case"stall-left":e=l.a.createElement(E,{handleNavigationClick:this.handleNavigationClick});break;case"stall-right":e=l.a.createElement(j,{channel:this.presenceChannel,userHex:this.state.userHex,handleNavigationClick:this.handleNavigationClick});break;case"stall-down":e=l.a.createElement(w,{handleNavigationClick:this.handleNavigationClick});break;case"stall-back":e=l.a.createElement(S,{handleNavigationClick:this.handleNavigationClick});break;case"stall-front":default:e=l.a.createElement(C,{handleNavigationClick:this.handleNavigationClick})}return l.a.createElement("div",{id:"stall"},l.a.createElement("h2",null,"Stall ",this.id,": ",this.countOccupants(this.state.occupants)," / ",this.max_occupancy),e)}}]),n}(a.Component),_=(n(44),n(45),function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).pusher=new b.a("93d5b6db6095187f5ef6",{cluster:"us2",encrypted:!0}),a.spy=new b.a("93d5b6db6095187f5ef6",{encrypted:!0,cluster:"us2",auth:{params:{isSpy:!0}}}),a.me=null,a.state={currentView:{type:"hallway",id:null},stalls:[],pusher_app_members:{count:0},inLine:0,message:""},a.max_occupancy=2,a.num_stalls=2,a.countMembers=a.countMembers.bind(Object(s.a)(a)),a.spyOn=a.spyOn.bind(Object(s.a)(a)),a.handleEnterBathroom=a.handleEnterBathroom.bind(Object(s.a)(a)),a.handleEnterStall=a.handleEnterStall.bind(Object(s.a)(a)),a.updateMemberCount=a.updateMemberCount.bind(Object(s.a)(a)),a}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.spyOn("presence-bathroom","waiting");for(var t=0;t<this.num_stalls;t++)this.spyOn("presence-stall-".concat(t),"stall");this.presenceChannel=this.pusher.subscribe("presence-app"),this.presenceChannel.bind("pusher:subscription_succeeded",(function(){e.me=e.presenceChannel.members.me.id,e.updateAppMembers(e.presenceChannel.members)})),this.presenceChannel.bind("pusher:member_added",(function(){e.updateAppMembers(e.presenceChannel.members),console.log("currentViewType: ".concat(e.state.currentViewType))})),this.presenceChannel.bind("pusher:member_removed",(function(t){e.updateAppMembers(e.presenceChannel.members),console.log("".concat(t.id," left Bathroom App"))}))}},{key:"componentWillUnmount",value:function(){this.pusher.unsubscribe("presence-app")}},{key:"countMembers",value:function(e){var t=0;return e.members.each((function(e){e.info.isSpy||(console.log("user: "+e.id),t++)})),t}},{key:"updateMemberCount",value:function(e,t,n){if("stall"===t){var a=Array.from(this.state.stalls);a[n]={id:n,occupants:e},this.setState((function(e){return{stalls:a}}))}else"waiting"===t&&this.setState((function(t){return{inLine:e}}))}},{key:"updateAppMembers",value:function(e){this.setState({pusher_app_members:e})}},{key:"spyOn",value:function(e,t){var n=this,a=this.spy.subscribe(e),l=null;"stall"===t&&(l=e.split("-").pop()),a.bind("pusher:subscription_succeeded",(function(){console.log("spying on ".concat(e)),n.updateMemberCount(n.countMembers(a),t,l)})),a.bind("pusher:member_added",(function(){n.updateMemberCount(n.countMembers(a),t,l)})),a.bind("pusher:member_removed",(function(){console.log("someone left ".concat(e)),n.updateMemberCount(n.countMembers(a),t,l)}))}},{key:"handleEnterBathroom",value:function(e){this.setState((function(e){return{currentView:{type:"waiting",id:null}}}))}},{key:"handleEnterStall",value:function(e){var t=this,n=!1;this.pusher.unsubscribe("presence-bathroom");for(var a=function(){c=Object(r.a)({},t.state.stalls[l]);var e=l;c.occupants<t.max_occupancy?(t.updateMemberCount(c.occupants+1,"stall",l),t.setState((function(t){return{currentView:{type:"stall",id:e}}})),n=!0):console.log("Stall ".concat(l," full"))},l=0;!n&&l<this.state.stalls.length;l++){var c;a()}n||alert("no vacant stalls available!")}},{key:"render",value:function(){var e=this,t=this.state.stalls.map((function(t){return l.a.createElement("li",{key:t.id.toString()},"Stall ",t.id,": ",t.occupants,"/",e.max_occupancy)})),n=l.a.createElement(v,{onEnterBathroom:this.handleEnterBathroom});return"waiting"===this.state.currentView.type&&(n=l.a.createElement(k,{onEnterStall:this.handleEnterStall,pusher:this.pusher,onOccupancyChange:this.updateMemberCount})),"stall"===this.state.currentView.type&&(n=l.a.createElement(T,{id:this.state.currentView.id,pusher:this.pusher,max:this.max_occupancy,onOccupancyChange:this.updateMemberCount})),l.a.createElement("div",{id:"app"},l.a.createElement("div",{id:"debug-console",className:"hide"},"Number of Stalls: ",this.num_stalls,l.a.createElement("br",null),l.a.createElement("h3",null,"Current Users: ",this.state.pusher_app_members.count),l.a.createElement("p",null,l.a.createElement("strong",null,"In line:")," ",this.state.inLine),l.a.createElement("h3",null,"Stalls"),t,l.a.createElement("br",null)),n)}}]),n}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(_,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[21,1,2]]]);
//# sourceMappingURL=main.19ec3cea.chunk.js.map