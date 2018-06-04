let extensionRender=(function(){
     let extension=document.querySelector('#extension'),
         unit=extension.querySelector('.unit'),
         wrapper=unit.querySelector('.wrapper'),
         wrapperList=wrapper.querySelectorAll('li'),
         focus=extension.querySelector('.focus'),
         focusList=focus.querySelectorAll('li');
    let step=0,
        autoTimer=null,
        interval=2000;
     let autoMove=function () {
         step++;
         if (step >= wrapperList.length-2) {
             utils.css(wrapper, 'left',-150);
             step=1;
         }
         utils.animate(wrapper, {
             left: -step * 600-150
         }, 1000);
         changeFocus();
     };
    let changeFocus=function () {
        let _step=step;
        if(_step>=wrapperList.length-2){
            _step=0;
        }
        [].forEach.call(focusList,(item,index)=>{

            item.className = index === _step ? 'active' :'';

        })
    };
    let handleFocus = function () {
        [].forEach.call(focusList, (item, index) => {
            item.onmouseenter = function () {
                clearInterval(autoTimer);
                step = index;
                utils.animate(wrapper, {
                    left: -step * 600-150
                }, 200);
                changeFocus();
            };
            item.onmouseleave=function () {
                autoTimer = setInterval(autoMove, interval);
                step = index;
                utils.animate(wrapper, {
                    left: -step * 600-150
                }, 200);
                changeFocus();
            }
        })
    };

    return {
        init:function(){
            autoTimer=setInterval(autoMove,interval);
            handleFocus();
        }
    }
})();
extensionRender.init();
