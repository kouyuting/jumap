import jumap from "./jumap";
import option from "./data";
// 加载百度地图
const loadScript = () => {
    const script = document.createElement("script");
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=tSDhKECGtoyZYAF59FFTnFFRy5iHOcKs&callback=callback";
    document.body.appendChild(script);
};  
window.onload = loadScript; 

window.callback = () => {
	const div = document.createElement("div");
	div.id = 'map';
	div.style.height = "600px";
	div.style.width = "800px";
	document.body.appendChild(div);
    const jumapEg = jumap.init('map');
    jumapEg.setOption(option);
}