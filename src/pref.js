const store = require('conf');
const { ipcMain, ipcRenderer } = require('electron');

const html = document.documentElement;
const themepicker = document.getElementById("theme-picker");
const sizeslider = document.getElementById("font-size");
const savelocation = document.getElementById("save-location");

const config = new store();
themepicker.value = config.get('theme');
sizeslider.setAttribute("value", config.get('textsize'));

themepicker.oninput = e => {
    config.set('theme', themepicker.value);
    ipcRenderer.send('theme-update', themepicker.value);
}

sizeslider.oninput = e => {
    config.set('textsize', sizeslider.value);
    ipcRenderer.send('text-update', sizeslider.value);
}

savelocation.onclick = e => {
    const newpath = ipcRenderer.sendSync('new-path');
    if (newpath != undefined) {
        config.set('journal', newpath);
    }
    console.log(newpath);
};