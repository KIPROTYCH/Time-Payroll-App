// The payroll system
describe("The payroll system", function () {
    // Populates a record from an Array
    describe("populates a record from an Array", function () {
        it("has a function called createEmployeeRecord", function () {
            expect(createEmployeeRecord).to.exist
        })

        describe("createEmployeeRecord", function () {
            it("populates a firstName field from the 0th element", function () {
                let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1])
                expect(testEmployee.firstName).to.eq("Gray")
            })

            // ... (other tests for createEmployeeRecord)
        })
    })

    // Process an Array of Arrays into an Array of employee records
    describe("process an Array of Arrays into an Array of employee records", function () {
        it("has a function called createEmployeeRecords", function () {
            expect(createEmployeeRecords).to.exist
        })

        describe("createEmployeeRecords", function () {
            let employeeRecords;

            let twoRows = [
                ["moe", "sizlak", "barkeep", 2],
                ["bartholomew", "simpson", "scamp", 3]
            ]

            it("creates two records", function () {
                let employeeRecords = createEmployeeRecords(twoRows)
                expect(employeeRecords.length).to.equal(2)
            })

            // ... (other tests for createEmployeeRecords)
        })
    })

    // Adds a timeIn event Object to an employee's record of timeInEvents
    describe("it adds a timeIn event Object to an employee's record of timeInEvents when provided an employee record and Date/Time String and returns the updated record", function () {
        it("has a function called createTimeInEvent", function () {
            expect(createTimeInEvent).to.exist
        })

        describe("createTimeInEvent", function () {
            let bpRecord, updatedBpRecord, newEvent

            it("creates the correct type", function () {
                // ... (test cases for createTimeInEvent)
            })

            // ... (other tests for createTimeInEvent)
        })
    })

    // Adds a timeOut event Object to an employee's record of timeOutEvents
    describe("it adds a timeOut event Object to an employee's record of timeOutEvents when provided an employee record and Date/Time String and returns the updated record", function () {
        it("has a function called createTimeOutEvent", function () {
            expect(createTimeOutEvent).to.exist
        })

        describe("createTimeOutEvent", function () {
            let bpRecord, updatedBpRecord, newEvent

            it("creates the correct type", function () {
                // ... (test cases for createTimeOutEvent)
            })

            // ... (other tests for createTimeOutEvent)
        })
    })

    // Calculates hours worked on a specific date
    describe("Given an employee record with a date-matched timeInEvent and timeOutEvent", function () {
        it("hoursWorkedOnDate calculates the hours worked when given an employee record and a date", function () {
            expect(hoursWorkedOnDate).to.exist
        })

        describe("hoursWorkedOnDate", function () {
            it("calculates that the employee worked 2 hours", function () {
                // ... (test case for hoursWorkedOnDate)
            })
        })
    })

    // Calculates wages earned on a specific date
    describe("Given an employee record with a date-matched timeInEvent and timeOutEvent", function () {
        it("wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour", function () {
            expect(wagesEarnedOnDate).to.exist
        })

        describe("wagesEarnedOnDate", function () {
            it("calculates that the employee earned $54", function () {
                // ... (test case for wagesEarnedOnDate)
            })
        })
    })

    // Calculates all wages for an employee
    describe("Using wagesEarnedOnDate, accumulates the value of all dates' wages and returns the amount", function () {
        it("has a function called allWagesFor", function () {
            expect(allWagesFor).to.exist
        })

        describe("allWagesFor", function () {
            it("calculates that the employee earned 378 dollars", function () {
                // ... (test case for allWagesFor)
            })
        })
    })

    // Calculates payroll for all employees
    describe("Using wagesEarnedOnDate, accumulates the value of all dates' wages and returns the amount", function () {
        it("has a function called calculatePayroll", function () {
            expect(calculatePayroll).to.exist
        })

        describe("calculatePayroll", function () {
            it("calculates that the employees earned 770 dollars", function () {
                // ... (test case for calculatePayroll)
            })
        })
    })
})

// The payroll system functions
function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeesArray) {
    return employeesArray.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateTimeString) {
    let [date, hour] = dateTimeString.split(" ");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    });
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTimeString) {
    let [date, hour] = dateTimeString.split(" ");
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    });
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    let timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    let dates = employeeRecord.timeInEvents.map(event => event.date);
    let wages = dates.map(date => wagesEarnedOnDate(employeeRecord, date));
    return wages.reduce((total, wage) => total + wage, 0);
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => total + allWagesFor(record), 0);
}
