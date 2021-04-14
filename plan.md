
# Generate a calendar view for a specific month
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
