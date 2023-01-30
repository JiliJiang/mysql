const inquirer = require("inquirer");
const database = require("./db.js");
//const { connection } = require("./db/connection.js");
// const db = require("./db/connection.js");

const mainMenu = async () => {
    // http://www.figlet.org/fonts/big.flf
    // http://www.figlet.org/fontdb_example.cgi?font=big.flf
 console.log(`============Employee🖇Tracker=============`);
 const answer = await inquirer
  .prompt([{
    name: "start",
    type: "list",
    message: "What would you like to do",
    choices: [
      "View All Employees",
      "View All Employees By Department",
      "View All Employees By Manager",
      "Add Employee",
      "Remove Employee",
      "Update Employee Role",
      "Update Employee Manager",
      "View All Roles",
      "Add Role",
      "Remove Role",
      "View All Departments",
      "Add Department",
      "Remove Department",
      "View Total Utilized Budget of a Department",
      "Exit",
    ],
  }])
    console.log(answer);
    switch (answer.start) {
      case "View All Employees": return
        //return myViewEmployees();
         //database.ViewAllEmployees();

      // department: marketing, accounting, engineering, human resources, legal
      case "View All Employees By Department":return
        
         database.ViewAllEmployeesByDepartment();
         break

      // display a list includes all managers: first name, last name
      case "View All Employees By Manager":return
         database.ViewAllEmployeesByManager();
         break;

      case "Add Employee": return
         database.AddEmployee();
         break;


      case "Remove Employee": return
         database.RemoveEmployee();
         break;

      case "Update Employee Role": return
         database.UpdateEmployeeRole();
         break;

      case "Update Employee Manager": return
         database.UpdateEmployeeManager();
         break;

      case "View All Roles":return 
         database.ViewAllRoles();
         break;

      case "Add Role":
         //database.AddRole();
         addEmployeeRole()
         break;

      case "Remove Role": return
         database.RemoveRole();
         break;

      case "View All Departments":return
         database.ViewAllDepartments();
         break;

      case "Add Department": return
         database.AddDepartment();
         break;

      case "Remove Department": return 
         database.RemoveDepartment();
         break;

      case "View Total Utilized Budget of a Department": return 
         database.ViewTotalUtilizedBudgetOfADepartment();
         break;

      case "Exit": return
         database.Exit();
         break;
    }  
};

// function myViewEmployees() {
//     inquirer.prompt(

//     ).then(answer =>{

//         database.ViewAllEmployees();
//     })
  
// }

async function addEmployeeRole(){

   const answer = await inquirer.prompt([
      {
          type: "input",
          name: "title",
          message: "What is the title of the role?",
      },
      {
          type: "input",
          name: "salary",
          message: "What is the salary of the role?",
      },
      {
          type: "input",
          name: "department_id",
          message: "What is the department id of the role?",
      },
   ]);
console.log(answer);
const {title, salary, department_id} = answer
database.addRole(title, salary, department_id)

}

mainMenu();
