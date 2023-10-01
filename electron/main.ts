import {app, BrowserWindow, ipcMain} from 'electron';
import path from 'node:path';
import * as fs from 'fs';

const DIST = path.join(__dirname, '../dist');
const VITE_PUBLIC = app.isPackaged ? DIST : path.join(DIST, '../public');

let win: BrowserWindow | null;
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

function createWindow() {
    win = new BrowserWindow({
        icon: path.join(VITE_PUBLIC, 'electron-vite.svg'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', (new Date).toLocaleString());
    });

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL);
    } else {
        win.loadFile(path.join(DIST, 'index.html'));
    }
}

// IPC Listeners for File Operations
ipcMain.on('saveChatLog', (event, data, saveFilePath) => {
    fs.writeFile(saveFilePath, JSON.stringify(data), err => {
        if (err) {
            console.error('An error occurred writing the file:', err);
            event.sender.send('error', 'An error occurred saving the chat log.');
        } else {
            console.log('Data saved');
        }
    });
});

ipcMain.on('loadConfigFile', (event, loadFilePath) => {
    fs.readFile(loadFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('An error occurred reading the file:', err);
            event.sender.send('error', 'An error occurred loading the config file.');
        } else {
            event.sender.send('configData', data);
        }
    });
});

ipcMain.on('saveWorkingFile', (event, data, saveFilePath) => {
    fs.writeFile(saveFilePath, (data), err => {
        if (err) {
            console.error('An error occurred writing the file:', err);
            event.sender.send('error', 'An error occurred saving the working file.');
        } else {
            event.sender.send('saveWorkingFileSuccess', {message: 'File saved successfully'});
        }
    });
});

ipcMain.on('loadWorkingFile', (event, loadFilePath) => {
    console.log(loadFilePath)

    fs.readFile(loadFilePath, 'utf-8', (err, data) => {

        if (err) {
            console.error('An error occurred reading the file:', err);
            event.sender.send('error', 'An error occurred loading the working file.');
        } else {
            event.sender.send('workingFile', data);
        }
    });
});

ipcMain.on('loadFilenames', (event, loadDirectoryPath) => {
        fs.readdir(loadDirectoryPath, (err, filenames) => {
            if (err) {
                console.error('An error occurred reading the directory:', err);
                event.sender.send('error', 'An error occurred loading the filenames.');
            } else {
                event.sender.send('filenamesData', filenames);
            }
        });
    }
)

ipcMain.on('get-platform', (event) => {
    event.sender.send('send-platform', process.platform);
});

// Application Lifecycle
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
        win = null;
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

//Debug
console.log(ipcMain.listenerCount('filenamesData'));
console.log(ipcMain.listeners('filenamesData'));

app.whenReady().then(createWindow);