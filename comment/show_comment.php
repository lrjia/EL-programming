<?php
//连接数据库
$con = mysqli_connect("localhost","ELcomment","mAwDK7B4ZfwETPz3", "ELcomment");
if(!$con){
    die('can not connect');
    }
mysqli_select_db($con,"comment");
mysqli_set_charset($con, "utf8");
$sql = "SELECT name, text, time FROM comment";
$result = $con->query($sql);
if($row = mysqli_fetch_array($result)) {
    $GLOBALS["name"] = $row["name"];
    $GLOBALS["text"] = $row["text"];
    $GLOBALS["time"] = $row["time"];

}
mysqli_close($con)
?>
