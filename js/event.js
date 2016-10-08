
(function(){
    function on(ele,type,fn){
        if(/^my/.test(type)){
            if(!ele['myEvent'+type]){
                ele['myEvent'+type]=[];
            }
            var a=ele['myEvent'+type];
            for(var i=0; i<a.length; i++){
                if(a[i]==fn) return;
            }
            a.push(fn);
        }else{
            if(ele.addEventListener){
                ele.addEventListener(type,fn,false);
                return;
            }
            if(!ele['onEvent'+type]){
                ele['onEvent'+type]=[];
                ele.attachEvent('on'+type,function(){
                    run.call(ele); 
                })
            }
            var a=ele['onEvent'+type];
            for(var i=0; i<a.length; i++){
                if(a[i]==fn) return;
            }
            a.push(fn);
        }
    }
    function run(){
        var e=window.event;
        var type=e.type;
        e.target=e.srcElement;
        e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
        e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
        e.preventDefault=function(){
            e.returnValue=false;
        };
        e.stopPropagation=function(){
            e.cancelBubble=true;
        };

        var a=this['onEvent'+type];
        if(a && a.length){
            for(var i=0; i<a.length; i++){
                if(typeof a[i]=='function'){
                    a[i].call(this,e);
                }else{
                    a.splice(i,1);
                    i--;
                }
            }
        }
    }
    function fire(ele,type,e){
        var a=ele['myEvent'+type];
        if(a && a.length){
            for(var i=0; i<a.length; i++){
                if(typeof a[i]=='function'){
                    if(e==undefined){
                        a[i].call(ele);
                    }else{
                        a[i].call(ele,e);
                    }
                }else{
                    a.splice(i,1);
                    i--;
                }
            }
        }
    }
    function off(ele,type,fn){
        if(/^my/.test(type)){
            var a=ele['myEvent'+type];
            if(a && a.length){
                for(var i=0; i<a.length; i++){
                    if(a[i]==fn){
                        a[i]=null;
                        return;
                    }
                }
            }

        }else{
            if(ele.removeEventListener){
                ele.removeEventListener(type,fn,false);
            }else{
                var a=ele['onEvent'+type];
                if(a && a.length){
                    for(var i=0; i<a.length; i++){
                        if(a[i]==fn){
                            a[i]=null;
                            return; 
                        }
                    }
                }

            }
        }
    }
    function processThis(fn,obj){
        return function(e){
            if(e==undefined){
                fn.call(obj);
                return;
            }
            fn.call(obj,e);
        }
    }
    window.$event={
        on:on,
        off:off,
        fire:fire,
        processThis:processThis
    }
})();