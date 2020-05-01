<?php
//连接数据库
$con = mysqli_connect("localhost","ELcomment","mAwDK7B4ZfwETPz3", "ELcomment");
$sql = "SELECT name, text, time FROM comment";
$result = $con->query($sql);
if (mysqli_num_rows($result) > 0) {
    // 输出数据
    while($row = mysqli_fetch_assoc($result)) {
        $row = $result->fetch_assoc();
        $GLOBALS["name"] = $row["name"];
        $GLOBALS["text"] = $row["text"];
        $GLOBALS["time"] = $row["time"];
    }
    echo $GLOBALS["name"];
}else {
    echo "0 result";
}
?>
