"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[609],{947:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>a});const s=JSON.parse('{"id":"operators/throttle","title":"throttle","description":"The throttle operator limits how frequently values are emitted by introducing a delay window.","source":"@site/docs/operators/throttle.md","sourceDirName":"operators","slug":"/operators/throttle","permalink":"/signux/docs/operators/throttle","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"docsSidebar","previous":{"title":"microThrottle","permalink":"/signux/docs/operators/microThrottle"}}');var r=n(2540),i=n(3023);const o={},l="throttle",d={},a=[{value:"\u2705 Basic usage",id:"-basic-usage",level:2},{value:"\u2699\ufe0f How it works",id:"\ufe0f-how-it-works",level:2},{value:"\ud83e\udde9 Use cases",id:"-use-cases",level:2},{value:"\ud83d\udce6 Signature",id:"-signature",level:2},{value:"\ud83d\udd00 Modes",id:"-modes",level:2},{value:"\ud83e\uddea Example with state",id:"-example-with-state",level:2}];function c(e){const t={admonition:"admonition",br:"br",code:"code",em:"em",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"throttle",children:"throttle"})}),"\n",(0,r.jsxs)(t.p,{children:["The ",(0,r.jsx)(t.code,{children:"throttle"})," operator limits how frequently values are emitted by introducing a delay window.",(0,r.jsx)(t.br,{}),"\n","It can emit either the ",(0,r.jsx)(t.strong,{children:"first"})," or ",(0,r.jsx)(t.strong,{children:"last"})," value in each window, depending on the mode."]}),"\n",(0,r.jsx)(t.hr,{}),"\n",(0,r.jsx)(t.h2,{id:"-basic-usage",children:"\u2705 Basic usage"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:'import { event } from "signux";\nimport { throttle } from "signux/operators";\n\nconst clicks = event<number>();\nconst throttled = clicks.pipe(throttle(300));\n\nthrottled.subscribe((n) => console.log("Click:", n));\n'})}),"\n",(0,r.jsx)(t.hr,{}),"\n",(0,r.jsx)(t.h2,{id:"\ufe0f-how-it-works",children:"\u2699\ufe0f How it works"}),"\n",(0,r.jsxs)(t.p,{children:["It enforces a time window (",(0,r.jsx)(t.code,{children:"delay"})," in milliseconds) where only one value is allowed through.",(0,r.jsx)(t.br,{}),"\n","In ",(0,r.jsx)(t.code,{children:'"lead"'})," mode (",(0,r.jsx)(t.em,{children:"default"}),"), the ",(0,r.jsx)(t.strong,{children:"first"})," value is emitted and the rest are ignored.",(0,r.jsx)(t.br,{}),"\n","In ",(0,r.jsx)(t.code,{children:'"trail"'})," mode, the ",(0,r.jsx)(t.strong,{children:"last"})," value is saved and emitted at the end of the delay."]}),"\n",(0,r.jsx)(t.hr,{}),"\n",(0,r.jsx)(t.h2,{id:"-use-cases",children:"\ud83e\udde9 Use cases"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Limit frequency of events like scroll, mousemove, or keypress"}),"\n",(0,r.jsx)(t.li,{children:"Prevent expensive computations from firing too often"}),"\n",(0,r.jsx)(t.li,{children:"Add spacing between reactive updates"}),"\n"]}),"\n",(0,r.jsx)(t.hr,{}),"\n",(0,r.jsx)(t.h2,{id:"-signature",children:"\ud83d\udce6 Signature"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:'function throttle<T>(delay: number, mode?: "lead" | "trail"): OperatorFn<T>;\n'})}),"\n",(0,r.jsx)(t.hr,{}),"\n",(0,r.jsx)(t.h2,{id:"-modes",children:"\ud83d\udd00 Modes"}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Mode"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsxs)(t.td,{children:[(0,r.jsx)(t.code,{children:'"lead"'})," (default)"]}),(0,r.jsxs)(t.td,{children:["Emits the ",(0,r.jsx)(t.strong,{children:"first"})," value immediately and ignores the rest until the delay ends"]})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:'"trail"'})}),(0,r.jsxs)(t.td,{children:["Waits until the delay ends and emits the ",(0,r.jsx)(t.strong,{children:"last"})," value received during that time"]})]})]})]}),"\n",(0,r.jsx)(t.hr,{}),"\n",(0,r.jsx)(t.h2,{id:"-example-with-state",children:"\ud83e\uddea Example with state"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:'const counter = state(0);\nconst delayed = counter.pipe(throttle(500, "trail"));\n'})}),"\n",(0,r.jsx)(t.admonition,{type:"info",children:(0,r.jsxs)(t.p,{children:["Use ",(0,r.jsx)(t.code,{children:'"lead"'})," mode when you want to react right away, and ",(0,r.jsx)(t.code,{children:'"trail"'})," mode to wait and emit the final result."]})})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},3023:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>l});var s=n(3696);const r={},i=s.createContext(r);function o(e){const t=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(i.Provider,{value:t},e.children)}}}]);