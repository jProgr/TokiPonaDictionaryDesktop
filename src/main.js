const { app, BrowserWindow, screen, shell } = require('electron');
const { UserSettings } = require('./user_settings/user_settings');
const debounce = require('./utils/debounce');
require('./app_menu.js');
const path = require('path');

const isMac = process.platform === 'darwin';

function createWindow() {
  let userSettings = UserSettings.getInstance();

  let win = new BrowserWindow({
    width: userSettings.get('mainWindowWidth'),
    height: userSettings.get('mainWindowHeight'),
    x: userSettings.get('mainWindowX'),
    y: userSettings.get('mainWindowY'),
    webPreferences: {
      devTools: false,
    },
  });

  // Make links with target="_blank" open in
  // default browser
  win.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Save position and size of window
  const saveWindowSizeAndPositionSettings = debounce(function () {
    userSettings.set('mainWindowHeight', win.getSize()[0]);
    userSettings.set('mainWindowHeight', win.getSize()[1]);
    userSettings.set('mainWindowX', win.getPosition()[0]);
    userSettings.set('mainWindowY', win.getPosition()[1]);
  }, 3000);
  win.on('resize', saveWindowSizeAndPositionSettings);
  win.on('moved', saveWindowSizeAndPositionSettings);

  win.loadFile(path.join(__dirname, '../src/TokiPonaDictionary/index.html'));
}

// Quit when all windows are closed.
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
