!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var d=new Error("Cannot find module '"+e+"'");throw d.code="MODULE_NOT_FOUND",d}).register=function(e,t){o[e]=t},e.parcelRequired7c6=n),n.register("bhhwi",(function(e,t){const o="light-theme",n="dark-theme",r=document.querySelector("#theme-switch-toggle");function d(e,t){document.body.classList.add(e),document.body.classList.remove(t),localStorage.setItem("theme",e)}localStorage.getItem("theme")===n?(r.checked="true",d(n,o)):(r.checked=!1,d(o,n)),r.addEventListener("change",(e=>{e.target.checked?d(n,o):d(o,n)}))})),n("bhhwi")}();
//# sourceMappingURL=favorite-cocktails.d3157137.js.map
