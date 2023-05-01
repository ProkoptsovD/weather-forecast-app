import{g,a as C,s as v,P as K,r as x,u as y,_,b as c,j as s,c as b,d as j,k as D,e as X,f as z,h as $,i as M,l as E,m as V,T as m,W as Y,B as R,w as F,n as O,R as Q,o as J,p as Z,q as tt}from"./index-b09efe70.js";import{S as et,G as N}from"./Stack-e8e0c183.js";function nt(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function st(t){return parseFloat(t)}function ot(t){return g("MuiCard",t)}C("MuiCard",["root"]);const at=["className","raised"],rt=t=>{const{classes:e}=t;return j({root:["root"]},ot,e)},it=v(K,{name:"MuiCard",slot:"Root",overridesResolver:(t,e)=>e.root})(()=>({overflow:"hidden"})),lt=x.forwardRef(function(e,n){const o=y({props:e,name:"MuiCard"}),{className:r,raised:a=!1}=o,l=_(o,at),i=c({},o,{raised:a}),d=rt(i);return s.jsx(it,c({className:b(d.root,r),elevation:a?8:void 0,ref:n,ownerState:i},l))}),ct=lt;function dt(t){return g("MuiCardActions",t)}C("MuiCardActions",["root","spacing"]);const ut=["disableSpacing","className"],pt=t=>{const{classes:e,disableSpacing:n}=t;return j({root:["root",!n&&"spacing"]},dt,e)},ht=v("div",{name:"MuiCardActions",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.root,!n.disableSpacing&&e.spacing]}})(({ownerState:t})=>c({display:"flex",alignItems:"center",padding:8},!t.disableSpacing&&{"& > :not(:first-of-type)":{marginLeft:8}})),mt=x.forwardRef(function(e,n){const o=y({props:e,name:"MuiCardActions"}),{disableSpacing:r=!1,className:a}=o,l=_(o,ut),i=c({},o,{disableSpacing:r}),d=pt(i);return s.jsx(ht,c({className:b(d.root,a),ownerState:i,ref:n},l))}),ft=mt;function gt(t){return g("MuiCardContent",t)}C("MuiCardContent",["root"]);const Ct=["className","component"],vt=t=>{const{classes:e}=t;return j({root:["root"]},gt,e)},xt=v("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(t,e)=>e.root})(()=>({padding:16,"&:last-child":{paddingBottom:24}})),yt=x.forwardRef(function(e,n){const o=y({props:e,name:"MuiCardContent"}),{className:r,component:a="div"}=o,l=_(o,Ct),i=c({},o,{component:a}),d=vt(i);return s.jsx(xt,c({as:a,className:b(d.root,r),ownerState:i,ref:n},l))}),_t=yt;function bt(t){return g("MuiSkeleton",t)}C("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const jt=["animation","className","component","height","style","variant","width"];let f=t=>t,B,I,P,T;const St=t=>{const{classes:e,variant:n,animation:o,hasChildren:r,width:a,height:l}=t;return j({root:["root",n,o,r&&"withChildren",r&&!a&&"fitContent",r&&!l&&"heightAuto"]},bt,e)},wt=D(B||(B=f`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),Rt=D(I||(I=f`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),$t=v("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.root,e[n.variant],n.animation!==!1&&e[n.animation],n.hasChildren&&e.withChildren,n.hasChildren&&!n.width&&e.fitContent,n.hasChildren&&!n.height&&e.heightAuto]}})(({theme:t,ownerState:e})=>{const n=nt(t.shape.borderRadius)||"px",o=st(t.shape.borderRadius);return c({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:X(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em"},e.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${o}${n}/${Math.round(o/.6*10)/10}${n}`,"&:empty:before":{content:'"\\00a0"'}},e.variant==="circular"&&{borderRadius:"50%"},e.variant==="rounded"&&{borderRadius:(t.vars||t).shape.borderRadius},e.hasChildren&&{"& > *":{visibility:"hidden"}},e.hasChildren&&!e.width&&{maxWidth:"fit-content"},e.hasChildren&&!e.height&&{height:"auto"})},({ownerState:t})=>t.animation==="pulse"&&z(P||(P=f`
      animation: ${0} 1.5s ease-in-out 0.5s infinite;
    `),wt),({ownerState:t,theme:e})=>t.animation==="wave"&&z(T||(T=f`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 1.6s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),Rt,(e.vars||e).palette.action.hover)),Mt=x.forwardRef(function(e,n){const o=y({props:e,name:"MuiSkeleton"}),{animation:r="pulse",className:a,component:l="span",height:i,style:d,variant:S="text",width:u}=o,p=_(o,jt),h=c({},o,{animation:r,component:l,variant:S,hasChildren:!!p.children}),w=St(h);return s.jsx($t,c({as:l,ref:n,className:b(w.root,a),ownerState:h},p,{style:c({width:u,height:i},d)}))}),kt=Mt;var k={},At=M;Object.defineProperty(k,"__esModule",{value:!0});var q=k.default=void 0,Lt=At($()),Ut=s,Wt=(0,Lt.default)((0,Ut.jsx)("path",{d:"M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"}),"Autorenew");q=k.default=Wt;var A={},zt=M;Object.defineProperty(A,"__esModule",{value:!0});var G=A.default=void 0,Nt=zt($()),Bt=s,It=(0,Nt.default)((0,Bt.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"}),"DeleteForever");G=A.default=It;var L={},Pt=M;Object.defineProperty(L,"__esModule",{value:!0});var H=L.default=void 0,Tt=Pt($()),Dt=s,Et=(0,Tt.default)((0,Dt.jsx)("path",{d:"M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}),"Star");H=L.default=Et;function Ft({cityId:t,to:e,coord:n,fetchDataFn:o=F.useGetWeatherByCityCoordsQuery,onItemDelete:r}){var U,W;const{data:a,isLoading:l,refetch:i}=o({latitude:n.lat,longitude:n.lon}),{latitude:d,longitude:S}=E(V),[u]=(a==null?void 0:a.weather)??[],p=((U=u==null?void 0:u.description[0])==null?void 0:U.toUpperCase())+((W=u==null?void 0:u.description)==null?void 0:W.slice(1)),h=Math.ceil(d)===Math.ceil(n.lat)&&Math.ceil(S)===Math.ceil(n.lon);function w(){r(t)}return!l&&a?s.jsxs(ct,{sx:{minWidth:275,position:"relative"},children:[h?s.jsx(H,{sx:{position:"absolute",right:"1rem",top:"0.5rem",color:"gold"}}):null,s.jsxs(_t,{children:[s.jsxs(m,{variant:"h2",sx:{fontSize:14,fontWeight:700},color:"text.secondary",gutterBottom:!0,children:[a.name,", ",a.sys.country]}),s.jsxs(et,{direction:"row",alignItems:"center",spacing:.5,children:[s.jsx("img",{src:`${Y.WEATHER_ICON_URL}/${a.weather[0].icon}.png`,alt:"weather icon"}),s.jsxs(m,{sx:{fontWeight:700},children:[a.main.temp,"℃"]})]}),s.jsxs(m,{variant:"body2",sx:{fontWeight:700,display:"WebkitBox",WebkitBoxOrient:"vertical",WebkitLineClamp:"1",overflow:"hidden"},children:["Feels like: ",a.main.feels_like,"℃. ",p]})]}),s.jsxs(ft,{sx:{padding:"0 0.5rem 0.5rem 0.5rem"},children:[s.jsx(R,{href:e,size:"small",sx:{textTransform:"capitalize",outline:"none !important"},children:"More"}),s.jsxs(R,{onClick:i,size:"small",color:"success",sx:{textTransform:"capitalize",outline:"none !important"},children:["Update",s.jsx(q,{sx:{width:"1rem",marginLeft:"0.5rem"}})]}),s.jsxs(R,{onClick:w,size:"small",color:"error",sx:{textTransform:"capitalize",outline:"none !important"},children:["Delete",s.jsx(G,{sx:{width:"1.125rem",marginLeft:"0.5rem"}})]})]})]}):s.jsx(kt,{variant:"rectangular",width:210,height:118})}function Ot({list:t,onItemDelete:e}){return s.jsx(O,{sx:{flexGrow:1},padding:"1rem 0 0 0",children:s.jsx(N,{container:!0,component:"ul",spacing:2,children:t.map(({id:n,coord:o})=>s.jsx(N,{item:!0,component:"li",xs:4,children:s.jsx(Ft,{cityId:n,to:Q.CITY+`?lat=${o.latitude}&lon=${o.longitude}`,coord:{lat:o.latitude,lon:o.longitude},fetchDataFn:F.useGetWeatherByCityCoordsQuery,onItemDelete:e})},n))})})}const qt=t=>t.pinnedCities,Gt=J(qt,t=>t.list);function Xt(){const t=E(Gt),e=Z();return s.jsx(O,{component:"section",children:t.length?s.jsx(Ot,{list:t,onItemDelete:n=>e(tt.actions.removeCityFromPinned({cityId:n}))}):s.jsx(m,{sx:{fontSize:24,textAlign:"center",paddingTop:"4rem"},color:"text.secondary",children:"Any city has not been added yet..."})})}export{Xt as default};
