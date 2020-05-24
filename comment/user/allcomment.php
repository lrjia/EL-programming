<?php
session_start();//开启session
require('library/Db.class.php');
$i = 1;
$db = new DB();
$sql1 = "select * from comment where id=(select MAX(id) from comment )";
$i = $db -> row($sql1)['id'];
$sql = "select * from comment where id = $i";
$comment = $db->row($sql);
echo '
	<link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://cdn.staticfile.org/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdn.staticfile.org/popper.js/1.15.0/umd/popper.min.js"></script>
    <script src="https://cdn.staticfile.org/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>';
while($i>0){
    $name = $comment['name'];
    $comment1 = $comment['text'];
    $time = $comment['time'];
    // header("Content-type: text/html; charset=utf-8");
    if($name!=''){
echo '

    <div class="card bg-light mb-3" style="width: 100%;position:relative;max-height:10.5rem;z-index: 900;">
        <div class="card-header">
            <div style="width: 50%;float: left;display: inline;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;" data-toggle="tooltip" data-placement="top" title="$name">'.$name.'</div>

            <div style="width: 30%;float: right;display: inline;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;font-size: small">'.$time.'</div>
        </div>
        <div class="card-body" style="text-overflow: ellipsis;overflow: hidden;white-space: normal">'.$comment1.'
        </div>
    </div>

';
}
	$i -= 1;
	$sql  = "select * from comment where id = $i";
	$comment = $db->row($sql);
 }

    $username2  = $_POST['username'];
    $comment2  = $_POST['comment'];
    $time2 =  date("Y-m-d H:i:s");
    echo $username2;
    echo '
    <div class="card bg-light mb-3" style="width: 100%;position:absolute;max-height:10.5rem;z-index: 900;">
        <div class="card-header">
            <div style="width: 50%;float: left;display: inline;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;" data-toggle="tooltip" data-placement="top" title="$name">'.$name2.'</div>
            <div style="width: 10%;float: right;display: inline;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;font-size: small">美国</div>
            <div style="width: 25%;float: right;display: inline;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;font-size: small">'.$time2.'</div>
        </div>
        <div class="card-body" style="text-overflow: ellipsis;overflow: hidden;white-space: normal">'.$comment2.'
        </div>
    </div>
';

