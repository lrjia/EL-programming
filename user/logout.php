<?php
    session_start();
    unset($_SESSION['user']);
    $result_dest = session_destroy();
    if($result_dest){
        echo "<script>window.location.herf='index.html'</script>";
    }else{
        echo "error";
    }


?>
