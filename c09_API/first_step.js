
function geolocation() {
    let loc = document.getElementById('loc')
    let msg = 'Sorry, we were unable to get your location'
    console.log('boolean', Modernizr.geolocation)

    if(Modernizr.geolocation){
        navigator.geolocation.getCurrentPosition(success, fail)
        // navigator.geolocation.getCurrentPosition(success, fail);
        loc.textContent = 'Checking location...'
    }else {
        loc.textContent = msg
    }

    function success(position) {
        msg = '<h3> Longitude: <br>'
        msg += position.coords.longitude + '</h3>'
        msg += '<h3> Latitude: <br>'
        msg += position.coords.latitude + '</h3>'

        loc.innerHTML = msg
    }

    function fail(loc) {
        loc.textContent = msg
        console.log(msg.code)
    }
}


function ehistory() {
    $(function () {
        // let history =History.new()
        function loadPage(url) {
            $('#content').load(url + '#container').hide().fadeIn('slow')
        }

        $('nav a').on('click', function (event) {
            let pageArray = ''
            event.preventDefault()
            let href = this.href
            let $this = $(this)

            $('a.current').removeClass('current')
            $this.addClass('current')

            loadPage(href)

            // history.pushState(pageArray, $this.text, href)
            history.pushState('', $this.text, href);    // Update history

        })

        window.onpopstate = function () {
            let path = location.pathname
            loadPage(path)
            let a = location.pathname.lastIndexOf('/') + 1
            let page = path.substring(a)
            $('a').removeClass('current')
            $('[href="' + page + '"]').addClass('current')
        }
    }

    )
}

var jqUiForm = function () {
    $(function () {

        $('#arrival').datepicker()
        let $amount = $('#amount')
        let $range = $('#price-range')

        $('#price-range').slider({
            range: true,
            min:0,
            max:400,
            values:[175,300],
            slide:function (event, ui) {
                $amount.val('$' + ui.values[0] + '- $' + ui.values[1])
            }
        })

        $amount.val('$' + $range.slider('values', 0)) + '- $' + $range.slider('values', 1)


    })
}

var BasketCtrl = function ($scope) {
    $scope.description = 'Angular'
    $scope.cost = 8
    $scope.qty = 1
}
