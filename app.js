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

let getEmployeeById = (id, callback) => {
  let employeeDB = employees.find(employee => employee.id === id);
  if (!employeeDB) {
    callback(`Employee with id ${id} doesn't exist`);
  } else {
    callback(null, employeeDB);
  }
};

getEmployeeById(3, (error, employee) => {
  if (error) {
    return console.log("Error: ", error);
  }
  console.log("Employee: ", employee);
});
