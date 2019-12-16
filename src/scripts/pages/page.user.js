

$(function(){

    /*** 选餐 ***/
    (function(){

        //购物车
        (function(){
            var shoppingCart = $('#j-shopping-cart');
            var goodsItems = shoppingCart.find('.j-goods-item');
            var priceAll = shoppingCart.find('#j-price-all');


            var runAllPrice = function(){
                var i = 0, len = goodsItems.length, item, allPrice = 0;
                for(;i<len;i++){
                    item = goodsItems.eq(i);
                    var price = parseFloat(item.find('.j-goods-price').html()) || 0;
                    var count = parseInt(item.find('.j-count-number').html()) || 1;
                    allPrice += (price * count);
                }
                var returnPrice = parseFloat(allPrice).toFixed(2) || 0;
                priceAll.html(returnPrice);
                return returnPrice;
            };
            runAllPrice();

            //加、减数量
            var runCountNumber = function(target, flag){
                var countNumber = target.parent().find('.j-count-number');
                var number = (parseInt(countNumber.html())) + flag;
                countNumber.html(number || 1);
                runAllPrice();
            };

            //减
            shoppingCart.on('click', '.icon-btn-reduce', function(){
                runCountNumber($(this), -1);
            });
            //加
            shoppingCart.on('click', '.icon-btn-add', function(){
                runCountNumber($(this), 1);
            });
            //清空
            shoppingCart.on('click', '.shoping-cart-clear', function(){
                $.modal({
                    text:   '<div class="modal-tips">'+
                    '<p>是否清空购物车？</p>'+
                    '</div>',
                    buttons: [
                        {
                            text: '取消',
                            onClick: function() {
                            }
                        },
                        {
                            text: '确定',
                            onClick: function() {

                                shoppingCart.find('.shopping-cart-cont')
                                    .addClass('cart-cont-null')
                                    .find('.shooping-business-cont').html('');
                                goodsItems = shoppingCart.find('.j-goods-item');
                                runAllPrice();
                            }
                        },
                    ]
                });
            });
        })();

        //分类导航
        (function(){
            var mealTypeNav = $('#j-meal-type-nav');
            mealTypeNav.on('click', '.type-nav-item', function(){
                var target = $(this);
                target.parent().find('.active').removeClass('active');
                target.addClass('active');
            });
            var renderNavActive = function(status){
                var navItems = mealTypeNav.find('.type-nav-item');
                var i = 0, len = navItems.length, item;
                var left = 0, currentItem, allWidth = 0, itemWidth, leftCount = true;
                for(;i<len;i++){
                    item = navItems.eq(i);
                    itemWidth = item.width()+parseInt(item.css('margin-left'))+parseInt(item.css('margin-right'));
                    allWidth += itemWidth;
                    if(leftCount){
                        left += itemWidth;
                    }
                    if(item.hasClass('active')){
                        currentItem = item;
                        leftCount = false;
                    }
                }
                mealTypeNav.css('width', (allWidth + 4) + 'px');
                var winWidth = $(window).width();
                var difference = left - winWidth;
                if(difference > 0){
                    mealTypeNav.parent()[0].scrollLeft = difference + (winWidth/2);
                }
                //mealTypeNav.parent()[0].scrollLeft = left;
            };
            renderNavActive();
            window.renderNavActive = renderNavActive;
        })();
        //分类导航

        //商家与产品列表
        (function(){
            var mealBusiness = $('#j-meal-business'),
                mealProduct = $('#j-meal-product'),
                scrollEvent = true;

            mealBusiness.on('click', '.buiness-nav-item', function(){
                var target = $(this);
                activeBuinessNavItem(target);
            });
            var activeBuinessNavItem = function(target){
                target.parent().find('.active').removeClass('active');
                target.addClass('active');
                var dataId = target.attr('data-id');
                var productItem = mealProduct.find('.m-product-list-item[data-id='+dataId+']');
                if(productItem.length){
                    scrollEvent = false;
                    //mealProduct.scrollTop(productItem[0].offsetTop);
                    var A = mealProduct.scrollTop();
                    var B = productItem[0].offsetTop;
                    Math.easeout(A, B, 4, function (value) {
                        mealProduct.scrollTop(value);
                    });
                }
                else{
                    console.info('--->null，load more...');
                }
            };

            Math.easeout = function (A, B, rate, callback) {
                if (A == B || typeof A != 'number') {
                    return;    
                }
                B = B || 0;
                rate = rate || 2;
                
                var step = function () {
                    A = A + (B - A) / rate;
                    
                    if (A.toFixed(0) == B) {
                        callback(B, true);
                        scrollEvent = true;
                        return;
                    }
                    callback(A, false);
                    requestAnimationFrame(step);    
                };
                step();
            };

            mealProduct.scroll(function(){
                if(scrollEvent)
                    scrollFn();
            });
            
            var scrollFn = function(){
                var productListItem = mealProduct.find('.m-product-list-item');
                setTimeout(function(){
                    var scrollTop = mealProduct.scrollTop();
                    var i = 0, len = productListItem.length, item, scrollTarget;
                    for(;i<len;i++){
                        item = productListItem.eq(i);
                        if(item[0].offsetTop - scrollTop < 20){
                            scrollTarget = mealBusiness.find('.buiness-nav-item[data-id='+item.attr('data-id')+']');
                        }
                    }
                    if(scrollTarget){
                        scrollTarget.parent().find('.active').removeClass('active');
                        scrollTarget.addClass('active');
                    }
                }, 0);
            };
        })();
        //商家与产品列表

        var chooseMealWrap = $('#j-choose-meal-wrap');
        (function(){
            var header = $('header.header');
            chooseMealWrap.css('top', header.length ? '2.2rem' : 0);
        })();

        (function(){
            var shoppingCart = $('#j-choose-meal-wrap');
            var goodsItems = shoppingCart.find('.j-goods-item');
            //var priceAll = $('#j-price-all');

            //加、减数量
            var runCountNumber = function(target, flag){
                var countNumber = target.parent().find('.j-count-number');
                var number = ((parseInt(countNumber.html())) + flag) || 0;
                countNumber.html(number);
                var priceNumber = parseFloat(target.parent().parent().parent().find('.price').html()).toFixed(2) || 0;
                onCountRun.call(target.parents('.product-info'), priceNumber, number);
            };

            //减
            shoppingCart.on('click', '.icon-btn-reduce', function(){
                var target = $(this);
                var targetParent = target.parent();
                var countNumber = targetParent.find('.j-count-number');
                var number = parseInt(countNumber.html()) || 1;
                if(!targetParent.hasClass('goods-count-null') && number === 1){
                    targetParent.addClass('goods-count-null');
                }
                runCountNumber(target, -1);
            });
            //加
            shoppingCart.on('click', '.icon-btn-add', function(){
                var target = $(this);
                var targetParent = target.parent();
                if(targetParent.hasClass('goods-count-null')){
                    targetParent.removeClass('goods-count-null');
                }
                runCountNumber(target, 1);
            });

            var onCountRun = function(price, count){
                var target = $(this);
                console.info('单价：'+price+',数量：'+count);
            };

        })();

        $('#j-submit-mealorder').click(function(){
            $.popup('#j-shopping-cart');
        });



        //选规格
        var foodNameActive = $(".popup-choose-food li  a.active");
        var foodSizeActive =  $(".popup-choose-size li a.active");
        $("#j-food-name").html(foodNameActive.text());
        $("#j-food-size").html(foodSizeActive.text());

        $(".popup-choose-food li a").click(function(){
            $(this).parent().parent().find('a').removeClass('active');
            $(this).addClass('active');
            var foodName = $(this).html();
            $("#j-food-name").html(foodName)
        });
        $(".popup-choose-size li a").click(function(){
            $(this).parent().parent().find('a').removeClass('active');
            $(this).addClass('active');

            var foodSize = $(this).html();
            $("#j-food-size").html(foodSize);
        });

        chooseMealWrap.on('click', '.j-choose-spec', function(){
            var target = $(this);
            $.popup('#j-choose-spec');
        });
        
        $("#j-add-cart").click(function(){
            $(this).addClass('hide');
            $(this).siblings(".m-goods-count").removeClass('hide');
        });
        //选择数量 减
        $('#j-choose-spec').on('click','.icon-btn-reduce', function(){
            reduceNum.call(this,-1);
        })
        //选择数量 加
        $('#j-choose-spec').on('click', '.icon-btn-add', function(){
            reduceNum.call(this,1);
        });
        
        function reduceNum(arg) {
            var num =  parseInt($(".count-number").html());
            var count = num + arg;
            if(count <= 0){
                $(this).parent().addClass('hide');
                $(this).parent().siblings('a').removeClass('hide');
            } else {
                $(".count-number").html(count);
            }
        }
        //选规格

        $('body').click(function(){
            $(".popup-overlay").addClass("close-popup")//关闭 我的账本-筛选 弹出层
        });
    })();

    //我的地址-滑动删除
    (function(){
        var touchEventObjs = $('.j-touch-del').find('.repeat-item-wrap');
        var touchStartX = 0, maxLeft = 76, open21 = false, close21 = false, direction;
        touchEventObjs.on('touchstart', function(e){
            e = e || window.event;
            var originalEvent = e.targetTouches || e.originalEvent.targetTouches || e.originalEvent.touches;
            touchStartX = originalEvent[0].pageX;
            $(this).removeClass('transition');
        });
        touchEventObjs.on('touchmove', function(e){
            e = e || window.event;
            var originalEvent = e.targetTouches || e.originalEvent.targetTouches || e.originalEvent.touches;
            var moveX = originalEvent[0].pageX;
            var target = $(this);
            if(moveX < touchStartX){
                //向左滑动
                direction = 'left';
                var value = touchStartX - moveX;
                value = value > maxLeft ? maxLeft : value;
                open21 = (value >= maxLeft / 2) ? true : false;
                var thisMarginLeft = parseInt(target.css('margin-left'));
                if(thisMarginLeft != -maxLeft){
                    target.css({
                        'margin-left': -value+'px',
                        'margin-right': value+'px'
                    });
                }
            }
            else{
                //向右滑动
                direction = 'right';
                var value = -((touchStartX - moveX) + maxLeft);
                value = value > 0 ? 0 : value;
                close21 = (-value <= maxLeft / 2) ? true : false;
                var thisMarginLeft = parseInt(target.css('margin-left') || 0);
                if(thisMarginLeft != 0){
                    target.css({
                        'margin-left': value+'px',
                        'margin-right': -value+'px'
                    });
                }
            }
        });
        touchEventObjs.on('touchend', function(e){
            var target = $(this);
            target.addClass('transition');
            if(direction === 'left'){
                if(open21){
                    target.css({
                        'margin-left': -maxLeft+'px',
                        'margin-right': maxLeft+'px'
                    });
                }
                else{
                    target.css({
                        'margin-left': '0px',
                        'margin-right': '0px'
                    });
                }
            }
            else if(direction === 'right'){
                if(close21){
                    target.css({
                        'margin-left': '0px',
                        'margin-right': '0px'
                    });
                }
                else{
                    target.css({
                        'margin-left': -maxLeft+'px',
                        'margin-right': maxLeft+'px'
                    });
                }
            }
        });
    })();
    //我的地址-滑动删除

})