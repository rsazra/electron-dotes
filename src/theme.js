const { ipcMain, ipcRenderer } = require('electron');
const html = document.documentElement;
const root = document.querySelector(':root');

ipcRenderer.on('theme-update', (event, arg) => {
    html.setAttribute('theme', arg);
});

ipcRenderer.on('text-update', (event, arg) => {
    root.style.setProperty('--text-size', `${arg}em`);
});