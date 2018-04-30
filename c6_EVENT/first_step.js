var $ = document
var log = console.log.bind()
var eventListener = function () {
    let checkUsername = function () {
        let elMsg = $.getElementById('feedback')
        log('this.value', this.value)
        if(this.value.length < 5){
            elMsg.textContent = 'username must be 5 characters or more'
        }/*else{
            elMsg.textContent = ''
        }*/

    }
    let el = $.getElementById('username')
    el.addEventListener('blur', checkUsername, false)
}
