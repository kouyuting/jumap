export default {
	title: {
        text: '全国主要城市空气质量',
        color: '#000',
        fontSize: '12',
        left: 0,
        top: 0
    },
    subTitle: {
        text: '全国主要城市空气质量',
        color: '#000',
        fontSize: '12',
        left: 0,
        top: 0
    },
    bmap: {
        center: [104.114129, 37.550339],
        zoom: 5,
        roam: true,
    },
    series : [{
        type: 'bubble',
    	itemStyle: {
    		color: '#fff'
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