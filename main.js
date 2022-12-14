const electron = require('electron')
const {
    app,
    BrowserWindow,
    Tray,
    Menu,
} = require('electron')

const path = require('path')
const url = require('url')
const ChildProcess = require('child_process')

// 程式碼更新後自動reload
require('electron-reload')(path.join(__dirname, '/src'));

let win

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 600,
        height: 800,
        maximizable: false,
        webPreferences: {
            preload: path.join(__dirname, '/src/preload.js'),
            sandbox: false,
        },
    })

    // 持續顯示在最上層
    // win.setAlwaysOnTop(true)

    // Open DevTools.
    win.webContents.openDevTools()

    win.loadURL(url.format({
        pathname: path.join(__dirname, '/src/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // When Window Close.
    win.on('closed', () => {
        win = null
    })

    // // When Window Minimize
    // win.on('minimize', () => {
    //     win.hide()
    // })

    // win.on('restore', () => {
    //     console.log('restore')
    // })

    // Create Tray
    // createTray()
}

// function createTray() {
//     let appIcon = null
//     const iconPath = path.join(__dirname, 'clock.ico')

//     const contextMenu = Menu.buildFromTemplate([{
//         label: 'Diaglog-Note',
//         click() {
//             win.show()
//         }
//     },
//     {
//         label: 'Quit',
//         click() {
//             win.removeAllListeners('close')
//             win.close()
//         }
//     }
//     ]);

//     appIcon = new Tray(iconPath)
//     appIcon.setToolTip('Diaglog-Note')
//     appIcon.setContextMenu(contextMenu)

// }
