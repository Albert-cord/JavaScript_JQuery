var log = console.log.bind()

function filterFilter() {

    $(function () {
        var people = [
    {                                              // Each person is an object
      name: 'Casey',                               // It holds name and rate
      rate: 60
    },
    {
      name: 'Camille',
      rate: 80
    },
    {
      name: 'Gordon',
      rate: 75
    },
    {
      name: 'Nigel',
      rate: 120
    }
  ]
        let priceRange = function (person) {
            return (person.rate > 74) && (person.rate < 100)
        }
        let result = people.filter(priceRange)
        let $tbody = $('<tbody></tbody>')
        log('result', result)
        for (var i = 0; i < result.length; i++) {
            let person = result[i]
            let $row = $('<tr></tr>')
            $row.append($('<td></td>').text(person.name))
            $row.append($('<td></td>').text(person.rate))
            $tbody.append($row)
        }
        // 这个append不能跳过$('thead')下所有子标签
        // 它会将元素添加到$('thead')下的第一个子元素后面
        // $('thead').append($tbody)
//      这个会跳过$('thead')下所有子元素
        $('thead').after($tbody)
    })
}

var dynamicFilter = function () {
    (function () {
        var people = [
   {                                              // Each person is an object
     name: 'Casey',                               // It holds name and rate
     rate: 60
   },
   {
     name: 'Camille',
     rate: 80
   },
   {
     name: 'Gordon',
     rate: 75
   },
   {
     name: 'Nigel',
     rate: 120
   }
    ]
        let rows = [],
            $min = $('#value-min'),
            $max = $('#value-max')

        function makeRows() {
            people.forEach(function (person) {

                let $row = $('<tr></tr>')
                $row.append($('<td></td>').text(person.name))
                $row.append($('<td></td>').text(person.rate))
                rows.push({
                    person: person,
                    $element: $row,
                })

            })
        }

        function appendRows() {
            let $tbody = $('<tbody></tbody>')

            rows.forEach(function (element) {
                $tbody.append(element.$element)
            })
            $('thead').after($tbody)
        }

        function update(min, max) {
            rows.forEach(function (obj) {
                if(obj.person.rate > min && obj.person.rate < max){
                    obj.$element.show()
                }else{
                    obj.$element.hide()
                }
            })
        }

        function init() {
            $('#slider').noUiSlider({
                range: [0, 150], start: [50, 90], handles: 2, margin: 20, connect: true,
                serialization: {to: [$min, $max], resolution: 1}
            }).change(function () {
                update($min.val(), $max.val())
            })

            makeRows()
            appendRows()
            update($min.val(), $max.val())

        }

        $(init)

    }())
}

var filterTags = function () {
    (function () {

        let $imgs = $('#gallery img'),
            $bottons = $('#buttons'),
            tagList = {}

        $imgs.each(function () {
            let img = this
            let tags = $(this).data('tags')

            if(tags){
                tags.split(',').forEach(function (tagName) {
                    if(tagList[tagName] == null){
                        tagList[tagName] = []

                    }
                    tagList[tagName].push(img)

                })
            }
        })

        $('<button/>', {
            text: 'Show All',
            class: 'active',
            click: function () {
                $(this)
                    .addClass('active')
                    .siblings()
                    .removeClass('active')
                $imgs.show()
            }
        }).appendTo($bottons)

        $.each(tagList, function (tagName) {
            $('<button/>', {
                text: tagName + ' (' + tagList[tagName].length + ') ',
                click: function () {
                    $(this)
                        .addClass('active')
                        .siblings()
                        .removeClass('active')
                    $imgs
                        .hide()
                        .filter(tagList[tagName])
                        .show()
                }
            }).appendTo($bottons)
        })
    }())
}

function filterSearch() {

    (function () {
        let cache = [],
            $search = $('#filter-search'),
            $imgs = $('#gallery img')

            $imgs.each(function () {
                cache.push({
                    img: this,
                    text: this.alt.trim().toLowerCase(),
                })
            })

            function filterImageByText() {
                let query = this.value.trim().toLowerCase()
                cache.forEach(function (img) {
                    let index = 0
                    if(query){
                        index = img.text.indexOf(query)

                    }
                    img.img.style.display = index == -1 ? 'none' : ''

                })
            }

            if('oninput' in $search[0]){
                $search.on('input', filterImageByText)
            }else {
                $search.on('keyup', filterImageByText)
            }


    }())
}

