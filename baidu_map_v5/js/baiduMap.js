// 百度地图API功能
var map = new BMap.Map("baiduMap");            // 创建Map实例
//map.centerAndZoom("西安",14);                   // 初始化地图,设置城市和地图级别。
map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
map.addControl(new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_RIGHT}));    //左上角，默认地图控件
map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
map.enableKeyboard();	//启用键盘上下左右键移动地图
map.setDefaultCursor("auto");  //设置鼠标形状
var stCtrl = new BMap.PanoramaControl(); //构造全景控件
stCtrl.setOffset(new BMap.Size(10, 40));	//全景地图控件位置
map.addControl(stCtrl);//添加全景控件


var local = new BMap.LocalSearch(map, {			//百度搜索框函数
	renderOptions:{map: map}
	});













var myCityName = "宝鸡";						//定义当前城市
var offSet=[0.0000000,0.0000000];   //用于存储偏置
function getOffset(){		//此模块功能为先取得所在城市名,然后根据城市名解析 对应的经纬度,在根据经纬度计算出此区域的经纬度偏置

	function getCityFun(result){					//此函数功能为取得城市的名称
		myCityName = result.name;			//取得名称并赋值给全局变量 myCityName
		//console.debug(myCityName);

		map.centerAndZoom(myCityName,14);                   // 初始化地图,设置城市和地图级别。

		function nameToCoordinate(cityName){
		// 创建地址解析器实例
		var myGeo = new BMap.Geocoder();
		myGeo.getPoint(cityName, function(point){		//根据地名解析为百度经纬度
			if (point) {
				get_Offset(point.lng,point.lat);			//调用get_Offset() 函数计算经纬度偏置并保存在全局变量offSet数组中
				
			}else{
				alert("您选择地址没有解析到结果!");
			}
		}, "西安市");
		}
		nameToCoordinate(myCityName);		//调用对象的get方法获得城市名称	


	}
	var myCity = new BMap.LocalCity();		//初始化百度地图取得城市名称的对象
	myCity.get(getCityFun);						//调用对象的get方法获得城市名称	
}
getOffset();





var mouseLng;									//鼠标所处位置的经度	
var mouseLat;									//鼠标所处位置的纬度	
map.addEventListener("mousemove",function(e){			//鼠标移动时在表格上显示经纬度    offSet为百度经纬度偏置
	mouseLng=(e.point.lng + offSet[0]).toFixed(9);				
	mouseLat=(e.point.lat + offSet[1]).toFixed(9);
	$("#mouseCoordinate").text(mouseLng+","+mouseLat);
	});	


map.addEventListener("click",function(e){			//鼠标点击时在表格上显示经纬度   offSet 为百度经纬度偏置
	mouseLng=(e.point.lng + offSet[0]).toFixed(9);	
	mouseLat=(e.point.lat + offSet[1]).toFixed(9);
	$("#pointXY").attr("value", mouseLng+","+mouseLat);
	});

map.addEventListener("zoomend",Auto_Mymarkers);						//设置缩放事件监听器
map.addEventListener("moveend",Auto_Mymarkers);						//设置地图移动事件监听器



			
var divOpacityFlag=1;										//divOpacity()函数功能为修改一个图层的透明度并设置开关,无返回值.
function  divOpacity(divElement,Opacity_1,Opacity_2){		//第一个参数为jQuery的选择器,第二个和三个参数为两个透明度值		
		var Opacity1=0.8,Opacity2=0.25;
		if(arguments.length=3){
			Opacity1=Opacity_1;
			Opacity2=Opacity_2;
		}
		else if(arguments.length=2){
			Opacity1=Opacity_1;
		};
															//默认的	透明度为0.8和0.25
		if (!divOpacityFlag) {
	 		$(divElement).css("opacity",Opacity2); 		//改变元素的透明度
	 		divOpacityFlag=1;
 		}
 		else{
	  		$(divElement).css("opacity",Opacity1);			//改变元素的透明度
	  		divOpacityFlag=0;
 		}	
};




