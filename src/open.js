let d = new Date();
let file = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
let time = `${d.getHours()}:${d.getMinutes()}:${String(d.getSeconds()).padStart(2,'0')}`
let head = `${file}\n${d.toDateString()}\n${d}\n${time} -- `


let text = document.getElementById("fulltext");
text.innerHTML = head;
text.focus();
text.selectionStart = text.value.length;