const { app, BrowserWindow, screen } = require('electron');
require('./app_menu.js');

const isMac = process.platform === 'darwin';

function createWindow() {
  let win = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      devTools: false,
    }
  })

  win.loadFile('TokiPonaDictionary/index.html');
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (!isMac) app.quit();
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.whenReady().then(createWindow);
