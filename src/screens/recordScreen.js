import React, { useState, useEffect } from 'react';

const fs = window.fs; //defined in preload.js

var newLine = '\r\n';
var fields = ['名稱', '時間', '內容'];

async function appendDataToFile(path, data) {

  // console.log(path)
  // fs.stat(path, function (err, stat) {
  //     if (err != null) {

  // fs.writeFile(path, '\ufeff' + fields + newLine + data + newLine, 'utf-8', (err2) => {
  //   if (err2) throw err2;
  // });

  //         return false;
  //     }
  // });

  console.log('append');
  // await fs.appendFile(path, '\ufeff' + data + newLine, 'utf-8');
  // console.log(path)
  // return true;
}

// 紀錄html元件
let messages, enterBtns, nameInputs, textareas;

// 現在輸入者的Index
let indexNow = 0

async function ContentEnter() {

  let msg = textareas[indexNow].value;
  const name = nameInputs[indexNow].value;
  const localTime = new Date().toLocaleString();

  // 如果未輸入或內容只有\s \n
  if (/\S/.test(msg) === false) {
    textareas[indexNow].value = ''
    return;
  }

  // 去除換行符號
  msg = msg.replace(/\n/g, '');

  let isAppendSuccess = true;

  // 儲存對話至CSV
  const toCsv = [name, localTime, msg];
  await appendDataToFile('C:/Users/ht93084/Desktop/file.csv', toCsv)
    .catch(err => {
      // console.log(err)
      if (err.stack.includes('EBUSY')) {
        alert('請確認 CSV 檔關閉，否則影響資料儲存');
        isAppendSuccess = false;
      }
    })

  if (isAppendSuccess) {
    // 對話紀錄顯示
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${nameInputs[indexNow].value}：${textareas[indexNow].value}`));
    switch (indexNow) {
      case 0:
        li.setAttribute('class', 'msg-block msg-block-A')
        break
      case 1:
        li.setAttribute('class', 'msg-block msg-block-B')
        break
    }
    messages.appendChild(li);
    // 滾動至最新訊息
    messages.scrollTop = messages.scrollHeight;

    // 復原輸入框
    textareas[indexNow].value = '';
  }

}

// 切換輸入視窗
function SetInputIndex(index) {
  indexNow = index;

  UpdateInputDiv();

  if (document.activeElement.classList.contains('name-input') === false) {
    textareas[index].focus();
  }
}

// 更新輸入視窗樣式
function UpdateInputDiv() {
  switch (indexNow) {
    case 0:
      textareas[0].removeAttribute('disabled');
      textareas[1].setAttribute('disabled', '');
      enterBtns[0].removeAttribute('disabled');
      enterBtns[1].setAttribute('disabled', '');
      break;
    case 1:
      textareas[1].removeAttribute('disabled');
      textareas[0].setAttribute('disabled', '');
      enterBtns[1].removeAttribute('disabled');
      enterBtns[0].setAttribute('disabled', '');
      break;
  }
}


const RecordScreen = () => {

  useEffect(() => {

    messages = document.querySelector('#messages')

    enterBtns = [document.querySelector('#enter-A'), document.querySelector('#enter-B')]
    nameInputs = [document.querySelector('#name-A'), document.querySelector('#name-B')]
    textareas = [document.querySelector('#textarea-A'), document.querySelector('#textarea-B')]

    const handleBtn = (event) => {
      event.preventDefault();

      if (event.keyCode === 9) {
        console.log('Tab');
        if (indexNow === 0) SetInputIndex(1); else SetInputIndex(0);
      } else if (event.keyCode === 13) {
        console.log('Enter');
        ContentEnter();
      }
    };
    window.addEventListener('keyup', handleBtn);

    return () => {
      window.removeEventListener('keyup', handleBtn);
    };
  }, []);

  return (
    <div>
      <header>
        <h1>對話紀錄器 v1.0</h1>
        <p>Tab 切換輸入框、Enter 傳送</p>
      </header>

      {/* <!-- 顯示已記錄對話 --> */}
      <div id="show-record-div">
        <ul id="messages"></ul>
      </div>

      {/* <!-- 切割線 --> */}
      <hr />

      {/* <!-- 輸入欄位 --> */}
      <div id="input-section">
        <div className="input-div" id="input-div-A" onClick={() => SetInputIndex(0)}>
          <div className="name-div">
            <h3>對話者：</h3>
            <input type="text" className="name-input" id="name-A" defaultValue="A" />
          </div>
          <textarea id="textarea-A" rows="6" cols="40" placeholder="請輸入內容..."></textarea>
          <button type="button" id="enter-A" onClick={ContentEnter}>Enter</button>
        </div>
        <div className="input-div" id="input-div-B" onClick={() => SetInputIndex(1)}>
          <div className="name-div">
            <h3>對話者：</h3>
            <input type="text" className="name-input" id="name-B" defaultValue="B" />
          </div>
          <textarea id="textarea-B" rows="6" cols="40" placeholder="請輸入內容..."></textarea>
          <button type="button" id="enter-B" onClick={ContentEnter} >Enter</button>
        </div>
      </div>

      <script src="./renderer.js"></script>
    </div>
  );
}

export default RecordScreen;