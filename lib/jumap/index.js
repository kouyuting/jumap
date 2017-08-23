"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bubble = require("./overlay/bubble.js");

var _bubble2 = _interopRequireDefault(_bubble);

var _mapStyle = require("../data/mapStyle.js");

var _mapStyle2 = _interopRequireDefault(_mapStyle);

var _title = require("./title");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Jumap = function () {
    function Jumap(id) {
        _classCallCheck(this, Jumap);

        this._id = id;
        this._dom = document.getElementById(id);
        this._overlays = [];
        this._oldCache = [];
    }

    _createClass(Jumap, [{
        key: "_addOverlay",
        value: function _addOverlay() {
            var _this = this;

            // 移除覆盖层
            this._overlays.forEach(function (item) {
                _this._bmap.removeOverlay(item);
            });
            this._overlays = this._option.series.map(function (item, index) {
                var constructor = Jumap.getOverlayConstructor(item.type);
                var tempStyle = Object.assign({}, _this._option.style, item.itemStyle);
                var overlay = new constructor(item.data, _this._id, tempStyle);
                _this._bmap.addOverlay(overlay);
                return overlay;
            });
        }
    }, {
        key: "_clearBoundary",
        value: function _clearBoundary() {
            var _this2 = this;

            if (this._boundary) {
                this._boundary.forEach(function (item) {
                    _this2._bmap.removeOverlay(item);
                });
            }
        }
    }, {
        key: "_setBoundary",
        value: function _setBoundary() {
            var _this3 = this;

            var boundary = this._option.bmap.boundary;
            this._clearBoundary();
            var bdary = new BMap.Boundary();
            bdary.get(boundary.key, function (rs) {
                // 获取行政区域 
                var count = rs.boundaries.length; // 行政区域的点有多少个
                if (count === 0) {
                    // alert('no');
                    return;
                }
                var pointArray = [];
                if (_this3._boundary === undefined) _this3._boundary = [];
                for (var i = 0; i < count; i++) {
                    _this3._boundary[i] = new BMap.Polygon(rs.boundaries[i], {
                        strokeWeight: boundary.strokeWeight,
                        strokeColor: boundary.strokeColor,
                        fillOpacity: boundary.fillOpacity ? boundary.fillOpacity : boundary.fillOpacity + 0.0001 //fillOpacity为0时异常
                    }); // 建立多边形覆盖物
                    _this3._bmap.addOverlay(_this3._boundary[i]); // 添加覆盖物
                    pointArray = pointArray.concat(_this3._boundary[i].getPath());
                }
            });
        }
    }, {
        key: "_setRuler",
        value: function _setRuler() {
            var ruler = this._option.bmap.ruler;
            if (ruler) {
                if (!this._ruler) this._ruler = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT }); // 左上角，添加比例尺
                this._bmap.addControl(this._ruler);
            } else if (this._ruler) {
                this._bmap.removeControl(this._ruler);
            }
        }
    }, {
        key: "_setTitle",
        value: function _setTitle() {
            if (this._option.title && !this._title) {
                this._title = new _title.Title(this._option.title, this._id);
            }
            this._title.draw(this._option.title);
        }
    }, {
        key: "_setRoam",
        value: function _setRoam() {
            if (this._option.bmap.roam) {
                this._bmap.enableScrollWheelZoom();
                this._bmap.enableDragging();
            } else {
                this._bmap.disableScrollWheelZoom();
                this._bmap.disableDragging();
            }
        }
        // 判断地图主题或位置是否改变，避免不必要的图片渲染

    }, {
        key: "_ifSet",
        value: function _ifSet() {
            var bmap = this._option.bmap;
            var newArray = [bmap.center[0], bmap.center[1], bmap.zoom, bmap.mapStyle];
            var ifSet = this._oldCache.some(function (item, index) {
                if (item === newArray[index]) return false;
                return true;
            });
            if (this._oldCache.length === 0) ifSet = true;
            this._oldCache = newArray;
            return ifSet;
        }
    }, {
        key: "_setMapPositionAndStyle",
        value: function _setMapPositionAndStyle() {
            var bmap = this._option.bmap;
            var ifSet = this._ifSet();
            if (ifSet) {
                // 设置地图中心
                this._bmap.centerAndZoom(new (Function.prototype.bind.apply(BMap.Point, [null].concat(_toConsumableArray(bmap.center))))(), bmap.zoom);
                // 设置底图样式
                this._bmap.setMapStyle(_mapStyle2.default[bmap.mapStyle]);
            }
        }
    }, {
        key: "setOption",
        value: function setOption(option) {
            this._option = option;
            // 关于地图的配置
            var bmap = option.bmap;
            // 画地图，存在则直接返回
            this._bmap = this._bmap || new BMap.Map(this._id);
            // 判断是否需要更新，避免不必要的图片渲染
            this._setMapPositionAndStyle();
            // 鼠标滚动
            this._setRoam();
            // 设置底图透明度
            var tile = document.getElementById(this._id).querySelector('div:nth-child(1)>div:nth-child(3)');
            tile.style.opacity = bmap.opacity;
            // 设置底图可见性
            tile.style.visibility = bmap.visibility ? 'visible' : 'hidden';
            // 设置行政区
            if (bmap.boundary && bmap.boundary.key) this._setBoundary();
            // 标题
            this._setTitle();
            // 设置比例尺
            this._setRuler();
            // 画飞线、气泡等
            if (_typeof(option.series) === 'object') this._addOverlay();

            this._bmap.enableAutoResize();
        }
    }, {
        key: "reflow",
        value: function reflow() {
            this._setTitle();
            this._bmap.centerAndZoom(new (Function.prototype.bind.apply(BMap.Point, [null].concat(_toConsumableArray(this._option.bmap.center))))(), this._option.bmap.zoom);
            for (var i = 0; i < this._overlays.length; i++) {
                this._overlays[i]._container.style.height = this._dom.clientHeight + 'px';
                this._overlays[i]._container.style.width = this._dom.clientWidth + 'px';
            }
        }
    }, {
        key: "getBMap",
        value: function getBMap() {
            return this._bmap;
        }
    }]);

    return Jumap;
}();

Jumap.overlayFactory = {
    bubble: _bubble2.default

    // overlay构造函数的缓存
};Jumap.overlayConstructorCache = {};

Jumap.getOverlayConstructor = function (type) {
    if (typeof Jumap.overlayConstructorCache[type] === 'function') return Jumap.overlayConstructorCache[type];
    return Jumap.overlayConstructorCache[type] = Jumap.overlayFactory[type]();
};

exports.default = {
    init: function init(id) {
        return new Jumap(id);
    }
};