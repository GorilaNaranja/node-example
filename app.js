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

let getEmployeeById = id => {
  return new Promise((resolve, reject) => {
    let employeeDB = employees.find(employee => employee.id === id);
    if (!employeeDB) {
      reject(`Employee with id ${id} doesn't exist`);
    } else {
      resolve(employeeDB);
    }
  });
};

getEmployeeById(3).then(
  employee => {
    console.log("Employee: ", employee);
  },
  error => {
    console.log("Error: ", error);
  }
);
