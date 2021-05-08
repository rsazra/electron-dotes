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

// ASSUMES LAST ENTRY IN ARRAY IS LATEST YEAR
let curyear = years[years.length - 1];
let yearfolder = path.join(journal, curyear);
let monthindices = [];
let curmonths = fs.readdirSync(yearfolder).filter((dirname) => {
    if (months.indexOf(dirname) > -1) {
        monthindices.push(months.indexOf(dirname));
        return true;
    }
    return false;
});
let curmonth = months[Math.max.apply({}, monthindices)];
let monthfolder = path.join(yearfolder, curmonth);
let curdays = fs.readdirSync(monthfolder).filter((filename) => {return !filename.startsWith(".");});
// ASSUMES LAST ENTRY IS LATEST DAY
let startingfile = path.join(monthfolder, curdays[curdays.length - 1]);
viewer.value = fs.readFileSync(startingfile, { encoding: "utf8" });

years.forEach((year) => {
    var option = document.createElement("option");
    option.text = year;
    option.value = year;
    yearselect.add(option);
});
yearselect.value = curyear;
curmonths.forEach((month) => {
    var option = document.createElement("option");
    option.text = month;
    option.value = month;
    monthselect.add(option);
});
monthselect.value = curmonth;
curdays.forEach((day) => {
    var option = document.createElement("option");
    option.text = day.slice(-2);
    option.value = day.slice(-2);
    dayselect.add(option);
});
dayselect.value = startingfile.slice(-2);




console.log(startingfile);
console.log(curdays);
document.title = "viewer";