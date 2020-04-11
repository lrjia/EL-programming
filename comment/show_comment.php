<?php
//连接数据库
$con = mysqli_connect("localhost","ELcomment","mAwDK7B4ZfwETPz3", "ELcomment");
$sql = "SELECT name, text, time FROM comment";
$result = $con->query($sql);
if ($result->num_rows > 0) {
    // 输出数据
//    while($row = $result->fetch_assoc()) {
        $row = $result->fetch_assoc();
        echo json_encode(array("name"=>$row[name], "text"=>$row["text"], "time"=>$row["text"]));
} else {
    echo "0 result";
}

?>
