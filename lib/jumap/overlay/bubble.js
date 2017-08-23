"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = require("d3");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function () {
    return function (_BMap$Overlay) {
        _inherits(BubbleOverlay, _BMap$Overlay);

        // @data [Array] {lan, lng, value} 分别是经度、纬度、值
        function BubbleOverlay(data, id, style) {
            _classCallCheck(this, BubbleOverlay);

            var _this = _possibleConstructorReturn(this, (BubbleOverlay.__proto__ || Object.getPrototypeOf(BubbleOverlay)).call(this));

            _this._data = data;
            _this._id = id;
            _this._style = style;
            var parentNode = document.getElementById(id);
            _this._height = parentNode.clientHeight;
            _this._width = parentNode.clientWidth;
            return _this;
        }

        _createClass(BubbleOverlay, [{
            key: "_initContainer",
            value: function _initContainer() {
                var _this2 = this;

                // 创建div元素，作为自定义覆盖物的容器   
                var container = document.createElement("div");
                container.style.position = 'absolute';
                container.style.height = this._height + 'px';
                container.style.width = this._width + 'px';
                container.style.top = 0;
                container.style.left = 0;
                this._container = container;
                // 将div添加到覆盖物容器中
                this._bmap.getPanes().markerPane.appendChild(container);
                this._bmap.addEventListener('moveend', function (type) {
                    container.style.left = -type.target.offsetX + 'px';
                    container.style.top = -type.target.offsetY + 'px';
                    d3.select(_this2._container).selectAll("circle").attr('cy', function (d) {
                        return d.position.y + type.target.offsetY;
                    }).attr('cx', function (d) {
                        return d.position.x + type.target.offsetX;
                    });
                });
            }
        }, {
            key: "_drawBubble",
            value: function _drawBubble() {
                var _this3 = this;

                // 转换坐标
                this._data.forEach(function (item) {
                    item.point = new BMap.Point(item.lat, item.lng);
                    item.position = _this3._bmap.pointToOverlayPixel(item.point);
                    item.size = Math.min(Math.max(item.value, _this3._style.minSize), _this3._style.maxSize);
                });
                var g = d3.select(this._container).append("svg").attr('width', '100%').attr('height', '100%').selectAll("g").data(this._data).enter().append('g');
                g.append("circle").attr('cy', function (d) {
                    return d.position.y;
                }).attr('cx', function (d) {
                    return d.position.x;
                }).attr('fill', this._style.color).append('animate').attr('attributeName', 'r').attr('attributeType', 'XML').attr('from', function (d) {
                    return d.size;
                }).attr('to', function (d) {
                    return d.size * _this3._style.scale;
                }).attr('dur', this._style.speed + 's').attr('repeatCount', "indefinite");
                // 让气泡动起来
                // window.setInterval(()=>{
                //     d3.select(this._container)
                //         .selectAll("circle")
                //         .transition()
                //         .duration(500/this._style.speed)
                //         .attr('r', (d)=> d.value*this._style.scale)
                //         .transition()
                //         .duration(500/this._style.speed)
                //         .attr('r', (d)=> d.value)
                //     }, 500*2/this._style.speed);
            }
        }, {
            key: "initialize",
            value: function initialize(map) {
                this._bmap = map;
                // 初始化容器
                this._initContainer();
                // 画气泡
                this._drawBubble();
                // 需要将container作为方法的返回值，当调用该覆盖物的show、hide方法，或者对覆盖物进行移除时，API都将操作此元素。
                return this._container;
            }
            // 地图放大缩小或发生位移时调用此函数

        }, {
            key: "draw",
            value: function draw() {
                var _this4 = this;

                // 转换坐标
                this._data.forEach(function (item) {
                    item.position = _this4._bmap.pointToOverlayPixel(item.point);
                });
                var x = Number(this._container.style.left.split('px')[0]);
                var y = Number(this._container.style.top.split('px')[0]);
                d3.select(this._container).selectAll("circle").attr('cy', function (d) {
                    return d.position.y - y;
                }).attr('cx', function (d) {
                    return d.position.x - x;
                });
            }
        }]);

        return BubbleOverlay;
    }(BMap.Overlay);
};