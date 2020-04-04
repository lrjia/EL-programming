
window.onload=function () {
        var oInset_circlr=document.getElementsByClassName('inset_circle_one')[0];//内圈方块

        /**
         * 第一圈内圈样式以及旋转
         */
        for (var i = 0; i < 360/10; i++) {
            var creatIsetDv=document.createElement('div');//创建div
            creatIsetDv.className='inset_one';//给创建的这个divclass为inset_one
            oInset_circlr.appendChild(creatIsetDv);//把创建的div添加到oinset_circle

            /**
             * 创建的每个div旋转10deg
             */
            oInset_circlr.getElementsByClassName('inset_one')[i].style.transform='rotate('+i*10+'deg)';
        }




        /**
         * 第二圈创建以及旋转*
         */
        var oInset_two=document.getElementsByClassName('inset_circle-two')[0];//第二圈内圈父级
        for (var i = 0; i < 360/10; i++) {
            var creatDv=document.createElement('div');//开始创建div
            creatDv.className='inset_two';//给创建的div一个class为inset_two
            oInset_two.appendChild(creatDv);//把创建的div添加到父级

            //内圈旋转
            oInset_two.getElementsByClassName('inset_two')[i].style.transform='rotate('+i*10+'deg)';
        }

        var oOut_circle_one=document.getElementsByClassName('out_circle')[0];//外圈第一圈父级
        for (var i = 0; i < 360/10/2; i++) {
            var creatDv=document.createElement('div');//创建div
            creatDv.className='out_one';//给创建的这个divclass为out_circle_one
            oOut_circle_one.appendChild(creatDv);//把创建的这个div插入到父级离里

            oOut_circle_one.getElementsByClassName('out_one')[i].style.transform='rotate('+i*10+'deg)';//旋转度数3
            oOut_circle_one.getElementsByClassName('out_one')[i].style.animationDelay =i*.2+'s';//动画延迟
        }


        var oOut_circle_two=document.getElementsByClassName('out_circle_two')[0];//外圈圆
        for (var i = 0; i < 360/30; i++) {
            var creatDv=document.createElement('div');//创建div
            creatDv.className='out_two';//给创建的这个divclass为out_circle_one
            oOut_circle_two.appendChild(creatDv);//把创建的这个div插入到父级离里

            oOut_circle_two.getElementsByClassName('out_two')[i].style.transform='rotate('+i*10+'deg)';
        }

        var oOut_circle_three=document.getElementsByClassName('out_circle_three')[0];//外圈圆
        for (var i = 0; i < 360/28; i++) {
            var creatDv=document.createElement('div');//创建div
            creatDv.className='out_three';//给创建的这个divclass为out_circle_one
            oOut_circle_three.appendChild(creatDv);//把创建的这个div插入到父级离里

            oOut_circle_three.getElementsByClassName('out_three')[i].style.animationDelay = i*.1+'s';
            oOut_circle_three.getElementsByClassName('out_three')[i].style.transform='rotate('+i*10+'deg)';
        }


        /**
         * 选项卡
         */
        var moreId=document.getElementById('more');//选项卡id
        var one=moreId.getElementsByClassName('one');//选项卡里的选项标签、

        for (var i = 0; i < one.length; i++) {
            one[i].style.transform="rotate("+10*i+"deg)";//line每个旋转10deg
        }


    }