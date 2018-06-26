<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" type="text/css" href="/css/main.css">
	<script type="text/javascript" src="/js/jquery-1.8.3.js"></script>
	<script type="text/javascript" src="js/gpsOffset.js"></script>
	
	<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=cPt0zsaXc9CntQcxjtT9046V"></script>
	<title>My First PHP</title>

	</head>
	<body>

		<div id="baiduMap" class="mainPage"></div>

		<div id="leftPart" class="mainPage">
			<div id="coordinate" class="partLeft mainPage">
				<table>
					<tr>
						<td class="tdLabel">当前经纬度:</td>
					</tr>

					<tr>
						<td class="tdContent" id="mouseCoordinate">107.77777,34,44444</td>
					</tr>
					<tr><td> </td></tr>
					<tr><td> </td></tr>
					<tr>
						<td class="tdLabel">查询经纬度:</td>
					</tr>

					<tr>
						<td class="tdContent">
							<input type="text"  id="pointXY" value="107.77777,34.44444" />
						</td>
					</tr>

					<tr>
						<td id="tdButton">
							<a href='javascript:toPoint(Point_count,document.getElementById("pointXY").value.split(",",1),document.getElementById("pointXY").value.split(",")[1]);' id="toPoint">Go</a>
						</td>
					</tr>


				</table>
			</div>


			<div id="siteDate"  class="partLeft mainPage">
				<table>
					<tr>
						<td class="tdLabel" id="searchLabel">
						<a href='javascript:divOpacity(".BMap_noprint",0.8,0.25);'>基站查找:</a>
						</td>
					</tr>

					<tr>
						<td class="tdLabel" id="searchTd">
							<input id="searchInput"></input>
							<button id="searchButton" onclick="javascrtpt:searchSite(searchInput.value);">查找</button>
						</td>
					</tr>
				</table>
			</div>


			<div id="search"  class="partLeft mainPage">
				<a href='javascript:postData();	console.debug(array_Label[6].content);'>Get</a><br />
				<span id="testSpan"></span>
			</div>
		</div>

	</body>

</html>

<script type="text/javascript" src="/js/baiduMap.js"></script>
<script type="text/javascript" src="js/main.js"></script>