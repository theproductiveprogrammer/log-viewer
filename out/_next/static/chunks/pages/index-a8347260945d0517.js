(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(e,t,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return l(8749)}])},8749:function(e,t,l){"use strict";l.r(t),l.d(t,{default:function(){return V}});var n=l(5893),r=l(1189),a=l.n(r),s=l(7294),i=l(9008),c=l.n(i),o=l(1163),_=l(9034),u=l.n(_),m=l(9818),h=l.n(m),d=l(120),g=l(3852);l(9755);let f=Object.assign({},g.jF,{container:h().json_container,label:h().json_label,nullValue:h().json_nullValue,stringValue:h().json_stringValue});function v(e){let{title:t,txt:l}=e,[r,a]=(0,s.useState)(""),i=null;if(r){try{i=RegExp(r,"i")}catch(e){}if(!i)try{i=RegExp(escapeRegex(r),"i")}catch(e){}}let c=l?l.split(/[\r\n]+/g).map((e,t)=>{if(!(e=e.trim()))return null;let l=i?-1!=e.search(i):null;return{txt:e,num:t+1,search_match:l}}).filter(e=>e):null;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:h().title,children:t}),(0,n.jsx)(x,{lines:c,search:r,setSearch:a}),(0,n.jsx)(j,{lines:c})]})}async function p(e){if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(e);else{let t=document.createElement("textarea");t.value=e,t.style.position="absolute",t.style.left="-999999px",document.body.prepend(t),t.select();try{document.execCommand("copy")}catch(e){console.error(e)}finally{t.remove()}}}function x(e){let{lines:t,search:l,setSearch:r}=e,a=0;return t&&t.forEach(e=>{e.search_match&&a++}),(0,n.jsxs)("div",{className:h().searchcont,children:[(0,n.jsx)("input",{value:l,onChange:e=>r(e.target.value),className:h().search,type:"text",placeholder:"/search"}),l?(0,n.jsxs)("div",{className:h().srcont,children:[(0,n.jsxs)("div",{className:h().srcopy,onClick:function(){if(!t)return;let e=t.filter(e=>e.search_match).map(e=>e.txt);e.length&&p(e.join("\n")).then(()=>alert("copied to clipboard")).catch(e=>console.error(e))},children:["\uD83D\uDD0D ",a]}),(0,n.jsx)("div",{className:h().srclear,onClick:()=>r(""),children:"ⓧ"})]}):""]})}function j(e){let{lines:t}=e,[l,r]=(0,s.useState)({}),[a,i]=(0,s.useState)(""),[c,o]=(0,s.useState)(100);if((0,s.useEffect)(()=>{if(!t||!t.length)return;let e=c,l=0;for(;t.length>e;){if(++l>100)return;let n=t.length-e,r=L([t[n]],{},"")[0];if(r.date||r.meta.length||r.level||r.source)break;e+=1}e!=c&&o(e)},[c,t]),!t||!t.length)return(0,n.jsx)("div",{});let _=(0,n.jsx)("div",{className:h().prev,children:"0 left"}),u=t;if(t.length>c){let e=t.length-c;u=t.slice(e,t.length),_=(0,n.jsxs)("div",{className:h().prevactive,onClick:function(){let e=c+1;for(let l=e;t.length>l;l++){let e=t[t.length-l];if(e.search_match){o(l);return}}o(c+50)},children:["↑...",e," more"]})}let m=L(u,l,a);function d(e){let t=l[e.num]||0,n=(t+1)%3;r(t=>({...t,[e.num]:n}))}function g(){window.getSelection()?i(window.getSelection().toString()):i("")}return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:h().counter,children:[_,(0,n.jsxs)("div",{className:h().count,children:[u.length," shown"]})]}),(0,n.jsx)(w,{marks:l,loglines:m}),(0,n.jsx)("div",{className:h().logcontainer,onMouseUp:g,onDoubleClick:g,children:m.map(e=>(0,n.jsx)(k,{ll:e,mark:d,sel:a},e.num))})]})}function w(e){let{loglines:t,marks:l}=e,r={};for(let e in l){let t=r[l[e]]||0;r[l[e]]=t+1}let a=[];for(let e in r){if(!e||"0"==e)continue;let s=h()["mark".concat(e)]||"";a.push((0,n.jsxs)("div",{className:"".concat(h().markscopy," ").concat(s),onClick:()=>(function(e){let n=[];for(let r in l){if(l[r]!=e)continue;let a=function(e){for(let l=0;l<t.length;l++){let n=t[l];if(n.num==e)return n}}(r);a&&n.push(a.txt)}0!=n.length&&p(n.join("\n")).then(()=>alert("copied to clipboard")).catch(e=>console.error(e))})(e),children:[(0,n.jsx)("div",{className:h().mark},e),(0,n.jsx)("div",{children:r[e]})]},e))}return(0,n.jsxs)("div",{className:h().markscopycont,children:[a,"\xa0"]})}function k(e){var t;let{ll:l,mark:r,sel:a}=e,s=h()["mark".concat(l.mark||0)]||"",i=h()["level-".concat(l.level).toLowerCase()]||"",c="";!1===l.search_match&&(c=h().search_result_fail),!0===l.search_match&&(c=h().search_result_pass);let o=l.date||l.level;return(0,n.jsxs)("div",{className:"".concat(h().logline," ").concat(i," ").concat(s," ").concat(c),children:[(0,n.jsx)("div",{className:h().mark,onClick:()=>r(l)}),(0,n.jsxs)("div",{className:h().logcontent,children:[o?(0,n.jsxs)("div",{className:h().logline_header,children:[(0,n.jsx)("div",{className:h().date,children:l.date&&l.date.toLocaleString(d.ou.DATETIME_FULL)}),(0,n.jsx)("div",{className:h().level,children:l.level&&"[".concat(l.level,"]")}),l.source?(0,n.jsxs)("div",{className:h().source,children:[l.source,": "]}):""]}):"",(0,n.jsxs)("div",{className:h().msgcont,children:[(0,n.jsx)("div",{className:h().msg,children:(t=function(e){if(!a||a.length<5)return e;let t=RegExp(a.replace(/[/\-\\^$*+?.()|[\]{}]/g,"\\$&"),"gi");return e.replace(t,'<span class="'.concat(h().selected,'">$&</span>'))}(t=function(e){if(!l.level||"error"!=l.level.toLowerCase()&&"warn"!=l.level.toLowerCase())return e;let t=e.split(/[\r\n]/g),n=!1;return(t=t.map(e=>e.startsWith("at ")?(n=!0,'<span class="'.concat(h().err_stack_minim,'">').concat(e,"</span>")):'<span class="'.concat(h().err_stack_hl,'">').concat(e,"</span>")),n)?(t.unshift('<div class="'.concat(h().err_stack_block,'">')),t.push("</div>"),t.join("\n")):e}(t=l.msg)),(0,n.jsx)("div",{dangerouslySetInnerHTML:{__html:t}}))}),l.json?(0,n.jsx)(g.gc,{data:l.json,shouldInitiallyExpand:e=>e<1,style:f}):""]}),(0,n.jsx)("div",{className:h().metacont,children:l.meta.map((e,t)=>(0,n.jsx)("div",{className:h().meta,children:e},t))})]})]})}function L(e,t,l){let n=[];return e.forEach(e=>{let l=function(e){let t={json:null,txt:e.txt,meta:[],date:null,level:null,source:null,msg:null,num:null,search_match:null},l={line_left:e.txt,curr_chunk:null};for(;;){if(l.line_left.startsWith("{"))try{t.json=JSON.parse(l.line_left),l.line_left=null;break}catch(e){}t.date||(t.date=function(e){let t=e.line_left,l=t.length;for(l>35&&(l=35);l>8;){let n=r(t.substring(0,l));if(n)return e.curr_chunk=null,e.line_left=e.line_left.substring(l).trim(),n;l--}}(l));let e=function(e){if(e.sep=null,!e.line_left)return null;let t=/^\s*\[/,l=e.line_left.match(t);if(l){let t=e.line_left.indexOf("]");return e.curr_chunk=e.line_left.substring(l[0].length,t).trim(),e.line_left=e.line_left.substring(t+1).trim(),e.sep="[]",e.curr_chunk}if(t=/[\s:-]+/,l=e.line_left.match(t)){e.curr_chunk=e.line_left.substring(0,l.index);let t=l[0].trim();t.length&&(e.sep=t),e.line_left=e.line_left.substring(l.index+l[0].length)}else e.curr_chunk=e.line_left,e.line_left="";return e.curr_chunk}(l);if(!e&&!l.line_left){l.line_left=t.meta.join(" "),t.meta=[];break}if(e){if(t.level){l.sep&&(t.source=e),l.line_left=e+" "+l.line_left;break}if(/^(INFO|DEBUG|TRACE|WARN|ERROR)$/.test(e)){t.level=e;continue}t.meta.push(e)}}if(!t.json){let e=l.line_left?l.line_left.indexOf("{"):-1;if(e>-1)try{let n=l.line_left.substring(e).trim();t.json=JSON.parse(n),l.line_left=l.line_left.substring(0,e)}catch(e){}}return function(e){let t=e.json;t&&(!e.date&&t.timestamp&&(e.date=r(t.timestamp)),!e.date&&t.ts&&(e.date=r(t.ts)),!e.date&&t.tm&&(e.date=r(t.tm)),!e.date&&t.date&&(e.date=r(t.date)),!e.date&&t.datetime&&(e.date=r(t.datetime)),!e.level&&t.level&&(e.level=t.level),!e.level&&t.error&&(e.level="ERROR"),!e.source&&t.source&&(e.source=t.source))}(t),t.msg=l.line_left,t}(e);if(0==n.length||l.json||l.date||l.level||l.sources||l.meta.length)l.num=e.num,l.mark=t[l.num],!0===e.search_match&&(l.search_match=!0),!1!==e.search_match||l.search_match||(l.search_match=!1),n.push(l);else if(l.msg){let t=n[n.length-1];e.search_match&&(t.search_match=!0),!0===e.search_match&&(t.search_match=!0),!1!==e.search_match||t.search_match||(t.search_match=!1),t.msg+="\n"+l.msg,t.txt+="\n"+l.txt}}),n;function r(e){if("number"==typeof e){let t=d.ou.fromMillis(e);return t&&!t.invalid||(t=d.ou.fromSeconds(e))&&!t.invalid?t:void 0}if("string"!=typeof e)return;let t=[d.ou.fromISO,d.ou.fromRFC2822,d.ou.fromHTTP,d.ou.fromSQL];for(let l=0;l<t.length;l++){let n=t[l](e);if(!n.invalid)return n}}}function V(){let[e,t]=(0,s.useState)(""),[l,r]=(0,s.useState)(!0),[i,_]=(0,s.useState)(!1),m=(0,o.useRouter)();return((0,s.useEffect)(()=>{let e=m.query.l;e&&(_(!0),fetch(e).then(async e=>{if(!e.ok)throw _(!1),Error("Network response was not ok");let l=await e.text();_(!1),t(l)}).catch(e=>{_(!1),console.error(e)}));let l=m.query.q;l?r(!0):r(!1)},[m]),i)?(0,n.jsx)("div",{className:u().loading,children:"Loading..."}):l?(0,n.jsxs)("main",{className:"".concat(u().plain," ").concat(a().className),children:[(0,n.jsx)(v,{title:"Log Viewer",txt:e}),(0,n.jsx)("textarea",{className:u().plainentry,value:e,onChange:e=>t(e.target.value)})]}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(c(),{children:[(0,n.jsx)("title",{children:"Log Viewer"}),(0,n.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,n.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,n.jsxs)("main",{className:"".concat(u().main," ").concat(a().className),children:[(0,n.jsxs)("div",{className:u().entry,children:[(0,n.jsx)("p",{children:"Paste your log below:"}),(0,n.jsx)("textarea",{value:e,onChange:e=>t(e.target.value)})]}),(0,n.jsx)("div",{className:u().display,children:(0,n.jsx)(v,{title:"Log Viewer",txt:e})})]})]})}},9034:function(e){e.exports={main:"Home_main__VkIEL",entry:"Home_entry__X8Bja",display:"Home_display__56dAz",plain:"Home_plain__Skpol",plainentry:"Home_plainentry__rPvmX",loading:"Home_loading__Z_JGo"}},9818:function(e){e.exports={title:"LogViewer_title__AK3Cr",logcontainer:"LogViewer_logcontainer__mO8hL",logline:"LogViewer_logline__z_oZS",logline_header:"LogViewer_logline_header__Ddiut",mark:"LogViewer_mark__wL0D2",mark1:"LogViewer_mark1__PaZOH",mark2:"LogViewer_mark2__yhhue",mark3:"LogViewer_mark3__nIgnW",level:"LogViewer_level__mrUB3","level-info":"LogViewer_level-info__dzs0a","level-debug":"LogViewer_level-debug__4FXs9","level-trace":"LogViewer_level-trace__nTBkI","level-warn":"LogViewer_level-warn__P5V9N","level-error":"LogViewer_level-error__WSwh2",metacont:"LogViewer_metacont__Zz4lw",meta:"LogViewer_meta__W0ubZ",source:"LogViewer_source__SOXZf",msgcont:"LogViewer_msgcont__g8CLa",logcontent:"LogViewer_logcontent__auoNC",selected:"LogViewer_selected__VM0Ik",counter:"LogViewer_counter__PP8rE",prevactive:"LogViewer_prevactive__PWy8O",searchcont:"LogViewer_searchcont__wrmKR",search:"LogViewer_search__5A_Ju",search_result_fail:"LogViewer_search_result_fail__73zF8",search_result_pass:"LogViewer_search_result_pass__Oa6t_",markscopycont:"LogViewer_markscopycont__lOZ2N",markscopy:"LogViewer_markscopy__RSRAb",srcont:"LogViewer_srcont__GElQC",srcopy:"LogViewer_srcopy__rn3O4",srclear:"LogViewer_srclear__jkgNE",err_stack_block:"LogViewer_err_stack_block__25WiU",err_stack_hl:"LogViewer_err_stack_hl__sXUtw",err_stack_minim:"LogViewer_err_stack_minim__1ygGZ",json_container:"LogViewer_json_container__w3pzU",json_label:"LogViewer_json_label__Ems3A",json_stringValue:"LogViewer_json_stringValue__acoVT",json_nullValue:"LogViewer_json_nullValue__DHc2K"}}},function(e){e.O(0,[763,774,888,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);