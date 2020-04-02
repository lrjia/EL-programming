
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

    for (var i = 0; i < years.length; i++) {
        var y = document.getElementById('year' + years[i]);
        y.addEventListener('mouseover', settime(globe, i), false);
    }

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
var timetable=document.getElementById("draggable");
var timenow=0;
$(function () {
    $('#draggable').draggable({
        axis: "x",
        drag: function () {
            // console.log(Math.floor(parseInt(timetable.style.left)/(window.innerWidth/10))%3!= timenow)
            if (Math.floor(parseInt(timetable.style.left)/(window.innerWidth/10))%3!= timenow){
                // console.log("in")
                timenow=Math.floor(parseInt(timetable.style.left)/(window.innerWidth/10))%3;
                // console.log(timenow)
                settime(globe,timenow)();
            }
        },
    });
});