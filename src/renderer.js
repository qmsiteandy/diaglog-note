const messages = document.querySelector('#messages')

const enterBtns = [document.querySelector('#enter-A'), document.querySelector('#enter-B')]
const nameInputs = [document.querySelector('#name-A'), document.querySelector('#name-B')]
const textareas = [document.querySelector('#textarea-A'), document.querySelector('#textarea-B')]

// 現在輸入者的Index
let indexNow = 0

// window.csvAPI.WriteCSV();

// 偵測按下按鍵的行為
document.getElementById('input-section').addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.key === 'Enter') { ContentEnter(); }
    if (e.key === 'Tab') { if (indexNow === 0) SetInputIndex(1); else SetInputIndex(0); }
});

function ContentEnter() {

    // 如果未輸入
    if (textareas[indexNow].value === '') return;

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
