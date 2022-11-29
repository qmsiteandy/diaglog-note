const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    'bridgeAPI',
    {
        ABC: () => {
            console.log('1234');
        },
    }
)

// ipcRenderer.on('preload:set-count', (event, newCount) => {
//     console.log("preload:set-count")
//     document.getElementById('count').innerHTML = newCount
// })