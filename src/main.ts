import {app, BrowserWindow} from 'electron';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

let mainWindow: Electron.BrowserWindow | undefined;

const getFiles = (dirPath: string): Promise<string[]> => {
	return new Promise((resolve, reject) => {
		fs.readdir(dirPath, (err, files) => {
			if (err) {
				reject(err);
			} else {
				resolve(files);
			}
		});
	});
};

const registerExtension = async (uuid: string) => {
	if (os.platform() === 'win32') {
		const modulePath = os.homedir() + `\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\${uuid}`;
		if (fs.existsSync(modulePath)) {
			const versions = await getFiles(modulePath);
			if (versions.length > 0) {
				const moduleFullPath = modulePath + '\\' + versions[0];
				console.log('addDevToolsExtension', moduleFullPath);
				BrowserWindow.addDevToolsExtension(moduleFullPath);
			}
		}
	}
};

if (process.env.NODE_ENV === 'development') {
	registerExtension('fmkadmapgofadopljbjfkapdkoienihi'); // register react dev tools
	registerExtension('lmhkpmbekcpmknklioeibfkpmmfibljd'); // register redux dev tools
}

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		height: 800,
		width: 1024,
	});

	// and load the index.html of the app.
	if (process.env.NODE_ENV === 'development') {
		mainWindow.loadURL('http://localhost:3000');
	} else {
		mainWindow.loadFile(path.join(__dirname, './index.html'));
	}

	// Open the DevTools.
	if (process.env.NODE_ENV === 'development') {
		mainWindow.webContents.openDevTools();
	}

	// Emitted when the window is closed.
	mainWindow.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = undefined;
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it"s common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
// TODO: https://electronjs.org/docs/tutorial/devtools-extension
