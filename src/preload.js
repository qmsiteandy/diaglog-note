const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
    'csvAPI',
    {
        CreateCSV: () => {
            alert('1234');
        },
        WriteCSV: () => {

        }
    }
)

// ipcRenderer.on('preload:set-count', (event, newCount) => {
//     console.log("preload:set-count")
//     document.getElementById('count').innerHTML = newCount
// })