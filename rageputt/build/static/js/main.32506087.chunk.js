(this.webpackJsonprageputt=this.webpackJsonprageputt||[]).push([[0],{136:function(e,n,t){},146:function(e,n,t){"use strict";t.r(n);var a,r,c,i,s,o,l,u,j,d=t(27),b=t(0),O=t(12),h=t.n(O),p=t(117),x=t(18),f=t(44),v=(t(136),t(26)),m=t(14),g=t(42),k=t.n(g),y=t(60),w=t(202),I=t(227),S=t(201),C=t(203),N=t(150),R=t(204),T=t(205),$=t(45),E=t(216),W=Object(E.a)(a||(a=Object($.a)(["\n    mutation login($user: String!, $password: String!) {\n        login(\n            user: $user\n            password: $password\n        ) {\n            value\n            user { user name }\n        }\n    }\n\n\n"]))),L=Object(E.a)(r||(r=Object($.a)(["\n    query getMe {\n        getMe{\n           name\n           user\n           friends { user name id }\n           friendRequests { user name id }\n        }\n    }\n"]))),q=Object(E.a)(c||(c=Object($.a)(["\n    mutation createGame {\n        createGame\n    }\n"]))),U=Object(E.a)(i||(i=Object($.a)(["\n    query getGames {\n        getGames\n    }\n"]))),F=Object(E.a)(s||(s=Object($.a)(["\n    mutation setScore($roundId: String!, $round: ID!, $player: String!, $score: Int!) {\n        setScore(\n            roundId: $roundId\n            round: $round\n            player: $player\n            score: $score\n        ) {\n            finished\n            timestamp\n            players {\n                user { user }\n                tulokset\n            }\n        }\n    }\n"]))),D=Object(E.a)(o||(o=Object($.a)(["\n    mutation createUser($user: String!, $password: String!, $name: String, $email: String) {\n        createUser(\n            user: $user\n            password: $password\n            name: $name\n            email: $email\n        ) {\n            user\n        }\n    }\n"]))),_=Object(E.a)(l||(l=Object($.a)(["\n    query getRound($roundId: String!) {\n        getRound(\n            roundId: $roundId\n        ) {\n            finished\n            timestamp\n            players {\n                user { user name }\n                tulokset\n            }\n        }\n    }\n"]))),A=Object(E.a)(u||(u=Object($.a)(["\n    mutation handleFriendRequest($friendId: String!, $answer: Boolean!) {\n        handleFriendRequest(\n            friendId: $friendId\n            action: $answer\n        )\n    }\n"]))),K=Object(E.a)(j||(j=Object($.a)(["\n    mutation sendFriendRequest($name: String!) {\n        sendFriendRequest(\n            fName: $name\n        )\n    }\n"]))),M=t(229),G=t(195),P=t(223),V=t(3),z=function(){var e,n=[];for(e=0;e<6;e++)n.push(Object(V.jsx)(G.a,{labelPlacement:"top",value:e,label:e,control:Object(V.jsx)(P.a,{color:"primary",size:"small",style:{padding:"0px"}})},e));return n},B=function(e){var n=e.player,t=e.round,a=Object(x.c)((function(e){return e.tulokset})),r=Object(I.a)(F,{refetchQueries:[{query:_,variables:{roundId:a.roundId}}]}),c=Object(v.a)(r,1)[0],i=t>0?5+n.tulokset[t-1]:10,s=function(e){for(var n=0,t=10,a=0;a<e.length;a++){if(!e[a])return n;n+=e[a]*t,t=5+e[a]}return n}(n.tulokset),o=n.tulokset[t];return isNaN(o)&&(o=null),console.log(o),Object(V.jsxs)("div",{children:[Object(V.jsxs)("h2",{children:[n.user.name," ",i||" xx ","m - ",s]}),Object(V.jsx)("div",{className:"tulosValitsin",children:Object(V.jsx)(M.a,{row:!0,style:{whiteSpace:"nowrap"},value:o,onChange:function(e){console.log("Clickki\xe4 arvoon ",e.target.value),c({variables:{roundId:a.roundId,round:a.round,player:n.user.user,score:Number(e.target.value)}})},children:Object(V.jsx)(z,{})})})]})},J=t(221),Q=t(230),H=t(220),X=t(200),Y=t(224),Z=function(e){var n=e.open,t=e.setModal,a=e.handleNewGame;return Object(V.jsx)("div",{children:Object(V.jsx)(J.a,{open:n,onClose:function(){return t(!1)},children:Object(V.jsx)("div",{className:"newGameModal",children:Object(V.jsxs)("form",{onSubmit:a,children:[Object(V.jsx)("h2",{children:"Uusi peli"}),Object(V.jsxs)("div",{children:[Object(V.jsx)(Q.a,{htmlFor:"age-native-simple",children:"Pelimoodi"}),Object(V.jsx)(H.a,{native:!0,children:Object(V.jsx)("option",{value:0,children:"Normaali"})})]}),Object(V.jsx)(X.a,{}),Object(V.jsxs)("div",{children:[Object(V.jsx)("h3",{children:"Pelaajat"}),Object(V.jsx)(G.a,{control:Object(V.jsx)(Y.a,{name:"pelaaja",checked:!0}),label:"Min\xe4"}),Object(V.jsx)(S.a,{fullWidth:!0,variant:"contained",color:"primary",type:"submit",children:"Aloita"}),Object(V.jsx)(S.a,{fullWidth:!0,onClick:function(){return t(!1)},variant:"contained",color:"secondary",style:{marginTop:"5px"},children:"Kansel"})]})]})})})})},ee=function(){var e=Object(x.b)(),n=Object(b.useState)(!1),t=Object(v.a)(n,2),a=t[0],r=t[1],c=Object(x.c)((function(e){return e.tulokset})),i=Object(x.c)((function(e){return e.user})),s=Object(w.a)(_),o=Object(v.a)(s,2),l=o[0],u=o[1],j=Object(I.a)(q),d=Object(v.a)(j,1)[0],O=function(){var n=Object(y.a)(k.a.mark((function n(t){var a;return k.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.preventDefault(),n.next=3,d();case 3:a=n.sent,e({type:"SET_ID",data:{roundId:a.data.createGame}}),r(!1);case 6:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();if(console.log(c),console.log(u),!i.user)return Object(V.jsx)(m.a,{to:"/login"});if(u.loading)return Object(V.jsx)("div",{children:Object(V.jsx)("h2",{children:"Loading round..."})});if(!u.called&&c.roundId&&l({variables:{roundId:c.roundId}}),null===c.roundId||!u.data)return Object(V.jsxs)("div",{children:[Object(V.jsx)("h2",{children:"Pakko p\xe4\xe4st\xe4 puttaa"}),Object(V.jsx)("p",{children:"Ei aktiivista peli\xe4 k\xe4ynniss\xe4. Aloita joko uusi peli tai jatkaa vanhaa peli\xe4."}),Object(V.jsx)("p",{children:"Vanhan pelin jatkaminen onnistuu aktivoimalla se 'Vanhat peli' -osiosta."}),Object(V.jsx)(S.a,{onClick:function(){return r(!0)},color:"primary",variant:"contained",size:"large",fullWidth:!0,children:"Aloita uusi peli"}),Object(V.jsx)(Z,{open:a,setModal:r,handleNewGame:O})]});var h=c.round;return Object(V.jsxs)("div",{children:[Object(V.jsxs)(C.a,{container:!0,className:"rundiValitsin",children:[Object(V.jsx)(C.a,{item:!0,children:Object(V.jsx)(N.a,{onClick:function(){return e({type:"DEC_ROUND"})},children:Object(V.jsx)(R.a,{})})}),Object(V.jsxs)(C.a,{item:!0,component:"h2",children:["Round ",h+1]}),Object(V.jsx)(C.a,{item:!0,children:Object(V.jsx)(N.a,{onClick:function(){return e({type:"INC_ROUND"})},children:Object(V.jsx)(T.a,{})})})]}),u.data.getRound.players.map((function(e){return Object(V.jsx)(B,{player:e,round:h},e.user.name)}))]})},ne=function(e,n){return{type:"SET_NOTIFICATION",data:{type:n,message:e}}},te=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{alive:!1},n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"SET_NOTIFICATION":return{message:n.data.message,type:n.data.type,alive:!0};case"KILL_NOTIFICATION":return Object(d.a)(Object(d.a)({},e),{},{alive:!1});default:return e}},ae=t(225),re=t(222),ce=function(){var e=Object(x.b)(),n=Object(x.c)((function(e){return e.notification}));return Object(V.jsx)("div",{children:Object(V.jsx)(ae.a,{open:n.alive,autoHideDuration:5e3,onClose:function(){e({type:"KILL_NOTIFICATION",data:{}})},children:Object(V.jsx)(re.a,{severity:n.type,variant:"filled",children:n.message})})})},ie=t(232),se=t(199),oe=t(206),le=function(e){var n=e.menuOpen,t=e.setMenuOpen,a=!Object(x.c)((function(e){return e.user})).user;return Object(V.jsxs)(ie.a,{open:n,variant:"persistent",anchor:"left",children:[Object(V.jsx)(N.a,{onClick:function(){return t(!1)},children:Object(V.jsx)(R.a,{})}),Object(V.jsx)(X.a,{}),Object(V.jsx)(se.a,{children:Object(V.jsx)(oe.a,{button:!0,component:f.b,to:"/",onClick:function(){return t(!1)},children:"Etusivu"})}),Object(V.jsx)(X.a,{}),Object(V.jsx)(se.a,{children:Object(V.jsx)(oe.a,{disabled:a,button:!0,component:f.b,to:"/peli",onClick:function(){return t(!1)},children:"Uusi peli"})}),Object(V.jsx)(X.a,{}),Object(V.jsxs)(se.a,{children:[Object(V.jsx)(oe.a,{disabled:a,button:!0,component:f.b,to:"/vanhat",onClick:function(){return t(!1)},children:"Vanhat pelit"}),Object(V.jsx)(oe.a,{disabled:a,button:!0,onClick:function(){return t(!1)},children:"Statistiikka"})]}),Object(V.jsx)(X.a,{}),Object(V.jsx)(se.a,{children:Object(V.jsx)(oe.a,{disabled:a,button:!0,component:f.b,to:"/kaverit",onClick:function(){return t(!1)},children:"Kaverit"})}),Object(V.jsx)(X.a,{}),Object(V.jsxs)(se.a,{children:[Object(V.jsx)(oe.a,{disabled:a,button:!0,onClick:function(){return t(!1)},children:"Asetukset"}),Object(V.jsx)(oe.a,{button:!0,component:f.b,to:"/createUser",onClick:function(){return t(!1)},children:"Luo tunnus"}),Object(V.jsx)(oe.a,{button:!0,component:f.b,to:"/login",onClick:function(){return t(!1)},children:"Kirjaudu sis\xe4\xe4n"})]})]})},ue=t(233),je=t(208),de=t(226),be=t(207),Oe=function(e,n){return{type:"SET_USER",data:{user:n,name:e}}},he=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"SET_USER":return{user:n.data.user,name:n.data.name};case"CLEAR_USER":return{};default:return e}},pe=function(){var e=Object(x.b)(),n=Object(x.c)((function(e){return e.user})),t=Object(b.useState)(!1),a=Object(v.a)(t,2),r=a[0],c=a[1],i=Object(I.a)(W),s=Object(v.a)(i,1)[0],o=Object(be.a)(),l=function(){var n=Object(y.a)(k.a.mark((function n(t){return k.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,o.clearStore();case 2:window.localStorage.clear(),e({type:"CLEAR_USER",data:{}});case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),u=function(){var n=Object(y.a)(k.a.mark((function n(t){return k.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t.preventDefault(),c(!0),s({variables:{user:t.target.user.value,password:t.target.password.value}}).then((function(n){window.localStorage.setItem("rageToken",n.data.login.value),console.log("Login data: ",n.data.login);var t=Oe(n.data.login.user.name,n.data.login.user.user);e(t),c(!1)})).catch((function(n){e(ne("V\xe4\xe4r\xe4 tunnus tai salasana","error")),c(!1)}));case 3:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return console.log(n),n.user?Object(V.jsxs)("div",{children:[Object(V.jsx)("h1",{children:"Kirjautunut"}),Object(V.jsxs)("p",{children:["Olet kirjautunut ",n.user,":na"]}),Object(V.jsx)(S.a,{onClick:l,variant:"contained",color:"primary",children:"Kirjaudu ulos"})]}):Object(V.jsxs)("div",{children:[Object(V.jsx)(ue.a,{open:r,children:Object(V.jsx)(je.a,{})}),Object(V.jsx)("h1",{children:"Kirjaudu sis\xe4\xe4n"}),Object(V.jsx)("form",{onSubmit:u,children:Object(V.jsxs)(se.a,{children:[Object(V.jsx)(oe.a,{children:Object(V.jsx)(de.a,{name:"user",label:"Tunnus",variant:"outlined",fullWidth:!0})}),Object(V.jsx)(oe.a,{children:Object(V.jsx)(de.a,{name:"password",label:"Salasana",variant:"outlined",type:"password",fullWidth:!0})}),Object(V.jsx)(oe.a,{children:Object(V.jsx)(S.a,{type:"submit",variant:"contained",color:"primary",size:"large",children:"Kirjaudu"})})]})})]})},xe=t(211),fe=function(e){var n=e.handleSendFriendRequest;return Object(V.jsxs)(V.Fragment,{children:[Object(V.jsx)("h2",{children:"L\xe4het\xe4 kaveripyynt\xf6"}),Object(V.jsxs)("form",{onSubmit:n,children:[Object(V.jsx)(de.a,{label:"Nimi",variant:"outlined",fullWidth:!0,name:"kaveri"}),Object(V.jsx)(S.a,{type:"submit",variant:"contained",fullWidth:!0,size:"large",color:"primary",style:{marginTop:"5px"},children:"L\xe4het\xe4"})]})]})},ve=t(151),me=t(209),ge=t(210),ke=function(e){var n=e.kaveri,t=e.handleFriendRequest;return Object(V.jsxs)(ve.a,{elevation:2,style:{paddingLeft:"5px",display:"inline-block",width:"100%"},children:[Object(V.jsxs)("div",{style:{float:"left",paddingTop:"10px",fontWeight:"bold"},children:[n.user," (",n.name,")"]}),Object(V.jsxs)("div",{style:{float:"right"},children:[Object(V.jsx)(N.a,{onClick:function(){return t(n.id,!0)},children:Object(V.jsx)(me.a,{style:{color:"green"}})}),Object(V.jsx)(N.a,{onClick:function(){return t(n.id,!1)},children:Object(V.jsx)(ge.a,{style:{color:"red"}})})]})]})},ye=function(e){var n=e.pyynnot,t=e.handleFriendRequest;return n.length<1?Object(V.jsx)("h3",{children:"Ei kaveripyynt\xf6j\xe4"}):Object(V.jsxs)(V.Fragment,{children:[Object(V.jsx)("h2",{children:"Kaveripyynn\xf6t"}),n.map((function(e){return Object(V.jsx)(ke,{handleFriendRequest:t,kaveri:e},e.id)}))]})},we=function(e){var n=e.kaverit;return n.length<1?Object(V.jsx)("div",{children:"Ei kavereita :("}):Object(V.jsxs)("div",{children:[" ",n.map((function(e){return Object(V.jsxs)("li",{children:[e.user," (",e.name,")"]},e.id)}))]})},Ie=function(){var e=Object(xe.a)(L),n=Object(x.b)(),t=Object(I.a)(A,{refetchQueries:[{query:L}]}),a=Object(v.a)(t,1)[0],r=Object(I.a)(K),c=Object(v.a)(r,1)[0];return e.loading?Object(V.jsx)("h2",{children:"Loading friends..."}):(console.log(e),Object(V.jsxs)("div",{children:[Object(V.jsx)("h2",{children:"Kaverisi"}),Object(V.jsx)(we,{kaverit:e.data.getMe.friends}),Object(V.jsx)(ye,{pyynnot:e.data.getMe.friendRequests,handleFriendRequest:function(e,t){a({variables:{friendId:e,answer:t}}).then((function(e){n(ne("Kaveripyynt\xf6 hyv\xe4ksytty","success"))})).catch((function(e){n(ne("Tapahtui virhe: "+e.message,"error"))}))}}),Object(V.jsx)(fe,{handleSendFriendRequest:function(e){e.preventDefault(),c({variables:{name:e.target.kaveri.value}}).then((function(e){n(ne("Kaveripyynt\xf6 l\xe4hetetty!","success"))})).catch((function(e){n(ne("Pyynt\xf6 ep\xe4onnistui: "+e.message,"error"))})),e.target.kaveri.value=""}})]}))},Se=t(213),Ce=t(214),Ne=t(149),Re=t(212),Te=t(115),$e=t.n(Te),Ee=function(){var e=Object(I.a)(D),n=Object(v.a)(e,2),t=n[0],a=n[1],r=Object(x.b)(),c=Object(b.useState)({tunnus:!1,password:!1}),i=Object(v.a)(c,2),s=i[0],o=i[1],l=function(){var e=Object(y.a)(k.a.mark((function e(n){var a;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),""!==(a={user:n.target.user.value,password:n.target.password.value,name:n.target.name.value,email:n.target.email.value}).user){e.next=6;break}o(Object(d.a)(Object(d.a)({},s),{},{tunnus:!0})),e.next=19;break;case 6:if(""!==a.password&&a.password===n.target.password2.value){e.next=10;break}o(Object(d.a)(Object(d.a)({},s),{},{password:!0})),e.next=19;break;case 10:return e.prev=10,e.next=13,t({variables:a});case 13:r(ne("Tunnukset luotiin onnistuneesti","success")),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(10),r(ne("Virhe tunnusten luonnissa: "+e.t0.message,"error"));case 19:case"end":return e.stop()}}),e,null,[[10,16]])})));return function(n){return e.apply(this,arguments)}}();return a.loading?Object(V.jsx)("h2",{children:"Creating user..."}):a.called&&!a.error?Object(V.jsx)(m.a,{to:"/login"}):Object(V.jsxs)("div",{children:[Object(V.jsx)("h1",{children:"Luo tunnus"}),Object(V.jsx)("h2",{children:"Perustiedot"}),Object(V.jsx)("form",{onSubmit:l,children:Object(V.jsxs)(se.a,{children:[Object(V.jsx)(oe.a,{children:Object(V.jsx)(de.a,{error:s.tunnus,name:"user",label:"Tunnus",variant:"outlined",fullWidth:!0})}),Object(V.jsx)(oe.a,{children:Object(V.jsx)(de.a,{error:s.password,name:"password",type:"password",label:"Salasana",variant:"outlined",fullWidth:!0})}),Object(V.jsx)(oe.a,{children:Object(V.jsx)(de.a,{error:s.password,name:"password2",label:"Salasana uudestaan",type:"password",variant:"outlined",fullWidth:!0})}),Object(V.jsx)(X.a,{style:{marginTop:"15px"}}),Object(V.jsx)("h2",{children:"Lis\xe4tiedot"}),Object(V.jsx)(Re.a,{children:"Ei pakollisia. S\xe4hk\xf6postiosoitteen antaminen mahdollistaa tunnusten palauttamisen."}),Object(V.jsx)(oe.a,{children:Object(V.jsx)(de.a,{name:"name",label:"Nimi",variant:"outlined",fullWidth:!0})}),Object(V.jsx)(oe.a,{children:Object(V.jsx)(de.a,{name:"email",label:"S\xe4hk\xf6posti",variant:"outlined",fullWidth:!0})}),Object(V.jsx)(oe.a,{children:Object(V.jsx)(S.a,{type:"submit",size:"large",variant:"contained",fullWidth:!0,color:"primary",children:"Luo tunnus"})})]})})]})},We=function(e){var n=e.peli,t=e.aktivoi;return Object(V.jsx)(S.a,{onClick:function(){return t(n)},fullWidth:!0,variant:"outlined",style:{marginBottom:"5px"},children:n})},Le=function(){var e=Object(xe.a)(U),n=Object(x.c)((function(e){return e.user})),t=Object(x.b)(),a=function(e){t({type:"SET_ID",data:{roundId:e}})};return n.user?e.loading?Object(V.jsx)("h2",{children:"Loading rounds..."}):(console.log(e),Object(V.jsxs)("div",{children:[Object(V.jsx)("h2",{children:"Vanhat pelit"}),e.data.getGames.map((function(e){return Object(V.jsx)(We,{aktivoi:a,peli:e},e)}))]})):Object(V.jsx)(m.a,{to:"/login"})};var qe=function(){var e=Object(b.useState)(!1),n=Object(v.a)(e,2),t=n[0],a=n[1],r=Object(x.b)(),c=Object(x.c)((function(e){return e.user})),i=Object(w.a)(L),s=Object(v.a)(i,2),o=s[0],l=s[1];return Object(b.useEffect)((function(){!function(){var e=localStorage.getItem("rageToken");console.log(e),console.log(c),e&&!c.user&&(!l.loading&&l.data?(console.log(l),r(Oe(l.data.getMe.name,l.data.getMe.user))):!1===l.called&&o())}()}),[l]),Object(V.jsxs)("div",{children:[Object(V.jsx)(Se.a,{position:"static",children:Object(V.jsxs)(Ce.a,{children:[Object(V.jsx)(N.a,{edge:"start",onClick:function(){a(!0)},children:Object(V.jsx)($e.a,{})}),Object(V.jsx)(Ne.a,{variant:"h6",style:{flexGrow:1},children:"RagePutt"})]})}),Object(V.jsx)(le,{menuOpen:t,setMenuOpen:a}),Object(V.jsx)(ce,{}),Object(V.jsx)(Re.a,{children:Object(V.jsxs)(m.d,{children:[Object(V.jsx)(m.b,{path:"/kaverit",children:Object(V.jsx)(Ie,{})}),Object(V.jsx)(m.b,{path:"/login",children:Object(V.jsx)(pe,{})}),Object(V.jsx)(m.b,{path:"/vanhat",children:Object(V.jsx)(Le,{})}),Object(V.jsx)(m.b,{path:"/peli",children:Object(V.jsx)(ee,{})}),Object(V.jsx)(m.b,{path:"/createUser",children:Object(V.jsx)(Ee,{})}),Object(V.jsxs)(m.b,{path:"/",children:[Object(V.jsx)("h1",{children:"Etusivu"}),Object(V.jsx)("p",{children:"Rageputt is b\xe4k"})]})]})})]})},Ue=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Fe(e,n){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var De=t(218),_e=t(217),Ae=t(219),Ke=t(215),Me=t(99),Ge=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{round:0,roundId:null},n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"INC_ROUND":return e.round<19?Object(d.a)(Object(d.a)({},e),{},{round:e.round+1}):e;case"DEC_ROUND":return e.round>=1?Object(d.a)(Object(d.a)({},e),{},{round:e.round-1}):e;case"SET_ID":return Object(d.a)(Object(d.a)({},e),{},{roundId:n.data.roundId});case"INIT_ROUND":return n.data;default:return e}},Pe=Object(Me.a)({tulokset:Ge,user:he,notification:te}),Ve=Object(Me.b)(Pe),ze=Object(p.a)((function(e,n){var t=n.headers,a=localStorage.getItem("rageToken");return{headers:Object(d.a)(Object(d.a)({},t),{},{authorization:a?"bearer ".concat(a):null})}})),Be=new De.a({uri:"http://localhost:4000/graphql"}),Je=new _e.a({cache:new Ae.a,link:ze.concat(Be)});h.a.render(Object(V.jsx)(Ke.a,{client:Je,children:Object(V.jsx)(x.a,{store:Ve,children:Object(V.jsx)(f.a,{children:Object(V.jsx)(qe,{})})})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var n="".concat("","/service-worker.js");Ue?(!function(e,n){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var a=t.headers.get("content-type");404===t.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):Fe(e,n)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(n,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):Fe(n,e)}))}}()}},[[146,1,2]]]);
//# sourceMappingURL=main.32506087.chunk.js.map