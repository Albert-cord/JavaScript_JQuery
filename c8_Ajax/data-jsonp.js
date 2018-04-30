var log = console.log.bind()
var showEvents = function (data) {
    var newContent = ''
    let h = newContent
    for (var i = 0; i < data.events.length; i++) {
        let o = data.events[i]
        h += '<div class="event">'
        h += '<img src="' + o.map + '" '
        h += 'alt="' + o.location + '">'
        h += '<p><b>' + o.location + '</b><br>'
        h += o.date + '</p>'
        h += '</div>'

    }
    log('newContent data', h, data)
    newContent = h
    document.getElementById('content').innerHTML = newContent
}
