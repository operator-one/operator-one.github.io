/* minified js */
/* js/common.js */
!function(){window.o=window.o||{},o.app=o.app||{},o._return=function(n,o,r){var t=o()
return r?t?n:void 0:t},o.isArr=function(n,r){return o._return(n,function(){return Array.isArray(n)},r)},o.isFn=function(n,r){return o._return(n,function(){return"function"==typeof n},r)},o.isStr=function(n,r){return o._return(n,function(){return"string"==typeof n},r)},o.isNum=function(n,r){return o._return(n,function(){return"number"==typeof n},r)},o.isBool=function(n,r){return o._return(n,function(){return"boolean"==typeof n},r)},o.isObj=function(n,r){return o._return(n,function(){return!(o.isArr(n)||o.isFn(n)||o.isStr(n)||o.isNum(n)||o.isBool(n))&&n&&o.isFn(n.keys)},r)},o.isSet=function(n){return void 0!==n},o.onReady=function(n){if(!o.isFn(n))return void console.warn("o.onReady(fn): fn is not a function")
document.addEventListener("DOMContentLoaded",n)},o.capitalize=function(n){return n[0].toUpperCase()+n.slice(1)},o.uriToJson=function(){var n,o,r,t={}
for(pairs=location.search.slice(1).split("&"),n=0,o=pairs.length;n<o;n++)r=pairs[n].split("="),t[r[0]]=r[1]
return t},o.ajax=function(n,o,r,t){var e
if("GET"!=n)return void console.warn("sorry only supportig gets right now")
e=new XMLHttpRequest,e.onreadystatechange=function(){4==e.readyState&&200==e.status&&t(JSON.parse(e.response))},e.open(n,o),e.send()}}()
/* js/app.js */
!function(){o.App=function(n){this._menu=o.isObj(n.menu,!0)||{},console.log(n),console.log(this)}}()
/* js/main.js */
!function(){var e={list:{name:"list",title:"List"},velocity:{name:"velocity",title:"Sprint Planning Assistant"},ref:{name:"ref",title:"Dev Tips",menu:{home:{},bash:{},cpp:{},"chrome devtools":{},git:{},js:{},php:{},python:{},css:{}}}},i=o.uriToJson(),t=e[i.app]||void 0
t?app=new o.App(t):document.body.innerHTML=["<br><br><br><br><br><br><br><center>",'<img src="https://i.giphy.com/media/KIS4alAucQILe/giphy.webp"',"onerror=\"this.onerror=null;this.src='https://i.giphy.com/KIS4alAucQILe.gif';\">","</center>"].join("")}()
