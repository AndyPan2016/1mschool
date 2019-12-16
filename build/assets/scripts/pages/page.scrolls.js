

(function(){
    

    var scrollDownEndEvents = [], scrollTopEndEvents = [], requireStatus = true, refreshStatus = true, scrollStatus = true;
    window.scrollEvent = {
        onScrollDownEnd: function(fn){
            if(fn){
                scrollDownEndEvents.push(fn);
            }
        },
        onScrollTopEnd: function(fn){
            if(fn){
                scrollTopEndEvents.push(fn);
            }
        },
        stop: function(){
            requireStatus = false;
        },
        start: function(){
            requireStatus = true;
        },
        reset: function(target){
            target.removeClass('open');
        }
    };

    var touchEventObjs = $('.tab-content-block');
    touchEventObjs.scroll(function(){
        var target = $(this);
        var scrollTop = target.scrollTop() || this.scrollTop;
    　　var scrollHeight = target.height();
        refreshStatus = (scrollTop === 0);

        var childrens = target.children(), contHeight = 0;
        childrens.each(function(idx, elem){
            elem = $(elem);
            contHeight += elem.height() + parseInt(target.css('margin-bottom')||0);
        });
        
    　　if(scrollTop + scrollHeight >= contHeight - 5){
            if(scrollStatus){
                if(requireStatus){
                    var len = scrollDownEndEvents.length;
                    if(len){
                        var i = 0, eventItem;
                        for(;i<len;i++){
                            eventItem = scrollDownEndEvents[i];
                            if(eventItem && typeof(eventItem) === 'function'){
                                eventItem.call(target);
                            }
                        }
                    }
                }
                scrollStatus = false;
            }
    　　}
        else{
            scrollStatus = true;
        }
    });

    var touchStartY = 0, maxLeft = 70, open21 = false, close21 = false, direction;
    touchEventObjs.on('touchstart', function(e){
        e = e || window.event;
        var originalEvent = e.targetTouches || e.originalEvent.targetTouches || e.originalEvent.touches;
        touchStartY = originalEvent[0].pageY;
        $(this).addClass('transition');
    });
    touchEventObjs.on('touchmove', function(e){
        e = e || window.event;
        var originalEvent = e.targetTouches || e.originalEvent.targetTouches || e.originalEvent.touches;
        var moveY = originalEvent[0].pageY;
        var target = $(this);
        if(moveY < touchStartY){
            //向上滑动
            direction = 'up';
            target.removeClass('open');
        }
        else{
            //向下滑动
            direction = 'down';
            if(refreshStatus){
                if(!target.hasClass('open')){
                    target.addClass('open');
                    var len = scrollTopEndEvents.length;
                    if(len){
                        var i = 0, eventItem;
                        for(;i<len;i++){
                            eventItem = scrollTopEndEvents[i];
                            if(eventItem && typeof(eventItem) === 'function'){
                                eventItem.call(target);
                            }
                        }
                    }
                }
            }
        }
    });

})();

