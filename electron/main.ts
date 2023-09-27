import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import * as fs from "fs";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.on("saveChatLog", (sender, data) =>{
  console.log(data)
  const sData = JSON.stringify(data)
  fs.writeFileSync("data.json", sData)
  console.log("Data saved")
})

ipcMain.on("loadFile", (event) => {
  const filePath = path.join(__dirname, "../data.json"); // replace with your file path
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error("An error occurred reading the file:", err);
      return;
    }
    event.sender.send("fileData", data);
  });
});

ipcMain.on("loadFilenames", (event, directoryPath) => {
  //const directoryPath = path.join(__dirname, "../"); // replace with your directory path
  fs.readdir(directoryPath, (err, filenames) => {
    if (err) {
      console.error("An error occurred reading the directory:", err);
      return;
    }
    console.log(filenames)
    event.sender.send("filenamesData", filenames);
  });
});

app.whenReady().then(createWindow)
