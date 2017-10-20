/* minified js */
/* js/common.js */
!function(){window.o=window.o||{},o.app=o.app||{},o.isFn=function(n){return"function"==typeof n},o.onReady=function(n){if(!o.isFn(n))return void console.warn("o.onReady(fn): fn is not a function")
document.addEventListener("DOMContentLoaded",n)},o.capitalize=function(n){return n[0].toUpperCase()+n.slice(1)},o.uriToJson=function(){var n,o,e,t={}
for(pairs=location.search.slice(1).split("&"),n=0,o=pairs.length;n<o;n++)e=pairs[n].split("="),t[e[0]]=e[1]
return t},o.ajax=function(n,o,e,t){if("GET"!=n)return void console.warn("sorry only supportig gets right now")
var i=new XMLHttpRequest
i.onreadystatechange=function(){4==i.readyState&&200==i.status&&t(JSON.parse(i.response))},i.open(n,o),i.send()},o.renderSiteMenu=function(){var n,e,t,i,a=[],r=document.createElement("ul")
for(r.classList.add("menu"),n=0,e=(o.app.points||[]).length;n<e;n++)t=o.app.points[n],i=t.slice(1)||"home",link="/"+o.app.name+t,a.push(['<li><a href="'+link+'">',o.capitalize(i),"</a></li>"].join(""))
r.innerHTML=a.join(""),document.body.prepend(r)}}()
/* js/app.js */
!function(){console.log(o)}()
