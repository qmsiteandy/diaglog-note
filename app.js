const messages = document.querySelector('#messages')

const enterBtns = [document.querySelector('#enter-A'), document.querySelector('#enter-B')]
const nameInputs = [document.querySelector('#name-A'), document.querySelector('#name-B')]
const textareas = [document.querySelector('#textarea-A'), document.querySelector('#textarea-B')]

// 現在輸入者的Index
var indexNow = 1

enterBtns[0].addEventListener('click', EnterAClick)
enterBtns[1].addEventListener('click', EnterBClick)

function EnterAClick() {
    indexNow = 0
    ContentEnter()
}

function EnterBClick() {
    indexNow = 1
    ContentEnter()
}

function ContentEnter() {

    console.log(indexNow)

    // 如果未輸入
    if (textareas[indexNow].value === '') return;

    // 對話紀錄顯示
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${nameInputs[indexNow].value}：${nameInputs[indexNow].value}`));
    switch (indexNow) {
        case 0:
            li.setAttribute('class', 'msg-block msg-block-A')
            console.log('A')
            break
        case 1:
            li.setAttribute('class', 'msg-block msg-block-B')
            console.log('B')
            break
    }
    messages.appendChild(li);
    // 滾動至最新訊息
    messages.scrollTop = messages.scrollHeight;

    // 復原輸入框
    textareas[indexNow].value = '';
}

// on指令：當接收到server傳來的
// const notifier = require('node-notifier')
// const path = require('path')
// const moment = require('moment')
// const remote = require('electron').remote

// const elNow = document.querySelector('.now-time')
// const elAlarm = document.querySelector('.alarm-time')
// elAlarm.addEventListener('change', onAlarmTextChange)

// let time = moment()

// let nowTime
// let alarmTime

// /** Set Time */
// const now = moment(time).format('HH:mm:ss')
// nowTime = now
// elNow.innerText = now

// const alarm = moment(time).add(5, 'seconds').format('HH:mm:ss')
// alarmTime = alarm
// elAlarm.value = alarm

// timer()

// /** Now Time */
// function timer() {
//     time = moment().format('HH:mm:ss')

//     /** Set Now */
//     nowTime = time
//     elNow.innerText = time

//     check()

//     setTimeout(() => {
//         timer()
//     }, 1000)
// }
