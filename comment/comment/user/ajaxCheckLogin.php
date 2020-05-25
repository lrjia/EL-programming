<?php
session_start();//开启session
require('library/Db.class.php');
$username  = $_POST['username'];
$password  = $_POST['password'];

//检验用户名和密码是否匹配
$sql  = "select * from user where username = '$username' and password = '$password'";
$db = new DB();
$user = $db->row($sql,array('username'=>$username,'password'=>md5($password)));
if($user){
    $_SESSION['user'] = $user;
    echo 1;
}else{
    echo -1;
}
