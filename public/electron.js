import { join } from 'path';
import isDev from 'electron-is-dev';
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

let mainWindow;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function handleFileOpen () {
  const { canceled, filePaths } = await dialog.showOpenDialog();
  if (!canceled) {
    return filePaths[0]
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, 'preload.ts')
    }
  });

  const startURL = isDev
    ? 'http://localhost:3000'
    : `file://${join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startURL);

  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    ipcMain.handle('dialog:openFile', handleFileOpen);
    createWindow();
  };
});
