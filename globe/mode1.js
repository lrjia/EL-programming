// 加载中提示
window.onload = function () {
    let load = this.document.getElementById('load');
    load.parentNode.removeChild(load);
}



// 加载数据，地球
if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
} else {

    var container = document.getElementById('globe');
    var globe = new DAT.Globe(container);
    var totalDay = 0;
    let data = null;// 储存数据的全局变量

    // 加载数据
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'globe/data.json', true);
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {

            data = JSON.parse(xhr.responseText);
            window.data = data;
            totalDay = data.length;
            globe.addData(data[0][1], { format: 'magnitude' });
            globe.createPoints();
            globe.animate();

            // 在数据加载完成后，启动时间轴，截图，
            initDrag();
            // initShot();


        }
    };
    xhr.send(null);

    // 补间动画
    var tweens = [];
    TWEEN.start();
    var settime = function (globe, t) {
        return function () {
            globe.resetData();
            globe.addData(data[t][1], { format: 'magnitude' });
            globe.createPoints();
        };
    };
}


//时间轴代码
function initDrag() {
    var timetable = document.getElementById("draggable");
    var order = 0;
    // 最初的数据日期，如果修改需要更改
    var startDate = new Date("2020-01-22");
    console.log(startDate);
    $(function () {
        $('#draggable').draggable({
            cursor: "move",
            handle: "p.handler",
            axis: "x",
            containment: "parent",
            drag: function () {
                preOrder = Math.floor(parseInt(timetable.style.left) / (window.innerWidth / (totalDay) / 1.15));
                if (preOrder > totalDay) {
                    preOrder = totalDay;
                }
                if (preOrder != order) {
                    order = preOrder
                    // settime(globe, order)();
                    let words = document.getElementById('draggable_p');
                    let dateNow = new Date(startDate);
                    dateNow.setDate(startDate.getDate() + order);
                    words.textContent = dateNow.toLocaleDateString();
                }
            },
            stop: function () {
                console.log("in stop");
                preOrder = Math.floor(parseInt(timetable.style.left) / (window.innerWidth / (totalDay) / 1.15));
                if (preOrder > totalDay) {
                    preOrder = totalDay;
                }

                settime(globe, order)();
                let words = document.getElementById('draggable_p');
                let dateNow = new Date(startDate);
                dateNow.setDate(startDate.getDate() + order);
                words.textContent = dateNow.toLocaleDateString();

            }
        });
    });
}


// 按钮倒计时
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


function initShot() {
    function takeShot() {
        console.log("in");
        let imgUrl = globe.shot();
        let a = $("<a></a>").attr("href", imgUrl).attr("download", "img.png").appendTo("body");
        a[0].click();
        a.remove();
    }
    let shotButton = document.getElementById("getShot");
    shotButton.addEventListener("click", takeShot);
}