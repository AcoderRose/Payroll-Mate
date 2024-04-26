// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector("#add-employees-btn");

// Collect employee data

//Declared function and array, created while loop to collect employee's name and salary, and is up to user when loop stops, will not allow numbers to be input for names.
const collectEmployees = function () {
  let employees = [];
  let addAnotherEmployee = true;

  while (addAnotherEmployee) {
    let firstName = prompt("Enter employee's first name");

    // Validate first name input (alphabetic characters only)
    while (!/^[a-zA-Z]+$/.test(firstName)) {
      alert("Please enter letters only for the first name.");
      firstName = prompt("Re-Enter employee's first name");
    }

    let lastName = prompt("Enter employee's last name");

    // Validate last name input (alphabetic characters only)
    while (!/^[a-zA-Z]+$/.test(lastName)) {
      alert("Please enter letters only for the last name.");
      lastName = prompt("Re-Enter employee's last name");
    }

    let salary = prompt("Enter employee's salary");

    while (isNaN(salary)) {
      salary = prompt("Enter employee's salary (numbers only)");
    }

    //constructed employee object that adds to array.
    const employee = {
      firstName: firstName,
      lastName: lastName,
      salary: parseFloat(salary),
    };

    employees.push(employee);
    addAnotherEmployee = confirm("Add another employee?");
  }

  return employees;
};

// Display the average salary
const displayAverageSalary = function (employeesArray) {
  //for loop that calculates average salary and displays in console as USD currency.
  let totalSalary = 0;

  for (let i = 0; i < employeesArray.length; i++) {
    totalSalary += parseFloat(employeesArray[i].salary);
  }

  const averageSalary = totalSalary / employeesArray.length;

  console.log(
    `The average employee salary between our ${
      employeesArray.length
    } employee(s) is ${averageSalary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })}`
  );
};

// Select a random employee
const getRandomEmployee = function (employeesArray) {
  //Selects and displays a random employee and shows message to user who was randomly selected.
  const random = Math.floor(Math.random() * employeesArray.length);
  console.log(
    `Congratulations to ${employeesArray[random].firstName} ${employeesArray[random].lastName}, our random drawing winner!`
  );
};

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector("#employee-table");

  // Clear the employee table
  employeeTable.innerHTML = "";

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = `$${parseFloat(currentEmployee.salary).toFixed(
      2
    )}`;

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
};

let trackEmployeeData = function () {
  let employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log("==============================");

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
};

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener("click", trackEmployeeData);
