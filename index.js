// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }  
}

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord) //creates two records, correctly assigns the first names, creates more than 2 records
}

function createTimeInEvent(obj, dateStamp) {
    const newTimeInEvent = {type: "TimeIn", hour: parseInt(dateStamp.slice(-4)), date: dateStamp.slice(0, 10)} //creates the correct type, hour, and date

    obj.timeInEvents.push(newTimeInEvent)
    return obj
}

function createTimeOutEvent(obj, dateStamp) {
    const newTimeOutEvent = {type: "TimeOut", hour: parseInt(dateStamp.slice(-4)), date: dateStamp.slice(0, 10)} //creates the correct type, hour, and date

    obj.timeOutEvents.push(newTimeOutEvent)
    return obj
}

function hoursWorkedOnDate (obj, dateStamp) {
    const timeIn = obj.timeInEvents.find(event => event.date === dateStamp);
    const timeOut = obj.timeOutEvents.find(event => event.date === dateStamp);
    return (timeOut.hour - timeIn.hour)/100;
}

function wagesEarnedOnDate (obj, dateStamp) {
    const timeIn = obj.timeInEvents.find(event => event.date === dateStamp);
    const timeOut = obj.timeOutEvents.find(event => event.date === dateStamp);
    return ((timeOut.hour - timeIn.hour)/100)*obj.payPerHour;
}

function allWagesFor (obj) {
    const allWages = obj.timeInEvents.map(event => wagesEarnedOnDate(obj, event.date));
    return allWages.reduce((total, wage) => total + wage);
}

function calculatePayroll (array) {
    const totalForEachEmployee = array.map(obj => allWagesFor(obj))
    return totalForEachEmployee.reduce((total, empTotal) => total + empTotal)
}

function findEmployeeByFirstName (srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
}

