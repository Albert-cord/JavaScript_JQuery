/*以下代码都是在Chrome浏览器下使用

*/

var log = console.log.bind()
var $ = document
var getElementById = function () {
    let liId = document.getElementById('four')
    // log('liId', liId)

    liId.className = 'cool'
}

var getElements = function () {
    let gesc = document.getElementsByClassName('hot')
    gesc[1].className = 'complete'
    let gest = document.getElementsByTagName('ul')

    let qsa = document.querySelectorAll('li.hot')
    qsa[0].className = 'cool'
    // gest[0].innerText += <br> + '添加内容'
    // log('qsa', qsa)
}
//Chrome 没有这个API？？？
//该死的浏览器商
var sibling = function () {
    let item = document.getElementById('two')
    //火狐应该是previousSibling
    let previousItem = item.previousElementSibling
    // log('previousItem', previousItem)

    previousItem.className = 'complete'
    item.nextElementSibling.className = 'hot'

}

var childNode = function () {
    let item = $.querySelector('ul')
    let firstChild = item.firstElementChild

    let lastChild = item.lastElementChild
    firstChild.setAttribute('class', 'cool')
    lastChild.setAttribute('class', 'complete')
}
//Chrome下不知道API

var nodeValue = function () {
    let item = $.getElementById('two')
    let itemValue = item.nodeValue
    log('itemValue', itemValue)

    newItemValue = itemValue.replace('meat', 'cofe')
    itemValue = newItemValue
}

var addElement = function () {
    let ul = $.getElementsByTagName('ul')[0]
    let newE = $.createElement('li')
    let newText = $.createTextNode('quinoa')
    newE.appendChild(newText)
    ul.appendChild(newE)
}

var removeElement = function () {
    let item = $.querySelectorAll('li')[3]
    let container = item.parentNode
    container.removeChild(item)
}
