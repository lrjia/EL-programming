class InitGlobe {
    constructor(container, init) {
        let globe = new DAT.Globe(container);
        let data = null; // 储存数据的全局变量
        let initGlobe = this;

        // 加载数据
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'globe/data.json', true);
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
                window.data = data;
                initGlobe.totalDay = data.length;
                globe.addData(data[0][1], { format: 'magnitude' });
                globe.createPoints();
                globe.animate();

                init();//数据加载完成后执行函数
            }
        };

        xhr.send(null);
        let settime = function (t) {

            globe.resetData();
            globe.addData(data[t][1], { format: 'magnitude' });
            globe.createPoints();

        };

        this.globe = globe;
        this.settime = settime;
    }
}
