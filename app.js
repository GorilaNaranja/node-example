const { createFile } = require("./utils/createFile.js");

const employees = [
  { name: "Gorila", id: 1 },
  { name: "Babuin", id: 2 },
  { name: "Chimpa", id: 3 }
];

const salaries = [
  { price: 5000, id: 1 },
  { price: 2000, id: 2 },
  { price: 1000, id: 3 }
];

let getEmployeeById = async id => {
  let employeeDB = employees.find(employee => employee.id === id);
  if (!employeeDB) {
    throw new Error(`Employe whit id ${id} doesn't exist`);
  }
  return employeeDB;
};

let showEmployee = async id => {
  let employee = await getEmployeeById(id);
  console.log(`Hello ${employee.name}`);
};

createFile(employees)
  .then(res => {
    console.log("Response: ", res);
  })
  .catch(error => {
    console.log("Error: ", error);
  });
