var siteData=[];

function postData(){

	$.post("data/siteData.php", { name: "SMnRa", password: "********"},siteBack,"json");

	function siteBack(data){ 							//此函数为post的回调函数,得道返回的json对象,并保存到siteData对象中,
		siteData=data;
		siteData.length=getJsonObjLength(siteData);		//添加length属性 为json对象中成员的个数.
		siteData=jsonToArray(siteData);
		//console.debug(siteData[6].sitename);
		for (var i = 2; i < siteData.length; i++) {
			$("#textSiteDate").text($("#textSiteDate").text()+siteData[i].sitename+":"+siteData[i].lng+","+siteData[i].lat+"\n");		//把json对象内的数据写入到文本框"#textSiteDate"

		}

	}

} 




function getJsonObjLength(jsonObj) {		//此函数为计算json对象内元素的个数.参数为json对象
        var Length = 0;						//返回值为json对象内元素的个数.
        for (var item in jsonObj) {
            Length++;
        }
        return Length;
}



function jsonToArray(jsonObj){				//函数功能为将一个json对象转化为对象数组. 参数为json对象,返回值为数组.
		var myArray=[];
		jsonObj.length=getJsonObjLength(jsonObj);		//添加length属性 为json对象中成员的个数.
		myArray=$.makeArray(jsonObj);
		// myArray = Object.keys(jsonObj).map(function(k){return jsonObj[k]});     //另一种方法将对象转换诶数组,IE不兼容
		return 	myArray;
}
		