var sortTable = function () {

    let compare = {

        name: function (a, b) {
            a = a.replace(/^the /i, '')
            b = b.replace(/^the /i, '')
            if(a < b){
                return -1
            }else {
                return a > b ? 1 : 0
            }
        },

        duration: function (a, b) {
            a = a.split(':')
            b = b.split(':')

            a = Number(a[0]) * 60 + Number(a[1])
            b = Number(b[0]) * 60 + Number(b[1])

            return a - b

        },

        date: function (a, b) {
            a = new Date(a)
            b = new Date(b)

            return a - b
        },
    }

    $('.sortable').on('click', function () {
        let rows = $(this).find('tbody').find('tr').toArray()
        let $table = $(this)
        let $tbody = $table.find('tbody')
        let $control = $table.find('th')

        $control.on('click', function () {
            let $header = $(this)
            let order = $(this).data('sort')
            let column

            if($header.is('.ascending') || $header.is('.descending')){
                $header.toggleClass('ascending descending')
                $tbody.append(rows.reverse())
            }else {
                $header.addClass('ascending')
                $header.siblings().removeClass('ascending descending')

                if(compare.hasOwnProperty(order)){
                    column = $control.index(this)

                    rows.sort(function (a, b) {
                        let $a = $(a).find('td').eq(column).text()
                        let $b = $(b).find('td').eq(column).text()
                        return compare[order]($a, $b)
                    })
                    $tbody.append(rows)
                }
            }
        })

    })
}

function addEvent(element, event, callback) {
    let el = element
    if('addEventListener' in el){
        el.addEventListener(event, callback, false)
    }else {
        el['e' + event + callback] = callback

        el[event + callback] = function () {
            el['e' + event + callback](window.event)
        }
        //marker wanted
        el.attachEvent('on' + event, el[event + callback])
    }
}

function removeEvent(element, event, callback) {
    let el = element
    if('removeEventListener' in el){
        el.removeEventListener(event, callback, false)
    }else {
        el.detachEvent('on' + event, el[event + callback])
        el[event + callback] = null
        el['e' + event + callback] = null
    }
}

var _$ = document

function placeholderPolyFill() {
    (function () {
        if('placeholder' in document.createElement('input')){
            return
        }

        let documentFormsLength = document.forms.length
        for (var i = 0; i < documentFormsLength; i++) {
            showPlaceholder(document.forms[i].element)
        }

        function showPlaceholder(formElements) {
            for (var i = 0; i < formElements.length; i++) {
                let el = formElements[i]

                if(!el.placeholder){
                    continue
                }

                el.style.color = '#666666'
                el.value = el.placeholder

                addEvent(el, 'focus', function () {
                    if(this.value === this.placeholder){
                        this.style.color = '#000000'
                        this.value = ''
                    }
                })

                addEvent(el, 'blur', function () {
                    if(this.value === ''){
                        this.value = this.placeholder
                        this.style.color = '#666666'
                    }
                })
            }
        }
    }())
}

var passwordSignUp = function () {
    (function () {
        let password = _$.getElementById('password')
        let passwordConfirm = _$.getElementById('conf-password')

        function removeErrorSymbol(event) {
            let target = event.target || event.srcElement
            if(target.className === 'fail'){
                target.className = ''
            }
        }

        function setErrorSymbol(event) {
            let target = event.target || event.srcElement
            // let e = event
            target.className = target.value.length < 8 ? 'fail' : 'pass'
        }

        function passwordsMatch(event) {
            let target = event.target || event.srcElement
            target.className = (target.value.length >= 8 && password.value === target.value) ? 'pass' : 'fail'

        }
        addEvent(password, 'focus', removeErrorSymbol)
        addEvent(password, 'blur', setErrorSymbol)
        addEvent(passwordConfirm, 'focus', removeErrorSymbol)
        addEvent(passwordConfirm, 'blur', passwordsMatch)
    }())
}

var birthday = function () {
    (function () {
        let $birth = $('#birthday')
        let $parentsConsent = $('#parents-consent')
        let $consentContainer = $('#consent-container')

        $birth.prop('type', 'text').data('type', 'adte').datepicker({
            dateFormat: 'yy-mm-dd'
        })

        $birth.on('blur change', checkDate)

        function checkDate() {
            let birthDate = this.value.split('-')
            let b = birthDate

            toggleParentsConsent(new Date(b[0], b[1], b[2]))
            log('birthTime', b[0], b[1], b[2])

        }

        function toggleParentsConsent(birthTime) {
            log('birthTime', birthTime)
            if(isNaN(birthTime)){
                return
            }
            let now = new Date()
            log('boolean', (now - birthTime) < (13 * 365 * 24 * 60 * 60 * 1000))

            if((now - birthTime) < (13 * 365 * 24 * 60 * 60 * 1000)){
                $consentContainer.removeClass('hide')
                $parentsConsent.focus()
            }else {
                $consentContainer.addClass('hide')
                $parentsConsent.prop('checked', false)
            }
        }
    }())
}

