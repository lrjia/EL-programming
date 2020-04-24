$("#login").click(function () {
    var username = $("#username")[0].value;
    var password = $("#password")[0].value;
    if(username==''){
        alert("请填写用户名");
        return false;
    }
    if(password==''){
        alert("请填写密码");
        return false;
    }
    $.post("ajaxCheckLogin.php",{username: username,password:password,function(data){
            if(data == -1){
                alert("用户名或密码错误");
            }
            if(data == 1){
                var html_success = "<div class=\"alert alert-success alert-dismissible fade show\">\n" +
                    "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" id='close_button_in_alert'>&times;</button>\n" +
                    "  <strong>Success</strong>\n" +
                    "</div>";
                $("#body").append(html_success);
                var close_button_in_alert = document.getElementById("close_button_in_alert");
                setInterval(function () {
                    close_button_in_alert.click();
                },3000);
            }
        }})
    return false;
});

$("#register").click(function () {
    $("#card").fadeOut();
    $("#card2").fadeIn();

});

$("#register2").click(function () {
    var username2 = $("#username2")[0].value;
    var password2 = $("#password2")[0].value;
    var repeated_psd =$("#repeated_psd")[0].value;
    if(username2 == ''){
        alert("请填写用户名");
        return false;
    }
    if(password2 ==''){
        alert("请填写密码");
        return false;
    }
    if(repeated_psd == ''){
        alert("请重新输入密码");
        return false;
    }
});