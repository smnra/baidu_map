
function setCenter(elementId){
	var bodyRect={x:0.0,y:0.0};
	var divRect={x:0.0,y:0.0};
	var tagDiv;
	tagDiv=document.getElementById(elementId);	//获取要居中的div对象
	bodyRect.x=document.body.clientWidth;		//获取body的宽
	bodyRect.y=document.body.clientHeight;	//获取body的高
	console.debug(bodyRect);
	divRect.x=tagDiv.clientWidth;				//获取对象div的宽
	divRect.y=tagDiv.clientHeight;				//获取对象div的高
	var marginX=(bodyRect.y-divRect.y)/2;
	tagDiv.marginTop=bodyRect.y/2-divRect.y/2;
	console.debug(divRect);
	console.debug(marginX);
}	

$(function($) {
  setCenter("main");
});