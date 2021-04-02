let html = document.documentElement;

let sun = document.getElementById("sun");

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