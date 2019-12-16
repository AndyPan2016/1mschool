/**
 *
 * MonitorKeyboard.js
 *
 * 监听手机端键盘的显示和隐藏
 *
 * version 1.0.3.2(主版本号.子版本号.编译版本号.修正版本号)
 *
 * @author pye-mail@163.com
 *
 * create log 2015年11月30日17:43:29
 *
 * last update 2018年7月4日14:19:40
 *
 * remark 兼容IOS和Android(采用原生JavaScript实现，不依赖任何框架，也不受其他框架影响)
 *
 */


(function () {

    var initWinHeight = window.innerHeight;

    var u = navigator.userAgent,
        app = navigator.appVersion;
    //android终端或者uc浏览器
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    //ios终端
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    window.PhoneKeyboardMonitor = function () {

        var renderEvent = function (eventName, e, target) {
            if (_CustomEvent) {
                var handleEvent = _CustomEvent[eventName];
                if (handleEvent) {
                    handleEvent.call(target, e, {isAndroid: isAndroid, isIOS: isIOS});
                }
            }
        };

        if (isAndroid) {
            window.onresize = function (e) {
                var currentWinHeight = window.innerHeight;
                if (initWinHeight == currentWinHeight) {
                    //键盘被隐藏
                    renderEvent('onHideKeyboard', e, this);
                }
                else if (initWinHeight > currentWinHeight) {
                    //键盘显示
                    renderEvent('onShowKeyboard', e, this);
                }
            };
        }
        else if (isIOS) {
            document.body.addEventListener('click', function (e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                var typeText = target.type,
                    nodeName = target.nodeName.toLocaleLowerCase(),
                    status = false;

                if (nodeName == 'input' && (typeText == 'text' || typeText == 'password')) {
                    //键盘显示
                    renderEvent('onShowKeyboard', e, target);
                    status = true;
                }
                else if (nodeName == 'textarea' || nodeName == 'select') {
                    //键盘显示
                    renderEvent('onShowKeyboard', e, target);
                    status = true;
                }

                if (status) {
                    var flag = target.getAttribute('data-moni-flag');
                    if (!flag) {
                        target.addEventListener('blur', function (e) {
                            //键盘被隐藏
                            renderEvent('onHideKeyboard', e, target);
                        });
                        target.setAttribute('data-moni-flag', true);
                    }
                }
            });
        }
        else {
            console.info('监听键盘显示/隐藏失败，或者你可能使用的是非移动设备！');
        }
        this.isAndroid = isAndroid;
        this.isIOS = isIOS;
    };

    var _CustomEvent = {};

    PhoneKeyboardMonitor.prototype.onShowKeyboard = function (fn) {
        if (fn) {
            _CustomEvent = _CustomEvent || {};
            _CustomEvent['onShowKeyboard'] = fn;
        }

        return this;
    };

    PhoneKeyboardMonitor.prototype.onHideKeyboard = function (fn) {
        if (fn) {
            _CustomEvent = _CustomEvent || {};
            _CustomEvent['onHideKeyboard'] = fn;
        }

        return this;
    };

})();