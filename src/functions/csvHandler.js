const fs = require('fs');
const os = require('os');
const moment = require('moment');

var newLine = '\r\n';
var fields = ['名稱', '時間', '內容'];

async function createFile() {

    let path = './data/'
    let fileName = 'record-' + moment().format("YYYYMMDD-hhmm") + '.csv';

    fs.writeFile(path + fileName, '\ufeff' + fields + newLine, 'utf-8', (err) => {
        if (err) throw err;
    });

    return path + fileName;
}

async function appendDataToFile(path, data) {
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

module.exports = { createFile, appendDataToFile }
