const fs = require('fs');
const path = require('path');

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const d = new Date();
const today = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
const text = document.getElementById("fulltext");
const journal = '/Users/rajbirsinghazra/Documents/journal';
const month = path.join(journal, String(d.getFullYear()), months[d.getMonth()]);
const file = path.join(month, today);

fs.mkdirSync(month, { recursive: true });
try {
    fs.accessSync(file);
    console.log("in try");
}
catch (err) { // just assumes that the error is because file doesn't exist
    const head = `${today}\n${d.toDateString()}`;
    fs.writeFileSync(file, head);
    console.log("caught");
}
console.log("continued");

const time = `${d.getHours()}:${d.getMinutes()}:${String(d.getSeconds()).padStart(2,'0')}`
// text.innerHTML = head;


text.focus();
text.selectionStart = text.value.length;