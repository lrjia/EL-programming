class InitGlobe {
    constructor(container, init) {
        let globe = new DAT.Globe(container);
        let initGlobe = this;
        let loadCount=0;
        let mapData=null;
        let dayData=null;
        

        // 加载数据
        let mapXHR = new XMLHttpRequest();
        mapXHR.open('GET', 'globe/mapData.json', true);
        mapXHR.onreadystatechange = function (e) {
            if (mapXHR.readyState === 4 && mapXHR.status === 200) {
                mapData = JSON.parse(mapXHR.responseText);
                loadCount+=1;
                if (loadCount===2){
                    loadReady();
                }
            }
        };
        mapXHR.send(null);

        let dayXHR = new XMLHttpRequest();
        dayXHR.open('GET', 'globe/dayData.json', true);
        dayXHR.onreadystatechange = function (e) {
            if (dayXHR.readyState === 4 && dayXHR.status === 200) {
                dayData = JSON.parse(dayXHR.responseText);
                loadCount+=1;
            }
            if (loadCount===2){
                loadReady();
            }
        };
        dayXHR.send(null);

        function loadReady(){
            initGlobe.totalDay = dayData.length;
            settime(0);
            globe.createPoints();
            globe.animate();
            init();//数据加载完成后执行函数
        }

        let settime = function (t) {
            let oneData=getOneDayDate(t);
            globe.resetData();
            globe.addData(oneData, { format: 'magnitude' });
            globe.createPoints();
        };

        function getOneDayDate(t){
            let out=new Array();
            let oneDayNum=dayData[t][1];
            let count=0;
            for(let i=0;i<mapData.length;i++){
                let magnitude=oneDayNum[i];
                for(let j=0;j<(mapData[i].length)/2;j++){
                    let latitude=mapData[i][j*2];
                    let longitude=mapData[i][j*2+1];
                    out[count++]=latitude;
                    out[count++]=longitude;
                    out[count++]=magnitude;
                }
            }
            return out;
        }

        this.globe = globe;
        this.settime = settime;
    }
}
