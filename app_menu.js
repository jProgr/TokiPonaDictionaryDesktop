const { app, Menu, shell } = require('electron');

app.setAboutPanelOptions({
  applicationName: app.name,
  applicationVersion: process.env.npm_package_version,
  copyright: "This is free and unencumbered software released into the public domain.",
  version: process.env.npm_package_version,
  authors: process.env.npm_package_author,
  website: "https://github.com/jProgr/TokiPonaDictionaryDesktop",
});

const appMainMenu = {
  label: app.name,
  submenu: [
    { role: 'about' },
    { type: 'separator' },
    { role: 'services' },
    { type: 'separator' },
    { role: 'hide' },
    { role: 'hideothers' },
    { role: 'unhide' },
    { type: 'separator' },
    { role: 'quit' }
  ]
};

const editMenu = {
  label: 'Edit',
  submenu: [
    { role: 'cut' },
    { role: 'copy' },
    { role: 'paste' },
    { type: 'separator' },
    { role: 'selectAll' },
  ]
};

const viewMenu = {
  label: 'View',
  submenu: [
    { role: 'resetzoom' },
    { role: 'zoomin' },
    { role: 'zoomout' },
    { type: 'separator' },
    { role: 'togglefullscreen' }
  ]
};

const windowMenu = {
  label: 'Window',
  submenu: [
    { role: 'minimize' },
    { role: 'zoom' },
    { type: 'separator' },
    { role: 'front' },
    { type: 'separator' },
    { role: 'close' },
  ]
};

const helpMenu = {
  role: 'help',
  submenu: [
    {
      label: 'Learn More',
      click: async () => { await shell.openExternal('https://github.com/jProgr/TokiPonaDictionaryDesktop'); },
    },
  ]
};

const appMenu = Menu.buildFromTemplate([
  appMainMenu,
  editMenu,
  viewMenu,
  windowMenu,
  helpMenu,
]);
Menu.setApplicationMenu(appMenu);
