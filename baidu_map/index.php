<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" type="text/css" href="/css/main.css">
	<script type="text/javascript" src="/js/jquery-1.8.3.js"></script>
	<script type="text/javascript" src="js/gpsOffset.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
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
							<input type="button"  value="定位" id="button"  />	
						</td>
					</tr>


				</table>
			</div>


			<div id="siteDate"  class="partLeft mainPage">
				<table>
					<tr>
						<td class="tdLabel" id="siteLabel">
						<a href='javascript:divOpacity(".BMap_noprint",0.8,0.25);'>基站数据库:</a>
						</td>
					</tr>

					<tr>
						<td class="tdLabel" id="tdSiteLabel">
							<TEXTAREA STYLE="overflow:hidden" id="textSiteDate">.</TEXTAREA>
						</td>
					</tr>
				</table>
			</div>


			<div id="search"  class="partLeft mainPage">
				<a href='javascript:postData();'>search</a>
			</div>
		</div>

	</body>

</html>

<script type="text/javascript" src="/js/baiduMap.js"></script>