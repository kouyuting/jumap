import * as d3 from "d3";
export default () => {
    return class BubbleOverlay extends BMap.Overlay { 
        // @data [Array] {lan, lng, value} 分别是经度、纬度、值
        constructor(data, id) {
            super();
            this._data = data;
            this._id = id;
            let parentNode = document.getElementById(id);
            this._height = parentNode.style.height;
            this._width = parentNode.style.width;
            console.log(parentNode);
        }
        _initContainer() {
            // 创建div元素，作为自定义覆盖物的容器   
            const container = document.createElement("div");
            container.style.position = 'absolute';
            container.style.height = this._height;
            container.style.width = this._width;
            container.style.top = 0;
            container.style.left = 0;
            //container.viewBox = [0, 0, 800, 520].join(' ');
            console.dir(container);
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
                .attr('r', (d)=> d.value)
                .attr('fill', '#4A988A');
            // 让气泡动起来
            window.setInterval(()=>{
                d3.select(this._container)
                    .selectAll("circle")
                    .attr('r', (d)=> d.value)
                d3.select(this._container)
                    .selectAll("circle")
                    .transition()
                    .duration(1000)
                    .attr('r', (d)=> d.value*0.5)
                }, 2000);
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
            console.log(x);
            d3.select(this._container)
                .selectAll("circle")
                .attr('cy', (d)=> d.position.y-y)
                .attr('cx', (d)=> d.position.x-x)
        }
    }
}