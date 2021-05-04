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

document.querySelector(':root').style.setProperty('--text-size', config.get('textsize'));
sizeslider.setAttribute("value", config.get('textsize'));

sizeslider.oninput = e => {
    config.set('textsize', `${sizeslider.value}em`);
    ipcRenderer.send('text-update', `${sizeslider.value}em`);
    // how do we then make the font sizes everywhere change
}

savelocation.onclick = e => {
    const newpath = ipcRenderer.sendSync('new-path');
    if (newpath != undefined) {
        config.set('journal', newpath);
    }
    console.log(newpath);
};