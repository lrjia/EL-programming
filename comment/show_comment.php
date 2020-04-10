<?php
//连接数据库
$con = mysqli_connect("localhost","ELcomment","mAwDK7B4ZfwETPz3", "ELcomment");
// 检测连接
if ($con->connect_error) {
    die("连接失败: " . $con->connect_error);
}

$sql = "SELECT name, text, time FROM comment";
$result = $con->query($sql);
if ($result->num_rows > 0) {
    // 输出数据
    while($row = $result->fetch_assoc()) {
        echo $row["name"] . "<br>";
    }
} else {
    echo "0 result";
}

?>
