const sun = document.getElementById("sun");
const text = document.getElementById("editor");

sun.addEventListener('click', (e) => {
    console.log("clicked");
});

text.onkeypress = e => {
    if (!document.title.endsWith("*")) {
        document.title += "*";
    }
}