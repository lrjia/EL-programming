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

            // 加载完成后使按钮有效
            nextButton.addEventListener("click", buttonFunc(1,totalDay));
            preButton.addEventListener("click", buttonFunc(-1,totalDay));
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

let returnButton = document.getElementById("returnButton");
let nextButton = document.getElementById("nextButton");
let preButton = document.getElementById("preButton");
let introduction = document.getElementById("introduction");


let timenow = 0;
// 按钮函数
function buttonFunc(next,totalDay) {
    return function () {
        timenow += next;
        timenow %= totalDay;
        if (timenow < 0) {
            timenow += totalDay;
        }
        settime(globe, timenow)();
        introduction.textContent = "这里可以显示节点介绍, 节点" + timenow;
    }
}

returnButton.addEventListener("click", returnToMenu);
function returnToMenu() {
    window.location.replace('index.html')
}