import { app, BrowserWindow, dialog, ipcMain } from "electron";
import path from "node:path";
import * as fs from "fs";

const DIST = path.join(__dirname, "../dist");
const VITE_PUBLIC = app.isPackaged ? DIST : path.join(DIST, "../public");

let win: BrowserWindow | null;
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
	win = new BrowserWindow({
		icon: path.join(VITE_PUBLIC, "electron-vite.svg"),
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});

	win.webContents.on("did-finish-load", () => {
		win?.webContents.send("main-process-message", new Date().toLocaleString());
	});

	if (VITE_DEV_SERVER_URL) {
		win.loadURL(VITE_DEV_SERVER_URL);
	} else {
		win.loadFile(path.join(DIST, "index.html"));
	}
}

// IPC Listeners for File Operations
ipcMain.on("save-chat-log", (event, data, saveFilePath) => {
	fs.writeFile(saveFilePath, JSON.stringify(data), (err) => {
		if (err) {
			console.error("An error occurred writing the file:", err);
			event.sender.send("error", "An error occurred saving the chat log.");
		}
	});
});

ipcMain.on("load-config-file", (event, loadFilePath) => {
	fs.readFile(loadFilePath, "utf-8", (err, data) => {
		if (err) {
			console.error("An error occurred reading the file:", err);
			event.sender.send(
				"config-error",
				"An error occurred loading the config file. Config was reset to default.",
			);
		} else {
			event.sender.send("config-data", data);
		}
	});
});

ipcMain.on("save-working-file", (event, data, saveFilePath) => {
	fs.writeFile(saveFilePath, data, (err) => {
		if (err) {
			console.error("An error occurred writing the file:", err);
			event.sender.send("error", "An error occurred saving the working file.");
		} else {
			event.sender.send("save-working-file-success", {
				message: "File saved successfully",
				newFilePath: saveFilePath,
			});
		}
	});
});
ipcMain.on("save-config-file", (event, data, saveFilePath) => {
	fs.writeFile(saveFilePath, JSON.stringify(data), (err) => {
		if (err) {
			console.error("An error occurred writing the config:", err);
			event.sender.send("error", "An error occurred saving the config.");
		} else {
			event.sender.send("save-config-file-success", {
				message: "Config saved successfully",
				newFilePath: saveFilePath,
			});
		}
	});
});

ipcMain.on("load-working-file", (event, loadFilePath) => {
	fs.readFile(loadFilePath, "utf-8", (err, data) => {
		if (err) {
			console.error("An error occurred reading the file:", err);
			event.sender.send("working-file-error", "An error occurred loading the working file.");
		} else {
			event.sender.send("working-file", data);
		}
	});
});

ipcMain.on("load-filenames", (event, loadDirectoryPath) => {
	fs.readdir(loadDirectoryPath, (err, filenames) => {
		if (err) {
			console.error("An error occurred reading the directory:", err);
			event.sender.send(
				"error",
				"An error occurred loading the filenames, cannot access directory.",
			);
		} else {
			event.sender.send("filenames-data", filenames);
		}
	});
});

ipcMain.on("get-platform", (event) => {
	event.sender.send("send-platform", process.platform);
});

// Application Lifecycle
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
		win = null;
	}
});

ipcMain.on("open-directory-picker", (event) => {
	dialog
		.showOpenDialog({
			properties: ["openDirectory"],
		})
		.then((result) => {
			if (!result.canceled && result.filePaths.length > 0) {
				event.sender.send("directory-picked", {
					path: result.filePaths[0],
					message: "Directory set successfully",
				});
			}
		})
		.catch((err) => {
			console.error(err);
		});
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.whenReady().then(createWindow);
