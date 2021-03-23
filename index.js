// Your code here


const createEmployeeRecord = function(arrayData) {
    return {
        firstName: arrayData[0],
        familyName: arrayData[1],
        title: arrayData[2],
        payPerHour: arrayData[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function(employeeArrayData) {
    return employeeArrayData.map(function(arrayData) {
        return createEmployeeRecord(arrayData);
    });
}

const createTimeInEvent = function(employeeRecord, timeStamp) {
    let [date, hour] = timeStamp.split(' ');

    employeeRecord.timeInEvents.push({
        type: 'TimeIn',
        date,
        hour: parseInt(hour, 10),
    });

    return employeeRecord;
}

const createTimeOutEvent = function(employeeRecord, timeStamp) {
    let [date, hour] = timeStamp.split(' ');

    employeeRecord.timeOutEvents.push({
        type: 'TimeOut',
        date,
        hour: parseInt(hour, 10),
    });

    return employeeRecord;
}

const hoursWorkedOnDate = function(employeeRecord, workedDate) {
    let timeInEvent = employeeRecord.timeInEvents.find(function(event) {
        return event.date === workedDate;
    });

    let timeOutEvent = employeeRecord.timeOutEvents.find(function(event) {
        return event.date === workedDate;
    });

    return (timeOutEvent.hour - timeInEvent.hour) / 100;

}

const wagesEarnedOnDate = function(employeeRecord, dateWorked) {
    let wageEarned = hoursWorkedOnDate(employeeRecord, dateWorked) * employeeRecord.payPerHour;

    return parseFloat(wageEarned.toString());
}

const allWagesFor = function(employeeRecord) {
    let workedDates = employeeRecord.timeInEvents.map(function(event) {
        return event.date;
    });

    let pay = workedDates.reduce(function(n, d) {
        return n + wagesEarnedOnDate(employeeRecord, d)
    }, 0);

    return pay;
}

const calculatePayroll = function(employeeArrayData) {
    return employeeArrayData.reduce(function(n, record) {
        return n + allWagesFor(record);
    }, 0);
}

const findEmployeeByFirstName = function(employeeRecordArray, firstName) {
    return employeeRecordArray.find(function(record) {
        return record.firstName === firstName;
    })
}
