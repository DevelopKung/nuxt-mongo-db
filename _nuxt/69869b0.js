(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{440:function(t,r,n){"use strict";n(8),n(7),n(70),n(239),n(236);var e=n(1);var o,c=n(71);r.a=(o="container",e.a.extend({name:"v-".concat(o),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(t,r){var n=r.props,data=r.data,e=r.children;data.staticClass="".concat(o," ").concat(data.staticClass||"").trim();var c=data.attrs;if(c){data.attrs={};var d=Object.keys(c).filter((function(t){if("slot"===t)return!1;var r=c[t];return t.startsWith("data-")?(data.attrs[t]=r,!1):r||"string"==typeof r}));d.length&&(data.staticClass+=" ".concat(d.join(" ")))}return n.id&&(data.domProps=data.domProps||{},data.domProps.id=n.id),t(n.tag,data,e)}})).extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,r){var n,e=r.props,data=r.data,o=r.children,d=data.attrs;return d&&(data.attrs={},n=Object.keys(d).filter((function(t){if("slot"===t)return!1;var r=d[t];return t.startsWith("data-")?(data.attrs[t]=r,!1):r||"string"==typeof r}))),e.id&&(data.domProps=data.domProps||{},data.domProps.id=e.id),t(e.tag,Object(c.a)(data,{staticClass:"container",class:Array({"container--fluid":e.fluid}).concat(n||[])}),o)}})},511:function(t,r,n){"use strict";n.r(r);var e=n(165),o=n(440),c={data:function(){return{profile:this.$auth.user}},computed:{checkUser:function(){return this.profile.firstname==this.$route.params.id}},methods:{}},d=n(47),component=Object(d.a)(c,(function(){var t=this,r=t._self._c;return r("div",[r("Navbar",{attrs:{title:t.profile.firstname}}),t._v(" "),r(o.a,[r(e.a,{attrs:{elevation:0}},[t._v("\r\n      "+t._s(t.profile.username)+"\r\n    ")])],1)],1)}),[],!1,null,"167ac403",null);r.default=component.exports;installComponents(component,{Navbar:n(240).default})}}]);