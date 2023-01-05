!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("mapbox-gl")):"function"==typeof define&&define.amd?define(["mapbox-gl"],e):(t="undefined"!=typeof globalThis?globalThis:t||self).MapReport=e(t.mapboxgl)}(this,function(t){"use strict";function e(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var o=e(t),a={en:{trigger:"&#9755; Report a problem",title:"Report a map problem",close_title:"Close",menu_title:"Kind of problem?",cat_label_road:"Road problem",cat_label_place:"Place problem",cat_label_other:"Other problem",road_title:"Road problem",road_label_missing:"Road is missing",road_label_name:"Wrong road name",road_label_dir:"Wrong road direction",road_label_closed:"Road is closed",place_title:"Place problem",place_label_missing:"Place is missing",place_label_wrong_info:"Wrong place info",other_title:"Other map problem",description:"Description",send_report:"Send Report",confirmation_succ:"Your report was sent.<br>Thanks for your report. We’ll look into it as soon as we can.",confirmation_err:"An error occurred.<br>Please try again later.",confirmation_back:"Go back"},hr:{trigger:"&#9755; Prijavi pogrešku",title:"Prijavi pogrešku na karti",close_title:"Zatvori",menu_title:"Definiraj tip pogreške:",cat_label_road:"Pogrešni podaci o cesti",cat_label_place:"Pogrešni podaci mjesta",cat_label_other:"Ostale pogreške",road_title:"Pogrešni podaci o cesti",road_label_missing:"Nedostaje cesta",road_label_name:"Netočno ime ceste",road_label_dir:"Netočan smjer kretanja",road_label_closed:"Cesta je zatvorena",place_title:"Pogrešni podaci o mjestu",place_label_missing:"Nedostaje mjesto",place_label_wrong_info:"Netočni podaci o mjestu",other_title:"Ostale pogreške",description:"Opis problema",send_report:"Prijavi pogrešku",confirmation_succ:"Hvala Vam na prijavi pogreške.<br>Pogledat ćemo je u najkraćem mogućem roku.",confirmation_err:"Pogreška u prijavi pogreške.<br>Molimo pokušajte kasnije.",confirmation_back:"Vrati na početak"}},i=["roads_1005","roads_1007","roads_1010","roads_1020","roads_1030","roads_1040","roads_1050","roads_1060","roads_1070","roads_1080","roads_1016","roads_1026","roads_1036","roads_1046","roads_1056","roads_1066","roads_1076","roads_1086","roads_1018","roads_1028","roads_1038","roads_1048","roads_1058","roads_1068","roads_1078","roads_1088"];function r(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this._map=null,this._rmap=null,this._container=null,this._marker=null,this._category=null,this._locale=t.locale,this._referer=t.referer,this._bnds=null===t.bounds?null:[[13.45,42.37],[19.47,46.57]],this._service=t.service}return r.prototype.onAdd=function(t){var e=this;this._map=t,this._container=document.createElement("div"),this._container.className="mapboxgl-ctrl mapboxgl-ctrl-attrib mireo-issue-report";var i=a[this._locale]||a.hr;return this._container.innerHTML="\n\t<div>\n\t\t<a href='https://www.mireo.com/compact-maps' target='_blank' rel='noreferrer' class='feedback-trigger'>{trigger}</a>\n\t\t<div class='issue-report'>\n\t\t\t<div class='header'>\n\t\t\t\t<div class='title'>{title}</div>\n\t\t\t\t<div class='close'>\n\t\t\t\t\t<span class='label'>{close_title}</span>\n\t\t\t\t\t<span class='icon'>&nbsp;&#x2716;</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class='content'>\n\t\t\t\t<div class='sidebar'>\n\t\t\t\t\t<div class='menu'>\n\t\t\t\t\t\t<div class='title-wrapper main-title'>\n\t\t\t\t\t\t\t<div class='issue-title'>{menu_title}</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class='issue-categories'>\n\t\t\t\t\t\t\t<div class='issue-category' data-issue-category='road'>{cat_label_road}</div>\n\t\t\t\t\t\t\t<div class='issue-category' data-issue-category='place'>{cat_label_place}</div>\n\t\t\t\t\t\t\t<div class='issue-category' data-issue-category='other'>{cat_label_other}</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div data-issue-content='road' class='category-content'>\n\t\t\t\t\t\t<div class='title-wrapper'>\n\t\t\t\t\t\t\t<div class='back'>&#10094;</div>\n\t\t\t\t\t\t\t<div class='issue-title'>{road_title}</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class='issue-types'>\n\t\t\t\t\t\t\t<input class='issue-type' type='radio' name='mireo-issue' id='mireo-issue-wrong-name'></input><label class='issue-label' for='mireo-issue-wrong-name'>{road_label_name}</label>\n\t\t\t\t\t\t\t<input class='issue-type' type='radio' name='mireo-issue' id='mireo-issue-wrong-dir'></input><label class='issue-label' for='mireo-issue-wrong-dir'>{road_label_dir}</label>\n\t\t\t\t\t\t\t<input class='issue-type' type='radio' name='mireo-issue' id='mireo-issue-road-closed'></input><label class='issue-label' for='mireo-issue-road-closed'>{road_label_closed}</label>\n\t\t\t\t\t\t\t<input class='issue-type' type='radio' name='mireo-issue' id='mireo-issue-road-missing'></input><label class='issue-label' for='mireo-issue-road-missing'>{road_label_missing}</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class='description'>\n\t\t\t\t\t\t\t<textarea class='textarea' placeholder='{description}'></textarea>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class='issue-send'>\n\t\t\t\t\t\t\t<button>{send_report}</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div data-issue-content='place' class='category-content'>\n\t\t\t\t\t\t<div class='title-wrapper'>\n\t\t\t\t\t\t\t<div class='back'>&#10094;</div>\n\t\t\t\t\t\t\t<div class='issue-title'>{place_title}</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class='issue-types'>\n\t\t\t\t\t\t\t<input class='issue-type' type='radio' name='mireo-issue' id='mireo-issue-place-missing'></input><label class='issue-label' for='mireo-issue-place-missing'>{place_label_missing}</label>\n\t\t\t\t\t\t\t<input class='issue-type' type='radio' name='mireo-issue' id='mireo-issue-place-info-wrong'></input><label class='issue-label' for='mireo-issue-place-info-wrong'>{place_label_wrong_info}</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class='description'>\n\t\t\t\t\t\t\t<textarea class='textarea' placeholder='{description}'></textarea>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class='issue-send'>\n\t\t\t\t\t\t\t<button>{send_report}</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div data-issue-content='other' class='category-content'>\n\t\t\t\t\t\t<div class='title-wrapper'>\n\t\t\t\t\t\t\t<div class='back'>&#10094;</div>\n\t\t\t\t\t\t\t<div class='issue-title'>{other_title}</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class='issue-types'>\n\t\t\t\t\t\t\t\t<input class='issue-type' type='radio' name='mireo-issue' id='mireo-generic-issue' checked></input>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class='description'>\n\t\t\t\t\t\t\t<textarea class='textarea' placeholder='{description}'></textarea>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class='issue-send'>\n\t\t\t\t\t\t\t<button>{send_report}</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class='map-sidebar'>\n\t\t\t\t\t<div id='mireo-issue-map' data-mireo-issue-map='1' class='mireo-issue-map mapboxgl-map'></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t<div class='confirmation'>\n\t\t\t<div class=\"message-succ\">{confirmation_succ}</div>\n\t\t\t<div class=\"message-err\">{confirmation_err}</div>\n\t\t\t<div class='confirmation-back'>\n\t\t\t\t<button>{confirmation_back}</button>\n\t\t\t</div>\n\t\t</div\n\t</div>\n".replace(/\{([\w]+)\}/gm,function(t,e){return i[e]}),this.init(),this._map.on("moveend",function(){e._rmap&&e._rmap.flyTo({center:e._map.getCenter(),zoom:e._map.getZoom(),speed:.8})}),this._container.querySelectorAll(".issue-category").forEach(function(t){t.addEventListener("click",function(t){e._select_category(t)})}),this._container.querySelectorAll(".issue-type").forEach(function(t){t.addEventListener("click",function(){e._container.querySelector('[data-issue-content = "'.concat(e._category,'"] textarea')).value="",e._highlight_road()})}),this._container.querySelector(".close").addEventListener("click",function(){return e._hide()}),this._container.querySelectorAll(".title-wrapper").forEach(function(t){t.addEventListener("click",function(){e._back()})}),this._container.querySelector(".back").style.display="flex",this._container.querySelectorAll(".issue-send").forEach(function(t){t.addEventListener("click",function(t){e._send_issue(t)})}),this._container.querySelector(".confirmation-back").addEventListener("click",function(){e._back_to_start()}),this._container},r.prototype.init=function(){var s=this;this._container.querySelector(".feedback-trigger").addEventListener("click",function(t){var e=s._map,i=e.getCenter(),a=i.lat,r=i.lng,i=s._bnds?new o.default.LngLatBounds(s._bnds):null;if(s._service&&i&&a<i.getNorth()&&a>i.getSouth()&&r>i.getWest()&&r<i.getEast())return s._show(),t.preventDefault();t.currentTarget.setAttribute("href",["https://www.openstreetmap.org#map="+e.getZoom(),a,r].join("/"))})},r.prototype.onRemove=function(t){this._container.parentNode.removeChild(this._container),this._map=void 0},r.prototype._show=function(){var e=this;this._map.style&&this._map.style.stylesheet&&(this._container.querySelector(".issue-report").style.display="flex",this._rmap||(this._rmap=new o.default.Map({container:this._container.querySelector("[data-mireo-issue-map]"),style:this._map.style.stylesheet,attributionControl:!1,center:this._map.getCenter(),zoom:this._map.getZoom()}),this._rmap.on("load",function(){this.addSource("report-road",{type:"geojson",data:{type:"FeatureCollection",features:[]}}),this.addLayer({id:"report-road",type:"line",source:"report-road",layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"orangered","line-width":4}},"roadsOnewayArrowL")})),this._marker?this._marker.setLngLat(this._map.getCenter()):(this._marker=new o.default.Marker({draggable:!0,color:"orange"}).setLngLat(this._map.getCenter()).addTo(this._rmap),this._rmap.on("click",function(t){e._marker.setLngLat(t.lngLat),e._highlight_road()}),this._marker.on("dragend",function(){e._highlight_road()})))},r.prototype._hide=function(){this._container.querySelector(".issue-report").style.display="none",this._back_to_start()},r.prototype._set_road_data=function(t){this._rmap.getSource("report-road").setData({type:"FeatureCollection",features:t})},r.prototype._highlight_road=function(){var t;0!==this._container.querySelectorAll('[data-issue-content = "road"] input:checked:not(#mireo-issue-road-missing)').length?(t=this._rmap.queryRenderedFeatures(this._rmap.project(this._marker.getLngLat()),{layers:i}),this._set_road_data([t[0]||[]])):this._set_road_data([])},r.prototype._select_category=function(t){this._category=t.currentTarget.getAttribute("data-issue-category"),this._container.querySelector(".menu").style.display="none",this._container.querySelectorAll(".category-content").forEach(function(t){return t.style.display="none"}),this._container.querySelector('[data-issue-content = "'.concat(this._category,'"]')).style.display="flex",this._container.querySelector('[data-issue-content = "'.concat(this._category,'"] .issue-type:first-child')).click()},r.prototype._back=function(){this._container.querySelectorAll(".category-content").forEach(function(t){return t.style.display="none"}),this._container.querySelector(".menu").style.display="flex",this._set_road_data([])},r.prototype._back_to_start=function(){this._container.querySelector(".issue-report").classList.remove("report-sent"),this._container.querySelector(".content").style.display="flex",this._back()},r.prototype._send_issue=function(){var e=this,t=this._container.querySelector("input.issue-type:checked").id,i=this._container.querySelector('[data-issue-content = "'.concat(this._category,'"] textarea')).value;fetch(this._service,{method:"POST",mode:"no-cors",body:"(".concat(this._marker._lngLat.lng," ").concat(this._marker._lngLat.lat,") ").concat(t," ").concat(i," ").concat(this._referer||window.location.href)}).then(function(t){e._container.querySelector(".issue-report .confirmation").className="confirmation confirmation-succ"}).catch(function(){e._container.querySelector(".issue-report .confirmation").className="confirmation confirmation-err"}).finally(function(){e._container.querySelector(".issue-report").classList.add("report-sent")})},r});
