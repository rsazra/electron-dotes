const fs = require('fs');
const path = require('path');
const store = require('conf');
const config = new store();

const journal = config.get('journal')[0];
const years = (fs.readdirSync(journal)).filter((dirname) => {return !isNaN(dirname);});
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const viewer = document.getElementById("viewer");
const yearselect = document.getElementById("year-picker");
const monthselect = document.getElementById("month-picker");
const dayselect = document.getElementById("day-picker");
const firstbtn = document.getElementById("first");
const prevbtn = document.getElementById("previous");
const nextbtn = document.getElementById("next");
const latestbtn = document.getElementById("latest");

let curyearindex = (years.length - 1);
let curmonthindex = -1;
let curmonths = [];
let curdays = [];
let curdayindex = "";
years.forEach((year) => {
    var option = document.createElement("option");
    option.text = year;
    option.value = year;
    yearselect.add(option);
});

function makeOptions(element, type, toAdd) {
    let options = "";
    toAdd.forEach((option) => {
        if (type == "month") {
            options += `<option value="${option}">${option}</option>`;
        }
        else if (type == "day") {
            options += `<option value="${option.slice(-2)}">${option.slice(-2)}</option>`;
        }
    });
    options += `<option></option>`;
    element.innerHTML = options;
    element.value = "";
}

function setMonths(year) {
    let yearfolder = path.join(journal, year);
    curmonths = [];
    fs.readdirSync(yearfolder).filter((dirname) => {
        if (months.indexOf(dirname) > -1) {
            curmonths.push(months.indexOf(dirname));
            return true;
        }
        return false;
    });
    curmonths.sort((first, second) => {
        return (first - second);
    });
}

function setDays(year, month) {
    let monthfolder = path.join(journal, year, month);
    curdays = fs.readdirSync(monthfolder).filter((filename) => {return !filename.startsWith(".");}).map((value) => {return value.slice(-2);});
}

function updateMonths() {
    curyearindex = years.indexOf(yearselect.value);
    monthselect.innerHTML = "";
    dayselect.innerHTML = "";

    setMonths(years[curyearindex]);
    makeOptions(monthselect, "month", curmonths.map((value) => {return months[value];}));
}

function updateDays() {
    if (monthselect.value == "") {
        return;
    }
    curmonthindex = curmonths.indexOf(months.indexOf(monthselect.value));
    dayselect.innerHTML = "";

    // ASSUMES LAST ENTRY IS LATEST DAY
    setDays(years[curyearindex], months[curmonths[curmonthindex]]);
    makeOptions(dayselect, "day", curdays);
}

function updateFile() {
    if (dayselect.value == "") {
        return;
    }
    curdayindex = curdays.indexOf(dayselect.value)
    let curfile = path.join(journal, years[curyearindex], months[curmonths[curmonthindex]],
                    `${years[curyearindex]}-${String(curmonths[curmonthindex] + 1).padStart(2,'0')}-${curdays[curdayindex]}`);
    viewer.value = fs.readFileSync(curfile, { encoding: "utf8" });
    document.title = curfile.slice(-10);
}

function latestentry() {
    yearselect.value = years[years.length - 1];
    updateMonths();
    monthselect.value = months[curmonths[curmonths.length - 1]];
    updateDays();
    dayselect.value = curdays[curdays.length - 1].slice(-2);
    updateFile();
}

function firstentry() {
    yearselect.value = years[0];
    updateMonths();
    monthselect.value = months[curmonths[0]];
    updateDays();
    dayselect.value = curdays[0].slice(-2);
    updateFile();
}

function preventry() {
    if (curdayindex != 0) {
        dayselect.value = curdays[curdayindex - 1];
        updateFile();
    }
    else if (curmonthindex != 0) {
        monthselect.value = months[curmonths[curmonthindex - 1]];
        updateDays();
        dayselect.value = curdays[curdays.length - 1];
        updateFile();
    }
    else if (curyearindex != 0) {
        yearselect.value = years[curyearindex - 1];
        updateMonths();
        monthselect.value = months[curmonths[curmonths.length - 1]];
        updateDays();
        dayselect.value = curdays[curdays.length - 1];
        updateFile();
    }
}

function nextentry() {
    if (curdayindex < (curdays.length - 1)) {
        dayselect.value = curdays[curdayindex + 1];
        updateFile();
    }
    else if (curmonthindex < (curmonths.length - 1)) {
        monthselect.value = months[curmonths[curmonthindex + 1]];
        updateDays();
        dayselect.value = curdays[0];
        updateFile();
    }
    else if (curyearindex < (years.length - 1)) {
        yearselect.value = years[curyearindex + 1];
        updateMonths();
        monthselect.value = months[curmonths[0]];
        updateDays();
        dayselect.value = curdays[0];
        updateFile();
    }
}


yearselect.value = years[curyearindex];
updateMonths();
monthselect.value = months[curmonths[curmonths.length - 1]];
updateDays();
dayselect.value = curdays[curdays.length - 1].slice(-2);
updateFile();


yearselect.oninput = updateMonths;
monthselect.oninput = updateDays;
dayselect.oninput = updateFile;

latestbtn.onclick = latestentry;
firstbtn.onclick = firstentry;
prevbtn.onclick = preventry;
nextbtn.onclick = nextentry;

document.addEventListener('keydown', (e) => {
    if (e.key == "ArrowRight") {
        if (e.shiftKey) {
            latestentry();
        }
        else {
            nextentry();
        }
    }
    else if (e.key == "ArrowLeft") {
        if (e.shiftKey) {
            firstentry();
        }
        else {
            preventry();
        }
    }
});