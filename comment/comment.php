<?php
session_start();
//if(!isset($_SESSION['user'])){
//	echo '<script>alert("请先登陆")</script>';
//	exit;
//}
//连接数据库
$con = mysqli_connect("localhost","ELcomment","mAwDK7B4ZfwETPz3", "ELcomment");
// 检测连接
if ($con->connect_error) {
    die("连接失败: " . $con->connect_error);
}
//$name=$_SESSION['user']['username'];
$name=$_POST["user-name"];
$comment=$_POST["comment-text"];
if (strlen($name)>20){
    exit;
}
$time =  date("Y-m-d H:i:s");
$sql = "INSERT INTO comment (name ,text ,time)
VALUES ('$name','$comment','$time');"
;
if (mysqli_query($con, $sql)) {
    echo '<script>
    alert("success")
    </script>';
} else {
    echo '<script>
    alert("failed")
    </script>';
}
?>
