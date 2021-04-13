
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
    let nextMonth = new Date(date.getFullYear(), date.getMonth() + 1);
    try {
        let numofdays = Math.ceil(milliToDays(nextMonth - date));
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
        monthcalendar[date.getDate()] = {dayofweek: date.getDay(), fulldate: date.toLocaleDateString()}
        date.setDate(date.getDate()+1);
    }
    return monthcalendar;
}


    try {
   
    } catch (e) {
        console.error(e);
    }
 