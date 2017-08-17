import BubbleOverlay from "./overlay/bubble.js";
import mapStyle from "../data/mapStyle.js"
import { Title } from "./title";
class Jumap {
    constructor(id) {
        this._id = id;
        this._dom = document.getElementById(id);
        this._overlays = [];
        this._oldCache = [];
    }
    _addOverlay() {
        // 移除覆盖层
        this._overlays.forEach((item) => {
            this._bmap.removeOverlay(item);
        });
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
                // alert('no');
                return ;
            }
            let pointArray = [];
            if(this._boundary === undefined) this._boundary = [];
            for (let i = 0; i < count; i++) {
                this._boundary[i] = new BMap.Polygon(rs.boundaries[i], {
                    strokeWeight: boundary.strokeWeight, 
                    strokeColor: boundary.strokeColor,
                    fillOpacity: boundary.fillOpacity? boundary.fillOpacity: boundary.fillOpacity+0.0001 //fillOpacity为0时异常
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
    _setTitle() {
        if(this._option.title && !this._title) {
            this._title = new Title(this._option.title, this._id);
        }
        this._title.draw(this._option.title);
    }
    _setRoam() {
        if(this._option.bmap.roam) {
            this._bmap.enableScrollWheelZoom();
            this._bmap.enableDragging();
        } else {
            this._bmap.disableScrollWheelZoom();
            this._bmap.disableDragging();
        }
    }
    // 判断地图主题或位置是否改变，避免不必要的图片渲染
    _ifSet() {
        let bmap = this._option.bmap;
        let newArray = [bmap.center[0], bmap.center[1], bmap.zoom, bmap.mapStyle];
        let ifSet = this._oldCache.some((item, index) => {
            if (item === newArray[index]) return false;
            return true;
        });
        if (this._oldCache.length === 0) ifSet = true;
        this._oldCache = newArray;
        return ifSet;
    }
    _setMapPositionAndStyle() {
        let bmap = this._option.bmap;
        let ifSet = this._ifSet();
        if(ifSet) {
            // 设置地图中心
            this._bmap.centerAndZoom(new BMap.Point(...bmap.center), bmap.zoom);
            // 设置底图样式
            this._bmap.setMapStyle(mapStyle[bmap.mapStyle]);
        }
    }
    setOption(option) {
        this._option = option;
        // 关于地图的配置
        const bmap = option.bmap;
        // 画地图，存在则直接返回
        this._bmap = this._bmap || new BMap.Map(this._id);
        // 判断是否需要更新，避免不必要的图片渲染
        this._setMapPositionAndStyle();
        // 鼠标滚动
        this._setRoam(); 
        // 设置底图透明度
        let tile = document.getElementById(this._id).querySelector('div:nth-child(1)>div:nth-child(3)');
        tile.style.opacity = bmap.opacity;
        // 设置底图可见性
        tile.style.visibility = bmap.visibility? 'visible': 'hidden';
        // 设置行政区
        if(bmap.boundary && bmap.boundary.key) this._setBoundary();
        // 标题
        this._setTitle();
        // 设置比例尺
        this._setRuler();
        // 画飞线、气泡等
        if(typeof option.series === 'object') this._addOverlay();

        this._bmap.enableAutoResize();
    }
    reflow() {
        this._setTitle();
        this._bmap.centerAndZoom(new BMap.Point(...this._option.bmap.center), this._option.bmap.zoom);
        for(let i = 0; i < this._overlays.length; i++) {
            this._overlays[i]._container.style.height = this._dom.clientHeight + 'px';
            this._overlays[i]._container.style.width = this._dom.clientWidth + 'px';
        }
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