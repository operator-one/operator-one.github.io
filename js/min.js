/* minified js */
/* js/common.js */
(function(){window.__=window.__||{_return:function(a,b,c){var d=b();return c?d?a:void 0:d},isArr:function(a,b){return __._return(a,function(){return Array.isArray(a)},b)},isFn:function(a,b){return __._return(a,function(){return'function'==typeof a},b)},isStr:function(a,b){return __._return(a,function(){return'string'==typeof a},b)},isNum:function(a,b){return __._return(a,function(){return'number'==typeof a},b)},isBool:function(a,b){return __._return(a,function(){return'boolean'==typeof a},b)},isObj:function(a,b){return __._return(a,function(){return a&&!__.isArr(a)&&!__.isFn(a)&&!__.isStr(a)&&!__.isNum(a)&&!__.isBool(a)},b)},isSet:function(a){return void 0!==a},capitalize:function(a){return a[0].toUpperCase()+a.slice(1)},uriToJson:function(){var a,b,c,d={};for(pairs=location.search.slice(1).split('&'),a=0,b=pairs.length;a<b;a++)c=pairs[a].split('='),d[c[0]]=c[1];return d}}})();/* js/app.js */
(function(){class App{constructor(a){this.opts=__.isObj(a,!0)||{}}get options(){return this.opts}}__.App=App})();/* js/main.js */
(function(){var a,b=__.uriToJson(),c={list:{css:['main.css'],js:['https://code.jquery.com/jquery-3.2.1.min.js']},velocity:{css:['main.css'],js:['https://code.jquery.com/jquery-3.2.1.min.js']}}[b.app]||null;c?(a='apps/'+b.app+'/',(c.css||[]).forEach(function(b){document.write('<link rel="stylesheet" href="'+a+b+'">')}),(c.js||[]).forEach(function(b){document.write('<script src="'+(0===b.indexOf('http')?'':a)+b+'"></script>')}),document.write('<script src="'+a+'index.js"></script>')):document.body.innerHTML='<br><br><br><br><br><br><br><center><img src="https://i.giphy.com/media/KIS4alAucQILe/giphy.webp"onerror="this.onerror=null;this.src=\'https://i.giphy.com/KIS4alAucQILe.gif\';"></center>'})();