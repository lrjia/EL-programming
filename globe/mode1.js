// 加载中提示
window.onload = function () {
    let load = this.document.getElementById('load');
    load.parentNode.removeChild(load);
}


let container = document.getElementById('globe');
let initGlobe=new InitGlobe(container,init);

function init(){
    initDrag(initGlobe);
    initShot(initGlobe);
}


//时间轴代码
function initDrag(initGlobe) {
    let totalDay=initGlobe.totalDay;
    var timetable = document.getElementById("draggable");
    var order = 0;
    // 最初的数据日期，如果修改需要更改
    var startDate = new Date("2020-01-22");
    console.log(startDate);
    $(function () {
        $('#draggable').draggable({
            cursor: "move",
            // handle: "p.handler",
            axis: "x",
            containment: "parent",
            drag: function () {
                // preOrder = Math.floor(parseInt(timetable.style.left) / (window.innerWidth / (totalDay) / 1.15));
                preOrder = Math.floor((parseInt(timetable.style.left)+120) / (window.innerWidth / (totalDay) ));
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
                // console.log("in stop");
                preOrder = Math.floor((parseInt(timetable.style.left)+120) / (window.innerWidth / (totalDay)));
                if (preOrder > totalDay) {
                    preOrder = totalDay;
                }
                initGlobe.settime(order);
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


function initShot(initGlobe) {
    function takeShot() {
        // console.log("in");
        let imgUrl = initGlobe.globe.shot();
        let a = $("<a></a>").attr("href", imgUrl).attr("download", "img.png").appendTo("body");
        a[0].click();
        a.remove();
    }
    let shotButton = document.getElementById("getShot");
    shotButton.addEventListener("click", takeShot);
}


//时间轴进度条
var sign = document.getElementById('draggable')
sign.style.left = 0;
var slider = {
    use: function (id) {
        var self = this;
        self.slider = document.getElementById(id);
        self.bar = self.slider.querySelector('.progress-bar');
        self.thumb = self.slider.querySelector('.handler');
        sign.addEventListener('mousedown', function (e) {
            if (e.button == 0) { // 判断点击左键
                let pos = parseInt(sign.style.left) + 120;
                self.mDown = true;
                self.beginX = pos;
                self.positionX = e.offsetX;
                console.log(pos);
                self.beginClientX = pos;
                self.sliderLong = parseInt(self.getStyle(self.slider, 'width'));
                var per = parseInt(self.positionX / self.sliderLong * 100);
                // self.bar.style.width = per + '%';
            }
        });
        document.addEventListener('mousemove', function (e) {
            let pos = parseInt(sign.style.left) + 120;
            if (self.mDown) {
                var moveX = pos - self.beginClientX;
                self.positionX = (self.beginX + moveX > self.sliderLong) ? self.sliderLong : (self.beginX + moveX < 0) ? 0 : self.beginX + moveX;
                var per = parseInt(self.positionX / self.sliderLong * 100);
                self.bar.style.width = per + '%';
            }
        });
        document.addEventListener('mouseup', function (e) {
            if (e.button == 0) {
                self.mDown = false;
            }
        });
    },
    getStyle: function (obj, styleName) { // 获取元素样式的方法
        if (obj.currentStyle) {
            return obj.currentStyle[styleName];
        } else {
            return getComputedStyle(obj, null)[styleName];
        }
    }
};
slider.use('demo');