// $(function(){
// 		$($("#baiduMap>div")[1]).css("display","none");	//屏蔽实景地图logo
// });












var array_Point = new Array();			//所以站点的Point数组(不可见)
var array_Marker = new Array();			//所有Marker标记数组(可见)
var array_Label = new Array();			//所有Label标签数组(可见)
var array_siteinformation = new Array();	//所有站名数组(字符串)
var array_sitelable = new Array();
var Point_count = 0;		//所有站点计数	
var result = 0;				//屏幕范围内显示的点的个数

function add_Marker(sitename_point,x_point,y_point){												//自定义的添加mark函数 将点添加到点数组，然后创建marker
	array_Point[Point_count] = new BMap.Point(x_point - offSet[0],y_point - offSet[1]);				//创建点,经度 + offSet[0]  为减去百度地图的偏置 
	array_Marker[Point_count] = new BMap.Marker(array_Point[Point_count]); 							//创建marker
	array_Label[Point_count] = new BMap.Label(sitename_point,{offset:new BMap.Size(20,-10)});		//创建label
	array_Label[Point_count].setStyle({
			 color : "#444",
			 fontSize : "10px",
			 height : "12px",
			 lineHeight : "12px",
			 fontFamily:"微软雅黑",
			 borderColor:"orange",
			 backgroundColor:"none",
			 borderRadius:"3px"
		 });
	array_Marker[Point_count].setLabel(array_Label[Point_count]);									//给marker设置label
	//map.addOverlay(array_Marker[Point_count]);
	Point_count = Point_count + 1;
}



function toPoint(name,lng,lat){		//定位到目标经纬度并增加标签

	add_Marker(name,lng,lat);
	map.addOverlay(array_Marker[Point_count-1])
	map.centerAndZoom(array_Point[Point_count-1],14);
};











function remove_Marker(rmNum){						//删除mark图层函数
	map.removeOverlay(array_Marker[rmNum]);			//删除地图上的marker 参数marker 为存储marker数组array_Marker[]的编号
	Point_count = Point_count  -1 ;
}


function Auto_Mymarkers(){
	var bounds = map.getBounds();
	var m = 0;																	//有多少个marker显示出来
		for(i=0;i<Point_count;i++){
				result = bounds.containsPoint(array_Point[i]);

			if(result == 1 && i < 1500){
									map.addOverlay(array_Marker[i]);
									array_Marker[i].setLabel(array_Label[i]);
									m = m + 1; 
									//alert(i);
				  } 
						else {
									map.removeOverlay(array_Marker[i]);
									}
		}
		//var markerClusterer = new BMapLib.MarkerClusterer(map, {markers:array_Marker});
	document.getElementById("testSpan").innerHTML = m;
}









function searchSite0(sitename){

	for (var i = 0; i <Point_count-1; i++) {
		if (array_Label[i].content == sitename) {
			map.centerAndZoom(array_Point[i],16)
			return i
		};
	};

	//toPoint(array_Label[6].content,lng,lat)

}



function searchSite(sitename){

	for (var i = 0; i <Point_count-1; i++) {
		if (array_Label[i].content.indexOf(sitename)>=0) {
			map.centerAndZoom(array_Point[i],16)
			return i
		};
	};

	//toPoint(array_Label[6].content,lng,lat)

}


















































// $("div")   //获取所有div对象 值为jQuery对象数组
// $("div")[2]		//获取所有div的对象数组,  [2]为数组对象的第三个元素  值为dom对象
// $($("div")[2])		//获取所有div的对象数组,  [2]为数组对象的第三个元素  值为dom对象 并把这个dom对象转换为jQuery对象

// $($("div")[2]).css("display","none")		//获取所有div的对象数组,  [2]为数组对象的第三个元素  值为dom对象 并把这个dom对象转换为jQuery对象 对此jQuery对象设置css样式.

















