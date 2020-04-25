<?php
session_start();//开启session
require('library/Db.class.php');
$i = 1;
$sql  = "select * from comment where id = $i";
$db = new DB();
$comment = $db->row($sql);

while($comment){
	echo "name:" . $comment['name'] . "<br>";
	echo "comment:" . $comment['text'] . "<br>";
	echo "time:" . $comment['time'] . "<br><br>";
	$i += 1;
	$sql  = "select * from comment where id = $i";
	$comment = $db->row($sql);
 }
