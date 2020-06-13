const { app, BrowserWindow } = require('electron');
require('./app_menu');
const createWindow = require('./app_main_window');

const isMac = process.platform === 'darwin';

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with cmd + Q
  if (!isMac) app.quit();
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.whenReady().then(createWindow);
