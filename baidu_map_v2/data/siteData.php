<?php
//首先导入一下这2个文件
require_once 'Excel/reader.php';
require_once 'Excel/oleread.inc';
//实例化类
$data = new Spreadsheet_Excel_Reader();
//设置编码，这个很重要，不然会乱码的
$data->setOutputEncoding('utf-8');
//开始读取Excel文件
$data->read('site.xls');
//打印下读取的内容
//print_r($data->sheets[0]['cells']);
//记录数，也就是Excel里面有多少行信息
//echo $data->sheets[0]['numRows'];
//列数，也就是Excel里面每一行有几个字段吧（暂且这么叫吧）
//echo $data->sheets[0]['numCols'];
//读取指定行数及列数的信息


/*
 $data->sheets[0]['numRows'] - count rows
 $data->sheets[0]['numCols'] - count columns
 $data->sheets[0]['cells'][$i][$j] - data from $i-row $j-column

 $data->sheets[0]['cellsInfo'][$i][$j] - extended info about cell
    
    $data->sheets[0]['cellsInfo'][$i][$j]['type'] = "date" | "number" | "unknown"
        if 'type' == "unknown" - use 'raw' value, because  cell contain value with format '0.00';
    $data->sheets[0]['cellsInfo'][$i][$j]['raw'] = value if cell without format 
    $data->sheets[0]['cellsInfo'][$i][$j]['colspan'] 
    $data->sheets[0]['cellsInfo'][$i][$j]['rowspan'] 
*/

// for ($i = 1; $i <= $data->sheets[0]['numRows']; $i++) {
// for ($i = 1; $i <= 4; $i++) {	 
// 	echo $i
//	echo  "{\"sitename\":\"".$data->sheets[0]['cells'][2][2]."\","."\"lng\":\"".$data->sheets[0]['cells'][2][3]."\","."\"lat\":\"".$data->sheets[0]['cells'][2][4]."\"}";
// }


echo "{";
for ($i = 1; $i <= $data->sheets[0]['numRows']; $i++) {
//for ($i = 2; $i <= 6; $i++) {
	echo "\"".$i."\":"."{\"sitename\":\"".$data->sheets[0]['cells'][$i][2]."\","."\"lng\":\"".$data->sheets[0]['cells'][$i][3]."\","."\"lat\":\"".$data->sheets[0]['cells'][$i][4]."\"}";
	
	if (($i - $data->sheets[0]['numRows']) < 0 ) {echo "," ;}
	//if (($i - 6) < 0 ) {echo "," ;}
}

echo "}";





?>
