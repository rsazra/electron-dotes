const fs = require('fs');
const path = require('path');
const store = require('conf');
const config = new store();

const journal = config.get('journal')[0];
const years = (fs.readdirSync(journal)).filter((dirname) => {return !isNaN(dirname);});
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const viewer = document.getElementById("viewer");

if (years.length == 0) {

}
// ASSUMES LAST ENTRY IN ARRAY IS LATEST YEAR
let curyear = years[years.length - 1];
let startingfile = path.join(journal, curyear);
let monthindices = [];
let curmonths = fs.readdirSync(startingfile).filter((dirname) => {
    if (months.indexOf(dirname) > -1) {
        monthindices.push(months.indexOf(dirname));
        return true;
    }
    return false;
});
if (curmonths.length == 0) {

}
let curmonth = months[Math.max.apply({}, monthindices)];
startingfile = path.join(startingfile, curmonth);
let curdays = fs.readdirSync(startingfile).filter((filename) => {return !filename.startsWith(".");});
// ASSUMES LAST ENTRY IS LATEST DAY
startingfile = path.join(startingfile, curdays[curdays.length - 1]);
viewer.value = fs.readFileSync(startingfile, { encoding: "utf8" });


console.log(startingfile);
console.log(curdays);
document.title = "viewer";