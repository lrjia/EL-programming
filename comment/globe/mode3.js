function is_valid(){

    //输入姓名为空
    var user_name = document.forms["user_comment"]["user-name"].value;
    if (user_name === ""){
        alert("Please enter your name.");
        return false;
    }
    //输入评论为空
    var user_comment = document.forms["user_comment"]["comment-text"].value;
    if (user_comment === ""){
        alert("Please enter your comment.");
        return false;
    }

    setTimeout(function(){
        document.getElementById('view_comment').contentWindow.location.reload();
    },1000);

    // document.getElementById('view_comment').contentWindow.location.reload();
    //成功弹出提示框并退出窗口
    // var html_success = "<div class=\"alert alert-success alert-dismissible fade show\">\n" +
    //     "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" id='close_button_in_alert'>&times;</button>\n" +
    //     "  <strong>Success</strong>\n" +
    //     "</div>";
    // var close_button = document.getElementById("close_button");
    // if(user_name !== "" && user_comment !== ""){
    //     close_button.click();
    //     $("body").append(html_success);
    //     var close_button_in_alert = document.getElementById("close_button_in_alert");
    //     setInterval(function () {
    //         close_button_in_alert.click();
    //     },3000);
    //     return true;
    // }
    $("#close_button").click();
}

// 进度条（伪）
$("#wrapper").ready(function() {
        var value = 0;
        setInterval(function (e) {
            if (value < 240) {
                value = parseInt(value) + 2;
                $("#prog").css("width", value + "%");
            }
            else if(value >= 240){
                $("#wrapper").fadeOut();
                $("#globe").fadeIn(1000);
            }
        }, 30);
    }
);


$("#view_all").click(function () {
    window.location.href="../comment/user/allcomment.php";
})




//冒泡提示
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
})

