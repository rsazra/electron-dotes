let d = new Date();
let file = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
let dString = d.toDateString();
let head = `${file}\n${dString}\n${d}`

document.getElementById("fulltext").innerHTML = head;

