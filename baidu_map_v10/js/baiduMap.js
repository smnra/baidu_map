// 百度地图API功能
var map = new BMap.Map("mbaidumap");            // 创建Map实例
//map.centerAndZoom("西安",14);                   // 初始化地图,设置城市和地图级别。
map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
map.addControl(new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_RIGHT}));    //左上角，默认地图控件
map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT}));		//比例尺控件
map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
map.enableKeyboard();	//启用键盘上下左右键移动地图
map.setDefaultCursor("auto");  //设置鼠标形状
// var stCtrl = new BMap.PanoramaControl(); //构造全景控件
// stCtrl.setOffset(new BMap.Size(10, 40));	//全景地图控件位置
// map.addControl(stCtrl);//添加全景控件



var stCtrl = new BMap.PanoramaControl(); //构造全景控件
stCtrl.setOffset(new BMap.Size(10, 40));	//全景地图控件位置
map.addControl(stCtrl);//添加全景控件


var myDis = new BMapLib.DistanceTool(map);		//测距离实体
var scaleFlag = false;							//测距工具的标志位
function disScale(){
	if (scaleFlag) {
		myDis.close();  //开启鼠标测距
	}else{
		myDis.open();  //关闭鼠标测距大
	};
}






var local = new BMap.LocalSearch(map, {
	renderOptions: {map: map, panel: "baiduRasult"},
	onResultsHtmlSet: function(container){		//结果列表添加完成后的回调函数。参数： container: HTMLElement，结果列表所用的HTML元素

		// for (var i = 0; i < container.getElementsByTagName('div')[0].getElementsByTagName('li').length; i++) {
		// 	container.getElementsByTagName('div')[0].getElementsByTagName('li')[i].lastChild.firstChild.firstChild.setAttribute("style","");
	 	//  container.getElementsByTagName('div')[0].getElementsByTagName('li')[i].lastChild.lastChild.firstChild.setAttribute("style","");
		// 	//console.debug( container.getElementsByTagName('div')[0].getElementsByTagName('li')[i]);
		// };					//js原生写法


		for (var i = 0; i <$("#baiduRasult li>div span").length; i++) {
	  		//console.debug($("#baiduRasult li>div span b").eq(i));
			$("#baiduRasult li>div span").eq(i).removeAttr("style");
			$("#baiduRasult li>div b").eq(i).removeAttr("style");
		};					//jQuery写法


	},



	onInfoHtmlSet: function(poi,html){		//标注气泡内容创建后的回调函数。参数： poi: LocalResultPoi，通过其marker属性可得到当前的标注。 html: HTMLElement，气泡内的Dom元素
		$(".BMap_bubble_title>p>a").remove();
	},	
	pageCapacity: 5						//设置每页容量，取值范围：1 - 100，如果有2个关键字，则实际检索结果数量范围为：2 - 200。

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
	$("#mouseCoor").text(mouseLng+","+mouseLat);
	});


