const { contextBridge } = require('electron');
const { WriteCSV } = require('./functions/csvHandler');

contextBridge.exposeInMainWorld(
    'csvAPI',
    {
        WriteCSV,

        // CreateCSV: () => {
        //     const db = new sqlite('./mytest.db');
        //     const sql = 'SELECT * FROM test';
        //     let stmt = db.prepare(sel);
        //     let res = stmt.all();
        //     console.log(res);
        // },
    }
)

// ipcRenderer.on('preload:set-count', (event, newCount) => {
//     console.log("preload:set-count")
//     document.getElementById('count').innerHTML = newCount
// })