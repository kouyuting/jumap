import jumap from "./jumap";
import option from "./data";
// 加载百度地图
const loadScript = () => {
    var script = document.createElement("script");
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=tSDhKECGtoyZYAF59FFTnFFRy5iHOcKs&callback=callback";
    document.body.appendChild(script);
};  
window.onload = loadScript; 

window.callback = () => {
    const jumapEg = kingchart.init('map');
    jumapEg.setOption(option);
}