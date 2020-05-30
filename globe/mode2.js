let container = document.getElementById('globe');
let initGlobe=new InitGlobe(container,init);

function init() {
    nextButton.addEventListener("click", buttonFunc(1, initGlobe.totalDay));
    preButton.addEventListener("click", buttonFunc(-1, initGlobe.totalDay));
}

let returnButton = document.getElementById("returnButton");
let nextButton = document.getElementById("nextButton");
let preButton = document.getElementById("preButton");
let introduction = document.getElementById("introduction");
let nodeImage=document.getElementById("nodeImage");

//我自己加的在这里
let nodeVoice=document.getElementById("media");

let nodeNow = 0;
// 按钮函数
function buttonFunc(next, totalDay) {
    return function () {
        // 最初的数据日期，如果修改需要更改
        let startDate = new Date("2020-01-22");
        // 如果有新的节点需要在这里添加时间，同时图片的命名也按照下面的时间格式
        let nodes = ["2019-12-01", "2020-01-05", "2020-01-10", "2020-01-15",
            "2020-01-23", "2020-02-06", "2020-02-07", "2020-02-16", "2020-03-14","2020-03-27",
            "2020-03-31", "2020-04-04", "2020-04-08","2020-04-15", "2020-04-23"];
        nodeNow += next;
        nodeNow %= nodes.length;
        if (nodeNow < 0) {
            nodeNow += nodes.length;
        }
        let nodeDate=new Date(nodes[nodeNow]);
        let timenow = 0;
        
        if (nodeDate.getTime()>startDate.getTime()){
            timenow=Math.round((nodeDate.getTime()-startDate.getTime())/86400000);
            timenow=Math.min(timenow,totalDay-1);
        }
        // 节点的文字介绍
        introduction.textContent = nodeDate.toDateString();
        let imageSrc="styles/images/mode2/"+nodes[nodeNow]+".png";
        let voiceSrc="styles/voice/"+nodes[nodeNow]+".mp3";
        nodeImage.setAttribute('src', imageSrc);
        
        //这里的src没有变？
        nodeVoice.setAttribute('src',voiceSrc);
        
        
        // debugger;
        initGlobe.settime(timenow);
    }
}
var countx = 2;
    function countDown() {
        //写一个方法，显示倒数秒数  数到0后跳转页面  
        //每执行一次，count减1
        countx -= 1;
        //count=0时，跳转页面
        if (countx == 0) {
            window.location.replace('index.html');
            //window.location.href="index.html";
            countx = 2;
        }
        //设定倒数秒数 
        setTimeout("countDown()", 1000);
    }


function play() {
    document.getElementById("media").play();
}