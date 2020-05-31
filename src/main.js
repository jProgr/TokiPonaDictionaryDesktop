const { app, BrowserWindow, screen, shell } = require('electron');
// const { UserSettings, Settings} = require('./user_settings/user_settings');
const debounce = require('./utils/debounce');
require('./app_menu.js');
import * as path from 'path';

const isMac = process.platform === 'darwin';

function createWindow() {
  // let userSettings = UserSettings.getInstance();
  // const width = userSettings.get(Settings.MAIN_WINDOW_WIDTH, 600);
  // const height = userSettings.get(Settings.MAIN_WINDOW_HEIGHT, 800);

  let win = new BrowserWindow({
    width: 600,
    height: 800,
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

  // win.on('resize', () => debounce(() => {
  //   console.log('size: ');
  //   console.log(win.getSize());
  // }), 1000);

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
