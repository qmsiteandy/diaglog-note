const fs = require('fs');
const os = require('os');

var newLine = '\r\n';
var fields = ['名稱', '時間', '內容'];


async function appendDataToFile(path, data) {

    console.log(path)
    
    // console.log(path)
    fs.stat(path, function (err, stat) {
        if (err != null) {

            // 建立 file + fields + 新row
            // console.log('New file, just writing headers');

            fs.writeFile(path, '\ufeff' + fields + newLine + data + newLine, 'utf-8', (err2) => {
                // if (err2) throw err2;
            });

            return false;
        }
    });

    // console.log('append');
    await fs.promises.appendFile(path, '\ufeff' + data + newLine, 'utf-8');
    
    return true;
}

module.exports = { appendDataToFile }
