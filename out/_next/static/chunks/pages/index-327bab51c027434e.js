(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(8749)}])},8749:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return N}});var l=n(5893),r=n(1189),a=n.n(r),s=n(7294),i=n(9008),c=n.n(i),o=n(1163),_=n(9034),u=n.n(_),h=n(9818),m=n.n(h),f=n(120),d=n(3852);n(9755);let g=Object.assign({},d.jF,{container:m().json_container,label:m().json_label,nullValue:m().json_nullValue,stringValue:m().json_stringValue});function p(e){if(!e)return null;try{return RegExp(e,"i")}catch(e){}try{return RegExp(escapeRegex(e),"i")}catch(e){}return null}function x(e){let{title:t,txt:n,refresh:r}=e,[a,i]=(0,s.useState)(""),[c,o]=(0,s.useState)([]),_=p(a),u=function(e,t){if(!t||!t.length||!e||!e.length)return t;let n=[];return e.forEach(e=>{t=n="+"===e.t?t.filter(t=>-1!=t.txt.search(e.s)):t.filter(t=>-1==t.txt.search(e.s))}),n}(c,function(e){if(!e)return null;e=e.split(/[\r\n]+/g);let t=[];for(let l=0;l<e.length;l++){let r=e[l];if(r){if(t.length&&n(r)){let e=t[t.length-1].txt;if(!(!e||n(e))&&-1===e.indexOf("\n")&&-1!==e.search(/exception|error/i)&&t.length>1){let e=t.pop().txt+"\n"+r;t[t.length-1].txt+="\n"+e}else t[t.length-1].txt+="\n"+r}else t.push({txt:r,num:l+1})}}return t;function n(e){return e.length<8||e.startsWith(" ")||e.startsWith("	")}}(n));return u&&u.forEach(e=>{e.search_match=_&&e.txt?-1!=e.txt.search(_):null}),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("div",{className:m().title,children:t}),(0,l.jsx)(j,{lines:u,search:a,setSearch:i,filters:c,setFilters:o}),(0,l.jsx)(w,{lines:u,refresh:r})]})}async function v(e){if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(e);else{let t=document.createElement("textarea");t.value=e,t.style.position="absolute",t.style.left="-999999px",document.body.prepend(t),t.select();try{document.execCommand("copy")}catch(e){console.error(e)}finally{t.remove()}}}function j(e){let{lines:t,search:n,setSearch:r,filters:a,setFilters:s}=e,i=0;t&&t.forEach(e=>{e.search_match&&i++}),i||(i="");let c=n?m().enabled:m().disabled,o=a&&a.length?m().enabled:m().disabled;return(0,l.jsxs)("div",{className:m().searchcont,children:[(0,l.jsx)("input",{value:n,onChange:e=>r(e.target.value),className:m().search,type:"text",placeholder:"/search"}),(0,l.jsxs)("div",{className:m().srcont,children:[(0,l.jsxs)("div",{className:"".concat(m().srcopy," ").concat(c),onClick:function(){if(!n||!t)return;let e=t.filter(e=>e.search_match).map(e=>e.txt);e.length&&v(e.join("\n")).then(()=>alert("copied to clipboard")).catch(e=>console.error(e))},children:["\uD83D\uDD0D ",i]}),(0,l.jsxs)("div",{className:m().filter_bar,children:[(0,l.jsx)("div",{className:"".concat(m().filter_in," ").concat(c),onClick:function(){n&&(s(e=>e.concat({t:"+",s:p(n)})),r(""))},children:"✓"}),(0,l.jsx)("div",{className:"".concat(m().filter_out," ").concat(c),onClick:function(){n&&(s(e=>e.concat({t:"-",s:p(n)})),r(""))},children:"\uD835\uDDD1"}),(0,l.jsx)("div",{className:"".concat(m().filter_pop," ").concat(o),onClick:function(){s(e=>e.slice(0,-1)),r("")},children:"⟲"})]}),(0,l.jsx)("div",{className:m().srclear,onClick:()=>r(""),children:"ⓧ"})]})]})}function w(e){let{lines:t,refresh:n}=e,[r,a]=(0,s.useState)({}),[i,c]=(0,s.useState)(""),[o,_]=(0,s.useState)(100),[u,h]=(0,s.useState)(!1);if((0,s.useEffect)(()=>{if(!t||!t.length)return;let e=o,n=0;for(;t.length>e;){if(++n>100)return;let l=t.length-e,r=V([t[l]],{},"")[0];if(r.date||r.meta.length||r.level||r.source)break;e+=1}e!=o&&_(e)},[o,t]),!t||!t.length)return(0,l.jsx)("div",{});let f=(0,l.jsx)("div",{className:m().prev,children:"0 left"}),d=t;if(t.length>o){let e=t.length-o;d=t.slice(e,t.length),f=(0,l.jsxs)("div",{className:m().prevactive,onClick:function(){let e=o+1;for(let n=e;t.length>n;n++){let e=t[t.length-n];if(e.search_match){_(n);return}}_(o+50)},children:["↑...",e," more"]})}let g=V(d,r,i);function p(e){let t=r[e.num]||0,n=(t+1)%3;a(t=>({...t,[e.num]:n}))}function x(){window.getSelection()?c(window.getSelection().toString()):c("")}return(0,l.jsxs)(l.Fragment,{children:[n?(0,l.jsx)("div",{className:m().refreshbtn,onClick:n,children:"Refresh"}):"",(0,l.jsx)("div",{className:m().refreshbtn,onClick:()=>h(!u),children:u?"Full":"Compact"}),(0,l.jsxs)("div",{className:m().counter,children:[f,(0,l.jsxs)("div",{className:m().count,children:[d.length," shown"]})]}),(0,l.jsx)(k,{marks:r,loglines:g}),(0,l.jsx)("div",{className:m().logcontainer,onMouseUp:x,onDoubleClick:x,children:g.map(e=>(0,l.jsx)(L,{compact:u,ll:e,mark:p,sel:i},e.num))})]})}function k(e){let{loglines:t,marks:n}=e,r={};for(let e in n){let t=r[n[e]]||0;r[n[e]]=t+1}let a=[];for(let e in r){if(!e||"0"==e)continue;let s=m()["mark".concat(e)]||"";a.push((0,l.jsxs)("div",{className:"".concat(m().markscopy," ").concat(s),onClick:()=>(function(e){let l=[];for(let r in n){if(n[r]!=e)continue;let a=function(e){for(let n=0;n<t.length;n++){let l=t[n];if(l.num==e)return l}}(r);a&&l.push(a.txt)}0!=l.length&&v(l.join("\n")).then(()=>alert("copied to clipboard")).catch(e=>console.error(e))})(e),children:[(0,l.jsx)("div",{className:m().mark},e),(0,l.jsx)("div",{children:r[e]})]},e))}return(0,l.jsxs)("div",{className:m().markscopycont,children:[a,"\xa0"]})}function L(e){let{ll:t,mark:n,sel:r,compact:a}=e,s=m()["mark".concat(t.mark||0)]||"",i=m()["level-".concat(t.level).toLowerCase()]||"",c=a?m().compact:"",o="";!1===t.search_match&&(o=m().search_result_fail),!0===t.search_match&&(o=m().search_result_pass);let _=t.date||t.level;return(0,l.jsxs)("div",{className:"".concat(m().logline," ").concat(c," ").concat(i," ").concat(s," ").concat(o),children:[(0,l.jsx)("div",{className:m().mark,onClick:()=>n(t)}),(0,l.jsxs)("div",{className:m().logcontent,children:[!a&&_?(0,l.jsxs)("div",{className:m().logline_header,children:[(0,l.jsx)("div",{className:m().date,children:t.date&&t.date.toLocaleString(f.ou.DATETIME_FULL)}),(0,l.jsx)("div",{className:m().level,children:t.level&&"[".concat(t.level,"]")}),t.source?(0,l.jsxs)("div",{className:m().source,children:[t.source,": "]}):""]}):"",(0,l.jsxs)("div",{className:m().msgcont,children:[(0,l.jsx)("div",{className:m().msg,children:function(e){if(e)return e=function(e){if(!r||r.length<5)return e;let t=RegExp(r.replace(/[/\-\\^$*+?.()|[\]{}]/g,"\\$&"),"gi");return e.replace(t,'<span class="'.concat(m().selected,'">$&</span>'))}(e=function(e){if(!t.level||"error"!=t.level.toLowerCase()&&"warn"!=t.level.toLowerCase())return e;let n=e.split(/[\r\n]/g),l=!1;return(n=n.map(e=>e.trim().startsWith("at ")?(l=!0,'<span class="'.concat(m().err_stack_minim,'">').concat(e,"</span>")):'<span class="'.concat(m().err_stack_hl,'">').concat(e,"</span>")),l)?(n.unshift('<div class="'.concat(m().err_stack_block,'">')),n.push("</div>"),n.join("\n")):e}(e)),(0,l.jsx)("div",{dangerouslySetInnerHTML:{__html:e}})}(t.msg)}),t.json?(0,l.jsx)(d.gc,{data:t.json,shouldInitiallyExpand:e=>e<1,style:g}):""]}),a?"":(0,l.jsx)("div",{className:m().metacont,children:t.meta.map((e,t)=>(0,l.jsx)("div",{className:m().meta,children:e},t))})]})]})}function V(e,t,n){let l=[];return e.forEach(e=>{let n=function(e){let t={json:null,txt:e.txt,meta:[],date:null,level:null,source:null,msg:null,num:null,search_match:null},n={line_left:e.txt,curr_chunk:null};for(;;){if(n.line_left.startsWith("{"))try{t.json=JSON.parse(n.line_left),n.line_left=null;break}catch(e){}t.date||(t.date=function(e){let t=e.line_left,n=t.length,l=e.line_left.match(/[\r\n]/);for(l&&(n=l.index),n>35&&(n=35);n>8;){let l=r(t.substring(0,n));if(l)return e.curr_chunk=null,e.line_left=e.line_left.substring(n).trim(),l;n--}}(n));let e=function(e){if(e.sep=null,!e.line_left)return null;if(e.line_left.startsWith("\n")||e.line_left.startsWith("\r"))return e.curr_chunk=e.line_left,e.line_left="",e.curr_chunk;let t=/^[ \t]*\[/,n=e.line_left.match(t);if(n){let t=e.line_left.indexOf("]");if(-1!=t)return e.curr_chunk=e.line_left.substring(n[0].length,t).trim(),e.line_left=e.line_left.substring(t+1).trim(),e.sep="[]",e.curr_chunk}if(t=/[ \t:-]+/,n=e.line_left.match(t)){e.curr_chunk=e.line_left.substring(0,n.index);let t=n[0].trim();t.length&&(e.sep=t),e.line_left=e.line_left.substring(n.index+n[0].length)}else e.curr_chunk=e.line_left,e.line_left="";return e.curr_chunk}(n);if(!e&&!n.line_left){n.line_left=t.meta.join(" "),t.meta=[];break}if(e){if(t.level){n.sep?t.source=e:n.line_left=e+" "+n.line_left;break}if(/^(INFO|DEBUG|TRACE|WARN|ERROR)$/.test(e)){t.level=e;continue}t.meta.push(e)}}if(!t.json){let e=n.line_left?n.line_left.indexOf("{"):-1;if(e>-1)try{let l=n.line_left.substring(e).trim();t.json=JSON.parse(l),n.line_left=n.line_left.substring(0,e)}catch(e){}}return function(e){let t=e.json;t&&(!e.date&&t.timestamp&&(e.date=r(t.timestamp)),!e.date&&t.ts&&(e.date=r(t.ts)),!e.date&&t.tm&&(e.date=r(t.tm)),!e.date&&t.date&&(e.date=r(t.date)),!e.date&&t.datetime&&(e.date=r(t.datetime)),!e.level&&t.level&&(e.level=t.level),!e.level&&t.error&&(e.level="ERROR"),!e.source&&t.source&&(e.source=t.source))}(t),t.msg=n.line_left,t}(e);if(0==l.length||n.json||n.date||n.level||n.sources||n.meta.length)n.num=e.num,n.mark=t[n.num],!0===e.search_match&&(n.search_match=!0),!1!==e.search_match||n.search_match||(n.search_match=!1),l.push(n);else if(n.msg){let t=l[l.length-1];e.search_match&&(t.search_match=!0),!0===e.search_match&&(t.search_match=!0),!1!==e.search_match||t.search_match||(t.search_match=!1),t.msg+="\n"+n.msg,t.txt+="\n"+n.txt}}),l;function r(e){if("number"==typeof e){let t=f.ou.fromMillis(e);return t&&!t.invalid||(t=f.ou.fromSeconds(e))&&!t.invalid?t:void 0}if("string"!=typeof e)return;let t=[f.ou.fromISO,f.ou.fromRFC2822,f.ou.fromHTTP,f.ou.fromSQL];for(let n=0;n<t.length;n++){let l=t[n](e);if(!l.invalid)return l}}}function N(){let[e,t]=(0,s.useState)(""),[n,r]=(0,s.useState)(!1),[i,_]=(0,s.useState)(!0),[h,m]=(0,s.useState)(!1),f=(0,o.useRouter)();return((0,s.useEffect)(()=>{let e=f.query.l;e&&(m(!0),fetch(e).then(async e=>{if(!e.ok)throw m(!1),Error("Network response was not ok");let n=await e.text();m(!1),t(n),r(!0)}).catch(e=>{m(!1),console.error(e)}));let n=f.query.q;n?_(!0):_(!1)},[f]),h)?(0,l.jsx)("div",{className:u().loading,children:"Loading..."}):i?(0,l.jsxs)("main",{className:"".concat(u().plain," ").concat(a().className),children:[(0,l.jsx)(x,{title:"Log Viewer",refresh:()=>f.reload(),txt:e}),(0,l.jsx)("textarea",{className:u().plainentry,value:e,onChange:e=>t(e.target.value)})]}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(c(),{children:[(0,l.jsx)("title",{children:"Log Viewer"}),(0,l.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,l.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,l.jsxs)("main",{className:"".concat(u().main," ").concat(a().className),children:[(0,l.jsxs)("div",{className:u().entry,children:[(0,l.jsx)("p",{children:"Paste your log below:"}),(0,l.jsx)("textarea",{value:e,onChange:e=>t(e.target.value)})]}),(0,l.jsx)("div",{className:u().display,children:(0,l.jsx)(x,{title:"Log Viewer",txt:e})})]})]})}},9034:function(e){e.exports={main:"Home_main__VkIEL",entry:"Home_entry__X8Bja",display:"Home_display__56dAz",plain:"Home_plain__Skpol",plainentry:"Home_plainentry__rPvmX",loading:"Home_loading__Z_JGo"}},9818:function(e){e.exports={title:"LogViewer_title__AK3Cr",logcontainer:"LogViewer_logcontainer__mO8hL",logline:"LogViewer_logline__z_oZS",compact:"LogViewer_compact__tNFD_",logline_header:"LogViewer_logline_header__Ddiut",mark:"LogViewer_mark__wL0D2",mark1:"LogViewer_mark1__PaZOH",mark2:"LogViewer_mark2__yhhue",mark3:"LogViewer_mark3__nIgnW",level:"LogViewer_level__mrUB3","level-info":"LogViewer_level-info__dzs0a","level-debug":"LogViewer_level-debug__4FXs9","level-trace":"LogViewer_level-trace__nTBkI","level-warn":"LogViewer_level-warn__P5V9N","level-error":"LogViewer_level-error__WSwh2",refreshbtn:"LogViewer_refreshbtn__8HDsu",metacont:"LogViewer_metacont__Zz4lw",meta:"LogViewer_meta__W0ubZ",source:"LogViewer_source__SOXZf",msgcont:"LogViewer_msgcont__g8CLa",logcontent:"LogViewer_logcontent__auoNC",selected:"LogViewer_selected__VM0Ik",counter:"LogViewer_counter__PP8rE",prevactive:"LogViewer_prevactive__PWy8O",searchcont:"LogViewer_searchcont__wrmKR",search:"LogViewer_search__5A_Ju",search_result_fail:"LogViewer_search_result_fail__73zF8",search_result_pass:"LogViewer_search_result_pass__Oa6t_",markscopycont:"LogViewer_markscopycont__lOZ2N",markscopy:"LogViewer_markscopy__RSRAb",srcont:"LogViewer_srcont__GElQC",srcopy:"LogViewer_srcopy__rn3O4",srclear:"LogViewer_srclear__jkgNE",filter_bar:"LogViewer_filter_bar__9yy0c",filter_in:"LogViewer_filter_in__bOvz_",filter_out:"LogViewer_filter_out__HLcin",filter_pop:"LogViewer_filter_pop__SfLBx",disabled:"LogViewer_disabled__PfnEx",err_stack_block:"LogViewer_err_stack_block__25WiU",err_stack_hl:"LogViewer_err_stack_hl__sXUtw",err_stack_minim:"LogViewer_err_stack_minim__1ygGZ",json_container:"LogViewer_json_container__w3pzU",json_label:"LogViewer_json_label__Ems3A",json_stringValue:"LogViewer_json_stringValue__acoVT",json_nullValue:"LogViewer_json_nullValue__DHc2K"}}},function(e){e.O(0,[763,774,888,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);