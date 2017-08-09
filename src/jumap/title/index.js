import * as d3 from "d3";
class Title {
    constructor(data, id) {
        this._data = data;
        this._id = id;
        this._parentNode = document.getElementById(id);
        this._height = this._height = Math.max(data[0].top+data[0].fontSize/2,data[1].top+data[1].fontSize/2);
        this._width = Number(this._parentNode.clientWidth);
        this._init();
    }
    _init() {
        this._svg = d3.select(this._parentNode)
            .append("svg")
            .style('position', 'absolute')
            .style('top', 0)
            .style('left', 0)
            .style('height', this._height)
            .style('width', '100%');
        this._svg
            .selectAll("text")
            .data(this._data)
            .enter()
            .append("text")
            .attr('text-anchor', 'middle');
    }
    draw(data) {
        this._data = data;
        this._height = Math.max(data[0].top+data[0].fontSize/2,data[1].top+data[1].fontSize/2);
        this._width = Number(this._parentNode.clientWidth);
        this._svg
            .style('height', this._height)
            .selectAll("text")
            .style('color', d=>d.color)
            .style('font-size', d=>d.fontSize)
            .style('fill', d=>d.color)
            .attr('x', d=>d.left+this._width/2)
            .attr('y', d=>d.top)
            .text(d=>d.text);
    }
}

export {Title}