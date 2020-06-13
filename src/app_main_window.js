const { app, BrowserWindow, shell } = require('electron');
const { UserSettings } = require('./user_settings/user_settings');
const debounce = require('./utils/debounce');
const path = require('path');

let userSettings = UserSettings.getInstance();

/**
 * Sets up and creates the main window of the app.
 *
 * @return {undefined}
 */
function createWindow() {
  let win = new BrowserWindow({
    width: userSettings.get('mainWindowWidth'),
    height: userSettings.get('mainWindowHeight'),
    x: userSettings.get('mainWindowX'),
    y: userSettings.get('mainWindowY'),
    webPreferences: { devTools: false },
  });

  // Make links with target="_blank" open in
  // default browser
  win.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Save position and size of window
  win.on('resize', debounce(_ => saveWindowSizeAndPositionSettings(win), 3000));
  win.on('moved', debounce(_ => saveWindowSizeAndPositionSettings(win), 3000));

  // Load the app
  win.loadFile(path.join(__dirname, '../src/TokiPonaDictionary/index.html'));
}

function saveWindowSizeAndPositionSettings(win) {
  userSettings.set('mainWindowHeight', win.getSize()[0]);
  userSettings.set('mainWindowHeight', win.getSize()[1]);
  userSettings.set('mainWindowX', win.getPosition()[0]);
  userSettings.set('mainWindowY', win.getPosition()[1]);
}

module.exports = createWindow;
