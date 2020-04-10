<?php
//连接数据库
$con = mysqli_connect("localhost","ELcomment","mAwDK7B4ZfwETPz3", "ELcomment");
// 检测连接
if ($con->connect_error) {
    die("连接失败: " . $con->connect_error);
}
$name=$_POST["user-name"];
$comment=$_POST["comment-text"];
$sql = $sql = "INSERT INTO comment (name, text) 
VALUES ('$name','$comment');"
;
if (mysqli_query($con, $sql)) {
    echo "success";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($con);
}
?>
