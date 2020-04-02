if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
} else {

    var years = ['1990', '1995', '2000'];
    var container = document.getElementById('globe');
    var globe = new DAT.Globe(container);

    console.log(globe);
    var i, tweens = [];

    var settime = function (globe, t) {
        return function () {
            new TWEEN.Tween(globe).to({ time: t / years.length }, 500).easing(TWEEN.Easing.Cubic.EaseOut).start();
            console.log(t)
        };
    };


    var xhr;
    TWEEN.start();


    xhr = new XMLHttpRequest();
    xhr.open('GET', 'globe/data.json', true);
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                window.data = data;
                for (i = 0; i < data.length; i++) {
                    globe.addData(data[i][1], { format: 'magnitude', name: data[i][0], animated: true });
                }
                globe.createPoints();
                settime(globe, 0)();
                globe.animate();
                document.body.style.backgroundImage = 'none'; // remove loading
            }
        }
    };
    xhr.send(null);
}

function returnToMenu() {
    window.location.replace('index.html')
}

let timenow = 0;
function buttonFunc(next) {
    return function () {
        timenow += next;
        timenow %= 3;
        if (timenow < 0) {
            timenow += 3;
        }
        settime(globe, timenow)();
        introduction.textContent = "这里可以显示节点介绍, 节点"+timenow;
    }
}

let returnButton = document.getElementById("returnButton");
let nextButton = document.getElementById("nextButton");
let preButton = document.getElementById("preButton");

returnButton.addEventListener("click", returnToMenu);
nextButton.addEventListener("click", buttonFunc(1));
preButton.addEventListener("click", buttonFunc(-1));

let introduction=document.getElementById("introduction");
