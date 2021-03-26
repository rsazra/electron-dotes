const fs = require('fs');
const path = require('path');

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const text = document.getElementById("content");

const d = new Date();
const time = `${d.getHours()}:${d.getMinutes()}:${String(d.getSeconds()).padStart(2,'0')}`
const today = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

const journal = '/Users/rajbirsinghazra/Documents/journal';
const month = path.join(journal, String(d.getFullYear()), months[d.getMonth()]);
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

text.focus();
text.selectionStart = text.value.length;