const fs = require('fs');
const os = require('os');

var newLine = '\r\n';
var fields = ['名稱', '時間', '內容'];


// appendDataToFile(os.homedir() + '/Desktop/file.csv', '1,2,3')
//     .catch(err => {
//         // console.log(err)
//         if (err.stack.includes('EBUSY')) {
//             alert('請確認 CSV 檔關閉，否則影響資料儲存');
//         }
//     })

async function appendDataToFile(path, data) {

    // console.log(path)
    fs.stat(path, function (err, stat) {
        if (err != null) {

            // 建立 file + fields + 新row
            console.log('New file, just writing headers');

            fs.writeFile(path, '\ufeff' + fields + newLine + data + newLine, 'utf-8', (err2) => {
                // if (err2) throw err2;
            });
        }
    });

    console.log('append file')
    await fs.promises.appendFile(path, '\ufeff' + data + newLine, 'utf-8');
}

module.exports = { appendDataToFile }
