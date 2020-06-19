(this["webpackJsonpchess-react"]=this["webpackJsonpchess-react"]||[]).push([[0],{121:function(e,t){},124:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(58),c=a.n(l),o=a(1);function s(e){var t=e.changeForm;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"col"},r.a.createElement("button",{className:"btn btn-primary btn-block btn-lg mt-1",type:"submit"},"Login",r.a.createElement("svg",{className:"bi bi-box-arrow-in-right ml-2",width:"1em",height:"1em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{fillRule:"evenodd",d:"M8.146 11.354a.5.5 0 010-.708L10.793 8 8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0z",clipRule:"evenodd"}),r.a.createElement("path",{fillRule:"evenodd",d:"M1 8a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9A.5.5 0 011 8z",clipRule:"evenodd"}),r.a.createElement("path",{fillRule:"evenodd",d:"M13.5 14.5A1.5 1.5 0 0015 13V3a1.5 1.5 0 00-1.5-1.5h-8A1.5 1.5 0 004 3v1.5a.5.5 0 001 0V3a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v10a.5.5 0 01-.5.5h-8A.5.5 0 015 13v-1.5a.5.5 0 00-1 0V13a1.5 1.5 0 001.5 1.5h8z",clipRule:"evenodd"})))),r.a.createElement("div",{className:"col"},r.a.createElement("button",{className:"btn btn-secondary btn-block btn-lg mt-1",type:"button",onClick:t},"Register")))}function u(e){var t=e.changeForm;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"col"},r.a.createElement("button",{className:"btn btn-secondary btn-block btn-lg mt-1",type:"button",onClick:t},"Login")),r.a.createElement("div",{className:"col"},r.a.createElement("button",{className:"btn btn-primary btn-block btn-lg mt-1",type:"submit"},"Register\xa0",r.a.createElement("svg",{className:"bi bi-archive ml-2",width:"1em",height:"1em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{fillRule:"evenodd",d:"M2 5v7.5c0 .864.642 1.5 1.357 1.5h9.286c.715 0 1.357-.636 1.357-1.5V5h1v7.5c0 1.345-1.021 2.5-2.357 2.5H3.357C2.021 15 1 13.845 1 12.5V5h1z",clipRule:"evenodd"}),r.a.createElement("path",{fillRule:"evenodd",d:"M5.5 7.5A.5.5 0 016 7h4a.5.5 0 010 1H6a.5.5 0 01-.5-.5zM15 2H1v2h14V2zM1 1a1 1 0 00-1 1v2a1 1 0 001 1h14a1 1 0 001-1V2a1 1 0 00-1-1H1z",clipRule:"evenodd"})))))}function i(e){var t=e.changeForm,a=e.form;return r.a.createElement("div",{className:"row mt-5"},"login"===a?r.a.createElement(s,{changeForm:t}):r.a.createElement(u,{changeForm:t}))}function m(e){var t=e.response;return r.a.createElement(r.a.Fragment,null,null!==t.status&&r.a.createElement("div",{className:"alert alert-"+(t.status>201?"danger":"success"),role:"alert"},t.message))}function d(e){var t=e.id,a=e.type,n=e.name,l=void 0===n?null:n,c=e.label,o=void 0===c?null:c,s=e.placeholder,u=void 0===s?null:s,i=e.innerRef,m=void 0===i?null:i;return r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:t},o),r.a.createElement("input",{id:t,name:l,className:"form-control",ref:m,type:a,placeholder:u,required:!0}))}function h(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(d,{id:"log-user",type:"text",name:"username",label:"Username",placeholder:"Enter Username"}),r.a.createElement(d,{id:"log-pass",type:"password",name:"password",label:"Password",placeholder:"Enter Password"}))}var g=a(12),p=a.n(g);function f(e){var t=e.passRef,a=e.validPassRef,l=Object(n.useState)(),c=Object(o.a)(l,2),s=c[0],u=c[1],i=Object(n.useRef)();return r.a.createElement(r.a.Fragment,null,r.a.createElement(d,{id:"reg-email",type:"email",name:"email",label:"Email",placeholder:"Enter Username"}),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"reg-user"},"Username"),r.a.createElement("input",{ref:i,id:"reg-user",name:"username",className:"form-control "+s,type:"text",placeholder:"Enter Username",onChange:function(){p.a.get("/auth/users/"+i.current.value).then((function(e){return u("border border-danger")})).catch((function(e){return u("border border-success")}))},required:!0})),r.a.createElement(d,{id:"reg-pass-1",innerRef:t,name:"password",type:"password",label:"Password",placeholder:"Enter Password"}),r.a.createElement(d,{id:"reg-pass-2",innerRef:a,type:"password",label:"Repeat Password",placeholder:"Enter Password Again"}))}var b="auth_token_key";function v(e,t,a,n){p.a.post(e,t).then((function(e){a({status:e.status,message:e.data.message}),localStorage.setItem(b,e.data.token),n(!0)})).catch((function(e){a({status:e.response.status,message:e.response.data.message})}))}function E(){var e=Object(n.useRef)(),t=Object(n.useRef)(),a=Object(n.useState)("login"),l=Object(o.a)(a,2),c=l[0],s=l[1],u=Object(n.useState)({status:null,message:null}),d=Object(o.a)(u,2),g=d[0],p=d[1],b=Object(n.useContext)(Y);return r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("div",{className:"card  col col-md-8 col-lg-5 bg-light mx-3"},r.a.createElement("div",{className:"card-body"},r.a.createElement("h4",{className:"card-title"},"login"===c?"Sign In":"Sign Up"),r.a.createElement("form",{onSubmit:"login"===c?function(e){!function(e,t,a){e.preventDefault(),v("/auth/login",{username:e.target.username.value,password:e.target.password.value},t,a)}(e,p,b.setAuth)}:function(a){!function(e,t,a,n,r){e.preventDefault(),n.current.value===r.current.value?v("/auth/register",{username:e.target.username.value,password:e.target.password.value,email:e.target.email.value},t,a):t({status:"412",message:"Passwords must be equal"})}(a,p,b.setAuth,e,t)}},"login"===c?r.a.createElement(h,null):r.a.createElement(f,{passRef:e,validPassRef:t}),r.a.createElement(m,{response:g}),r.a.createElement(i,{changeForm:function(){s("login"===c?"registration":"login")},form:c})))))}function w(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"text-white text-center m-5"},r.a.createElement("h1",null,"chess.unimore \u265b")),r.a.createElement(E,null))}var S=a(7),O=a(8);function N(e,t){localStorage.removeItem(t),e.setAuth(!1)}function j(e,t){return e.headers=e.headers||{},e.headers.Authorization="Bearer "+localStorage.getItem(b),p()(e).catch((function(e){throw void 0!==e.response&&401===e.response.status&&N(t,b),e}))}function y(e){var t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),a=decodeURIComponent(atob(t).split("").map((function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)})).join(""));return JSON.parse(a)}function R(e){var t=e.refresh,a=e.setRefresh,l=Object(n.useContext)(Y),c=localStorage.getItem(b),s=Object(n.useState)({}),u=Object(o.a)(s,2),i=u[0],m=u[1];return Object(n.useEffect)((function(){var e=!0;try{var t=y(c)}catch(n){return void N(l,b)}return j({method:"get",url:"/game/user/"+t.username},l).then((function(t){return e?m(t.data):null})).catch((function(e){return console.log(e)})),a(!1),function(){return e=!1}}),[c,l,t]),r.a.createElement("div",{className:"container d-flex flex-wrap mt-3"},r.a.createElement("h2",{className:"mr-2"},r.a.createElement("span",{className:"badge badge-warning text-wrap"},i.username)),r.a.createElement("h2",null,r.a.createElement("span",{className:"badge badge-info text-wrap"},i.elo)),r.a.createElement("div",{className:"ml-auto"},r.a.createElement(S.b,{to:"/"},r.a.createElement("button",{className:"btn btn-danger btn-lg",onClick:function(){return N(l,b)}},"Logout",r.a.createElement("svg",{className:"bi bi-box-arrow-right ml-2",width:"1.5em",height:"1.5em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{fillRule:"evenodd",d:"M11.646 11.354a.5.5 0 010-.708L14.293 8l-2.647-2.646a.5.5 0 01.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0z",clipRule:"evenodd"}),r.a.createElement("path",{fillRule:"evenodd",d:"M4.5 8a.5.5 0 01.5-.5h9a.5.5 0 010 1H5a.5.5 0 01-.5-.5z",clipRule:"evenodd"}),r.a.createElement("path",{fillRule:"evenodd",d:"M2 13.5A1.5 1.5 0 01.5 12V4A1.5 1.5 0 012 2.5h7A1.5 1.5 0 0110.5 4v1.5a.5.5 0 01-1 0V4a.5.5 0 00-.5-.5H2a.5.5 0 00-.5.5v8a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-1.5a.5.5 0 011 0V12A1.5 1.5 0 019 13.5H2z",clipRule:"evenodd"}))))))}function k(e){var t=e.game,a=e.name,n=e.setRefresh;return r.a.createElement("div",{className:"d-flex flex-wrap alert alert-warning mx-3 align-items-center",role:"alert"},r.a.createElement("svg",{className:"bi bi-controller mx-3",width:"2em",height:"2em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{fillRule:"evenodd",d:"M11.119 2.693c.904.19 1.75.495 2.235.98.407.408.779 1.05 1.094 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.815-.059 1.602-.328 2.21a1.42 1.42 0 01-1.445.83c-.636-.067-1.115-.394-1.513-.773a11.307 11.307 0 01-.739-.809c-.126-.147-.25-.291-.368-.422-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.422-.243.283-.494.576-.739.81-.398.378-.877.705-1.513.772a1.42 1.42 0 01-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772.486-.485 1.331-.79 2.235-.98.932-.196 2.03-.292 3.119-.292 1.089 0 2.187.096 3.119.292zm-6.032.979c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 00-.748 2.295 12.351 12.351 0 00-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 00.426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.505C4.861 9.97 5.978 9.026 8 9.026s3.139.943 3.965 1.855c.164.182.307.35.44.505.214.25.403.472.615.674.318.303.601.468.929.503a.42.42 0 00.426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 00-.339-2.406 13.753 13.753 0 00-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z",clipRule:"evenodd"}),r.a.createElement("path",{d:"M11.5 6.026a.5.5 0 11-1 0 .5.5 0 011 0zm-1 1a.5.5 0 11-1 0 .5.5 0 011 0zm2 0a.5.5 0 11-1 0 .5.5 0 011 0zm-1 1a.5.5 0 11-1 0 .5.5 0 011 0zm-7-2.5h1v3h-1v-3z"}),r.a.createElement("path",{d:"M3.5 6.526h3v1h-3v-1zM3.051 3.26a.5.5 0 01.354-.613l1.932-.518a.5.5 0 01.258.966l-1.932.518a.5.5 0 01-.612-.354zm9.976 0a.5.5 0 00-.353-.613l-1.932-.518a.5.5 0 10-.259.966l1.932.518a.5.5 0 00.612-.354z"})),r.a.createElement("span",{className:"ml-3"},"Game : ",a),r.a.createElement(S.b,{className:"ml-auto",to:"/room/"+t},r.a.createElement("button",{className:"btn btn-success btn-md",type:"button"},r.a.createElement("svg",{className:"bi bi-caret-right-fill",width:"1em",height:"1em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{d:"M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 011.659-.753l5.48 4.796a1 1 0 010 1.506z"})))),r.a.createElement("button",{className:"btn btn-danger btn-md ml-3",type:"button",onClick:function(){return j({method:"delete",url:"/game/surrend/"+t},Y).catch((function(){return console.log("Failed to surrend")})),void n(!0)}},r.a.createElement("svg",{className:"bi bi-flag-fill",width:"1em",height:"1em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{fillRule:"evenodd",d:"M3.5 1a.5.5 0 01.5.5v13a.5.5 0 01-1 0v-13a.5.5 0 01.5-.5z",clipRule:"evenodd"}),r.a.createElement("path",{fillRule:"evenodd",d:"M3.762 2.558C4.735 1.909 5.348 1.5 6.5 1.5c.653 0 1.139.325 1.495.562l.032.022c.391.26.646.416.973.416.168 0 .356-.042.587-.126a8.89 8.89 0 00.593-.25c.058-.027.117-.053.18-.08.57-.255 1.278-.544 2.14-.544a.5.5 0 01.5.5v6a.5.5 0 01-.5.5c-.638 0-1.18.21-1.734.457l-.159.07c-.22.1-.453.205-.678.287A2.719 2.719 0 019 9.5c-.653 0-1.139-.325-1.495-.562l-.032-.022c-.391-.26-.646-.416-.973-.416-.833 0-1.218.246-2.223.916A.5.5 0 013.5 9V3a.5.5 0 01.223-.416l.04-.026z",clipRule:"evenodd"}))))}function q(e){var t=e.games,a=e.setGames,l=Object(n.useContext)(Y),c=Object(n.useState)(!1),s=Object(o.a)(c,2),u=s[0],i=s[1];return Object(n.useEffect)((function(){var e=!0;return j({method:"get",url:"/game/games"},l).then((function(t){return e?a(t.data.games):null})).catch((function(e){return console.log(e.response)})),function(){return e=!1}}),[l,a]),Object(n.useEffect)((function(){var e=!0;return u?(j({method:"get",url:"/game/games"},l).then((function(t){e&&(i(!1),a(t.data.games))})).catch((function(e){return console.log(e.response)})),function(){return e=!1}):function(){return e=!1}}),[u,l,a]),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"d-flex flex-wrap m-3"},r.a.createElement("h3",null,"Games List"),r.a.createElement("button",{className:"btn btn-info ml-auto",type:"button",onClick:function(){return i(!0)}},r.a.createElement("svg",{className:"bi bi-arrow-clockwise",width:"1.5em",height:"1.5em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{fillRule:"evenodd",d:"M3.17 6.706a5 5 0 017.103-3.16.5.5 0 10.454-.892A6 6 0 1013.455 5.5a.5.5 0 00-.91.417 5 5 0 11-9.375.789z",clipRule:"evenodd"}),r.a.createElement("path",{fillRule:"evenodd",d:"M8.147.146a.5.5 0 01.707 0l2.5 2.5a.5.5 0 010 .708l-2.5 2.5a.5.5 0 11-.707-.708L10.293 3 8.147.854a.5.5 0 010-.708z",clipRule:"evenodd"})))),t.map((function(e){return r.a.createElement(k,{key:e.game_uuid,game:e.game_uuid,name:e.name,setRefresh:i})})))}var x=a(21);function C(e){var t=e.games,a=e.setGames,l=Object(n.useContext)(Y),c=Object(n.useState)({}),s=Object(o.a)(c,2),u=s[0],i=s[1],m=Object(n.useState)("idle"),d=Object(o.a)(m,2),h=d[0],g=d[1];return Object(n.useEffect)((function(){var e=!0;return"idle"===h||"stop"===h||j({method:"get",url:"/game/matchmaking/start"},l).then((function(n){e&&(g("idle"),i({status:"success",message:"Game found : "+n.data.name}),a([].concat(Object(x.a)(t),[{game_uuid:n.data.game_uuid,name:n.data.name}])))})).catch((function(t){e&&(g("idle"),i({status:"failed",message:"Failed to search game"}))})),function(){return e=!1}}),[h,l,t,a]),Object(n.useEffect)((function(){var e=!0;return"idle"===h||"start"===h||j({method:"get",url:"/game/matchmaking/stop"},l).then((function(t){e&&(g("idle"),i({status:"success",message:"Matchmaking stopped with success"}))})).catch((function(t){e&&(g("idle"),i({status:"failed",message:"We couldn't stop matchmaking, you should search and stop again"}))})),function(){return e=!1}}),[h,l]),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"d-flex flex-wrap m-3 align-items-center"},r.a.createElement("div",{className:"mr-auto"},"start"===h&&r.a.createElement("button",{className:"btn btn-lg btn-danger",type:"button",onClick:function(){return g("stop")}},"Stop Search",r.a.createElement("svg",{className:"bi bi-exclamation-octagon-fill ml-3",width:"1em",height:"1em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{fillRule:"evenodd",d:"M11.46.146A.5.5 0 0011.107 0H4.893a.5.5 0 00-.353.146L.146 4.54A.5.5 0 000 4.893v6.214a.5.5 0 00.146.353l4.394 4.394a.5.5 0 00.353.146h6.214a.5.5 0 00.353-.146l4.394-4.394a.5.5 0 00.146-.353V4.893a.5.5 0 00-.146-.353L11.46.146zM8 4a.905.905 0 00-.9.995l.35 3.507a.552.552 0 001.1 0l.35-3.507A.905.905 0 008 4zm.002 6a1 1 0 100 2 1 1 0 000-2z",clipRule:"evenodd"}))),"idle"===h&&r.a.createElement("button",{className:"btn btn-lg btn-success",type:"button",onClick:function(){return g("start")}},"Search a New Game",r.a.createElement("svg",{className:"bi bi-search ml-3",width:"1em",height:"1em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{fillRule:"evenodd",d:"M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z",clipRule:"evenodd"}),r.a.createElement("path",{fillRule:"evenodd",d:"M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z",clipRule:"evenodd"}))),"stop"===h&&r.a.createElement("button",{className:"btn btn-lg btn-warning",type:"button"},"Stopping",r.a.createElement("svg",{className:"bi bi-clock",width:"1em",height:"1em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{fillRule:"evenodd",d:"M8 15A7 7 0 108 1a7 7 0 000 14zm8-7A8 8 0 110 8a8 8 0 0116 0z",clipRule:"evenodd"}),r.a.createElement("path",{fillRule:"evenodd",d:"M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5z",clipRule:"evenodd"})))),"success"===u.status&&r.a.createElement("div",{className:"alert alert-success m-0",role:"alert"},u.message),"failed"===u.status&&r.a.createElement("div",{className:"alert alert-danger m-0",role:"alert"},u.message)))}function M(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),a=t[0],l=t[1];return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"card mt-3"},r.a.createElement(C,{games:a,setGames:l}),r.a.createElement(q,{games:a,setGames:l})))}var z,A=a(61),F=a.n(A),P=a(9),V=a(22),_=a(62),D=a(63),B=a(67),L=a(66),G=a(64),H=a.n(G),I=function(e){Object(B.a)(a,e);var t=Object(L.a)(a);function a(e){var n;return Object(_.a)(this,a),(n=t.call(this,e)).allowDrag=function(e){e.sourceSquare,e.pieceSquare;return console.log(n.props.myTurn),!1!==n.props.myTurn},n.removeHighlightSquare=function(){n.setState((function(e){var t=e.pieceSquare,a=e.history;return{squareStyles:U({pieceSquare:t,history:a})}}))},n.highlightSquare=function(e,t){var a=[e].concat(Object(x.a)(t)).reduce((function(e,t){return Object(V.a)({},e,{},Object(P.a)({},t,{background:"radial-gradient(circle, #fffc00 36%, transparent 40%)",borderRadius:"50%"}),{},U({history:n.state.history,pieceSquare:n.state.pieceSquare}))}),{});n.setState((function(e){var t=e.squareStyles;return{squareStyles:Object(V.a)({},t,{},a)}}))},n.onDrop=function(e){var t=e.sourceSquare,a=e.targetSquare,r=n.game.move({from:t,to:a,promotion:"q"});if(null!==r){n.setState((function(e){var t=e.history,a=e.pieceSquare;return{fen:n.game.fen(),history:n.game.history({verbose:!0}),squareStyles:U({pieceSquare:a,history:t})}}));var l=!1,c=!1,o=!1;console.log("controllo lo stato della scacchiera"),console.log(n.game.fen()),!0===n.game.in_checkmate()&&(l=!0,console.log("checkmate!!!!!")),!0===n.game.in_check()&&(c=!0,console.log("in checkkooooo!!!!!!!!!!!!!!!!!!!!!!!!!!!!")),!0===n.game.in_draw()&&(o=!0,console.log("draw game!!!!!")),l&&n.props.setGameState("You Win"),o&&n.props.setGameState("Draw"),n.props.moveEvent(r,n.game.fen(),l,c,o)}},n.onMouseOverSquare=function(e){var t=n.game.moves({square:e,verbose:!0});if(0!==t.length){for(var a=[],r=0;r<t.length;r++)a.push(t[r].to);n.highlightSquare(e,a)}},n.onMouseOutSquare=function(e){return n.removeHighlightSquare(e)},n.onSquareClick=function(e){n.setState((function(t){var a=t.history;return{squareStyles:U({pieceSquare:e,history:a}),pieceSquare:e}}));var t=n.game.move({from:n.state.pieceSquare,to:e,promotion:"q"});null!==t&&(n.props.moveEvent(t,n.game.fen()),n.setState({fen:n.game.fen(),history:n.game.history({verbose:!0}),pieceSquare:""}))},n.onSquareRightClick=function(e){n.setState({squareStyles:Object(P.a)({},e,{backgroundColor:"deepPink"})}),n.game.load(n.props.chessboard),console.log("turn of the player "),console.log(n.game.turn()),console.log("chessboard position :: "),console.log(n.game.fen())},n.state={fen:n.props.chessboard,dropSquareStyle:{},squareStyles:{},pieceSquare:"",square:"",history:[]},z=n.props.chessboard,n}return Object(D.a)(a,[{key:"componentDidMount",value:function(){z=this.props.chessboard,this.game=new H.a(this.props.chessboard),console.log("lo stato della chessboard \xe8 *******************************"),console.log(z),this.props.setFenFunction(this.game.load),console.log("component mounted!")}},{key:"componentDidUpdate",value:function(){this.game.fen()!==this.props.chessboard&&null!=this.props.chessboard&&"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"===this.game.fen()&&this.game.load(this.props.chessboard)}},{key:"render",value:function(){var e=this.state,t=e.fen,a=e.dropSquareStyle,n=e.squareStyles;return this.props.children({squareStyles:n,position:t,onListen:this.onListen,allowDrag:this.allowDrag,onMouseOverSquare:this.onMouseOverSquare,onMouseOutSquare:this.onMouseOutSquare,onDrop:this.onDrop,dropSquareStyle:a,onSquareClick:this.onSquareClick,onSquareRightClick:this.onSquareRightClick})}}]),a}(n.Component),U=function(e){var t=e.pieceSquare,a=e.history,n=a.length&&a[a.length-1].from,r=a.length&&a[a.length-1].to;return Object(V.a)(Object(P.a)({},t,{backgroundColor:"rgba(255, 255, 0, 0.4)"}),a.length&&Object(P.a)({},n,{backgroundColor:"rgba(255, 255, 0, 0.4)"}),{},a.length&&Object(P.a)({},r,{backgroundColor:"rgba(255, 255, 0, 0.4)"}))};function W(e){var t,a=e.socket,l=e.game_uuid,c=e.white,s=e.black,u=Object(n.useState)(),i=Object(o.a)(u,2),m=i[0],d=i[1],h=Object(n.useState)(),g=Object(o.a)(h,2),p=g[0],f=g[1],v=Object(n.useState)(),E=Object(o.a)(v,2),w=E[0],S=E[1],O=Object(n.useState)(),N=Object(o.a)(O,2),R=N[0],k=N[1],q=Object(n.useState)(y(localStorage.getItem(b)).username)[0],x=null;return Object(n.useEffect)((function(){var e=!0;return j({method:"get",url:"/game/info/state/"+l}).then((function(t){e&&(d(t.data.chessboard),S(t.data.turn===q))})).catch((function(){return console.log("failed to fetch game state")})),function(){return e=!1}}),[l,q]),Object(n.useEffect)((function(){var e=!0;return a.on(l,(function(t){e&&(x(t.chessboard),d(t.chessboard),f(t.move),S(!0),t.check&&k("Check"),t.checkmate&&k("CheckMate"),t.draw&&k("Draw"))})),function(){return e=!1}}),[l,a,x]),t=q===c?"white":"black",r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement(I,{className:"col",socket:a,game_uuid:l,moveEvent:function(e,t,n,r,o){a.emit("move",{game_uuid:l,whosend:q,turn:q===c?s:c,chessboard:t,move:e,check:r,checkmate:n,draw:o}),console.log("check?"+r),d(t),S(!1)},myTurn:w,white:c,black:s,move:p,chessboard:m,color:t,setFenFunction:function(e){x=e},setGameState:k},(function(e){e.position;var t=e.onDrop,a=e.allowDrag,n=(e.onListen,e.onMouseOverSquare),l=e.onMouseOutSquare,o=e.squareStyles,s=e.dropSquareStyle,u=e.onSquareClick,i=e.onSquareRightClick;return r.a.createElement(F.a,{id:"humanVsHuman",calcWidth:function(e){return e.screenWidth<500?350:480},position:m,onDrop:t,orientation:q===c?"white":"black",onMouseOverSquare:n,onMouseOutSquare:l,boardStyle:{borderRadius:"5px",boxShadow:"0 5px 15px rgba(0, 0, 0, 0.5)"},squareStyles:o,dropSquareStyle:s,allowDrag:a,onSquareClick:u,onSquareRightClick:i})}))),R&&r.a.createElement("div",{className:"d-sm-flex justify-content-center m-5"},r.a.createElement("h1",{className:"alert alert-primary"},R)))}var J=a(65),T=a.n(J);function K(e){var t=e.setRefresh,a=Object(n.useContext)(Y),l=Object(O.g)().game_uuid,c=Object(n.useState)(!1),s=Object(o.a)(c,2),u=s[0],i=s[1],m=Object(n.useState)(),d=Object(o.a)(m,2),h=d[0],g=d[1],p=Object(n.useState)(),f=Object(o.a)(p,2),v=f[0],E=f[1],w=Object(n.useState)(T()())[0];return Object(n.useEffect)((function(){return function(){return w.disconnect()}}),[w]),Object(n.useEffect)((function(){w.emit("joinGameRoom",{game_uuid:l,token:localStorage.getItem(b)})}),[l,w]),Object(n.useEffect)((function(){var e=!0;return j({method:"get",url:"/game/info/players/"+l},a).then((function(t){e&&(g(t.data.white),E(t.data.black))})).catch((function(t){e&&void 0!==t.response&&403===t.response.status&&i(!0)})),function(){return e=!1}}),[a,l]),u?r.a.createElement(O.a,{to:""}):r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"card mt-3"},r.a.createElement("div",{className:"d-flex m-3 align-items-center"},r.a.createElement("div",{className:"container"},r.a.createElement("h3",{className:""},"\u2654 ",r.a.createElement("span",{className:"badge badge-light"},h)),r.a.createElement("h3",{className:""},"\u265a ",r.a.createElement("span",{className:"badge badge-dark"},v))),r.a.createElement(S.b,{className:"ml-auto",to:"/"},r.a.createElement("button",{className:"btn btn-secondary btn-md",onClick:function(){return t(!0)}},"Home",r.a.createElement("svg",{className:"bi bi-house-fill",width:"1.5em",height:"1.5em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{fillRule:"evenodd",d:"M8 3.293l6 6V13.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z",clipRule:"evenodd"}),r.a.createElement("path",{fillRule:"evenodd",d:"M7.293 1.5a1 1 0 011.414 0l6.647 6.646a.5.5 0 01-.708.708L8 2.207 1.354 8.854a.5.5 0 11-.708-.708L7.293 1.5z",clipRule:"evenodd"})))))),r.a.createElement("div",{className:"mt-5 mb-5"},r.a.createElement(W,{socket:w,game_uuid:l,white:h,black:v})))}function Q(){var e=Object(n.useState)(),t=Object(o.a)(e,2),a=t[0],l=t[1];return r.a.createElement("div",{className:"container"},r.a.createElement(S.a,null,r.a.createElement(O.d,null,r.a.createElement(O.b,{path:"/room/:game_uuid"},r.a.createElement(R,{refresh:a,setRefresh:l}),r.a.createElement(K,{setRefresh:l})),r.a.createElement(O.b,{path:"/"},r.a.createElement(R,{refresh:a,setRefresh:l}),r.a.createElement(M,null)))))}var Y=Object(n.createContext)();var X=function(){var e=Object(n.useState)(null!==localStorage.getItem(b)),t=Object(o.a)(e,2),a=t[0],l=t[1];return r.a.createElement(Y.Provider,{value:{auth:a,setAuth:l}},a?r.a.createElement(Q,null):r.a.createElement(w,null))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(X,null)),document.getElementById("root"))},68:function(e,t,a){e.exports=a(124)}},[[68,1,2]]]);
//# sourceMappingURL=main.fdc1ef4d.chunk.js.map