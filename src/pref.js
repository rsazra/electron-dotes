const store = require('conf');
const { ipcMain, ipcRenderer } = require('electron');

const html = document.documentElement;
const toggle = document.getElementById("dark-mode-toggle");
const sizeslider = document.getElementById("font-size");
const savelocation = document.getElementById("save-location");

const config = new store();
console.log(config.path);

fontsize = config.get('fontsize');
if (fontsize == undefined) { fontsize = 1; }
sizeslider.setAttribute("value", fontsize);

sizeslider.oninput = e => {
    config.set('fontsize') = this.value;
    // how do we then make the font sizes everywhere change
}

savelocation.onclick = e => {
    const newpath = ipcRenderer.sendSync('new-path');
    if (newpath != undefined) {
        config.set('journal', newpath);
    }
    console.log(newpath);
};