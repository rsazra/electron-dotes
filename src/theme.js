const { ipcMain, ipcRenderer } = require('electron');
const html = document.documentElement;
const root = document.querySelector(':root');

const store = require('conf');
const config = new store();
html.setAttribute('theme', config.get('theme'));
root.style.setProperty('--text-size', `${config.get('textsize')}em`);

ipcRenderer.on('theme-update', (event, arg) => {
    html.setAttribute('theme', arg);
});

ipcRenderer.on('text-update', (event, arg) => {
    root.style.setProperty('--text-size', `${arg}em`);
});