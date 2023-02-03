
const { prompt, Select } = require('enquirer')
const db = require("./db/connection.js");

const mainMenu = async () => {
   // http://www.figlet.org/fonts/big.flf
   // http://www.figlet.org/fontdb_example.cgi?font=big.flf
   console.log(`============Employee🖇Tracker=============`);
   const prompt = new Select({
      name: "start",
      //type: "list",
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
         "Exit"]

   })
   const answer = await prompt.run();
   console.log(answer);
   switch (answer) {
      case "View All Employees": return
      case "View All Employees By Department": return
      case "View All Employees By Manager": return
      case "Add Employee": return
      case "Remove Employee": return
      case "Update Employee Role": return
      case "Update Employee Manager": return
      case "View All Roles": return
      case "Add Role": return addEmployeeRole()
      case "Remove Role": return
      case "View All Departments": return
      case "Add Department": return
      case "Remove Department": return
      case "View Total Utilized Budget of a Department": return
      case "Exit": return
   }
};

async function addEmployeeRole() {
   const answer = await prompt([
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
   const { title, salary, department_id } = answer
   db.query(`INSERT INTO role SET  ?`,
      { title, salary, department_id },
      (err, res) => {
         if (err) throw err;
         console.table(res);
      })
   db.query(`SELECT * FROM role`, (err, res) => console.table(res));
   mainMenu()
}

mainMenu();
