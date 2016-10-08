/*...............banner..................*/
 (function(){
    var oDiv=document.getElementsByClassName('view-main')[0];
    var oUl=oDiv.getElementsByClassName('banner')[0];
    var aLi=oUl.getElementsByClassName('move');
    var oPoint=oDiv.getElementsByClassName('button')[0];
    var aPoint=oPoint.getElementsByTagName('a');
     var oBtnLeft=oDiv.getElementsByClassName('left')[0];
     var oBtnRight=oDiv.getElementsByClassName('right')[0];
    var data=null;
    var step=0;
    var timer=null;
     /*............图片自动渐隐渐现..................*/
    clearInterval(timer);
    autoMove();
    timer=setInterval(autoMove,3000);
    function autoMove(){
        if(step>=aLi.length-1){
            step=-1;
        }
        step++;
        setBanner();
    }
    function setBanner(){
        for(var i=0; i<aLi.length; i++){
            if(i===step){
                utils.css(aLi[i],'zIndex',1);
                utils.addClass(aLi[i], 'bgAnimate');
                animate(aLi[i],{opacity:1},500);
                continue;
            }
            utils.css(aLi[i],'zIndex', 0);
            utils.removeClass(aLi[i], 'bgAnimate')
        }
        bannerTip();
    }
    /*.................焦点自动轮播.....................*/
    function bannerTip(){
        for(var i=0; i<aPoint.length; i++){
            aPoint[i].className=i===step?'on':null;
        }
    }
    /*................鼠标移入停止，移出继续................*/
    oDiv.onmouseover=function(){
        clearInterval(timer);
    };
     oDiv.onmouseout=function(){
        timer=setInterval(autoMove,3000);
    };
     /*................点击焦点手动切换..................*/
    handleChange();
    function handleChange(){
        for(var i=0; i<aPoint.length; i++){
            aPoint[i].index=i;
            aPoint[i].onclick=function(){
                step=this.index;
                setBanner();
            }
        }
    }
    /*.............点击左右按钮切换..............*/
    oBtnRight.onclick=autoMove;
    oBtnLeft.onclick=function(){
        if(step<=0){
            step=aLi.length;
        }
        step--;
        setBanner();
    }

})();
/*.................active.....................*/
(function () {
    var prodctListNode = document.querySelector('.j-product-list');
    var oUl=document.querySelector('.nav-main');
    active();
    function active() {
        $event.on(oUl,'mouseover',function (e) {
            var target=e.target;
            target=target.tagName.toLowerCase()==='i'? target: utils.closest(target, 'li').getElementsByTagName('i')[0];
            target.className='nav-show'
        });
        $event.on(oUl,'mouseout',function (e) {
            var target=e.target;
            target=target.tagName.toLowerCase()==='i'? target: utils.closest(target, 'li').getElementsByTagName('i')[0];
            target.className='';
        });
        $event.on(prodctListNode, 'mouseover', function (e) {
            var target = e.target;
            target = target.tagName.toLowerCase() === 'li' ? target : utils.closest(target, 'li');
            target.className = 'active';
        });
        $event.on(prodctListNode, 'mouseout', function (e) {
            var target = e.target;
            target = target.tagName.toLowerCase() === 'li' ? target : utils.closest(target, 'li');
            target.className = '';
        });

    }
})();

