
<?php

session_start();//开启session
require('library/Db.class.php');
$i = 1;
$sql  = "select * from comment where id = $i";
$db = new DB();
$comment = $db->row($sql);

while($comment){
    $name = $comment['name'];
    $comment1 = $comment['text'];
    $time = $comment['time'];
    // header("Content-type: text/html; charset=utf-8");
echo '
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Global Pandemic mode3</title>
    <!--使用Bootstrap4的库，主要用于优化ui-->
    <link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://cdn.staticfile.org/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdn.staticfile.org/popper.js/1.15.0/umd/popper.min.js"></script>
    <script src="https://cdn.staticfile.org/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
</head>
<body >
    <div class="card bg-light mb-3" style="width: 100%;position:relative;max-height:10.5rem;z-index: 900;">
        <div class="card-header">
            <div style="width: 50%;float: left;display: inline;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;" data-toggle="tooltip" data-placement="top" title="$name">'.$name.'</div>
            <div style="width: 10%;float: right;display: inline;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;font-size: small">美国</div>
            <div style="width: 25%;float: right;display: inline;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;font-size: small">'.$time.'</div>
        </div>
        <div class="card-body" style="text-overflow: ellipsis;overflow: hidden;white-space: normal">'.$comment1.'
        </div>
    </div>
</body>
';

//	echo "name:" . $comment['name'] . "<br>";
//	echo "comment:" . $comment['text'] . "<br>";
//	echo "time:" . $comment['time'] . "<br><br>";

	$i += 1;
	$sql  = "select * from comment where id = $i";
	$comment = $db->row($sql);
 }
