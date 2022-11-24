const messages = document.querySelector('#messages')

const enterA = document.querySelector('#enter-A')
const nameA = document.querySelector('#name-A')
const textareaA = document.querySelector('#textarea-A')

enterA.addEventListener('click', ContentEnter)

function ContentEnter() {

    // 如果未輸入
    if (textareaA.value === '') return;

    // 對話紀錄顯示
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${nameA.value}：${textareaA.value}`));
    li.setAttribute('class', 'msg-block msg-block-B');
    messages.appendChild(li);

    messages.scrollTop = messages.scrollHeight;

    // 復原輸入框
    textareaA.value = '';
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
