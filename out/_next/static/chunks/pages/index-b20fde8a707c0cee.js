(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(e,t,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return l(8749)}])},8749:function(e,t,l){"use strict";l.r(t),l.d(t,{default:function(){return g}});var n=l(5893),c=l(1189),r=l.n(c),a=l(7294),s=l(9008),i=l.n(s),o=l(9034),_=l.n(o),m=l(120);function u(e){let{lines:t}=e,[l,c]=(0,a.useState)({}),[r,s]=(0,a.useState)(""),[i,o]=(0,a.useState)(100);if((0,a.useEffect)(()=>{if(!t||!t.length)return;let e=i,l=0;for(;t.length>e;){if(++l>100)return;let n=t.length-e,c=d([t[n]],{},"")[0];if(c.date||c.meta.length||c.level||c.source)break;e+=1}e!=i&&o(e)},[i,t]),!t||!t.length)return(0,n.jsx)("div",{});let m=(0,n.jsx)("div",{className:_().prev,children:"0 left"}),u=t;if(t.length>i){let e=t.length-i;u=t.slice(e,t.length),m=(0,n.jsxs)("div",{className:_().prevactive,onClick:function(){let e=i+1;for(let l=e;t.length>l;l++){let e=t[t.length-l];if(e.search_match){o(l);return}}o(i+50)},children:["↑...",e," more"]})}let g=d(u,l,r);function v(e){let t=l[e.num]||0;c(l=>({...l,[e.num]:t+1}))}function x(){window.getSelection()?s(window.getSelection().toString()):s("")}return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:_().counter,children:[m,(0,n.jsxs)("div",{className:_().count,children:[u.length," shown"]})]}),(0,n.jsx)(h,{marks:l,loglines:g}),(0,n.jsx)("div",{className:_().logcontainer,onMouseUp:x,onDoubleClick:x,children:g.map(e=>(0,n.jsx)(f,{ll:e,mark:v,sel:r},e.num))})]})}function h(e){let{loglines:t,marks:l}=e,c={};for(let e in l){let t=c[l[e]]||0;c[l[e]]=t+1}let r=[];for(let e in c){if(!(e%3))continue;let a=_()["mark".concat(e%3)]||"";r.push((0,n.jsxs)("div",{className:"".concat(_().markscopy," ").concat(a),onClick:()=>(function(e){let n=[];for(let c in l){if(l[c]!=e)continue;let r=function(e){for(let l=0;l<t.length;l++){let n=t[l];if(n.num==e)return n}}(c);r&&n.push(r.txt)}0!=n.length&&navigator.clipboard.writeText(n.join("\n")).then(()=>alert("copied to clipboard")).catch(e=>console.error(e))})(e),children:[(0,n.jsx)("div",{className:_().mark},e),(0,n.jsx)("div",{children:c[e]})]},e))}return(0,n.jsx)("div",{className:_().markscopycont,children:r})}function f(e){var t;let{ll:l,mark:c,sel:r}=e,a=_()["mark".concat((l.mark||0)%3)]||"",s=_()["level-".concat(l.level).toLowerCase()]||"",i="";!1===l.search_match&&(i=_().search_result_fail),!0===l.search_match&&(i=_().search_result_pass);let o=l.date||l.level;return(0,n.jsxs)("div",{className:"".concat(_().logline," ").concat(s," ").concat(a," ").concat(i),children:[(0,n.jsx)("div",{className:_().mark,onClick:()=>c(l)}),(0,n.jsxs)("div",{className:_().logcontent,children:[o?(0,n.jsxs)("div",{className:_().logline_header,children:[(0,n.jsx)("div",{className:_().date,children:l.date&&l.date.toLocaleString(m.ou.DATETIME_FULL)}),(0,n.jsx)("div",{className:_().level,children:l.level&&"[".concat(l.level,"]")}),l.source?(0,n.jsxs)("div",{className:_().source,children:[l.source,": "]}):""]}):"",(0,n.jsx)("div",{className:_().msgcont,children:(0,n.jsx)("div",{className:_().msg,children:(t=function(e){if(!r||r.length<5)return e;let t=RegExp(r.replace(/[/\-\\^$*+?.()|[\]{}]/g,"\\$&"),"gi");return e.replace(t,'<span class="'.concat(_().selected,'">$&</span>'))}(t=function(e){if(!l.level||"error"!=l.level.toLowerCase())return e;let t=e.split(/[\r\n]/g),n=!1;return(t=t.map(e=>e.startsWith("at ")?(n=!0,'<span class="'.concat(_().err_stack_minim,'">').concat(e,"</span>")):'<span class="'.concat(_().err_stack_hl,'">').concat(e,"</span>")),n)?(t.unshift('<div class="'.concat(_().err_stack_block,'">')),t.push("</div>"),t.join("\n")):e}(t=l.msg)),(0,n.jsx)("div",{dangerouslySetInnerHTML:{__html:t}}))})}),(0,n.jsx)("div",{className:_().metacont,children:l.meta.map((e,t)=>(0,n.jsx)("div",{className:_().meta,children:e},t))})]})]})}function d(e,t,l){let n=[],c=()=>({txt:null,meta:[],date:null,level:null,source:null,msg:null,num:null,search_match:null}),r=c();return e.forEach(e=>{r.txt?r.txt+="\n"+e.txt:r.txt=e.txt;let l={line_left:e.txt,curr_chunk:null};for(;;){r.date||(r.date=function(e){let t=e.line_left,l=t.length;for(l>35&&(l=35);l>8;){let n=function(e){let t=[m.ou.fromISO,m.ou.fromRFC2822,m.ou.fromHTTP,m.ou.fromSQL];for(let l=0;l<t.length;l++){let n=t[l](e);if(!n.invalid)return n}}(t.substring(0,l));if(n)return e.curr_chunk=null,e.line_left=e.line_left.substring(l).trim(),n;l--}}(l));let e=function(e){if(!e.line_left)return null;let t=/^\s*\[/,l=e.line_left.match(t);if(l){let t=e.line_left.indexOf("]");return e.curr_chunk=e.line_left.substring(l[0].length,t).trim(),e.line_left=e.line_left.substring(t+1).trim(),e.curr_chunk}return t=/[\s:-]+/,(l=e.line_left.match(t))?(e.curr_chunk=e.line_left.substring(0,l.index),e.line_left=e.line_left.substring(l.index+l[0].length)):(e.curr_chunk=e.line_left,e.line_left=""),e.curr_chunk}(l);if(!e){l.line_left=r.meta.join(" "),r.meta=[];break}if(r.level){r.source=e;break}if(/^(INFO|DEBUG|TRACE|WARN|ERROR)$/.test(e)){r.level=e;continue}r.meta.push(e)}if(0==n.length||r.date||r.level||r.sources||r.meta.length)r.msg=l.line_left,r.num=e.num,r.mark=t[r.num],!0===e.search_match&&(r.search_match=!0),!1!==e.search_match||r.search_match||(r.search_match=!1),n.push(r);else if(l.line_left){let t=n[n.length-1];e.search_match&&(t.search_match=!0),!0===e.search_match&&(t.search_match=!0),!1!==e.search_match||t.search_match||(t.search_match=!1),t.msg+="\n"+l.line_left,t.txt+="\n"+r.txt}r=c()}),n}function g(){let[e,t]=(0,a.useState)(""),[l,c]=(0,a.useState)(""),s=null;if(l){try{s=RegExp(l,"i")}catch(e){}if(!s)try{s=RegExp(escapeRegex(l),"i")}catch(e){}}let o=e?e.split(/[\r\n]+/g).map((e,t)=>{if(!(e=e.trim()))return null;let l=s?-1!=e.search(s):null;return{txt:e,num:t+1,search_match:l}}).filter(e=>e):null;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(i(),{children:[(0,n.jsx)("title",{children:"Log Viewer"}),(0,n.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,n.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,n.jsxs)("main",{className:"".concat(_().main," ").concat(r().className),children:[(0,n.jsxs)("div",{className:_().entry,children:[(0,n.jsx)("p",{children:"Paste your log below:"}),(0,n.jsx)("textarea",{value:e,onChange:e=>t(e.target.value)})]}),(0,n.jsxs)("div",{className:_().display,children:[(0,n.jsx)("div",{className:_().title,children:"Log Viewer"}),(0,n.jsx)(v,{search:l,setSearch:c}),(0,n.jsx)(u,{search:l,lines:o})]})]})]})}function v(e){let{search:t,setSearch:l}=e;return(0,n.jsx)("div",{className:_().searchcont,children:(0,n.jsx)("input",{value:t,onChange:e=>l(e.target.value),className:_().search,type:"text",placeholder:"/search"})})}},9034:function(e){e.exports={main:"Home_main__VkIEL",entry:"Home_entry__X8Bja",display:"Home_display__56dAz",title:"Home_title__hYX6j",logcontainer:"Home_logcontainer__CyUhO",logline:"Home_logline__g8Pf1",logline_header:"Home_logline_header__ze9nN",mark:"Home_mark__b_dIg",mark1:"Home_mark1__AIQI1",mark2:"Home_mark2___Q2PZ",mark3:"Home_mark3__hrzUt",level:"Home_level__xAg8_","level-info":"Home_level-info__Oemhl","level-debug":"Home_level-debug__wDn86","level-trace":"Home_level-trace__ytLQt","level-warn":"Home_level-warn__mKfnC","level-error":"Home_level-error__m8DLE",metacont:"Home_metacont__eNkUj",meta:"Home_meta__0C54M",source:"Home_source__jRho6",msgcont:"Home_msgcont__obYpG",logcontent:"Home_logcontent__VmB25",selected:"Home_selected___eC_c",counter:"Home_counter__iKDqL",prevactive:"Home_prevactive__bkW44",searchcont:"Home_searchcont__VIGkw",search:"Home_search__6cQww",search_result_fail:"Home_search_result_fail__h7qlT",search_result_pass:"Home_search_result_pass__P9bHO",markscopycont:"Home_markscopycont__DHXnL",markscopy:"Home_markscopy__t2hq_",err_stack_block:"Home_err_stack_block__1L4vl",err_stack_hl:"Home_err_stack_hl___0ttg",err_stack_minim:"Home_err_stack_minim__uBv6C"}}},function(e){e.O(0,[251,774,888,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);