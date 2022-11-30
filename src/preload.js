const { contextBridge } = require('electron');
const { WriteCSV } = require('./functions/csvHandler');

WriteCSV('123,456,789');

contextBridge.exposeInMainWorld(
    'csvAPI',
    {
        // CreateCSV: () => {
        //     const db = new sqlite('./mytest.db');
        //     const sql = 'SELECT * FROM test';
        //     let stmt = db.prepare(sel);
        //     let res = stmt.all();
        //     console.log(res);
        // },
        // WriteCSV: WriteCSV()
    }
)

// ipcRenderer.on('preload:set-count', (event, newCount) => {
//     console.log("preload:set-count")
//     document.getElementById('count').innerHTML = newCount
// })