const messages = document.querySelector('#messages')

const enterBtns = [document.querySelector('#enter-A'), document.querySelector('#enter-B')]
const nameInputs = [document.querySelector('#name-A'), document.querySelector('#name-B')]
const textareas = [document.querySelector('#textarea-A'), document.querySelector('#textarea-B')]

// 現在輸入者的Index
let indexNow = 0

// 偵測按下按鍵的行為
document.getElementById('input-section').addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.key === 'Enter') { ContentEnter(); }
    if (e.key === 'Tab') { if (indexNow === 0) SetInputIndex(1); else SetInputIndex(0); }
});
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
    await window.csvAPI.appendDataToFile('./data/file.csv', toCsv)
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
