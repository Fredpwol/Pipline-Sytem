(this["webpackJsonppipline-system"]=this["webpackJsonppipline-system"]||[]).push([[0],{270:function(e,t,n){},271:function(e,t,n){},413:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(24),o=n.n(r),i=(n(270),n(12)),s=n(137),l=n(234),j=n(20),b=(n(271),n(476)),d=n(454),u=n(448),h=n(474),O=n(452),m=n(475),x=n(455),g=n(456),p=n(449),f=n(127),v=n.n(f),w=n(237),S=n(444),k=n(446),y=n(2),C=c.a.createContext(),N=function(e){var t=e.children,n=Object(a.useState)(""),c=Object(i.a)(n,2),r=c[0],o=c[1],s=Object(a.useState)(""),l=Object(i.a)(s,2),b=l[0],d=l[1],u=Object(a.useState)(localStorage.getItem("token")),h=Object(i.a)(u,2),O=h[0],m=h[1],x=Object(j.g)();Object(a.useEffect)((function(){d(localStorage.getItem("email")||""),o(localStorage.getItem("org")||"")}),[]);return Object(y.jsx)(C.Provider,{value:{organization:r,setOrganization:o,email:b,setEmail:d,token:O,setToken:m,logOut:function(){localStorage.removeItem("token"),localStorage.removeItem("email"),localStorage.removeItem("org"),m(""),d(""),o(""),x.push("/login")}},children:t})},T="https://infinite-taiga-25376.herokuapp.com",B=Object(S.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(3)},submit:{margin:e.spacing(3,0,2)}}}));function P(){var e=B(),t=Object(a.useState)(""),n=Object(i.a)(t,2),c=n[0],r=n[1],o=Object(a.useState)(""),s=Object(i.a)(o,2),l=s[0],f=s[1],S=Object(a.useState)(""),N=Object(i.a)(S,2),P=N[0],W=N[1],z=Object(a.useState)(!1),E=Object(i.a)(z,2),L=E[0],F=E[1],I=Object(a.useState)(""),D=Object(i.a)(I,2),H=D[0],R=D[1],A=Object(a.useState)(!1),_=Object(i.a)(A,2),q=_[0],U=_[1],J=Object(a.useState)(""),V=Object(i.a)(J,2),G=V[0],K=V[1],M=Object(a.useContext)(C),Y=Object(j.g)();return Object(y.jsxs)(k.a,{component:"main",maxWidth:"xs",children:[Object(y.jsx)(u.a,{}),Object(y.jsxs)("div",{className:e.paper,children:[Object(y.jsx)(b.a,{className:e.avatar,children:Object(y.jsx)(v.a,{})}),Object(y.jsx)(w.a,{component:"h1",variant:"h5",children:"Sign up"}),Object(y.jsx)(w.a,{color:"error",children:H}),Object(y.jsxs)("form",{className:e.form,noValidate:!0,children:[Object(y.jsxs)(p.a,{container:!0,spacing:2,children:[Object(y.jsx)(p.a,{item:!0,xs:12,children:Object(y.jsx)(h.a,{variant:"outlined",required:!0,fullWidth:!0,id:"organization",value:l,onChange:function(e){return f(e.target.value)},label:"Organization",name:"organization"})}),Object(y.jsx)(p.a,{item:!0,xs:12,children:Object(y.jsx)(h.a,{variant:"outlined",required:!0,fullWidth:!0,id:"email",value:c,onChange:function(e){return r(e.target.value)},label:"Email Address",name:"email",autoComplete:"email"})}),Object(y.jsx)(p.a,{item:!0,xs:12,children:Object(y.jsx)(h.a,{variant:"outlined",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",value:P,onChange:function(e){return W(e.target.value)},autoComplete:"current-password"})}),Object(y.jsx)(p.a,{item:!0,xs:12,children:Object(y.jsx)(h.a,{variant:"outlined",required:!0,fullWidth:!0,name:"confirm-password",label:"Confirm Password",type:"password",id:"confirm-password",value:G,onChange:function(e){return K(e.target.value)}})}),Object(y.jsx)(p.a,{item:!0,xs:12,children:Object(y.jsx)(O.a,{control:Object(y.jsx)(m.a,{value:q,color:"primary",onChange:function(){return U(!q)}}),label:"Remember me"})})]}),Object(y.jsx)(d.a,{onClick:function(){P===G?(F(!0),fetch("".concat(T,"/register"),{method:"POST",body:JSON.stringify({email:c,password:P,organization:l}),headers:new Headers({"Content-Type":"application/json"})}).then((function(e){return e.json()})).then((function(e){F(!1),"error"!==e.status?(M.setEmail(c),M.setToken(e.token),console.log(e.token),q&&localStorage.setItem("token",e.token),Y.push("/")):R(e.message)})).catch((function(e){console.error(e),R(String(e))}))):R("Please confirm your password")},fullWidth:!0,variant:"contained",color:"primary",className:e.submit,children:L?Object(y.jsx)(x.a,{color:"white"}):"Sign Up"}),Object(y.jsx)(p.a,{container:!0,justify:"flex-end",children:Object(y.jsx)(p.a,{item:!0,children:Object(y.jsx)(g.a,{href:"/login",variant:"body2",children:"Already have an account? Sign in"})})})]})]})]})}var W=n(71),z=n(459),E=n(460),L=n(458),F=n(457),I=n(7),D=Object(S.a)((function(e){return{table:{width:"70%",marginBottom:"50px"},container:{padding:"10px ",border:"1px solid",borderRadius:"15px",borderColor:e.palette.primary.main}}})),H=Object(I.a)((function(e){return{head:{backgroundColor:e.palette.common.black,color:e.palette.common.white}}}))(F.a),R=Object(I.a)((function(e){return{root:{borderBottom:"2px solid",borderBottomColor:e.palette.primary.main,width:"100px"}}}))(L.a);function A(e){var t=e.title,n=e.block,a=D();return Object(y.jsxs)("div",{align:"center",className:a.container,children:[Object(y.jsx)(w.a,{color:"primary",children:t}),Object(y.jsx)(z.a,{className:a.table,children:Object(y.jsx)(E.a,{children:Object.entries(n).map((function(e){return Object(y.jsxs)(R,{children:[Object(y.jsx)(H,{scope:"row",component:"row",align:"right",children:e[0]}),Object(y.jsxs)(H,{align:"left",style:{whiteSpace:"normal",wordBreak:"break-word"},children:[e[1]," ","temperature"===e[0].toLowerCase()?"\xb0C":"flowrate"===e[0].toLowerCase()?"Litre/m":"vibration"===e[0].toLowerCase()?"Hz":null]})]},e[0])}))})})]})}var _=n(461),q=n(233),U=n(227),J=n(228),V=n(112),G=function(e){var t=e.data,n=e.field,c=e.color,r=function(){var e=Object(a.useState)(window.innerHeight),t=Object(i.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(window.innerWidth),o=Object(i.a)(r,2),s=o[0],l=o[1];return Object(a.useEffect)((function(){window.addEventListener("resize",(function(){c(window.innerHeight),l(window.innerWidth)}))}),[]),{height:n,width:s}}().width;return Object(y.jsxs)(_.a,{width:r-200,height:300,data:t,margin:{top:5,right:20,bottom:5,left:0},children:[Object(y.jsx)(q.a,{type:"monotone",dataKey:n,stroke:c}),Object(y.jsx)(U.a,{dataKey:"name"}),Object(y.jsx)(J.a,{}),Object(y.jsx)(V.a,{})]})},K=Object(S.a)((function(e){return{content:{paddingTop:"100px"},all:{margin:"10px"}}}));function M(){var e=K(),t=Object(a.useContext)(C),n=Object(a.useState)(null),c=Object(i.a)(n,2),r=c[0],o=c[1],s=Object(a.useState)(!1),l=Object(i.a)(s,2),j=l[0],b=l[1],d=Object(a.useState)([]),u=Object(i.a)(d,2),h=u[0],O=u[1],m=Object(a.useState)(""),g=Object(i.a)(m,2),p=g[0],f=g[1];return Object(a.useEffect)((function(){b(!0),fetch("".concat(T,"/blocks/latest"),{headers:new Headers({Authorization:"Bearer ".concat(t.token)})}).then((function(e){return b(!1),e.json()})).then((function(e){"error"===(null===e||void 0===e?void 0:e.status)?f(e.message):o(e.block)})).catch((function(e){return f(String(e))})),fetch("".concat(T,"/blocks/timeline/all"),{headers:new Headers({Authorization:"Bearer ".concat(t.token)})}).then((function(e){return e.json()})).then((function(e){"error"===(null===e||void 0===e?void 0:e.status)||O(e.data)}))}),[t.token]),Object(y.jsx)("div",{className:e.content,children:Boolean(p)?Object(y.jsxs)("div",{align:"center",children:[Object(y.jsx)(w.a,{variant:"h3",children:"Sorry an Unexpected error occurred!"}),Object(y.jsx)("p",{children:p})]}):Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)(w.a,{align:"right",className:e.all,children:Object(y.jsx)(W.b,{to:"/blocks",children:"See all"})}),null!==r?0!==Object.entries(r).length?Object(y.jsx)(A,{block:r,title:"Latest"}):Object(y.jsx)("center",{children:Object(y.jsx)("h2",{children:"Sorry no block added yet."})}):j?Object(y.jsx)("center",{children:Object(y.jsx)(x.a,{})}):null,Object(y.jsxs)("div",{style:{padding:"20px"},children:[Object(y.jsx)("h2",{align:"center",children:"Data Timeline"}),Object(y.jsx)("h3",{children:"Vibration"}),Object(y.jsx)(G,{data:h,field:"vibration",color:"#e3425f"}),Object(y.jsx)("h3",{children:"Temperature"}),Object(y.jsx)(G,{data:h,field:"temperature",color:"#2ec0ff"}),Object(y.jsx)("h3",{children:"Flow Rate"}),Object(y.jsx)(G,{data:h,field:"flowRate",color:"#ffe32e"})]})]})})}var Y=n(466),Q=n(473),X=n(465),Z=Object(I.a)((function(e){return{head:{backgroundColor:e.palette.secondary.main,color:e.palette.common.white},body:{fontSize:14}}}))(F.a),$=Object(I.a)((function(e){return{root:{"&:nth-of-type(odd)":{backgroundColor:e.palette.action.hover}}}}))(L.a),ee=Object(S.a)({table:{minWidth:700,marginTop:"20px"},content:{paddingTop:"100px"}});function te(){var e=ee(),t=Object(a.useState)([]),n=Object(i.a)(t,2),c=n[0],r=n[1],o=Object(a.useState)(""),s=Object(i.a)(o,2),l=s[0],j=s[1],b=Object(a.useState)(0),d=Object(i.a)(b,2),u=d[0],h=d[1],O=Object(a.useState)(10),m=Object(i.a)(O,2),x=m[0],g=m[1],p=Object(a.useContext)(C);return Object(a.useEffect)((function(){fetch("".concat(T,"/blocks"),{headers:new Headers({Authorization:"Bearer ".concat(p.token)})}).then((function(e){return e.json()})).then((function(e){"error"===(null===e||void 0===e?void 0:e.status)?j(e.message):r(e.blocks)})).catch((function(e){return j(String(e))}))}),[p.token]),Object(y.jsx)("div",{className:e.content,children:Boolean(l)?Object(y.jsxs)("div",{align:"center",children:[Object(y.jsx)(w.a,{variant:"h3",children:"Sorry an Unexpected error occurred!"}),Object(y.jsx)("p",{children:l})]}):Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)(w.a,{variant:"h5",style:{fontWeight:"bold"},children:"Block History"}),Object(y.jsxs)(z.a,{className:e.table,"aria-label":"customized table",children:[Object(y.jsx)(X.a,{children:Object(y.jsxs)(L.a,{children:[Object(y.jsx)(Z,{children:"_id"}),Object(y.jsx)(Z,{children:"Time added"}),Object(y.jsx)(Z,{align:"right",children:"Flow Rate"}),Object(y.jsx)(Z,{align:"right",children:"Temeperature"}),Object(y.jsx)(Z,{align:"right",children:"vibration"})]})}),Object(y.jsx)(E.a,{children:c.slice(u*x,u*x+x).map((function(e){return Object(y.jsxs)($,{children:[Object(y.jsx)(W.b,{to:"/blocks/".concat(e._id),children:Object(y.jsx)(Z,{component:"th",scope:"row",style:{color:"blue"},children:e._id})}),Object(y.jsx)(Z,{children:new Date(e.timestamp).toLocaleString()}),Object(y.jsx)(Z,{align:"right",children:e.flowRate}),Object(y.jsx)(Z,{align:"right",children:e.temperature}),Object(y.jsx)(Z,{align:"right",children:e.vibration})]},e._id)}))}),Object(y.jsx)(Y.a,{children:Object(y.jsx)(L.a,{children:Object(y.jsx)(Q.a,{rowsPerPageOptions:[10,25,100],component:"div",count:c.length,rowsPerPage:x,page:u,onChangePage:function(e,t){console.log("page",t),h(t)},onChangeRowsPerPage:function(e){g(++e.target.value),h(0)}})})})]})]})})}function ne(){return Object(y.jsxs)(w.a,{variant:"body2",color:"textSecondary",align:"center",className:"copyright",children:["Copyright \xa9 ",Object(y.jsx)(g.a,{color:"inherit",href:"/",children:"Water System"})," ",(new Date).getFullYear(),"."]})}var ae=n(471),ce=n(231),re=n(469),oe=n(229),ie=n.n(oe),se=n(230),le=n.n(se),je=Object(S.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}}));function be(){var e=je(),t=Object(a.useState)(""),n=Object(i.a)(t,2),c=n[0],r=n[1],o=Object(a.useState)(""),s=Object(i.a)(o,2),l=s[0],f=s[1],S=Object(a.useState)(""),N=Object(i.a)(S,2),B=N[0],P=N[1],W=Object(a.useState)(!1),z=Object(i.a)(W,2),E=z[0],L=z[1],F=Object(a.useState)(!1),I=Object(i.a)(F,2),D=I[0],H=I[1],R=Object(a.useContext)(C),A=Object(j.g)();return Object(y.jsxs)(k.a,{component:"main",maxWidth:"xs",children:[Object(y.jsx)(u.a,{}),Object(y.jsxs)("div",{className:e.paper,children:[Object(y.jsx)(b.a,{className:e.avatar,children:Object(y.jsx)(v.a,{})}),Object(y.jsx)(w.a,{component:"h1",variant:"h5",children:"Sign in"}),Object(y.jsx)(w.a,{color:"error",children:B}),Object(y.jsxs)("form",{className:e.form,noValidate:!0,children:[Object(y.jsx)(h.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,value:c,onChange:function(e){return r(e.target.value)},id:"email",label:"Email Address",name:"email",autoFocus:!0}),Object(y.jsx)(h.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,onChange:function(e){return f(e.target.value)},value:l,name:"password",label:"Password",type:"password",id:"password"}),Object(y.jsx)(O.a,{control:Object(y.jsx)(m.a,{value:E,color:"primary",onChange:function(){return L(!E)}}),label:"Remember me"}),Object(y.jsx)(d.a,{fullWidth:!0,onClick:function(){H(!0),fetch("".concat(T,"/login"),{method:"POST",body:JSON.stringify({email:c,password:l}),headers:new Headers({"Content-Type":"application/json"})}).then((function(e){return e.json()})).then((function(e){H(!1),"error"!==e.status?(R.setEmail(c),R.setToken(e.token),console.log(e.token),E&&localStorage.setItem("token",e.token),A.push("/")):P(e.message)})).catch((function(e){console.error(e),P(String(e))}))},variant:"contained",color:"primary",className:e.submit,children:D?Object(y.jsx)(x.a,{color:"white"}):"Login"}),Object(y.jsxs)(p.a,{container:!0,children:[Object(y.jsx)(p.a,{item:!0,xs:!0,children:Object(y.jsx)(g.a,{href:"#",variant:"body2",children:"Forgot password?"})}),Object(y.jsx)(p.a,{item:!0,children:Object(y.jsx)(g.a,{href:"/signup",variant:"body2",children:"Don't have an account? Sign Up"})})]})]})]})]})}var de=n(468),ue=n(467),he=Object(S.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}));function Oe(){var e=he(),t=Object(a.useContext)(C),n=Object(j.g)();return Object(y.jsx)("div",{className:e.root,children:Object(y.jsx)(de.a,{position:"static",children:Object(y.jsxs)(ue.a,{children:[Object(y.jsx)(w.a,{variant:"h6",className:e.title,children:Object(y.jsx)(g.a,{href:"/",color:"inherit",style:{textDecoration:"none"},children:"Pipeline Product Distribution System"})}),Boolean(t.token)?Object(y.jsx)(d.a,{color:"inherit",onClick:t.logOut,children:"Logout"}):Object(y.jsx)(d.a,{color:"inherit",onClick:function(){return n.push("/login")},children:"Login"})]})})})}function me(){return Object(y.jsx)("div",{children:Object(y.jsx)(w.a,{variant:"h3",children:"404 Not Found!"})})}var xe=Object(S.a)((function(){return{content:{paddingTop:"100px"},all:{margin:"10px"}}}));function ge(){var e=Object(j.h)()._id,t=Object(a.useState)({}),n=Object(i.a)(t,2),c=n[0],r=n[1],o=Object(a.useState)(""),s=Object(i.a)(o,2),l=s[0],b=s[1],d=Object(a.useContext)(C),u=xe();return Object(a.useEffect)((function(){Boolean(e)&&fetch("".concat(T,"/blocks/").concat(e),{headers:new Headers({Authorization:"Bearer ".concat(d.token)})}).then((function(e){return e.json()})).then((function(e){"error"===(null===e||void 0===e?void 0:e.status)?b(e.message):r(e.block)})).catch((function(e){return b(String(e))}))}),[e,d.token]),Object(y.jsx)("div",{className:u.content,children:Boolean(l)?Object(y.jsxs)("div",{align:"center",children:[Object(y.jsx)(w.a,{variant:"h3",children:"Sorry an Unexpected error occurred!"}),Object(y.jsx)("p",{children:l})]}):Object(y.jsx)(A,{block:c,title:"Block ".concat(c._id," Created on ").concat(new Date(c.timestamp).toLocaleString())})})}var pe=Object(ce.a)({palette:{primary:{main:ie.a[600]},secondary:{main:le.a[600]}}});function fe(e){var t=e.component,n=e.authed,a=Object(l.a)(e,["component","authed"]);return console.log(n),Object(y.jsx)(j.b,Object(s.a)(Object(s.a)({},a),{},{exact:!0,render:function(e){return n?Object(y.jsx)(t,Object(s.a)({},e)):Object(y.jsx)(j.a,{to:{pathname:"/login",state:{from:e.location}}})}}))}var ve=function(){var e=Object(a.useState)(!0),t=Object(i.a)(e,2),n=t[0],c=t[1],r=Object(a.useContext)(C);return Object(a.useEffect)((function(){c(Boolean(r.token))}),[r.token]),Object(y.jsx)(re.a,{theme:pe,children:Object(y.jsxs)("div",{style:{minWidth:500},children:[Object(y.jsx)(Oe,{}),Object(y.jsx)("div",{className:"body",children:Object(y.jsxs)(j.d,{children:[Object(y.jsx)(fe,{authed:n,exact:!0,path:"/",component:M}),Object(y.jsx)(fe,{authed:n,exact:!0,path:"/blocks",component:te}),Object(y.jsx)(fe,{authed:n,path:"/blocks/:_id",component:ge}),Object(y.jsx)(j.b,{path:"/login",component:be}),Object(y.jsx)(j.b,{path:"/signup",component:P}),Object(y.jsx)(j.b,{path:"*",component:me})]})}),Object(y.jsx)(ae.a,{mt:5,children:Object(y.jsx)(ne,{})})]})})},we=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,479)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),a(e),c(e),r(e),o(e)}))};o.a.render(Object(y.jsx)(c.a.StrictMode,{children:Object(y.jsx)(W.a,{children:Object(y.jsx)(N,{children:Object(y.jsx)(ve,{})})})}),document.getElementById("root")),we()}},[[413,1,2]]]);
//# sourceMappingURL=main.3b04a12e.chunk.js.map