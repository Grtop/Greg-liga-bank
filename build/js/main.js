"use strict";window.addEventListener("load",function(){document.querySelector(".nojs").classList.remove("nojs"),Array.prototype.forEach||(Array.prototype.forEach=function(e,t){var a,s;if(null===this)throw new TypeError(" this is null or not defined");var r=Object(this),n=r.length>>>0;if("function"!=typeof e)throw new TypeError(e+" is not a function");for(1<arguments.length&&(a=t),s=0;s<n;){var i;s in r&&(i=r[s],e.call(a,i,s,r)),s++}}),String.prototype.startsWith||(String.prototype.startsWith=function(e,t){return t=t||0,this.substr(t,e.length)===e});function t(e){e.preventDefault(),r.forEach(function(e){e.parentNode.classList.remove(s.tab+"_active")});var t=e.currentTarget;t.classList.contains(a.tab)&&t.parentNode.classList.add(s.tab+"_active")}var a={nav:"header__nav-toggle",tab:"service-item__head"},s={tabList:"services__list",tab:"service-item"},e=document.querySelector("."+a.nav);if(e&&e.addEventListener("click",function(e){e.preventDefault();var t=document.querySelector(".nav-main");if(e.target.classList.contains("header__nav-toggle")){if(e.target.classList.contains("header__nav-toggle_closed"))return e.target.classList.remove("header__nav-toggle_closed"),e.target.classList.add("header__nav-toggle_opened"),t.classList.remove("nav-main_closed"),void t.classList.add("nav-main_opened");if(e.target.classList.contains("header__nav-toggle_opened"))return e.target.classList.remove("header__nav-toggle_opened"),e.target.classList.add("header__nav-toggle_closed"),t.classList.remove("nav-main_opened"),void t.classList.add("nav-main_closed")}}),1023<document.body.offsetWidth){var r=document.querySelectorAll("."+a.tab);0<r.length&&r.forEach(function(e){e.addEventListener("click",t)})}else{var n=document.querySelector("."+s.tabList);n&&n.classList.add("swiper-wrapper");var i=document.querySelectorAll("."+s.tab);0<i.length&&i.forEach(function(e){e.classList.remove(s.tab+"_active"),e.classList.add("swiper-slide")})}if(document.querySelector(".slider"))new Swiper(".slider",{loop:!0,pagination:{el:".slider-pagination",type:"bullets",bulletElement:"button",clickable:!0,bulletClass:"slider-pagination__item",bulletActiveClass:"slider-pagination__item_active"}});if(document.body.offsetWidth<=1023&&document.querySelector(".services"))new Swiper(".services",{loop:!0})});