
var log = console.log.bind()

var dateHtml = function () {
    let xhr = new XMLHttpRequest()

    xhr.open('GET', 'data/data.html', true)
    xhr.send(null)

    xhr.onload = function () {
        if(xhr.status === 200){
            document.getElementById('content').innerHTML
            = xhr.responseText
        }
    }
}

var dateXml = function () {
    let $ = document
    let xhr = new XMLHttpRequest()
    xhr.open('GET', 'data/data.xml', true)
    xhr.send(null)


    xhr.onload = function () {
        if(xhr.status === 200){
            let response = xhr.responseXML
            let events = response.getElementsByTagName('event')
            log('events.length', events.length)
            for (var i = 0; i < events.length; i++) {
                let location, city, container, image
                container = $.createElement('div')
                container.className = 'event'
                let e = events[i]

                image = $.createElement('img')
                image.setAttribute('src', getNodeValue(e, 'map'))
                image.setAttribute('alt', getNodeValue(e, 'map'))

                container.appendChild(image)

                location = $.createElement('p')
                city = $.createElement('b')
                newLine = $.createElement('br')

                city.appendChild($.createTextNode(getNodeValue(e, 'location')))
                location.appendChild(newLine)
                location.insertBefore(city, newLine)
                location.appendChild($.createTextNode(getNodeValue(e, 'date')))

                container.appendChild(location)

                $.getElementById('content').appendChild(container)


            }
        }
    }

    let getNodeValue = function (obj, tag) {
        return obj.getElementsByTagName(tag)[0].firstChild.nodeValue
    }
}

var dataJson = function () {
    let xhr = new XMLHttpRequest()
    let newContent = ''

    xhr.open('GET', 'data/data.json', true)
    xhr.send(null)

    xhr.onload = function () {
        if(xhr.status === 200){
            let response = JSON.parse(xhr.responseText)
            let events = response.events
            for (var i = 0; i < events.length; i++) {
                let e = events[i]
                let n = newContent
                n += '<div class="event">'
                n += '<img src="' + e.map + '"'
                n += '" alt="' + e.location + '">'
                n += '<p><b>' + e.location + '</b><br>'
                n += e.date + '</p>'
                n += '</div>'

            }
            document.getElementById('content').innerHTML = newContent

        }

    }
}

jqLoad = function () {
    $('nav a').on('click mouseover', function (event) {
        // let e = event

        let url = this.href
        log('url, event', url, event)

        event.preventDefault()

        $('nav a.current').remove('current')
        $(this).addClass('current')

        $('#container').remove()
        $('#content').load(url + '#container').hide().fadeIn('slow')
    })

}

function jqGet() {
    var vote = '<div id="vote"><div class="third"><a href="http://example.org?tshirt=gray"><img src="img/t-gray.png" id="gray" alt="gray" /></a></div><div class="third"><a href="http://example.org?tshirt=yellow" id="yellow"><img src="img/t-yellow.png" id="yellow" alt="yellow" /></a></div><div class="third"><a href="http://example.org?tshirt=green"><img src="img/t-green.png" id="green" alt="green" /></a></div></div>';
    $('#selector').append(vote)

    $('#selector a').on('click', function (event) {
        let string = 'vote=' + $(event.target).attri('id')
        event.preventDefault()
        $.get('/php/votes.php', string, function (data) {
            $('#selector').html(data)
        })
    })
}

function jqPost() {
    $(function () {

    $('#register').on('submit',function (event) {
        event.preventDefault()
        let details = $('#register').serialize()
        $.post('register.php', details, function (data) {
            $('#register').html(data)
        })
    })
})
}

function jqGetJSON() {
    $.getJSON('data/rates.json').done(function (data) {
        let d = new Date()
        let hrs = d.getHours()
        let mins = d.getMinutes()
        let msg = '<h2>Exchange Rates</h2>'

        $.each(data,function (key, val) {
            msg += '<div class="' + key + '">' + key +': ' + val + '</div>'
        })
        msg += '<br>Last update: ' + hrs + ':' + mins + '<br>'
        $('#rates').html(msg)
    }).fail(function () {
        $('#rates').text('Sorry, we cannot load rates.')
    }).always(function () {
        let reload = '<a id="refresh" href="#"'
        reload += '<img src="img/refresh.png" alt="refresh" /></a>'
        $('#reload').html(reload)
        $('#refresh').on('click', function (event) {
            event.preventDefault()
            jqGetJSON()
        })
    })
}

function jqAjax() {
    $('nav a').on('click', function (event) {
        event.preventDefault()
        let url = this.href
        let $content = $('#content')

        $('nav a.current').removeClass('current')
        $(this).addClass('current')
        $('#content').remove()

        $.ajax({
            type: "GET",
            url: url,
            timeout: 2000,
            beforeSend: function () {
                $content.append('<div id="load">Loading</div>')
            },
            complete: function () {
                $('#load').remove()
            },
            success: function () {
                $content.html( $(data).find('#container')).hide().fadeIn(400)
            },
            error: function () {
                $content.html('<div class="container">Please try again soon. </div>')
            }
        })
    })
}
