/**
 * skylark-fw-spa - An Elegant  HTML5 Single Page Application Framework.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.5-beta
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(t,r){var e=r.define,n=r.require,i="function"==typeof e&&e.amd,o=!i&&"undefined"!=typeof exports;if(!i&&!e){var a={};e=r.define=function(t,r,e){"function"==typeof e?(a[t]={factory:e,deps:r.map(function(r){return function(t,r){if("."!==t[0])return t;var e=r.split("/"),n=t.split("/");e.pop();for(var i=0;i<n.length;i++)"."!=n[i]&&(".."==n[i]?e.pop():e.push(n[i]));return e.join("/")}(r,t)}),resolved:!1,exports:null},n(t)):a[t]={factory:null,resolved:!0,exports:e}},n=r.require=function(t){if(!a.hasOwnProperty(t))throw new Error("Module "+t+" has not been defined");var e=a[t];if(!e.resolved){var i=[];e.deps.forEach(function(t){i.push(n(t))}),e.exports=e.factory.apply(r,i)||null,e.resolved=!0}return e.exports}}if(!e)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(t,r){t("skylark-fw-spa/spa",["skylark-langx/skylark","skylark-langx/langx","skylark-fw-router/router"],function(t,e,n){var i=e.Deferred;function o(t,r){var n=new CustomEvent(t,r);return e.safeMixin(n,r)}var a,s=n.Route=n.Route.inherit({klassName:"SpaRoute",init:function(t,r){this.overrided(t,r),this.content=r.content,this.forceRefresh=r.forceRefresh,this.data=r.data;var n=this;["preparing","rendering","rendered"].forEach(function(t){e.isFunction(r[t])&&n.on(t,r[t])})},_entering:function(t){return this.forceRefresh||t.force||!this._prepared?this.prepare():this},getConfigData:function(t){return t?this.data[t]:this.data},getNamedValue:function(){return window.location.pathname.match(this.regex)},prepare:function(){var t=new i,e=this._setting,n=e.controller,a=(this.controller,this);e.content,e.contentPath;return r([n.type],function(r){a.controller=new r(n),t.resolve()}),t.then(function(){var t=o("preparing",{route:a,result:!0});return a.trigger(t),i.when(t.result).then(function(){a._prepared=!0})})},render:function(t){var r=o("rendering",{route:this,context:t,content:this.content});return this.trigger(r),r.content},trigger:function(t){var r=this.controller;return r?r.perform(t):this.overrided(t)}}),u=e.Evented.inherit({klassName:"SpaRouteController",init:function(t,r){r=r||{},this.content=r.content,this.data=r.data},getConfigData:function(t){return t?this.data[t]:this.data},perform:function(t){var r=t.type;if(this[r])return this[r].call(this,t)}}),l=e.Evented.inherit({klassName:"SpaPage",init:function(t){t=e.mixin({routeViewer:"body"},t),this._params=t,this._rvc=document.querySelector(t.routeViewer),this._router=n,n.on("routed",e.proxy(this,"refresh"))},prepare:function(){},refresh:function(){var t=n.current(),r=(n.previous(),t.route.render(t));void 0!==r&&null!==r&&(e.isString(r)?this._rvc.innerHTML=r:(this._rvc.innerHTML="",this._rvc.appendChild(r)),t.route.trigger(o("rendered",{route:t.route,content:r})))}}),p=e.Evented.inherit({klassName:"SpaPlugin",init:function(t,r){this.name=t,e.isString(r.hookers)&&(r.hookers=r.hookers.split(" ")),this._setting=r},isHooked:function(t){var r=this._setting.hookers||[];return r.indexOf(t)>-1},prepare:function(){var t=new i,a=this._setting,s=a.controller,u=this.controller,l=this;return r([s.type],function(r){u=l.controller=new r(s),n.on(a.hookers,{plugin:l},e.proxy(u.perform,u)),t.resolve()}),t.then(function(){var t=o("preparing",{plugin:l,result:!0});return l.trigger(t),i.when(t.result).then(function(){l._prepared=!0})})},trigger:function(t){var r=this.controller;return r?r.perform(t):this.overrided(t)}}),f=e.Evented.inherit({klassName:"SpaPluginController",init:function(t){this.plugin=t},perform:function(t){var r=t.type;if(this[r])return this[r].call(this,t)}}),h=e.Evented.inherit({klassName:"SpaApplication",init:function(t){if(a)return a;var r=this._plugins={};t=this._config=e.mixin({plugins:{}},t,!0),e.each(t.plugins,function(t,e){r[t]=new p(t,e)}),n.routes(t.routes),this._router=n,this._page=new c.Page(t.page),document.title=t.title;var i=t.baseUrl;void 0===i&&(i=t.baseUrl=new e.URL(document.baseURI).pathname),n.baseUrl(i),t.homePath&&n.homePath(t.homePath),a=this},baseUrl:function(){return n.baseUrl()},getConfig:function(t){return t?this._config[t]:this._config},go:function(t,r){return n.go(t,r),this},page:function(){return this._page},prepare:function(){if(this._prepared)return i.resolve();var t=this,r=e.map(this._plugins,function(t,r){if(t.isHooked("starting"))return t.prepare()});return i.all(r).then(function(){n.trigger(o("starting",{spa:t}));var r=e.map(n.routes(),function(t,r){if(!1===t.lazy)return t.prepare()}),a=e.map(t._plugins,function(t,r){if(!t.isHooked("starting"))return t.prepare()});return i.all(r.concat(a)).then(function(){t._prepared=!0})})},run:function(){this._router.start(),n.trigger(o("started",{spa:this}))}}),c=function(t){return a||(window[t.name||"app"]=a=new c.Application(t)),a};return e.mixin(c,{Application:h,Page:l,Plugin:p,PluginController:f,Route:s,RouteController:u}),t.spa=c}),t("skylark-fw-spa/main",["skylark-langx/skylark","./spa"],function(t){return t}),t("skylark-fw-spa",["skylark-fw-spa/main"],function(t){return t})}(e,n),!i){var s=n("skylark-langx/skylark");o?module.exports=s:r.skylarkjs=s}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-fw-spa.js.map
