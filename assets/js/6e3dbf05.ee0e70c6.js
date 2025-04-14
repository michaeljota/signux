"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[920],{3023:(e,n,t)=>{t.d(n,{R:()=>c,x:()=>a});var s=t(3696);const r={},i=s.createContext(r);function c(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),s.createElement(i.Provider,{value:n},e.children)}},3816:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>u,frontMatter:()=>c,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"primitives/state","title":"State","description":"state(initialState?: T)","source":"@site/docs/primitives/state.md","sourceDirName":"primitives","slug":"/primitives/state","permalink":"/signux/docs/primitives/state","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"docsSidebar","previous":{"title":"Primitives","permalink":"/signux/docs/category/primitives"},"next":{"title":"Event","permalink":"/signux/docs/primitives/event"}}');var r=t(2540),i=t(3023);const c={sidebar_position:1},a="State",o={},d=[{value:"\u2705 Basic usage",id:"-basic-usage",level:2},{value:"\u26a1 Adding reactions",id:"-adding-reactions",level:2},{value:"\ud83d\udce6 API",id:"-api",level:2},{value:"\u270d\ufe0f Example: counter",id:"\ufe0f-example-counter",level:2},{value:"\u2139\ufe0f Notes",id:"\u2139\ufe0f-notes",level:2}];function l(e){const n={code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"state",children:"State"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"state<T>(initialState?: T)"})}),"\n",(0,r.jsx)(n.p,{children:"Creates a reactive state container. It holds a value, lets you read it like a function, and subscribe to updates."}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"-basic-usage",children:"\u2705 Basic usage"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:'import { state } from "signux";\r\n\r\nconst count = state(0);\r\n\r\nconsole.log(count()); // 0\n'})}),"\n",(0,r.jsx)(n.h2,{id:"-adding-reactions",children:"\u26a1 Adding reactions"}),"\n",(0,r.jsxs)(n.p,{children:["Calling ",(0,r.jsx)(n.code,{children:"state(0)"})," creates a state that doesn't change by itself.\r\nIf you want it to react to something, use ",(0,r.jsx)(n.code,{children:".on(...)"})," and ",(0,r.jsx)(n.code,{children:".create()"}),":"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:'import { event } from "signux";\r\n\r\nconst increment = event();\r\nconst count = state(0)\r\n  .on(increment, (current) => current + 1)\r\n  .create();\n'})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"-api",children:"\ud83d\udce6 API"}),"\n",(0,r.jsxs)(n.p,{children:["A ",(0,r.jsx)(n.code,{children:"State<T>"})," exposes:"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"(): T"})," \u2192 get the current value"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"subscribe(fn)"})," \u2192 listen to updates"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:".on(source, reducer)"})," \u2192 define how it reacts to external events"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:".pipe(...operators)"})," \u2192 apply reactive transformations"]}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"\ufe0f-example-counter",children:"\u270d\ufe0f Example: counter"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"const increment = event();\r\nconst decrement = event();\r\n\r\nconst count = state(0)\r\n  .on(increment, (n) => n + 1)\r\n  .on(decrement, (n) => n - 1)\r\n  .create();\n"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"\u2139\ufe0f-notes",children:"\u2139\ufe0f Notes"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["If you don't add reactions with ",(0,r.jsx)(n.code,{children:".on()"}),", the state is read-only and constant."]}),"\n",(0,r.jsxs)(n.li,{children:["Every ",(0,r.jsx)(n.code,{children:".on(...)"})," returns a builder. Only ",(0,r.jsx)(n.code,{children:".create()"})," returns the final state."]}),"\n",(0,r.jsxs)(n.li,{children:["You can use ",(0,r.jsx)(n.code,{children:".pipe(...)"})," at any point to create derived data streams."]}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}}}]);