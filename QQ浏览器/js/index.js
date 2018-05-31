$(function () {
    let $downloadLi = $('.header-inner > ul> li:last');
    let $firstCon = $('.first-con'),
        $imgItems = $firstCon.find('.img-item'),
        $focusList = $firstCon.find('.img-focus'),
        $download = $('.download-con > div > .download-link');
    let interval = 3000,
        itemIndex = 0;

    let offsetT = $download.offset().top;
    $(window).scroll(function () {
        let $scrollT = $(document).scrollTop();
        if ($scrollT > offsetT) {
            $downloadLi.css('display', 'block');
            return;
        }
        $downloadLi.css('display', 'none');
    });

    let autoMove = function () {
        itemIndex++;
        $imgItems.each((index, item) => {
            if (itemIndex % 2 === index) {
                $(item).fadeTo('slow', 1);
            } else {
                $(item).fadeTo('slow', 0);
            }
        });
        downloadChange();
        changeFocus();
    };
    let downloadChange = function () {
        if (itemIndex % 2 ===1) {
            $download.addClass('green');
        } else {
            $download.removeClass('green');
        }
    };

    let changeFocus = function () {
        $focusList.each((index, item) => {
            if (itemIndex % 2 === index) {
                $(item).addClass('active');
            } else {
                $(item).removeClass('active');
            }
        })
    };
    let mouseEnter = function (ev) {
        clearInterval(autoTimer);
        let target = ev.target;
        itemIndex = target.index - 1;
        autoMove();
    };

    let mouseLeave = function (ev) {
        autoTimer = setInterval(autoMove, interval);
    };

    let hoverFocus = function () {
        $focusList.each((index, item) => {
            item.index = index;
        });
        $focusList.on('mouseenter', mouseEnter).on('mouseleave', mouseLeave);
    };
    hoverFocus();
    let autoTimer = setInterval(autoMove, interval);
});
