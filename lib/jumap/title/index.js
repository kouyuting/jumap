"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Title = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = require("d3");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Title = function () {
    function Title(data, id) {
        _classCallCheck(this, Title);

        this._data = data;
        this._id = id;
        this._parentNode = document.getElementById(id);
        this._height = this._height = Math.max(data[0].top + data[0].fontSize / 2, data[1].top + data[1].fontSize / 2);
        this._width = Number(this._parentNode.clientWidth);
        this._init();
    }

    _createClass(Title, [{
        key: "_init",
        value: function _init() {
            this._svg = d3.select(this._parentNode).append("svg").style('position', 'absolute').style('top', 0).style('left', 0).style('height', this._height).style('width', '100%');
            this._svg.selectAll("text").data(this._data).enter().append("text").attr('text-anchor', 'middle');
        }
    }, {
        key: "draw",
        value: function draw(data) {
            var _this = this;

            this._data = data;
            this._height = Math.max(data[0].top + data[0].fontSize / 2, data[1].top + data[1].fontSize / 2);
            this._width = Number(this._parentNode.clientWidth);
            this._svg.style('height', this._height).selectAll("text").style('color', function (d) {
                return d.color;
            }).style('font-size', function (d) {
                return d.fontSize;
            }).style('fill', function (d) {
                return d.color;
            }).attr('x', function (d) {
                return Number(d.left) + _this._width / 2;
            }).attr('y', function (d) {
                return Number(d.top);
            }).text(function (d) {
                return d.text;
            });
        }
    }]);

    return Title;
}();

exports.Title = Title;