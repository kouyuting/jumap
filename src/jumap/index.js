import BubbleOverlay from "./overlay/bubble.js";

class Gcharts {
    constructor(id) {
        this._id = id;
        this._dom = document.getElementById('id');
    }
    _addOverlay(series, id) {
        this._overlays = series.map((item, index) => {
            let constructor = Gcharts.getOverlayConstructor(item.type);
            let overlay = new constructor(item.data, id);
            this._bmap.addOverlay(overlay);
            return overlay;
        });
    }
    setOption(option) {
        this._option = option;
        const bmap = option.bmap;
        // 画地图
        this._bmap = new BMap.Map(this._id);
        this._bmap.centerAndZoom(new BMap.Point(...bmap.center), bmap.zoom);
        if(bmap.roam) this._bmap.enableScrollWheelZoom();
        // 画飞线、气泡等
        if(typeof option.series === 'object') this._addOverlay(option.series, this._id);
    }
    getBMap() {
        return this._bmap;
    }
    
}
Gcharts.overlayFactory = {
    bubble: BubbleOverlay
}

// overlay构造函数的缓存
Gcharts.overlayConstructorCache = {};

// 依赖注入
Gcharts.getOverlayConstructor = (type) => {
    if(typeof Gcharts.overlayConstructorCache[type] === 'function')
        return Gcharts.overlayConstructorCache[type];
    return Gcharts.overlayConstructorCache[type] = Gcharts.overlayFactory[type]();
}

export default {
    init(id) {
        return new Gcharts(id);
    }
}