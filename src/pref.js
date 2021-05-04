const store = require('conf');
const { ipcMain, ipcRenderer } = require('electron');

const html = document.documentElement;
const themepicker = document.getElementById("theme-picker");
const sizeslider = document.getElementById("font-size");
const savelocation = document.getElementById("save-location");

const config = new store();
html.setAttribute('theme', config.get('theme'));
themepicker.value = config.get('theme');

themepicker.oninput = e => {
    config.set('theme', themepicker.value);
    ipcRenderer.send('theme-update', themepicker.value);
}

fontsize = config.get('fontsize');
if (fontsize == undefined) { fontsize = 1; }
sizeslider.setAttribute("value", fontsize);

sizeslider.oninput = e => {
    config.set('fontsize') = sizeslider.value;
    ipcRenderer.send('font-update', sizeslider.value);
    // how do we then make the font sizes everywhere change
}

savelocation.onclick = e => {
    const newpath = ipcRenderer.sendSync('new-path');
    if (newpath != undefined) {
        config.set('journal', newpath);
    }
    console.log(newpath);
};