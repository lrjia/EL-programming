<?php
    session_start();
    //连接数据库
    $con = mysqli_connect("localhost","ELcomment","mAwDK7B4ZfwETPz3", "ELcomment");

    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "select * form user where username = :username and password = :password";
    $result = $con->query($sql);
    $flag = 0;
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            if($username == $row["username"] and $password == $row["password"]){
                $flag = 1;
            }
        }
    }
    if($flag==1) {
        $_SESSION['user'] = $username;
        echo 1;
    }else{
        echo -1;
    }
?>