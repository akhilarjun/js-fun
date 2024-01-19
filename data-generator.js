import { genUID } from "./unique-id.js";

class Employee {
    name;
    department;
    reportees = [];
    /**
     * 
     * @param {Employee} reportee 
     */
    addReportee(reportee) {
        this.reportees.push(reportee.id);
        if (reportee.manager !== this.id)
            reportee.setManager(this);
    }
    manager;
    /**
     * @param {Employee} manager
     */
    setManager(manager) {
        this.manager = manager.id;
        if (manager.reportees.indexOf(this.id) === -1)
            manager.addReportee(this);
    }
    id;
    /**
     * @param {string} name 
     */
    constructor(name) {
        this.id = genUID();
        this.name = name;
    }
}

let firstnames = ['Andrew', 'Audrey', 'Basil', 'Billy', 'Brutus', 'Charlie', 'Charles', 'Claire', 'Dennis', 'Donnavan', 'Eola', 'Elizabeth', 'Erik', 'Fiona', 'Fedrick', 'Ian', 'John', 'Kinsey', 'Leo', 'Maddison', 'Neo', 'Nick', 'Nancy', 'Ojas', 'Prince', 'Ron', 'Shawn', 'Sincy', 'Tod', 'Tim', 'Violet', 'Venessa', 'Will', 'Zoya'];
let lastnames = ['Charles', 'Drew', 'Denwar', 'Philips', 'Gold', 'Xavier', 'Gordon', 'Joseph', 'Cox', 'Augustin', 'Jhonson', 'Bonney', 'Lionel', 'Holmes', 'Ashley', 'Kimberly']

function randomNameGenerator() {
    let firstName = firstnames[getRndInteger(0, firstnames.length)];
    let lastName = lastnames[getRndInteger(0, lastnames.length)];
    return firstName + ' ' + lastName;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getEmpName(id, list) {
    let name;
    list.forEach(e => {
        if (e.id === id) {
            name = e.name;
        }
    })
    return name;
}

/**
 * 
 * @param {number} id2 
 * @param {number} id1 
 * @param {Array<Employee>} list 
 * @returns 
 */
function isCircular(id2, id1, list) {
    if (list[id2].manager === list[id1].id)
        return true;
    let hierarchy = [];
    let startidx = 0;
    let processed = 0;
    while (startidx < list.length && processed < list.length) {
        if (list[startidx].manager) {
            hierarchy.push(list[startidx].manager);
            list.forEach((e, listidx) => {
                if (e.id === list[startidx].manager) {
                    startidx = listidx;
                }
            })
        } else
            startidx++;
        processed++;
    }
    console.log(hierarchy)
    return false;
}

function generateData(numOfEmp) {
    let listOfEmployees = [];
    while (numOfEmp-- > 0) {
        const name = randomNameGenerator();
        let emp = new Employee(name);
        listOfEmployees.push(emp);
    }
    if (listOfEmployees.length > 0) {
        let totalEmployess = listOfEmployees.length;
        let processedEmployess = 0;
        let processedEmployeeSet = new Set();
        while (processedEmployess < totalEmployess) {
            let randomIdx = getRndInteger(0, totalEmployess);
            if (!processedEmployeeSet.has(randomIdx)) {
                let randomIdx2 = getRndInteger(0, totalEmployess);
                while (
                    randomIdx2 === randomIdx ||
                    isCircular(randomIdx2, randomIdx, listOfEmployees)) {
                    randomIdx2 = getRndInteger(0, totalEmployess);
                }
                listOfEmployees[randomIdx].setManager(listOfEmployees[randomIdx2]);
                processedEmployeeSet.add(randomIdx);
                processedEmployess++;
            }
        }
    }
    listOfEmployees.forEach(emp => {
        let reportees = emp.reportees.map(e => getEmpName(e, listOfEmployees));
        console.log(`
    Name: ${emp.name}
    ID: ${emp.id}
    Reportees: ${reportees.join(',')}
    Manager: ${getEmpName(emp.manager, listOfEmployees)}
        `);
    });
}

generateData(5)