import * as d3 from "d3";
export default () => {
    return class BubbleOverlay extends BMap.Overlay { 
        // @data [Array] {lan, lng, value} 分别是经度、纬度、值
        constructor(data, id, style) {
            super();
            this._data = data;
            this._id = id;
            this._style = style;
            let parentNode = document.getElementById(id);
            this._height = parentNode.clientHeight;
            this._width = parentNode.clientWidth;
        }
        _initContainer() {
            // 创建div元素，作为自定义覆盖物的容器   
            const container = document.createElement("div");
            container.style.position = 'absolute';
            container.style.height = this._height + 'px';
            container.style.width = this._width + 'px';
            container.style.top = 0;
            container.style.left = 0;
            this._container = container;
            // 将div添加到覆盖物容器中
            this._bmap.getPanes().markerPane.appendChild(container);
            this._bmap.addEventListener('moveend', (type) => {
                container.style.left = -type.target.offsetX + 'px';
                container.style.top = -type.target.offsetY + 'px';
                d3.select(this._container)
                    .selectAll("circle")
                    .attr('cy', (d)=> d.position.y+type.target.offsetY)
                    .attr('cx', (d)=> d.position.x+type.target.offsetX)
            });
        }
        _drawBubble() {
            // 转换坐标
            this._data.forEach((item) => {
                item.point = new BMap.Point(item.lat, item.lng);
                item.position = this._bmap.pointToOverlayPixel(item.point);
            });
            let g = d3.select(this._container)
                .append("svg")
                .attr('width', '100%')
                .attr('height', '100%')
                .selectAll("g")
                .data(this._data)
                .enter()
                .append('g');
            g.append("circle")
                .attr('cy', (d)=> d.position.y)
                .attr('cx', (d)=> d.position.x)
                .attr('fill', this._style.color)
                .append('animate')
                .attr('attributeName', 'r')
                .attr('attributeType', 'XML')
                .attr('from', (d)=> d.value)
                .attr('to', (d)=> d.value*this._style.scale)
                .attr('dur', this._style.speed+'s')
                .attr('repeatCount', "indefinite")
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
        initialize(map) {  
            this._bmap = map;        
            // 初始化容器
            this._initContainer()
            // 画气泡
            this._drawBubble();
            // 需要将container作为方法的返回值，当调用该覆盖物的show、hide方法，或者对覆盖物进行移除时，API都将操作此元素。
            return this._container;
        }
        // 地图放大缩小或发生位移时调用此函数
        draw() {
            // 转换坐标
            this._data.forEach((item) => {
                item.position = this._bmap.pointToOverlayPixel(item.point);
            });
            let x = Number(this._container.style.left.split('px')[0]);
            let y = Number(this._container.style.top.split('px')[0]);
            d3.select(this._container)
                .selectAll("circle")
                .attr('cy', (d)=> d.position.y-y)
                .attr('cx', (d)=> d.position.x-x)
        }
    }
}