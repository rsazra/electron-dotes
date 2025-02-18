const fs = require('fs');
const path = require('path');
const { ipcMain, ipcRenderer } = require('electron');
const store = require('conf');

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const text = document.getElementById("editor");

const d = new Date();
const time = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`
const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;

const config = new store();
if (!config.has('journal')) {
    config.set('journal', ipcRenderer.sendSync('define-path'));
}
const journal = config.get('journal');

if (config.get('theme') == undefined) {
    config.set('theme', 'light');
}
if (config.get('textsize') == undefined) {
    config.set('textsize', '1em');
}

const month = path.join(journal[0], String(d.getFullYear()), months[d.getMonth()]);
const file = path.join(month, today);

let existed = true;
fs.mkdirSync(month, { recursive: true });
try {
    fs.accessSync(file);
}
catch (err) { // just assumes that the error is because file doesn't exist
    existed = false;
}

if (!existed) {
    fs.writeFileSync(file, `${today}\n${d.toDateString()}`);
}
fs.appendFileSync(file, `\n\n${time} -- `);
text.value = fs.readFileSync(file, { encoding: "utf8" });
document.title = today;

text.focus();
text.selectionStart = text.value.length;

ipcRenderer.on('save', (event, arg) => {
    fs.writeFileSync(file, text.value);
    if (document.title.endsWith("*")) {
        document.title = document.title.slice(0,-1);
    }
});