map.addEventListener("click",function(e){			//鼠标点击时在表格上显示经纬度   offSet 为百度经纬度偏置
	mouseLng=(e.point.lng + offSet[0]).toFixed(9);	
	mouseLat=(e.point.lat + offSet[1]).toFixed(9);
	$("#clickCoor").attr("value", mouseLng+","+mouseLat);
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



$(function($) {						//隐藏实景地图下方的百度logo        
	//console.debug(pano.A);				//pano为通过实景控件进入实景地图时的   实景地图对象
	//pano.hide();
	//console.debug(pano);
	$($("#mbaidumap>div")[1]).css("display","none");	//屏蔽实景地图logo  			
});

function consolepanorama(){
		$($("#mbaidumap>div")[1]).css("display","none");	//屏蔽实景地图logo  
};












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
	map.centerAndZoom(array_Point[Point_count-1],16);
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
	document.getElementById("siteNum").innerHTML = m;
}





function searchSite(sitename){											//查找基站 返回值为包查找字符的点的序号的数组
	siteresult=[];														//定义存放结果序号的数组
	$(".u-siterasult").html("<ul>查找结果:</ul>");								   //清空搜索结果框 并放入一个ul标签
	for (var i = 0; i <Point_count-1; i++) {							
		if (array_Label[i].content.indexOf(sitename)>=0) {				//遍历查找标签数组array_Label[],找出标签文本包含要查找字符串的序号
			siteresult.push(i)											//序号写入数组siteresult[]
			var $aTag=$('<li><a href=\"javascript:map.centerAndZoom(array_Point[' + i + '],17);\"></a></li>');
			var $textTag=$("<span>"+array_Label[i].content+"</span>");
			$textTag.wrap($aTag);
			var $liTag=$textTag.parent().parent();

			$(".u-siterasult ul").append($liTag);

			//console.debug($liTag[0]);

		};																//把名字包含要查找字符串写入的名字写入.u-siterasult 并加上超级链接map.centerAndZoom()
	};
	map.centerAndZoom(array_Point[siteresult[0]],17);						//把地图中心定位到这个点上.
	return siteresult;											//返回此点的序号
}






var array_Sector=[];
var sectorStyle={strokeColor:"blue", strokeWeight:2, strokeOpacity:0.9};	/*画扇区*/
function add_Sector(sitename_point,x_point,y_point,azimuth){	  //名字,经度,纬度,方位角

	var sPoint={"lon":0.0,"lat":0.0};
	var ePoint={"lon":0.0,"lat":0.0};
	sPoint=Longoffset(x_point, y_point, 0.1, azimuth-30);			//计算圆弧起点的经纬度
	ePoint=Longoffset(x_point, y_point, 0.1, azimuth+30);			//计算圆弧终点的经纬度
	// console.debug(sPoint);
	// console.debug(ePoint);

	var rootPoint = new BMap.Point(x_point-offSet[0],y_point-offSet[1]);				//创建根百度点
	var strPoint = new BMap.Point(sPoint.lon-offSet[0],sPoint.lat-offSet[1]);				//创建起始百度点
	var endPoint = new BMap.Point(ePoint.lon-offSet[0],ePoint.lat-offSet[1]);				//创建结束百度点

	var marker_1= new BMap.Marker(rootPoint);		//创建Marker
	map.addOverlay(marker_1);						//把Marker添加的图层上

	var curve = new BMapLib.CurveLine([strPoint,endPoint], sectorStyle); //创建弧线对象
	map.addOverlay(curve); //添加到地图中


	var polyline = new BMap.Polyline([strPoint,rootPoint,endPoint],sectorStyle);  //定义折线
	map.addOverlay(polyline);     //添加折线到地图上

}	

	


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























// $($("#mbaidumap>div")[1]).ready(function(){
//   	$($("#mbaidumap>div")[1]).css("display","none");	//屏蔽实景地图logo
// });
























// $("div")   //获取所有div对象 值为jQuery对象数组
// $("div")[2]		//获取所有div的对象数组,  [2]为数组对象的第三个元素  值为dom对象
// $($("div")[2])		//获取所有div的对象数组,  [2]为数组对象的第三个元素  值为dom对象 并把这个dom对象转换为jQuery对象

// $($("div")[2]).css("display","none")		//获取所有div的对象数组,  [2]为数组对象的第三个元素  值为dom对象 并把这个dom对象转换为jQuery对象 对此jQuery对象设置css样式.

// $(document).ready(function(){
//   // 在这里写你的代码...
// });
// $(function($) {
//   // 你可以在这里继续使用$作为别名...
// });









function Longoffset(Longitude, Latitude, Distance, Azimuth){
        var point={"lon":0.0,"lat":0.0};
        var Pi;
        Pi = 3.14159265;
        var Rearth;
        Rearth = 6378.137; /*'WGS 84*/
   		/* 'Rearth = 6378.14    1980年西安大地坐标系统*/
   		point.lon = Longitude-(- (Distance * Math.sin(Azimuth * Pi / 180)) / (111 * Math.cos(Latitude * Pi / 180)));
   		point.lat = Latitude- (-(Distance * Math.cos(Azimuth * Pi / 180)) / 111);   
	console.debug(point);


		/*'已知一点经纬度A（X，Y），和与另一点B的距离r和方位角a，求另外一点的经纬度B(Lon,Lat)？*/
		// point.lon = X+(r*sin(a*pi/180))/(111*cos(Y*pi/180));
		// point.lat = Y+(r*cos(a*pi/180))/111;
		return point;

}





