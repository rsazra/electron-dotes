let html = document.documentElement;

const sun = document.getElementById("sun");
const text = document.getElementById("content");

sun.addEventListener('click', (e) => {
    if (localStorage.getItem('theme') === 'light') {
        html.setAttribute('theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {
        html.setAttribute('theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

text.onkeypress = e => {
    if (!document.title.endsWith("*")) {
        document.title += "*";
    }
}