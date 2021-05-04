const html = document.documentElement;

const sun = document.getElementById("sun");
const text = document.getElementById("content");
const root = document.querySelector(':root');

const store = require('conf');
const config = new store();
html.setAttribute('theme', config.get('theme'));
root.style.setProperty('--text-size', config.get('textsize'));
console.log(getComputedStyle(document.querySelector(':root')).getPropertyValue('--text-size'));

sun.addEventListener('click', (e) => {
    console.log("clicked");
});

text.onkeypress = e => {
    if (!document.title.endsWith("*")) {
        document.title += "*";
    }
}