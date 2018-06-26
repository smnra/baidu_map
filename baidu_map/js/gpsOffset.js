 

/**
 * gps纠偏算法，适用于google,高德体系的地图
 * @author Administrator
 *///此函数功能为谷歌经纬度转换为高德地图经纬度.
//两个参数 wgLon,wgLat 为google经纬度,返回值为数组,为高德地图经纬度.

	var pi = 3.14159265358979324;
	var a = 6378245.0;
	var ee = 0.00669342162296594323;

	function GoogleToGaode(wgLon,wgLat) {					//此函数功能为谷歌经纬度转换为高德地图经纬度.
		var latlng=[];
		if (outOfChina(wgLat, wgLon)) {
			latlng[0] = wgLat;
			latlng[1] = wgLon;
					}
		var dLat = transformLat(wgLon - 105.0, wgLat - 35.0);
		var dLon = transformLon(wgLon - 105.0, wgLat - 35.0);
		var radLat = wgLat / 180.0 * pi;
		var magic = Math.sin(radLat);
		magic = 1 - ee * magic * magic;
		var sqrtMagic = Math.sqrt(magic);
		dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
		dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
		latlng[0] = wgLat + dLat;
		latlng[1] = wgLon + dLon;
		return latlng;
	}


	function GaodeToGoogle(wgLon,wgLat) {					//此函数功能为高德地图经纬度转换为谷歌经纬度
		var latlng=[];
		if (outOfChina(wgLat, wgLon)) {
			latlng[0] = wgLat;
			latlng[1] = wgLon;
					}
		var dLat = transformLat(wgLon - 105.0, wgLat - 35.0);
		var dLon = transformLon(wgLon - 105.0, wgLat - 35.0);
		var radLat = wgLat / 180.0 * pi;
		var magic = Math.sin(radLat);
		magic = 1 - ee * magic * magic;
		var sqrtMagic = Math.sqrt(magic);
		dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
		dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
		latlng[0] = wgLat - dLat;
		latlng[1] = wgLon - dLon;
		return latlng;
	}












	function outOfChina(lat,lon) {
		if (lon < 72.004 || lon > 137.8347)
			return true;
		if (lat < 0.8293 || lat > 55.8271)
			return true;
		return false;
	}

	function transformLat(x,y) {
		var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
		ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
		ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
		return ret;
	}

	function transformLon(x,y) {
		var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
		ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
		ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
		return ret;
	}












//google经纬度转换为百度经纬度
//地图上取一点百度地图经纬度,假设为真实经纬度, 经过计算出百度地图的经纬度,计算真假经纬度之间的偏置
//在根据偏置计算真实的经纬度.

var baiduPoint_F;
var offSet=[0.0000000,0.0000000];   //用于存储偏置


function googleToBaidu(googleLng,googleLat){ 				//google经纬度转换为百度经纬度
	var baiduPoint=[];
	if (!offSet[0]){ 
		get_Offset(107.193919,34.353131);
	};
	baiduPoint[0]=googleLng-offSet[0];
	baiduPoint[1]=googleLat-offSet[1];
	console.debug(baiduPoint);
	return baiduPoint;

}


function baiduToGoogle(baiduLng,baiduLat){ 					//百度经纬度转换为google经纬度
	var googlePoint=[];
	if (!offSet[0]){ 
		get_Offset(107.193919,34.353131);
	};
	googlePoint[0]=baiduLng+offSet[0];
	googlePoint[1]=baiduLat+offSet[1];
	console.debug(googlePoint);
	alert(googlePoint);
	return googlePoint;

}







function get_Offset(googleLng_F,googleLat_F)				//计算偏置
{	
	var googlePoint_F = new BMap.Point(googleLng_F,googleLat_F);

		
		translateCallback = function (point){
     
	        offSet[0]=googleLng_F-point.lng;
			offSet[1]=googleLat_F-point.lat;
			console.debug(offSet);
			return offSet;
        }
	BMap.Convertor.translate(googlePoint_F,0,translateCallback);
}


















function Oget_Offset(googleLng_F,googleLat_F)				//计算偏置
{	
	var googlePoint_F;
	googlePoint_F = new BMap.Point(googleLng_F,googleLat_F);
	translateCallback = function (point)
		{	
			baiduPoint_F=point;
		}

	BMap.Convertor.translate(googlePoint_F,0,translateCallback);
	
	try{
		offSet[0]=googleLng_F-baiduPoint_F.lng 
		offSet[1]=googleLat_F-baiduPoint_F.lat
		if(offSet[0]>0&&offSet[0]<1){ 
				console.debug(offSet);
				return offSet;
			}
		}
	catch(e){ 
		setTimeout(function(){
				//var tmp=document.getElementById("get_offset_button");
				//tmp.click();
				get_Offset(this.googleLng_F,this.googleLat_F)
				offSet[0]=googleLng_F-baiduPoint_F.lng 
				offSet[1]=googleLat_F-baiduPoint_F.lat
				console.debug(offSet);
				alert(offSet);
				return offSet;
			}, 200);

		}
}




//2011-7-25
(function(){        //闭包
function load_script(xyUrl, callback){
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = xyUrl;
    //借鉴了jQuery的script跨域方法
    script.onload = script.onreadystatechange = function(){
        if((!this.readyState || this.readyState === "loaded" || this.readyState === "complete")){
            callback && callback();
            // Handle memory leak in IE
            script.onload = script.onreadystatechange = null;
            if ( head && script.parentNode ) {
                head.removeChild( script );
            }
        }
    };
    // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
    head.insertBefore( script, head.firstChild );
}
function translate(point,type,callback){
    var callbackName = 'cbk_' + Math.round(Math.random() * 10000);    //随机函数名
    var xyUrl = "http://api.map.baidu.com/ag/coord/convert?from="+ type + "&to=4&x=" + point.lng + "&y=" + point.lat + "&callback=BMap.Convertor." + callbackName;
    //动态创建script标签
    load_script(xyUrl);
    BMap.Convertor[callbackName] = function(xyResult){
        delete BMap.Convertor[callbackName];    //调用完需要删除改函数
        var point = new BMap.Point(xyResult.x, xyResult.y);
        callback && callback(point);
    }
}

window.BMap = window.BMap || {};
BMap.Convertor = {};
BMap.Convertor.translate = translate;
})();




