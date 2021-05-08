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

let curyear = years[years.length - 1];
let curmonth = "";
let curfile = "";
years.forEach((year) => {
    var option = document.createElement("option");
    option.text = year;
    option.value = year;
    yearselect.add(option);
});
yearselect.value = curyear;

function updateMonths() {
    let newyear = yearselect.value;
    monthselect.innerHTML = "";
    dayselect.innerHTML = "";

    // ASSUMES LAST ENTRY IN ARRAY IS LATEST YEAR
    let yearfolder = path.join(journal, newyear);
    let monthindices = [];
    let curmonths = fs.readdirSync(yearfolder).filter((dirname) => {
        if (months.indexOf(dirname) > -1) {
            monthindices.push(months.indexOf(dirname));
            return true;
        }
        return false;
    });
    curmonth = months[Math.max.apply({}, monthindices)];

    curmonths.forEach((month) => {
        var option = document.createElement("option");
        option.text = month;
        option.value = month;
        monthselect.add(option);
    });
    var option = document.createElement("option");
    option.text = "";
    monthselect.add(option);
    monthselect.value = "";

    curyear = newyear;
};

function updateDays() {
    let newmonth = monthselect.value;
    if (newmonth == "") {
        newmonth = curmonth;
    }
    dayselect.innerHTML = "";

    let monthfolder = path.join(journal, curyear, newmonth);
    let curdays = fs.readdirSync(monthfolder).filter((filename) => {return !filename.startsWith(".");});
    // ASSUMES LAST ENTRY IS LATEST DAY
    curfile = path.join(monthfolder, curdays[curdays.length - 1]);

    curdays.forEach((day) => {
        var option = document.createElement("option");
        option.text = day.slice(-2);
        option.value = day.slice(-2);
        dayselect.add(option);
    });
    var option = document.createElement("option");
    option.text = "";
    dayselect.add(option);
    dayselect.value = "";

    curmonth = newmonth;
};

function updateFile() {
    let newday = `${curyear}-${String(months.indexOf(curmonth) + 1).padStart(2, '0')}-${dayselect.value}`;
    if (newday == `${curyear}-${curmonth}-`) {
        return;
    }
    newfile = path.join(journal, curyear, curmonth, newday);
    viewer.value = fs.readFileSync(newfile, { encoding: "utf8" });
    document.title = newday;

}

updateMonths();
monthselect.value = curmonth;
updateDays();
dayselect.value = curfile.slice(-2);
updateFile();

yearselect.oninput = updateMonths;
monthselect.oninput = updateDays;
dayselect.oninput = updateFile;