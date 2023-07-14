(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(e,l,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(6616)}])},6616:function(e,l,t){"use strict";t.r(l),t.d(l,{default:function(){return m}});var n=t(5893),r=t(1189),s=t.n(r),a=t(7294),c=t(9008),i=t.n(c);t(5675);var _=t(9034),o=t.n(_),u=t(120);function m(){let[e,l]=(0,a.useState)(""),[t,r]=(0,a.useState)(""),c=t?RegExp(t,"i"):null,_=e?e.split(/[\r\n]+/g).map((e,l)=>{if(!(e=e.trim()))return null;let t=c?-1!=e.search(c):null;return{txt:e,num:l+1,search_match:t}}).filter(e=>e):null;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(i(),{children:[(0,n.jsx)("title",{children:"Log Viewer"}),(0,n.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,n.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,n.jsxs)("main",{className:"".concat(o().main," ").concat(s().className),children:[(0,n.jsxs)("div",{className:o().entry,children:[(0,n.jsx)("p",{children:"Paste your log below:"}),(0,n.jsx)("textarea",{value:e,onChange:e=>l(e.target.value)})]}),(0,n.jsxs)("div",{className:o().display,children:[(0,n.jsx)("div",{className:o().title,children:"Log Viewer"}),(0,n.jsx)(h,{search:t,setSearch:r}),(0,n.jsx)(d,{search:t,lines:_})]})]})]})}function h(e){let{search:l,setSearch:t}=e;return(0,n.jsx)("div",{className:o().searchcont,children:(0,n.jsx)("input",{value:l,onChange:e=>t(e.target.value),className:o().search,type:"text",placeholder:"/search"})})}function d(e){let{lines:l}=e,[t,r]=(0,a.useState)({}),[s,c]=(0,a.useState)(""),[i,_]=(0,a.useState)(100);if((0,a.useEffect)(()=>{if(!l||!l.length)return;let e=i,t=0;for(;l.length>e;){if(++t>100)return;let n=l.length-e,r=g([l[n]],{},"")[0];if(r.date||r.meta.length||r.level||r.source)break;e+=1}e!=i&&_(e)},[i,l]),!l||!l.length)return(0,n.jsx)("div",{});let u=(0,n.jsx)("div",{className:o().prev,children:"0 left"}),m=l;if(l.length>i){let e=l.length-i;m=l.slice(e,l.length),u=(0,n.jsxs)("div",{className:o().prevactive,onClick:function(){let e=i+1;for(let t=e;l.length>t;t++){let e=l[l.length-t];if(e.search_match){_(t);return}}_(i+50)},children:["↑...",e," more"]})}let h=g(m,t,s);function d(e){let l=t[e.num]||0;r(t=>({...t,[e.num]:l+1}))}function v(){window.getSelection()?c(window.getSelection().toString()):c("")}return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:o().counter,children:[u,(0,n.jsxs)("div",{className:o().count,children:[m.length," shown"]})]}),(0,n.jsx)("div",{className:o().logcontainer,onMouseUp:v,onDoubleClick:v,children:h.map(e=>(0,n.jsx)(f,{ll:e,mark:d,sel:s},e.num))})]})}function f(e){let{ll:l,mark:t,sel:r}=e,s=o()["mark".concat((l.mark||0)%3)],a=o()["level-".concat(l.level).toLowerCase()],c="";!1===l.search_match&&(c=o().search_result_fail),!0===l.search_match&&(c=o().search_result_pass);let i=l.date||l.level;return(0,n.jsxs)("div",{className:"".concat(o().logline," ").concat(a," ").concat(s," ").concat(c),children:[(0,n.jsx)("div",{className:o().mark,onClick:()=>t(l)}),(0,n.jsxs)("div",{className:o().logcontent,children:[i?(0,n.jsxs)("div",{className:o().logline_header,children:[(0,n.jsx)("div",{className:o().date,children:l.date&&l.date.toLocaleString(u.ou.DATETIME_FULL)}),(0,n.jsx)("div",{className:o().level,children:l.level&&"[".concat(l.level,"]")}),l.source?(0,n.jsxs)("div",{className:o().source,children:[l.source,": "]}):""]}):"",(0,n.jsx)("div",{className:o().msgcont,children:(0,n.jsx)("div",{className:o().msg,children:function(e){if(!r||r.length<5)return e;let l=RegExp(r.replace(/[/\-\\^$*+?.()|[\]{}]/g,"\\$&"),"gi");return e=e.replace(l,'<span class="'.concat(o().selected,'">$&</span>')),(0,n.jsx)("div",{dangerouslySetInnerHTML:{__html:e}})}(l.msg)})}),(0,n.jsx)("div",{className:o().metacont,children:l.meta.map((e,l)=>(0,n.jsx)("div",{className:o().meta,children:e},l))})]})]})}function g(e,l,t){let n=[],r=()=>({meta:[],date:null,level:null,source:null,msg:null,num:null,search_match:!1}),s=r();return e.forEach(e=>{let t={line_left:e.txt,curr_chunk:null};for(;;){s.date||(s.date=function(e){let l=e.line_left,t=l.length;for(t>35&&(t=35);t>8;){let n=function(e){let l=[u.ou.fromISO,u.ou.fromRFC2822,u.ou.fromHTTP,u.ou.fromSQL];for(let t=0;t<l.length;t++){let n=l[t](e);if(!n.invalid)return n}}(l.substring(0,t));if(n)return e.curr_chunk=null,e.line_left=e.line_left.substring(t).trim(),n;t--}}(t));let e=function(e){if(!e.line_left)return null;let l=/^\s*\[/,t=e.line_left.match(l);if(t){let l=e.line_left.indexOf("]");return e.curr_chunk=e.line_left.substring(t[0].length,l).trim(),e.line_left=e.line_left.substring(l+1).trim(),e.curr_chunk}return l=/[\s:-]+/,(t=e.line_left.match(l))?(e.curr_chunk=e.line_left.substring(0,t.index),e.line_left=e.line_left.substring(t.index+t[0].length)):(e.curr_chunk=e.line_left,e.line_left=""),e.curr_chunk}(t);if(!e){t.line_left=s.meta.join(" "),s.meta=[];break}if(s.level){s.source=e;break}if(/^(INFO|DEBUG|TRACE|WARN|ERROR)$/.test(e)){s.level=e;continue}s.meta.push(e)}if(0==n.length||s.date||s.level||s.sources||s.meta.length)s.msg=t.line_left,s.num=e.num,s.mark=l[s.num],e.search_match&&(s.search_match=!0),n.push(s);else if(t.line_left){let l=n[n.length-1];e.search_match&&(l.search_match=!0),l.msg+="\n"+t.line_left}s=r()}),n}},9034:function(e){e.exports={main:"Home_main__VkIEL",entry:"Home_entry__X8Bja",display:"Home_display__56dAz",title:"Home_title__hYX6j",logcontainer:"Home_logcontainer__CyUhO",logline:"Home_logline__g8Pf1",logline_header:"Home_logline_header__ze9nN",mark:"Home_mark__b_dIg",mark1:"Home_mark1__AIQI1",mark2:"Home_mark2___Q2PZ",mark3:"Home_mark3__hrzUt",level:"Home_level__xAg8_","level-info":"Home_level-info__Oemhl","level-debug":"Home_level-debug__wDn86","level-trace":"Home_level-trace__ytLQt","level-warn":"Home_level-warn__mKfnC","level-error":"Home_level-error__m8DLE",metacont:"Home_metacont__eNkUj",meta:"Home_meta__0C54M",source:"Home_source__jRho6",msgcont:"Home_msgcont__obYpG",logcontent:"Home_logcontent__VmB25",selected:"Home_selected___eC_c",counter:"Home_counter__iKDqL",prevactive:"Home_prevactive__bkW44",searchcont:"Home_searchcont__VIGkw",search:"Home_search__6cQww",search_result_fail:"Home_search_result_fail__h7qlT",search_result_pass:"Home_search_result_pass__P9bHO"}}},function(e){e.O(0,[602,774,888,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);