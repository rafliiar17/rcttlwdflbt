import{C as d,w as e}from"./index-CWlcsfJx.js";import{R as l}from"./proxy-CwtEobr4-BmSVccJ_.js";const u={en:{1:{logo:"./img/smapul.png",name:"Vocational High School of SUMATRA 40 Bandung",degree:"Software Engineer",time:"2017 - 2020"},2:{logo:"",name:"",degree:"",time:""}},id:{1:{logo:"./img/smapul.png",name:"SMK Sumatra 40 Bandung",degree:"Rekayasa Perangkat Lunak",time:"2017 - 2020"},2:{logo:"",name:"",degree:"",time:""}}},k={lang:u};/**
* @license lucide-react v0.474.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const f=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),g=(...r)=>r.filter((t,s,o)=>!!t&&t.trim()!==""&&o.indexOf(t)===s).join(" ").trim();/**
* @license lucide-react v0.474.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/var v={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
* @license lucide-react v0.474.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const w=d.forwardRef(({color:r="currentColor",size:t=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:a="",children:i,iconNode:n,...h},x)=>d.createElement("svg",{ref:x,...v,width:t,height:t,stroke:r,strokeWidth:o?Number(s)*24/Number(t):s,className:g("lucide",a),...h},[...n.map(([p,y])=>d.createElement(p,y)),...Array.isArray(i)?i:[i]]));/**
* @license lucide-react v0.474.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const c=(r,t)=>{const s=d.forwardRef(({className:o,...a},i)=>d.createElement(w,{ref:i,iconNode:t,className:g(`lucide-${f(r)}`,o),...a}));return s.displayName=`${r}`,s};/**
* @license lucide-react v0.474.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const b=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 18h.01",key:"lrp35t"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M16 18h.01",key:"kzsmim"}]],N=c("CalendarDays",b);/**
* @license lucide-react v0.474.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const j=[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]],m=c("GraduationCap",j);/**
* @license lucide-react v0.474.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/const M=[["path",{d:"M14 22v-4a2 2 0 1 0-4 0v4",key:"hhkicm"}],["path",{d:"m18 10 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.382a1 1 0 0 1 .553-.894L6 10",key:"1xqip1"}],["path",{d:"M18 5v17",key:"1sw6gf"}],["path",{d:"m4 6 7.106-3.553a2 2 0 0 1 1.788 0L20 6",key:"9d2mlk"}],["path",{d:"M6 5v17",key:"1xfsm0"}],["circle",{cx:"12",cy:"9",r:"2",key:"1092wv"}]],C=c("School",M),E=({lang:r="en"})=>{const t=k.lang[r],s=t?Object.values(t).filter(a=>{var i;return(i=a==null?void 0:a.name)==null?void 0:i.trim()}):[],o={hidden:{opacity:0,y:20,scale:.95},visible:{opacity:1,y:0,scale:1,transition:{type:"spring",stiffness:100,damping:20}}};return e.jsxs("div",{className:"max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12",children:[e.jsx("div",{className:"text-center mb-16",children:e.jsxs(l.h2,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-4xl font-bold text-white dark:text-white mb-4 relative inline-flex items-center",children:[e.jsx(C,{className:"w-8 h-8 mr-3 text-indigo-600 dark:text-indigo-400"}),"Education Journey",e.jsx("span",{className:"absolute -bottom-2 left-0 right-0 mx-auto w-16 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full"})]})}),e.jsx("div",{className:"grid gap-8 md:grid-cols-2 lg:grid-cols-3",children:s.length>0?s.map((a,i)=>e.jsxs(l.div,{className:"group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-2xl",variants:o,initial:"hidden",animate:"visible",whileHover:{y:-5,transition:{type:"spring",stiffness:300}},custom:i,children:[e.jsx("div",{className:"absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-100/20 to-purple-100/20 dark:from-indigo-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"}),e.jsxs("div",{className:"relative space-y-6",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 p-1.5 shadow-lg",children:e.jsx("div",{className:"w-full h-full rounded-[8px] bg-white dark:bg-gray-800 flex items-center justify-center",children:a.logo?e.jsx("img",{src:a.logo,alt:`${a.name} logo`,className:"w-8 h-8 object-contain",onError:n=>{n.currentTarget.src="/placeholder-logo.png"}}):e.jsx(m,{className:"w-6 h-6 text-indigo-600 dark:text-indigo-400"})})}),e.jsx("h3",{className:"text-xl font-bold text-gray-900 dark:text-white",children:a.name})]}),a.degree&&e.jsxs("div",{className:"flex items-center gap-3 text-gray-600 dark:text-gray-300",children:[e.jsx(m,{className:"w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0"}),e.jsx("p",{className:"text-base font-medium",children:a.degree})]}),a.time&&e.jsxs("div",{className:"flex items-center gap-3 text-gray-500 dark:text-gray-400",children:[e.jsx(N,{className:"w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0"}),e.jsx("p",{className:"text-sm font-medium",children:a.time})]})]})]},i)):e.jsx(l.div,{className:"col-span-full text-center p-8 rounded-xl bg-gray-50 dark:bg-gray-900",initial:{opacity:0},animate:{opacity:1},children:e.jsx("div",{className:"text-gray-500 dark:text-gray-400 text-lg",children:"No education records found"})})})]})};export{E as Education,E as default};
