let utils = (function () {
    let getCss = function (ele, attr) {
        if (typeof window.getComputedStyle === 'undefined') {
            return;
        }
        let val = window.getComputedStyle(ele, null)[attr];
        let reg = /^-?\d+(\.\d+)?(px|pt|rem|em)?$/i;
        reg.test(val) ? val = parseFloat(val) : null;
        return val;
    };
    let setCss = function (ele, attr, value) {
        if (attr === 'opacity') {
            ele.style.opacity = value;
            return;
        }
        if (!isNaN(value)) {
            let reg = /^(width|height|fontSize|((margin|padding)?(left|top|right|bottom)?))$/i;
            reg.test(attr) ? value += 'px' : null;
        }
        ele['style'][attr] = value;
    };
    let setGroupCss = function (ele, options = {}) {
        for (let attr in options) {
            if (!options.hasOwnProperty(attr)) break;
            setCss(ele, attr, options[attr])
        }
    };
    let css = function (...arg) {
        let len = arg.length,
            fn = getCss;
        len >= 3 ? fn = setCss : null;
        len === 2 && (arg[1] instanceof Object) ? fn = setGroupCss : null;
        return fn(...arg);
    };
    let effect = {
        linear: (t, b, c, d) => t / d * c + b
    };
    let each = (obj, callback) => {
        if ('length' in obj) {
            for (let i = 0; i < obj.length; i++) {
                let item = obj[i],
                    res = callback && callback.call(item, i, item);
                if (res === false) {
                    break;
                }
            }
            return;
        }
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                let item = obj[attr],
                    res = callback && callback.call(item, attr, item);
                if (res === false) {
                    break;
                }
            }
        }
    };
    let animate = function (ele, target, duration=1000,callback) {
        if (typeof duration === 'function') {
            callback = duration;
            duration = 1000;
        }
        let begin = {},
            change = {},
            time = 0;
        for (let attr in target) {
            if (target.hasOwnProperty(attr)){
                begin[attr] = utils.css(ele, attr);
                change[attr] = target[attr] - begin[attr];
            }
        }
        clearInterval(ele.timer);
        ele.timer = setInterval(() => {
            time += 17;
            if (time >= duration) {
                clearInterval(ele.timer);
                utils.css(ele, target);
                callback && callback.call(ele);
                return;
            }
            let cur = {};
            for (let attr in target) {
                if (target.hasOwnProperty(attr)) {
                    cur[attr] = effect.linear(time,begin[attr],change[attr],duration);
                }
            }
            utils.css(ele, cur);
        }, 17)
    };
    return {
        getCss,
        setCss,
        setGroupCss,
        css,
        each,
        animate
    }
})();
