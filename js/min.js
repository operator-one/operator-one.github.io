/* minified js */
/* js/common.js */
!function(){window.o=window.o||{},o.app=o.app||{},o.views=o.views||{},o.inherits=function(n,r){o.isFn(n)&&o.isFn(r)&&Object.assign(n.prototype,r.prototype)},o._return=function(n,o,r){var t=o()
return r?t?n:void 0:t},o.isArr=function(n,r){return o._return(n,function(){return Array.isArray(n)},r)},o.isFn=function(n,r){return o._return(n,function(){return"function"==typeof n},r)},o.isStr=function(n,r){return o._return(n,function(){return"string"==typeof n},r)},o.isNum=function(n,r){return o._return(n,function(){return"number"==typeof n},r)},o.isBool=function(n,r){return o._return(n,function(){return"boolean"==typeof n},r)},o.isObj=function(n,r){return o._return(n,function(){return!(o.isArr(n)||o.isFn(n)||o.isStr(n)||o.isNum(n)||o.isBool(n))&&n&&o.isFn(n.keys)},r)},o.isSet=function(n){return void 0!==n},o.capitalize=function(n){return n[0].toUpperCase()+n.slice(1)},o.uriToJson=function(){var n,o,r,t={}
for(pairs=location.search.slice(1).split("&"),n=0,o=pairs.length;n<o;n++)r=pairs[n].split("="),t[r[0]]=r[1]
return t},o.ajax=function(n,o,r,t){var i
if("GET"!=n)return void console.warn("sorry only supportig gets right now")
i=new XMLHttpRequest,i.onreadystatechange=function(){4==i.readyState&&200==i.status&&t(JSON.parse(i.response))},i.open(n,o),i.send()}}()
/* js/app.js */
!function(){o.App=function(i){this._opts=o.isObj(i,!0)||{}}}()
/* js/views/list.js */
!function(){o.views.List=function(i){this._opts=o.isObj(i,!0)||{},console.log("this is the view"),console.log(this),console.log(o)},o.inherits(o.views.List,o.view)}()
/* js/main.js */
!function(){var i={list:{name:"list",title:"List"},velocity:{name:"velocity",title:"Sprint Planning Assistant"},ref:{name:"ref",title:"Dev Tips",menu:{home:{},bash:{},cpp:{},"chrome devtools":{},git:{},js:{},php:{},python:{},css:{}}}},e=o.uriToJson(),t=i[e.app]||void 0
t?view=new o.views.List(t):document.body.innerHTML=["<br><br><br><br><br><br><br><center>",'<img src="https://i.giphy.com/media/KIS4alAucQILe/giphy.webp"',"onerror=\"this.onerror=null;this.src='https://i.giphy.com/KIS4alAucQILe.gif';\">","</center>"].join("")}()
