const html = document.documentElement;

const sun = document.getElementById("sun");
const text = document.getElementById("content");

const store = require('conf');
const config = new store();
html.setAttribute('theme', config.get('theme'));

sun.addEventListener('click', (e) => {
    console.log("clicked");
});

text.onkeypress = e => {
    if (!document.title.endsWith("*")) {
        document.title += "*";
    }
}