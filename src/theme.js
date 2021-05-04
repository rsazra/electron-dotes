const { ipcMain, ipcRenderer } = require('electron');
const html = document.documentElement;

ipcRenderer.on('theme-update', (event, arg) => {
    html.setAttribute('theme', arg);
});

ipcRenderer.on('font-update', (event, arg) => {
    html.setAttribute('theme', arg);
});