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

function btnIn(){
    fadeIn(fade,100);
}

function btnIn1(){
    fadeIn(fade1,100);
}

function btnIn2(){
    fadeIn(fade2,100);
}
