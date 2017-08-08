import BubbleOverlay from "./overlay/bubble.js";
import mapStyle from "../data/mapStyle.js"

class Jumap {
    constructor(id) {
        this._id = id;
        this._dom = document.getElementById('id');
    }
    _addOverlay() {
        this._overlays = this._option.series.map((item, index) => {
            let constructor = Jumap.getOverlayConstructor(item.type);
            let tempStyle = Object.assign({}, this._option.style, item.itemStyle);
            let overlay = new constructor(item.data, this._id, tempStyle);
            this._bmap.addOverlay(overlay);
            return overlay;
        });
    }
    _clearBoundary() {
        if(this._boundary) {
            this._boundary.forEach((item) => {
                this._bmap.removeOverlay(item);
            });
        }
    }
    _setBoundary() {
        const boundary = this._option.bmap.boundary; 
        this._clearBoundary();
        const bdary = new BMap.Boundary();
        bdary.get(boundary.key, (rs) => {       // 获取行政区域 
            const count = rs.boundaries.length; // 行政区域的点有多少个
            if (count === 0) {
                alert('no');
                return ;
            }
            let pointArray = [];
            if(this._boundary === undefined) this._boundary = [];
            for (let i = 0; i < count; i++) {
                this._boundary[i] = new BMap.Polygon(rs.boundaries[i], {
                    strokeWeight: boundary.strokeWeight, 
                    strokeColor: boundary.strokeColor,
                    fillOpacity: boundary.fillOpacity
                }); // 建立多边形覆盖物
                this._bmap.addOverlay(this._boundary[i]);  // 添加覆盖物
                pointArray = pointArray.concat(this._boundary[i].getPath());
            }      
        });
    }
    _setRuler() {
        let ruler = this._option.bmap.ruler;
        if(ruler) {
            if(!this._ruler) this._ruler = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
            this._bmap.addControl(this._ruler); 
        } else if(this._ruler) {
            this._bmap.removeControl(this._ruler);
        }
    }
    setOption(option) {
        this._option = option;
        const bmap = option.bmap;
        // 画地图
        this._bmap = new BMap.Map(this._id);
        // 设置地图中心
        this._bmap.centerAndZoom(new BMap.Point(...bmap.center), bmap.zoom);
        // 设置底图样式
        this._bmap.setMapStyle(mapStyle[bmap.mapStyle]); 
        // 鼠标滚动
        if(bmap.roam) this._bmap.enableScrollWheelZoom();
        // 设置底图透明度
        let tile = document.querySelector('#' + this._id + '>div>div:nth-child(3)');
        tile.style.opacity = bmap.opacity;
        // 设置底图可见性
        tile.style.visibility = bmap.visibility? 'visible': 'hidden';
        // 设置行政区
        if(bmap.boundary && bmap.boundary.key) this._setBoundary();
        // 设置比例尺
        this._setRuler();
        // 画飞线、气泡等
        if(typeof option.series === 'object') this._addOverlay();
    }
    getBMap() {
        return this._bmap;
    }
    
}
Jumap.overlayFactory = {
    bubble: BubbleOverlay
}

// overlay构造函数的缓存
Jumap.overlayConstructorCache = {};

// 依赖注入
Jumap.getOverlayConstructor = (type) => {
    if(typeof Jumap.overlayConstructorCache[type] === 'function')
        return Jumap.overlayConstructorCache[type];
    return Jumap.overlayConstructorCache[type] = Jumap.overlayFactory[type]();
}

export default {
    init(id) {
        return new Jumap(id);
    }
}