
var log = console.log.bind()
function accordion() {
    $('.accordion').on('click', '.accordion-control',
    function (event) {
        event.preventDefault()

        $(this)
                .next('.accordion-panel')
                .not(':animated')
                .slideToggle()
    })
}

function tabs() {
    $('.tab-list').each(function () {
        let $this = $(this)
        // let $link = $('ul li')
        let $tab = $this.find('li.active')
        // let $click = $this.find('a')
        let $a = $tab.find('a')
        let $panel = $($a.attr('href'))
        $this.on('click', '.tab-control', function (event) {
            event.preventDefault()
            let $this = $(this)
            // let id = $this.find('a').attr('href')
            // let id = event.hash
            let id = $this.attr('href')
            if($this.is('.active') === false){
                $panel.removeClass('active')
                $tab.removeClass('active')

                $tab = $this.parent().addClass('active')

                $panel = $(id).addClass('active')
             }
        })
    })
}

var model = function (settings){
    let $window = $(window)
    let $model = $('<div class="modal"></div>')
    let $content = $('<div class="modal-content"></div>')
    let $close = $('<button class="modal-close" role="button">Close</button>')
    $model.append($content, $close)

    $close.on('click', function (event) {
        event.preventDefault()
        model.close()
    })

    model.center = function () {
            let top = Math.max($window.height() - $model.outerHeight(), 0) / 2
            let left = Math.max($window.width() - $model.outerWidth(), 0) / 2
            $model.css({
                top: top + $window.scrollTop(),
                left: left + $window.scrollLeft()
            })
        }

    model.open = function (settings) {

            $content.empty().append(settings.content)

            $model.css({
                top: settings.top || 'auto',
                left: settings.left || 'auto'
            }).appendTo('body')

            model.center()

            $(window).on('resize', model.center)
        }

    model.close = function () {
            $content.empty()
            $model.detach()
            $(window).off('resize', model.center)
        }
}

var init = function (){
    var $content = $('#share-options').detach()

    var o = {
        content: $content,
        top: 300,
        left: 340,
    }
    // var m = model(o)
    // log('m', model)

    $('#share').on('click', function () {
        // var m = model

        model.open(o)
        log('h,w', model.$model)
        // m.center()
    })
}

var photoView = function () {
    var $current
    var request,
        cache = {},
        $frame = $('#photo-viewer'),
        $thumb = $('.thumb')
    // JavaScript/
    function crossFade($img) {
        // let $current = $current
        if($current){
            $current.stop().fadeOut('slow')
        }

        $img.css({
            marginLeft:  - $img.width() / 2,
            marginTop: - $img.height() / 2,
        })
        // $frame.removeClass('is-loading').append($img)

        $img.stop().fadeIn('slow')

        $current = $img

    }



    $(document).on('click', '.thumb', function (event) {
        event.preventDefault()

        let $img,
            src = this.href;
            request = src;

        $thumb.removeClass('active')
        $(this).addClass('active')

        if(cache.hasOwnProperty(src)){
            log('boolean', cache.hasOwnProperty(src))

            log('cache', cache)
            if(cache[src].isLoading === false){
                crossFade(cache[src].$img)
            }
        }else{
            $img = $('<img/>')
            cache[src] = {
                $img: $img,
                isLoading: true,
            }
        }
        // let $why = $img

        (0, $img  = $img ? $img : cache[src].$img).on('load', function () {
            // event.preventDefault()
            log('123')
            // let target = this.target
            // log('target', target)
            $img.hide()
            $frame.removeClass('is-loading').append($img)
            cache[src].isLoading = false

            if(request === src){
                crossFade($img)
            }
        }

    )

        // $frame.addClass('is-loading')

        $img.attr({
            'src': src,
            'alt': this.title || '',
        })



    })

    $thumb.eq(0).click()

    // log('cache, $current $img', cache, $current)
}

var slider = function () {
    $('.slider').each(function () {
        let timeout,
            indexNumber,
            moveIndex,
            currentIndex = 0,
            newIndex,
            buttonArray = [],
            $this = $(this),
            $group = $this.find('.slide-group'),
            $sliders = $group.find('.slide')



        function move(newIndex) {
            newIndex = $.isNumeric(newIndex) ? newIndex : indexNumber
            let animateLeft,
                slideLeft

            advance()


            if($group.is(':animated') || currentIndex === newIndex){
                return
            }
            // log('newIndex', newIndex)
            log('currentIndex', currentIndex)
            buttonArray[currentIndex].removeClass('active')

            buttonArray[newIndex].addClass('active')
            log('currentIndex, newIndex', currentIndex, newIndex)

            if(newIndex > currentIndex){
                slideLeft = '100%'
                animateLeft = '-100%'
            }else {
                slideLeft = '-100%'
                animateLeft = '100%'
            }

            //这里异步了 先去执行了currentIndex++
            $sliders.eq(newIndex).css({left: slideLeft, display: 'block'})

            $group.animate({left: animateLeft}, function () {
                $sliders.eq(currentIndex - 1).css({display: 'none'})
                $sliders.eq(newIndex).css({left: 0})
                // log('currentIndex, newIndex', currentIndex, newIndex)

                // log('css', $sliders.css())
                $group.css({left: 0})
                currentIndex = newIndex

            })
        }

        function advance() {
            clearTimeout(timeout)
            timeout = setTimeout(function () {
                moveIndex = (currentIndex + 1) % $sliders.length
                move(moveIndex)
                log('currentIndex', currentIndex)
                ++currentIndex

            }, 4000)
        }

        $.each($sliders, function (index) {

            indexNumber = index
            var $button = $('<button type="button" class="slide-btn">&bull;</button>')
            if(index === currentIndex){
                $button.addClass('active')
            }
            $button.on('click', function () {
                // indexNumber = index

                move(index)

                log('index', index, indexNumber)
            }).appendTo('.slide-buttons')
            buttonArray.push($button)
            log('buttonArray', buttonArray)
        })

        advance()

    })

    // 1.条理不清
    // 2.有时候会搞错API
    // 3.不了解值的属性即对传递进函数的值不了解
    // 4.激进，不能理解控制台提示

}

var accordionPlugin = function () {
    (function ($) {
        $.fn.accordion = function (speed) {
            this.on('click', '.accordion-control', function () {
                $(this)
                        .next('.accordion-panel')
                        .not(':animated')
                        .slideToggle(speed)
            })
            return this
        }
    }(jQuery))

}

accordionPlugin()
$('.menu').accordion(500)
