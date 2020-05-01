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
    //成功弹出提示框并退出窗口
    var html_success = "<div class=\"alert alert-success alert-dismissible fade show\">\n" +
        "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" id='close_button_in_alert'>&times;</button>\n" +
        "  <strong>Success</strong>\n" +
        "</div>";
    var close_button = document.getElementById("close_button");
    if(user_name !== "" && user_comment !== ""){
        close_button.click();
        $("body").append(html_success);
        var close_button_in_alert = document.getElementById("close_button_in_alert");
        setInterval(function () {
            close_button_in_alert.click();
        },3000);
        return true;
    }
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

//滚动显示评论区
// $("slides").ready(function () {
//     $.get("show_comment.php", function(data){
//         alert("数据: " + data + "\n");
//     });
// });

$("#view_all").click(function () {
    window.location.href="../user/allcomment.php";
})



//show comment
// window.onLoad() = function ShowComment()
// {
//     if (window.XMLHttpRequest)
//     {
//         // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
//         xmlhttp=new XMLHttpRequest();
//     }
//     else
//     {
//         // IE6, IE5 浏览器执行代码
//         xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     xmlhttp.onreadystatechange=function()
//     {
//         if (xmlhttp.readyState==4 && xmlhttp.status==200)
//         {
//             document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
//         }
//     }
//     xmlhttp.open("GET","./comment/show_comment.php",true);
//     xmlhttp.send();
//
// }


//冒泡提示
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
})

//评论区
var com1 = document.getElementById("com1");
var com2 = document.getElementById("com2");
var com3 = document.getElementById("com3");
var top1 = parseFloat(com1.style.top);
var top2 = parseFloat(com2.style.top);
var top3 = parseFloat(com3.style.top);
$("#com1").ready(function () {
        $("#com1").fadeIn(1000);
        setInterval(function () {
            $("#com1").fadeIn(1000);
            $("#com1").fadeOut(1000);
            top1 += 500;
            com1.style.top = top1 + "px";
            //重新载入新数据等

        },5000);
    }
);

