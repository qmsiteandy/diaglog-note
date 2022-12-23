const { app, BrowserWindow } = require('electron')
const path = require('path');
const isDev = require('electron-is-dev')

// 程式碼更新後自動reload
if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '/src')
  });
}

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true,   // 允許在 Render Process 使用 Remote Module
      contextIsolation: true,    // 讓在 preload.js 的定義可以傳遞到 Render Process (React)
    }
  })

  if (isDev) {
    // 開發階段直接與 React 連線
    win.loadURL('http://localhost:3000/');
    // 開啟 DevTools.
    win.webContents.openDevTools()
  } else {
    // 產品階段直接讀取 React 打包好的
    win.loadFile(`${path.join(__dirname, 'index.html')}`);
    win.webContents.openDevTools();
  }
}


app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  app.quit()
})

// app.on('activate', function () {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (BrowserWindow.getAllWindows().length === 0) createWindow()
// })
