	var siteData=[];

function postData(){

$.post("data/siteData.php", { name: "SMnRa", password: "********"},postBack,"json");};  


function postBack(data){
	console.debug(data);
	console.debug(siteData);	 
	siteData=data;
	// $("#textSiteDate").text(siteData[1].sitename+":"+siteData[1].lng+","+siteData[1].lat)

   };