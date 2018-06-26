


function isIE(){
	//次方法用于判断当前浏览器是否是IE浏览器
	//IE浏览器返回0，非IE浏览器返回1.chrome浏览器返回2

	var myAgent=window.navigator.userAgent

	if (myAgent.indexOf("MSIE")>0) {	
		document.write("IE浏览器");
		return 0;
		}
	else if(myAgent.indexOf("Firefox")>0)
		{
		document.write("火狐浏览器");
		return 1
		}
	else if(myAgent.indexOf("Chrome")>0)
		{
		document.write("谷歌浏览器");
		return 2
		}

	console.debug(myAgent)	
	}




