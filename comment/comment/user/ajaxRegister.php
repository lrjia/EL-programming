<?php
require ('library/Db.class.php');
$username = $_POST['username'];
$password = $_POST['password'];
$db = new DB();
$sql = "select * from user where username = '$username'";
$name = $db->row($sql,array('username'=>$username));
if($name){
    echo -1;
    exit;
}
$insert_sql = "insert into user (username, password) values ($username, $password)";
$insert_or_not = $db -> query($insert_sql,array('username'=>$username,'password'=>md5($password)));
if($insert_or_not){
    echo 1;
}
else{
    echo 0;
}


?>