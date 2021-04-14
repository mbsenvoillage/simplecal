import { test } from "./utils";
import './style.css';
console.log(test);
/*
Generate a calendar view for a specific month
    Get the month
    Get the days as number from min 1 to max 31
        Check how many days
        Store the days in an object {fulldate: , date: dayofweek}
    Place the days in the right table cells
        Generate a row
        Generate cells
            If cell has no day of the corresponding month, leave empty or put underscore
            Else append num of the day
        Append cells to row
        Append row to table
        repeat until no days left


howManyDays(Date date)
    is date is Date type
        if not return "Invalid date format!"    
    get month from date
    substract next month from entered month (you get milliseconds)
        get next month
            get year + month from date and create new date
    translate to days and return
*/

const MILL_TO_DAYS_COEF = 1000*60*60*24;

/**
 * 
 * @param {Number} ms 
 * @returns Number days
 * @throws TypeError
 */
function milliToDays(ms) {
    if (typeof ms !== "number") throw new Error(`Type Error: number expected, but got a ${typeof ms} type`);
    if (ms <= 0) throw new Error(`Invalid Input: positive non-null values only, but got ${ms}`);
    return ms / MILL_TO_DAYS_COEF;
}

/**
 * 
 * @param {Date} date
 * @returns Number days
 * @throws TypeError
 */
function howManyDays(date) {
    if (date instanceof Date === false) throw new Error(`Type Error: Date expected, but got a "${typeof date}" type`);
    if (date.valueOf() < 0 ) throw new Error("Invalid Input: dates prior to 01/01/1970 are not accepted");
    let month = date.getMonth();
    let nextMonth = new Date(date.getFullYear(), month + 1);
    try {
        let numofdays = Number(milliToDays(nextMonth - date).toFixed(0));
        return numofdays;
    } catch (e) {
        console.log(e);
    }  
}

/**
 * 
 * @param {Date} date 
 * @returns Object
 * @throws TypeError
 */
function getDaysOfMonth(date) {
    let daysinmonth = howManyDays(date);
    console.log(daysinmonth);
    let monthcalendar = {};
    for (let i = 0; i < daysinmonth; i++) {
        let day = (date.getDay() === 0 ? 6 : date.getDay() - 1);
        monthcalendar[date.getDate()] = {dayofweek: day}
        date.setDate(date.getDate()+1);
    }
    console.log(monthcalendar);
    return monthcalendar;
}

/**
 * 
 * @param {String} name 
 * @returns Object => DOM Element
 */
function makeHtmlEl(name) {
    return document.createElement(name);
}

/**
 * 
 * @param {Object} el 
 * @returns Object => DOM Element
 */
function copy(el) {
    return el.cloneNode(true);
}

/**
 * 
 * @param {Object} el 
 * @param {String} inner 
 * @returns Object => DOM Element
 */
function innerHtml(el, inner) {
    try {
        let cp = copy(el);
        cp.innerHTML = inner;
        return cp;
    } catch (e) {
        console.log(e);
    }
}

/**
 * 
 * @param {Object} parent 
 * @param {Object} child 
 * @returns Object => DOM Element
 */
function append(parent, child) {
    try {
        let parentcopy = copy(parent);
        let childcopy = copy(child);
        parentcopy.appendChild(childcopy);
        return parentcopy;
    } catch (e) {
        console.log(e);
    }
    
}

function howManyRows(numofdays, firstdayofmonth) {
    let numofrows = 5;
    if (numofdays === 28 && firstdayofmonth === 0) numofrows = 4;
    if ((numofdays === 31) && firstdayofmonth === 5) numofrows = 6;
    if ((numofdays === 30 || numofdays === 31) && firstdayofmonth === 6) numofrows = 6;
    console.log(numofrows);
    return numofrows;
}

function generateCalBody(calobject) {
    let tbody = makeHtmlEl("tbody");
    let dayofthemonth = 1;
    let totaldays = Object.keys(calobject).length;
    let rows = howManyRows(totaldays, calobject["1"].dayofweek)
    // create 5 table rows, for the five weeks of the month (at most)
    for (let i = 0; i < rows; i++) {
        let trow = makeHtmlEl("tr");
        for (let j = 0; j < 7; j++) {
            let td = makeHtmlEl("td");
            if(calobject.hasOwnProperty(dayofthemonth) && calobject[dayofthemonth].dayofweek === j && dayofthemonth <= totaldays) {
                td = innerHtml(td, dayofthemonth);
                dayofthemonth++;
            } else {
                td = innerHtml(td, "-");
            }
            trow = append(trow, td);
        }
        tbody = append(tbody, trow);
    }
    return tbody;
}

function renderCal(y, m) {
    let date = new Date(y, m);
    let month = new Intl.DateTimeFormat('en-US', {month: 'long', year: 'numeric'}).format(date);
    let monthcal = getDaysOfMonth(date);
    let s = document.getElementById("month");
    let newtd = makeHtmlEl("td");
    newtd = innerHtml(newtd, month);
    newtd.style.textAlign = 'center';
    newtd.setAttribute("colspan", "7");
    newtd.setAttribute("id", "month");
    s.replaceWith(newtd);
    let tbody = generateCalBody(monthcal);
    tbody.setAttribute("id", "tablebody");
    let t = document.getElementById("tablebody");
    t.replaceWith(tbody);
}

function changemonth(dir, year, month) {
    if (dir === "next") {
        if (month === 11) {
            month = 0, year++;
        } else {
            month++;
        }
    } else {
        if (month === 0) {
            month = 11, year--;
        } else {
            month--;
        }
    }
    return [year, month];
}


    try {
        let date = [2020, 8];
        renderCal(date[0], date[1]);
        let prev = document.getElementById("prev");
        let next = document.getElementById("next");
        prev.addEventListener('click', (e) => {
            let newdate = changemonth("prev", date[0], date[1]);
            date = newdate;
            renderCal(date[0], date[1]);
        })

        next.addEventListener('click', (e) => {
            let newdate = changemonth("next", date[0], date[1]);
            date = newdate;
            renderCal(date[0], date[1]);
        }) 
    } catch (e) {
        console.error(e);
    }
 