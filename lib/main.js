"use strict";

var _jumap = require("./jumap");

var _jumap2 = _interopRequireDefault(_jumap);

var _data = require("./data");

var _data2 = _interopRequireDefault(_data);

require("babel-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 加载百度地图
var loadScript = function loadScript() {
    var script = document.createElement("script");
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=tSDhKECGtoyZYAF59FFTnFFRy5iHOcKs&callback=callback";
    document.body.appendChild(script);
};
window.onload = loadScript;

window.callback = function () {
    var div = document.createElement("div");
    div.id = 'map';
    div.style.height = "600px";
    div.style.width = "800px";
    document.body.appendChild(div);
    var jumapEg = _jumap2.default.init('map');
    jumapEg.setOption(_data2.default);
    var se = new Set(1, 2, 3, 4, 5, 1);
    console.log(se);
};