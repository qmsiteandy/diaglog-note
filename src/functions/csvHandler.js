const fs = require('fs');
const os = require('os');

var newLine = '\r\n';
var fields = ['名稱', '時間', '內容'];

function WriteCSV(newData) {
    fs.stat(os.homedir() + '/Desktop/file.csv', function (err, stat) {
        if (err == null) {

            // 記錄新row
            console.log('File exists');

            fs.appendFile(os.homedir() + '/Desktop/file.csv', '\ufeff' + newData + newLine, 'utf-8', function (err2) {
                if (err2) {
                    if (err2.toString().includes('EBUSY')) { alert('請確認 CSV 檔關閉，否則影響資料儲存'); }
                    throw err2;
                }
                // console.log('The "data to append" was appended to file!');
            });
        } else {

            // 建立 file + fields + 新row
            console.log('New file, just writing headers');

            fs.writeFile(os.homedir() + '/Desktop/file.csv', '\ufeff' + fields + newLine + newData + newLine, 'utf-8', function (err2) {
                if (err2) throw err2;
                // console.log('file saved');
            });
        }
    });
}

module.exports = { WriteCSV }
