(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(e,t,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return l(8749)}])},8749:function(e,t,l){"use strict";l.r(t),l.d(t,{default:function(){return V}});var n=l(5893),r=l(1189),s=l.n(r),a=l(7294),i=l(9008),c=l.n(i),o=l(1163),_=l(9034),u=l.n(_),h=l(9818),m=l.n(h),f=l(120),d=l(3852);l(9755);let g=Object.assign({},d.jF,{container:m().json_container,label:m().json_label,nullValue:m().json_nullValue,stringValue:m().json_stringValue});function v(e){let{title:t,txt:l,refresh:r}=e,[s,i]=(0,a.useState)(""),c=null;if(s){try{c=RegExp(s,"i")}catch(e){}if(!c)try{c=RegExp(escapeRegex(s),"i")}catch(e){}}let o=function(e){if(!e)return null;e=e.split(/[\r\n]+/g);let t=[];for(let l=0;l<e.length;l++){let n=e[l];n&&(t.length&&(n.length<8||n.startsWith(" ")||n.startsWith("	")||"}"==n)?t[t.length-1].txt+="\n"+n:t.push({txt:n,num:l+1}))}return t}(l);return o&&o.forEach(e=>{e.search_match=c&&e.txt?-1!=e.txt.search(c):null}),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:m().title,children:t}),(0,n.jsx)(x,{lines:o,search:s,setSearch:i}),(0,n.jsx)(j,{lines:o,refresh:r})]})}async function p(e){if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(e);else{let t=document.createElement("textarea");t.value=e,t.style.position="absolute",t.style.left="-999999px",document.body.prepend(t),t.select();try{document.execCommand("copy")}catch(e){console.error(e)}finally{t.remove()}}}function x(e){let{lines:t,search:l,setSearch:r}=e,s=0;return t&&t.forEach(e=>{e.search_match&&s++}),(0,n.jsxs)("div",{className:m().searchcont,children:[(0,n.jsx)("input",{value:l,onChange:e=>r(e.target.value),className:m().search,type:"text",placeholder:"/search"}),l?(0,n.jsxs)("div",{className:m().srcont,children:[(0,n.jsxs)("div",{className:m().srcopy,onClick:function(){if(!t)return;let e=t.filter(e=>e.search_match).map(e=>e.txt);e.length&&p(e.join("\n")).then(()=>alert("copied to clipboard")).catch(e=>console.error(e))},children:["\uD83D\uDD0D ",s]}),(0,n.jsx)("div",{className:m().srclear,onClick:()=>r(""),children:"ⓧ"})]}):""]})}function j(e){let{lines:t,refresh:l}=e,[r,s]=(0,a.useState)({}),[i,c]=(0,a.useState)(""),[o,_]=(0,a.useState)(100);if((0,a.useEffect)(()=>{if(!t||!t.length)return;let e=o,l=0;for(;t.length>e;){if(++l>100)return;let n=t.length-e,r=L([t[n]],{},"")[0];if(r.date||r.meta.length||r.level||r.source)break;e+=1}e!=o&&_(e)},[o,t]),!t||!t.length)return(0,n.jsx)("div",{});let u=(0,n.jsx)("div",{className:m().prev,children:"0 left"}),h=t;if(t.length>o){let e=t.length-o;h=t.slice(e,t.length),u=(0,n.jsxs)("div",{className:m().prevactive,onClick:function(){let e=o+1;for(let l=e;t.length>l;l++){let e=t[t.length-l];if(e.search_match){_(l);return}}_(o+50)},children:["↑...",e," more"]})}let f=L(h,r,i);function d(e){let t=r[e.num]||0,l=(t+1)%3;s(t=>({...t,[e.num]:l}))}function g(){window.getSelection()?c(window.getSelection().toString()):c("")}return(0,n.jsxs)(n.Fragment,{children:[l?(0,n.jsx)("div",{className:m().refreshbtn,onClick:l,children:"Refresh"}):"",(0,n.jsxs)("div",{className:m().counter,children:[u,(0,n.jsxs)("div",{className:m().count,children:[h.length," shown"]})]}),(0,n.jsx)(w,{marks:r,loglines:f}),(0,n.jsx)("div",{className:m().logcontainer,onMouseUp:g,onDoubleClick:g,children:f.map(e=>(0,n.jsx)(k,{ll:e,mark:d,sel:i},e.num))})]})}function w(e){let{loglines:t,marks:l}=e,r={};for(let e in l){let t=r[l[e]]||0;r[l[e]]=t+1}let s=[];for(let e in r){if(!e||"0"==e)continue;let a=m()["mark".concat(e)]||"";s.push((0,n.jsxs)("div",{className:"".concat(m().markscopy," ").concat(a),onClick:()=>(function(e){let n=[];for(let r in l){if(l[r]!=e)continue;let s=function(e){for(let l=0;l<t.length;l++){let n=t[l];if(n.num==e)return n}}(r);s&&n.push(s.txt)}0!=n.length&&p(n.join("\n")).then(()=>alert("copied to clipboard")).catch(e=>console.error(e))})(e),children:[(0,n.jsx)("div",{className:m().mark},e),(0,n.jsx)("div",{children:r[e]})]},e))}return(0,n.jsxs)("div",{className:m().markscopycont,children:[s,"\xa0"]})}function k(e){let{ll:t,mark:l,sel:r}=e,s=m()["mark".concat(t.mark||0)]||"",a=m()["level-".concat(t.level).toLowerCase()]||"",i="";!1===t.search_match&&(i=m().search_result_fail),!0===t.search_match&&(i=m().search_result_pass);let c=t.date||t.level;return(0,n.jsxs)("div",{className:"".concat(m().logline," ").concat(a," ").concat(s," ").concat(i),children:[(0,n.jsx)("div",{className:m().mark,onClick:()=>l(t)}),(0,n.jsxs)("div",{className:m().logcontent,children:[c?(0,n.jsxs)("div",{className:m().logline_header,children:[(0,n.jsx)("div",{className:m().date,children:t.date&&t.date.toLocaleString(f.ou.DATETIME_FULL)}),(0,n.jsx)("div",{className:m().level,children:t.level&&"[".concat(t.level,"]")}),t.source?(0,n.jsxs)("div",{className:m().source,children:[t.source,": "]}):""]}):"",(0,n.jsxs)("div",{className:m().msgcont,children:[(0,n.jsx)("div",{className:m().msg,children:function(e){if(e)return e=function(e){if(!r||r.length<5)return e;let t=RegExp(r.replace(/[/\-\\^$*+?.()|[\]{}]/g,"\\$&"),"gi");return e.replace(t,'<span class="'.concat(m().selected,'">$&</span>'))}(e=function(e){if(!t.level||"error"!=t.level.toLowerCase()&&"warn"!=t.level.toLowerCase())return e;let l=e.split(/[\r\n]/g),n=!1;return(l=l.map(e=>e.trim().startsWith("at ")?(n=!0,'<span class="'.concat(m().err_stack_minim,'">').concat(e,"</span>")):'<span class="'.concat(m().err_stack_hl,'">').concat(e,"</span>")),n)?(l.unshift('<div class="'.concat(m().err_stack_block,'">')),l.push("</div>"),l.join("\n")):e}(e)),(0,n.jsx)("div",{dangerouslySetInnerHTML:{__html:e}})}(t.msg)}),t.json?(0,n.jsx)(d.gc,{data:t.json,shouldInitiallyExpand:e=>e<1,style:g}):""]}),(0,n.jsx)("div",{className:m().metacont,children:t.meta.map((e,t)=>(0,n.jsx)("div",{className:m().meta,children:e},t))})]})]})}function L(e,t,l){let n=[];return e.forEach(e=>{let l=function(e){let t={json:null,txt:e.txt,meta:[],date:null,level:null,source:null,msg:null,num:null,search_match:null},l={line_left:e.txt,curr_chunk:null};for(;;){if(l.line_left.startsWith("{"))try{t.json=JSON.parse(l.line_left),l.line_left=null;break}catch(e){}t.date||(t.date=function(e){let t=e.line_left,l=t.length,n=e.line_left.match(/[\r\n]/);for(n&&(l=n.index),l>35&&(l=35);l>8;){let n=r(t.substring(0,l));if(n)return e.curr_chunk=null,e.line_left=e.line_left.substring(l).trim(),n;l--}}(l));let e=function(e){if(e.sep=null,!e.line_left)return null;if(e.line_left.startsWith("\n")||e.line_left.startsWith("\r"))return e.curr_chunk=e.line_left,e.line_left="",e.curr_chunk;let t=/^[ \t]*\[/,l=e.line_left.match(t);if(l){let t=e.line_left.indexOf("]");if(-1!=t)return e.curr_chunk=e.line_left.substring(l[0].length,t).trim(),e.line_left=e.line_left.substring(t+1).trim(),e.sep="[]",e.curr_chunk}if(t=/[ \t:-]+/,l=e.line_left.match(t)){e.curr_chunk=e.line_left.substring(0,l.index);let t=l[0].trim();t.length&&(e.sep=t),e.line_left=e.line_left.substring(l.index+l[0].length)}else e.curr_chunk=e.line_left,e.line_left="";return e.curr_chunk}(l);if(!e&&!l.line_left){l.line_left=t.meta.join(" "),t.meta=[];break}if(e){if(t.level){l.sep?t.source=e:l.line_left=e+" "+l.line_left;break}if(/^(INFO|DEBUG|TRACE|WARN|ERROR)$/.test(e)){t.level=e;continue}t.meta.push(e)}}if(!t.json){let e=l.line_left?l.line_left.indexOf("{"):-1;if(e>-1)try{let n=l.line_left.substring(e).trim();t.json=JSON.parse(n),l.line_left=l.line_left.substring(0,e)}catch(e){}}return function(e){let t=e.json;t&&(!e.date&&t.timestamp&&(e.date=r(t.timestamp)),!e.date&&t.ts&&(e.date=r(t.ts)),!e.date&&t.tm&&(e.date=r(t.tm)),!e.date&&t.date&&(e.date=r(t.date)),!e.date&&t.datetime&&(e.date=r(t.datetime)),!e.level&&t.level&&(e.level=t.level),!e.level&&t.error&&(e.level="ERROR"),!e.source&&t.source&&(e.source=t.source))}(t),t.msg=l.line_left,t}(e);if(0==n.length||l.json||l.date||l.level||l.sources||l.meta.length)l.num=e.num,l.mark=t[l.num],!0===e.search_match&&(l.search_match=!0),!1!==e.search_match||l.search_match||(l.search_match=!1),n.push(l);else if(l.msg){let t=n[n.length-1];e.search_match&&(t.search_match=!0),!0===e.search_match&&(t.search_match=!0),!1!==e.search_match||t.search_match||(t.search_match=!1),t.msg+="\n"+l.msg,t.txt+="\n"+l.txt}}),n;function r(e){if("number"==typeof e){let t=f.ou.fromMillis(e);return t&&!t.invalid||(t=f.ou.fromSeconds(e))&&!t.invalid?t:void 0}if("string"!=typeof e)return;let t=[f.ou.fromISO,f.ou.fromRFC2822,f.ou.fromHTTP,f.ou.fromSQL];for(let l=0;l<t.length;l++){let n=t[l](e);if(!n.invalid)return n}}}function V(){let[e,t]=(0,a.useState)(""),[l,r]=(0,a.useState)(!1),[i,_]=(0,a.useState)(!0),[h,m]=(0,a.useState)(!1),f=(0,o.useRouter)();return((0,a.useEffect)(()=>{let e=f.query.l;e&&(m(!0),fetch(e).then(async e=>{if(!e.ok)throw m(!1),Error("Network response was not ok");let l=await e.text();m(!1),t(l),r(!0)}).catch(e=>{m(!1),console.error(e)}));let l=f.query.q;l?_(!0):_(!1)},[f]),h)?(0,n.jsx)("div",{className:u().loading,children:"Loading..."}):i?(0,n.jsxs)("main",{className:"".concat(u().plain," ").concat(s().className),children:[(0,n.jsx)(v,{title:"Log Viewer",refresh:()=>f.reload(),txt:e}),(0,n.jsx)("textarea",{className:u().plainentry,value:e,onChange:e=>t(e.target.value)})]}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(c(),{children:[(0,n.jsx)("title",{children:"Log Viewer"}),(0,n.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,n.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,n.jsxs)("main",{className:"".concat(u().main," ").concat(s().className),children:[(0,n.jsxs)("div",{className:u().entry,children:[(0,n.jsx)("p",{children:"Paste your log below:"}),(0,n.jsx)("textarea",{value:e,onChange:e=>t(e.target.value)})]}),(0,n.jsx)("div",{className:u().display,children:(0,n.jsx)(v,{title:"Log Viewer",txt:e})})]})]})}},9034:function(e){e.exports={main:"Home_main__VkIEL",entry:"Home_entry__X8Bja",display:"Home_display__56dAz",plain:"Home_plain__Skpol",plainentry:"Home_plainentry__rPvmX",loading:"Home_loading__Z_JGo"}},9818:function(e){e.exports={title:"LogViewer_title__AK3Cr",logcontainer:"LogViewer_logcontainer__mO8hL",logline:"LogViewer_logline__z_oZS",logline_header:"LogViewer_logline_header__Ddiut",mark:"LogViewer_mark__wL0D2",mark1:"LogViewer_mark1__PaZOH",mark2:"LogViewer_mark2__yhhue",mark3:"LogViewer_mark3__nIgnW",level:"LogViewer_level__mrUB3","level-info":"LogViewer_level-info__dzs0a","level-debug":"LogViewer_level-debug__4FXs9","level-trace":"LogViewer_level-trace__nTBkI","level-warn":"LogViewer_level-warn__P5V9N","level-error":"LogViewer_level-error__WSwh2",refreshbtn:"LogViewer_refreshbtn__8HDsu",metacont:"LogViewer_metacont__Zz4lw",meta:"LogViewer_meta__W0ubZ",source:"LogViewer_source__SOXZf",msgcont:"LogViewer_msgcont__g8CLa",logcontent:"LogViewer_logcontent__auoNC",selected:"LogViewer_selected__VM0Ik",counter:"LogViewer_counter__PP8rE",prevactive:"LogViewer_prevactive__PWy8O",searchcont:"LogViewer_searchcont__wrmKR",search:"LogViewer_search__5A_Ju",search_result_fail:"LogViewer_search_result_fail__73zF8",search_result_pass:"LogViewer_search_result_pass__Oa6t_",markscopycont:"LogViewer_markscopycont__lOZ2N",markscopy:"LogViewer_markscopy__RSRAb",srcont:"LogViewer_srcont__GElQC",srcopy:"LogViewer_srcopy__rn3O4",srclear:"LogViewer_srclear__jkgNE",err_stack_block:"LogViewer_err_stack_block__25WiU",err_stack_hl:"LogViewer_err_stack_hl__sXUtw",err_stack_minim:"LogViewer_err_stack_minim__1ygGZ",json_container:"LogViewer_json_container__w3pzU",json_label:"LogViewer_json_label__Ems3A",json_stringValue:"LogViewer_json_stringValue__acoVT",json_nullValue:"LogViewer_json_nullValue__DHc2K"}}},function(e){e.O(0,[763,774,888,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);