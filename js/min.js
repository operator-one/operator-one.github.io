/* minified js */
/* js/common.js */
(function(){window.o=window.o||{},o.app=o.app||{},o.views=o.views||{},o.inherits=function(a,b){o.isFn(a)&&o.isFn(b)&&Object.assign(a.prototype,b.prototype)},o._return=function(a,b,c){var d=b();return c?d?a:void 0:d},o.isArr=function(a,b){return o._return(a,function(){return Array.isArray(a)},b)},o.isFn=function(a,b){return o._return(a,function(){return'function'==typeof a},b)},o.isStr=function(a,b){return o._return(a,function(){return'string'==typeof a},b)},o.isNum=function(a,b){return o._return(a,function(){return'number'==typeof a},b)},o.isBool=function(a,b){return o._return(a,function(){return'boolean'==typeof a},b)},o.isObj=function(a,b){return o._return(a,function(){return!(o.isArr(a)||o.isFn(a)||o.isStr(a)||o.isNum(a)||o.isBool(a))&&a&&o.isFn(a.keys)},b)},o.isSet=function(a){return void 0!==a},o.capitalize=function(a){return a[0].toUpperCase()+a.slice(1)},o.uriToJson=function(){var a,b,c,d={};for(pairs=location.search.slice(1).split('&'),a=0,b=pairs.length;a<b;a++)c=pairs[a].split('='),d[c[0]]=c[1];return d},o.ajax=function(a,b,c,d){var e;return'GET'==a?void(e=new XMLHttpRequest,e.onreadystatechange=function(){4==e.readyState&&200==e.status&&d(JSON.parse(e.response))},e.open(a,b),e.send()):void console.warn('sorry only supportig gets right now')}})();/* js/app.js */
(function(){o.App=function(a){this._opts=o.isObj(a,!0)||{}}})();/* js/view.js */
(function(){o.View=class{constructor(){console.log('View was inheritted')}}})();/* js/views/list.js */
(function(){class List extends o.View{constructor(a){super(),this._opts=o.isObj(a,!0)||{},console.log('this is the view'),console.log(this),console.log(o),this.render()}render(){document.body.append('List')}}o.views.List=List})();/* js/main.js */
(function(){var a=o.uriToJson(),b={list:{name:'list',title:'List'},velocity:{name:'velocity',title:'Sprint Planning Assistant'},ref:{name:'ref',title:'Dev Tips',menu:{home:{},bash:{},cpp:{},"chrome devtools":{},git:{},js:{},php:{},python:{},css:{}}}}[a.app]||void 0;b?view=new o.views.List(b):document.body.innerHTML='<br><br><br><br><br><br><br><center><img src="https://i.giphy.com/media/KIS4alAucQILe/giphy.webp"onerror="this.onerror=null;this.src=\'https://i.giphy.com/KIS4alAucQILe.gif\';"></center>'})();