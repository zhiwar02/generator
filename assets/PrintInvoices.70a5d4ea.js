import{_ as f,r,x,i as y,c as _,a as s,t as n,e as I,au as k,o as u,p as w,h as P,d as v}from"./index.0c486574.js";import{g as S,b as B}from"./invoices.1a471464.js";const c=i=>(w("data-v-62f7d773"),i=i(),P(),i),C={key:0,class:"invoice-container",dir:"rtl"},D={class:"invoice-card",style:{position:"relative"}},N={class:""},E=c(()=>s("h1",{class:"text-2xl ml-4 mb-4 text-center"},"\u0645\u06C6\u0644\u06CC\u062F\u06D5\u06CC \u0626\u06D5\u0647\u0644\u06CC \u062E\u06D5\u0644\u06D5\u06A9\u0627\u0646",-1)),R=c(()=>s("div",{class:"owner-info"},[s("div",{class:"text-xl mb-3"},[s("span",null,"\u062E\u0627\u0648\u06D5\u0646 \u0645\u06C6\u0644\u06CC\u062F\u06D5:"),v(),s("strong",null,"\u0633\u06D5\u0631\u0628\u06D5\u0633\u062A \u06CC\u0627\u0633\u06CC\u0646")]),s("div",{class:"text-xl mb-3"},[s("span",null,"\u0698\u0645\u0627\u0631\u06D5\u06CC \u0645\u06C6\u0628\u0627\u06CC\u0644:"),v(),s("strong",null,"0750 260 4616")])],-1)),U={class:"d-flex justify-between mb-3"},V={class:"text-lg my-1"},W={class:"text-lg my-1"},j={class:"invoice-id",style:{position:"absolute",left:"1px",top:"3px"}},G={class:"card-details"},L={class:"detail-item"},M=c(()=>s("span",null,"\u0646\u0631\u062E\u06CC \u0647\u06D5\u0631 \u0626\u06D5\u0645\u067E\u06CE\u0631\u06CE\u06A9:",-1)),T={class:"detail-item"},q=c(()=>s("span",null,"\u0698\u0645\u0627\u0631\u06D5\u06CC \u0626\u06D5\u0645\u067E\u06CE\u0631:",-1)),z={class:"detail-item total"},A=c(()=>s("span",null,"\u06A9\u06C6\u06CC \u06AF\u0634\u062A\u06CC:",-1)),F={key:1,class:"loading"},H=c(()=>s("p",null,"\u0628\u0627\u0631\u06A9\u0631\u062F\u0646\u06CC \u067E\u06D5\u06CC\u0648\u06D5\u0646\u062F\u06CC\u062F\u0627\u0631...",-1)),J={__name:"PrintInvoices",setup(i){const p=I(),h=k(),e=r(null),a=r({price:0}),d=()=>{p.go(-1)};x(()=>invoices.value.reduce((t,l)=>{var o;return t+a.value.price*(((o=l.user)==null?void 0:o.amps)||1)},0));const m=async()=>{try{const t=await S();a.value=t!==null?t:0}catch(t){console.error("Error fetching global price:",t),a.value=0}},b=async t=>{const l=await B();e.value=l.find(o=>o.id===Number(t))};y(async()=>{const t=h.params.id;await b(t),await m()});const g=()=>{window.print()};return(t,l)=>{var o;return e.value?(u(),_("div",C,[s("div",D,[s("div",N,[s("div",null,[E,R,s("div",U,[s("h2",V,"\u0628\u06D5\u0631\u06CE\u0632:"+n(e.value.user.name),1),s("p",W,n(new Date(e.value.date).toLocaleDateString()),1),s("div",j,[s("span",null,"#"+n(e.value.id),1)])])])]),s("div",G,[s("div",L,[M,s("strong",null,n(a.value)+" \u0647\u06D5\u0632\u0627\u0631 \u062F\u06CC\u0646\u0627\u0631",1)]),s("div",T,[q,s("strong",null,n(e.value.user.amps),1)]),s("div",z,[A,s("strong",null,n(a.value*((o=e.value.user)==null?void 0:o.amps))+" \u0647\u06D5\u0632\u0627\u0631 \u062F\u06CC\u0646\u0627\u0631",1)])])]),s("div",{class:"actions"},[s("button",{class:"btn print",onClick:g},"\u062F\u0627\u06AF\u0631\u062A\u0646\u06CC \u067E\u0633\u0648\u06B5\u06D5"),s("button",{class:"btn back",onClick:d},"\u06AF\u06D5\u0695\u0627\u0646\u062F\u0646\u06D5\u0648\u06D5")])])):(u(),_("div",F,[H,s("button",{class:"btn back",onClick:d},"\u06AF\u06D5\u0695\u0627\u0646\u062F\u0646\u06D5\u0648\u06D5")]))}}},Q=f(J,[["__scopeId","data-v-62f7d773"]]);export{Q as default};