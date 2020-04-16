// 加载中提示
window.onload = function () {
    let load = this.document.getElementById('load');
    load.parentNode.removeChild(load);
}

if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
} else {

    var container = document.getElementById('globe');
    var globe = new DAT.Globe(container);
    var totalDay = 0;

    // 加载数据
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'globe/data.json', true);
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {

            var data = JSON.parse(xhr.responseText);
            window.data = data;
            totalDay = data.length;
            for (var i = 0; i < data.length; i++) {
                globe.addData(data[i][1], { format: 'magnitude', name: data[i][0], animated: true });
            }
            globe.createPoints();
            settime(globe, 0)();
            globe.animate();
            document.body.style.backgroundImage = 'none'; // remove loading

            // 时间轴，在数据加载完成后
            initDrag();
        }
    };
    xhr.send(null);

    // 补间动画
    var tweens = [];
    TWEEN.start();
    var settime = function (globe, t) {
        return function () {
            new TWEEN.Tween(globe).to({ time: t / totalDay }, 500).easing(TWEEN.Easing.Cubic.EaseOut).start();
        };
    };
}

//时间轴代码
function initDrag(){
    var timetable = document.getElementById("draggable");
    var order = 0;
    var startDate = new Date("2020-01-22");
    console.log(startDate);
    // startDate.setFullYear("2020-01-22");
    $(function () {
        $('#draggable').draggable({
            cursor: "move",
            handle: "p.handler",
            axis: "x",
            drag: function () {
                preOrder=Math.floor(parseInt(timetable.style.left) / (window.innerWidth / (totalDay)/1.5)) % totalDay;
                if (preOrder != order) {
                    order = preOrder
                    settime(globe, order)();
                    let words = document.getElementById('draggable_p');
                    let dateNow=new Date(startDate);
                    dateNow.setDate(startDate.getDate()+order);
                    console.log(startDate.getDate()+order);
                    words.textContent=dateNow.toLocaleDateString();
                }
            },
        });
    });
}
