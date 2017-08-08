export default {
	title: [
        {
            type: 'main',
            text: '全国主要城市空气质量',
            color: '#fff',
            fontSize: 14,
            left: 0,
            top: 20
        },
        {
            type: 'sub',
            text: '全国主要城市空气质量',
            color: '#fff',
            fontSize: 12,
            left: 0,
            top: 40
        }
    ],
    bmap: {
        center: [104.114129, 37.550339],
        zoom: 5,
        roam: true,
        opacity: 1,
        visibility: true,
        mapStyle: 'waterDark',
        boundary: {
            key: '上海',
            strokeWeight: 1,
            strokeColor: 'red',
            fillOpacity: 0.1
        },
        ruler: false
    },
    style: {
        scale: 2, // 呼吸范围 0-20
        speed: 0.9, // 动效速度 0-1
        opacity: 1, // 透明度 0-1
        maxSize: 20, // 最大尺寸
        minSize: 1 // 最小尺寸
    },
    series : [{
        type: 'bubble',
    	itemStyle: {
    		color: '#FBF320',
            animation: 'breathe'
    	},
        data: [{
	        lat: 121.491,
	        lng: 31.233,
	        value: 6
	    },
	    {
	        lat: 118.1,
	        lng: 24.46,
	        value: 8
	    },
	    {
	        lat: 120.95,
	        lng: 31.39,
	        value: 5
	    }]
    }]
}