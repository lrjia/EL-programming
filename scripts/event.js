    function fadeIn(element,speed){
    if(element.style.opacity !=1){
        var speed = speed || 30 ;
        var num = 0;
        var st = setInterval(function(){
        num++;
        element.style.opacity = num/10;
        if(num>=10)  {  clearInterval(st);  }
        },speed);
    }
}

function fadeOut(element){
    if(element.style.opacity !=0){
        var speed = speed || 30 ;
        var num = 10;
        var st = setInterval(function(){
        num--;
        element.style.opacity = num / 10 ;
        if(num<=0)  {   clearInterval(st);  }
        },speed);
    }

}

function btnIn(){
    fadeIn(fade,100);
}

function btnOut(){
    fadeOut(fade,100);
}
function btnIn1(){
    fadeIn(fade1,100);
}

function btnOut1(){
    fadeOut(fade1,100);
}