function validation() {
// value
    (function () {
        _$.forms.register.noValidate = true

        $('form').on('submit', function (event) {
            let formElements = this.elements
            let valid = {}
            let isValid
            let isFormValid

            for (var i = 0; i < formElements.length; i++) {
                let el = formElements[i]
                // log('validateType', validateTypeFunc)

                isValid = validateRequired(el) && validateTypeFunc(el)

                if(!isValid){
                    showErrorMessage($(el))
                }else {
                    removeErrorMessage($(el))
                }
                valid[el.id] = isValid
            }

            if(!validateBio()){
                showErrorMessage($('#bio'))
                valid.bio = false
            }else {
                removeErrorMessage($('#bio'))
            }

            if(!validatePassword()){
                showErrorMessage($('#password'))
                valid.password = false
            }else {
                removeErrorMessage($('#password'))

            }

            if(!validateParentsConsent()){
                showErrorMessage($('#parents-consent'))
                valid.parentsConsent = false
            }else {
                removeErrorMessage($('#parents-consent'))
            }

            for (var key in valid) {
                alert('valid', valid)
                log('valid', valid)
                if(!valid[key]){
                    isFormValid = false
                    break
                }
                isFormValid = true
            }

            if(!isFormValid){
                event.preventDefault()
            }



        })

        function validateRequired(element) {
            let el = element
            if (isRequired(el)){
                let valid = isEmpty(el)
                if(valid) {
                    setErrorMessage($(el), 'Field is required')
                }
                return !valid
            }else {
                return true
            }

        }

        function isRequired(element) {
            let el = element
            return((typeof el.required === 'boolean') && el.required ||
            (typeof el.required === 'string'))
        }

        function isEmpty(element) {
            let el = element
            return !el.value || el.value === el.placeholder
        }

        function setErrorMessage($element, message) {
            // let el = element
            $element.data('errorMessage', message)
        }

        function validateTypeFunc(element) {
            let el = element
            if(!el.value){
                return true
            }
            let type = $(el).data('type') || el.getAttribute('type')
            if(typeof validateType[type] === 'function'){
                return validateType[type](el)
            }else {
                return true
            }
        }

        validateType = {
            email: function (element) {
                let el = element
                let valid = /[^@]+@[^@]+/.test(el.value)
                if(!valid){
                    setErrorMessage($(el), 'Please enter a valid email')
                }
                return valid
            },

            number: function (element) {
                let el = element
                let valid = /^\d+$/.test(el.value)
                if(!valid){
                    setErrorMessage($(el), 'Please enter a valid number')
                }
                    return valid
            },

            date: function (element) {
                let el = element
                let valid = /^(\d{2}\/\d{2}\/\d{4})|(\d{4}-\d{2}-\d{2})$/.test(el.value)
                if(!valid){
                    setErrorMessage($(el), 'Please enter a valid date')
                }
                return valid
            },
        }

        function showErrorMessage($element) {
            // let el = element
            let $el = $element

            let errorContainer = $el.siblings('.error.message')

            if(!errorContainer.length){
                errorContainer = $('<span class="error message"></span>').insertAfter($el)
            }
            errorContainer.text(getErrorMessage($el))
        }

        function getErrorMessage($element) {
            // let el = element
            return $element.data('errorMessage')
        }

        function removeErrorMessage($element) {
            // let el = element
            let $el = $element
            let errorContainer = $el.siblings('.error.message')
            errorContainer.remove()
        }

        function validateBio() {
            let bio = $('#bio')

            let valid = bio.val().length <= 140
            if(!valid){
                setErrorMessage(password, 'Please make sure your password has at least 8 characters')
            }
            return valid
        }

        function validatePassword() {
            let password = $('#password')
            let valid = password.val().length >= 8
            if(!valid){
                setErrorMessage(password, 'Please make sure your password has at least 8 characters')
            }
            return valid
        }

        function validateParentsConsent() {
            let parentsConsent = $('#parents-consent')
            let consentContainer = $('#consent-container')
            let valid = true
            if(consentContainer.className.indexOf('hide') === -1){
                valid = parentsConsent.checked
                if(!valid){
                    setErrorMessage(parentsConsent, 'You need your parents\' consent')
                }
                return valid
            }
        }
    }())
}

function bioForm() {
    (function () {
        let bio = $('#bio')
        let bioCount = $('#bio-count')

        bio.on('focus', updateCount)
        bio.on('keyup', updateCount)

        bio.on('blur', function () {
            if(bioCount.text() >= 0){
                bioCount.addClass('hide')
            }
        })

        function updateCount() {
            let count = 140 - bio.val().length
            let status = ''

            if(count < 0){
                status = 'error'
            } else if (count <= 15){
                status = 'warn'
            } else {
                status = 'good'
            }

            bioCount.removeClass('error warn good hide')

            bioCount.addClass(status)

            bioCount.text(count)
        }
    }())
}
