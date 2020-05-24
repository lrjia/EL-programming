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
    $.post("ajaxCheckLogin.php",{'username':username, 'password':password}, function(data){
        if(data == -1){
            alert("用户名或密码错误");
            return false;
        }
        if(data == 1){
            alert("success");
            window.location.href="../../index.html";
            return false;
        }

    });
    return false;
});

$("#register").click(function () {
    $("#card").fadeOut();
    $("#card2").fadeIn();
    document.title="register";
});

$("#goback").click(function () {
    $("#card").fadeIn();
    $("#card2").fadeOut();
    document.title="login";
});


$("#register2").click(function () {

    var username2 = $("#username2")[0].value;
    var password2 = $("#password2")[0].value;
    var repeated_psd =$("#repeated_psd")[0].value;
    if(username2 == ''){
        alert("请填写用户名");
        return false;
    }
    else if(password2 ==''){
        alert("请填写密码");
        return false;
    }
    else if(password2.length<8){
        alert("密码至少为8位");
        return false;
    }
    else if(repeated_psd == ''){
        alert("请重新输入密码");
        return false;
    }
    else if(password2 !== repeated_psd){
        alert("两次输入的密码不一致");
        return false;
    }
    $.post("ajaxRegister.php",{'username':username2, 'password':password2}, function(data){
        if(data == 1){
            alert("success");
            window.location.href="login.html";
            return false;
        }
        if(data==-1){
            alert("该用户名已被占用，请重新输入");
            return false;
        }
        if(data == 0){
            alert("注册失败");
            return false;
        }
    });
    return false;
});