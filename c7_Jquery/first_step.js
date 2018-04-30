var log = console.log.bind()

var example = function () {
    $(':header').addClass('headline')
    $('li:lt(3)').hide().fadeIn(1500)
    $('li').on('click', function () {
        $(this).remove()
    })
}

var  looping = function () {
    $('.hot').addClass('favorite')
    $('em').addClass('seasonal')
}

var changing  = function () {
    $('li[id!="one"]').hide().delay(500).fadeIn(1000)

}

var getHtmlText = function () {
    let $listHtml = $('ul').html()
    $('ul').append($listHtml)
    let $listText = $('ul').text()
    $('ul').append('<p>' + $listText + '</p>')
}

var getHtmlTextNode = function () {
    let $listHtml = $('li').html()
    $('li').append('<i>' + $listHtml + '</i>')
    let $listText = $('ul').text()
    $('li').append('<i>' + $listText + '</i>')

}

var changingContent = function () {
    $('li:contains("pine")').text('milk')
    $('li.hot').html(function () {
        return '<em>' + $(this).html() + '</em>'
    })
    $('#one').remove()
}

var addNewContent = function () {
    $('ul').before('<p class="notice">Just Update</p>')
    $('li.hot').prepend('+ ')
    $item = $('<li><em>nice</em>milk</li>')
    $('li:last').after($item)
}

var attribute = function () {
    $(function () {
        $('li#three').removeClass()
        $('li.hot').addClass('favorite')
        $('ul').attri('id', 'group')
    })
}

var each = function () {
    $('li').each(function () {
        let ids = this.id
        $(this).append('<span class="order"> ' + ids + '</span>')
    })
}

var events = function () {
    $(function () {
        let $item = $('li')
        $item.on('mouseover click', function () {
            let ids = this.id
            $(this).children('span').remove()
            $(this).append(' <span class="priority">' + ids + '</span>')
        })
        $item.on('mouseout', function () {
            $(this).children('span').remove()
        })
    })
}

var eventObject = function () {
    $(function () {
        $('li').on('click', function (event) {
            $('li span').remove()
            let date = new Date()
            date.setTime(event.timeStamp)
            let dateString = date.toDateString()
            $(this).append(' <span class="date">' + dateString + ' ' + event.type + '</span>')
        })
    })
}

var eventDelegation = function () {
    let listItem, itemStatus, eventType
    $('ul').on(
        'click mouseover',
        ':not(#four)',
        {status: 'important'},
        function (event) {
            listItem = 'Item: ' + event.target.textContent + '<br>'
            itemStatus = 'Status: ' + event.data.status + '<br>'
            eventType = 'Event: ' + event.type
            $('#notes').html(listItem + itemStatus + eventType)
        }
)
}

var effects = function () {
    $('h2').hide().slideDown()
    $li = $('li')
    $li.hide().each(function (index) {
        $(this).delay(700*index).fadeIn(700)
    })
    $li.on('click', function() {
        $(this).fadeOut(700)
    })
}

var animate = function () {
    $('li').on('click', function () {
        $(this).animate({
            opacity: 0.0,
            paddingLeft: '+=80'

        }, 500, function () {
            $(this).remove()
        })
    })
}

var traversing = function () {
    $(function () {
        $h2 = $('h2')
        $('ul').hide()
        $h2.append('<a>show</a>')
        $h2.on('click', function () {
            $h2.next()
                .fadeIn(500)
                .children('.hot')
                .addClass('complete')
            $h2.find('a').fadeOut(500)
        })
    })
}

var filter = function () {
    let $liList = $('li')
    $liList.filter('.hot:last').removeClass('hot')
    $('li:not(.hot)').addClass('cool')
    $liList.has('em').addClass('complete')

    $liList.each(function () {
        if($(this).is('.hot')){
            $(this).prepend('Priority item: ')
        }
    })

    $('li:contains(honey)').append(' (local)')
}

var indexNumber = function () {
    $(function () {
        $('li:lt(2)').removeClass('hot')
        $('li').eq(0).addClass('complete')
        $('li:gt(2)').addClass('cool')
    })
}

var form = function () {
    $(function () {
        let $newItemButton = $('#newItemButton')
        let $newItemForm = $('#newItemForm')
        let $textInput = $('input:text')

        $newItemButton.show()
        $newItemForm.hide()
        log('$newItemForm', $newItemForm)
        $('#showForm').on('click', function () {
            $newItemButton.hide()
            $newItemForm.show()
        })
        $newItemForm.on('submit', function (e) {
            e.preventDefault()
            let newText = $textInput.val()
            $('li:last').after('<li>' + newText + '</li>')
            $newItemForm.hide()
            $newItemButton.show()
            $textInput.val('')
        })
    })
}

var cutCopyPaste = function () {
    $(function () {
        let $p = $('p')
        $pClone = $p.clone()
        $p.remove()
        $pClone.insertAfter('h2')

        let $moveItem = $('#one').detach()
        $moveItem.appendTo('ul')
    })
}

var demensions = function () {
    $(function () {
        let listHeight = $('#page').height()
        $('ul').append('<p>' + listHeight + '</p>')
        $('li').width('50%')
        $('li#one').width(125)
        $('li#two').width('100px')
    })
}

var position = function () {
    $(function () {
        let $window = $(window)
        let $slideAd = $('#slideAd')
        let endZone = $('#footer').offset().top - $window.height() - 500
        $window.on('scroll', function () {
            log('endZone $window.height() $("#footer").offset().top $window.scrollTop()', endZone, $window.height(), $('#footer').offset().top, $window.scrollTop())

            if(endZone < $window.scrollTop()){
                $slideAd.animate({'right': '0px'}, 250)
            } else {
                $slideAd.stop(true).animate({'right': '-360px'}, 250)
            }
        })
    })
}

var lastExample = function () {
    $(function () {
        let $list = $('ul')
        let $newItemForm = $('#newItemForm')
        let $newItemButton = $('#newItemButton')
        let itemText = ''
        let count = 0
        $('li').hide().each(function (index) {
            $(this).delay(450 * index).fadeIn()
        })

        $newItemForm.hide()
        $newItemButton.show()
        $newItemButton.on('click', function () {
            $newItemForm.show()
            $newItemButton.hide()
        })

        let updateCount = function () {
            count = $('li:not(.complete)').length
            $('#counter').text(count)

        }
        updateCount()
        $newItemForm.on('submit', function (event) {
            event.preventDefault()
            itemText = $('input:text').val()
            $('ul').append('<li>' + itemText + '</li>')
            $newItemForm.hide()
            $newItemButton.show()
            updateCount()
        })
        $list.on('click', 'li', function () {
            let $this = $(this)
            let complete = $this.hasClass('complete')

            if(complete === true){
                $this.animate({
                    opacity: 0.0,
                    paddingLeft: '+=80',
                }, 500, 'swing', function () {
                    $this.remove()
                })
            } else{
                $saveItem = $this.detach()
                $this.remove()
                log('$saveItem', $saveItem)
                $saveItem.appendTo('ul')
                $saveItem.addClass( 'complete')
                // let $moveItem = $('#one').detach()
                // $moveItem.appendTo('ul')
                updateCount()
            }
        })
    })
}
