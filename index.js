const enquirer = require("enquirer");
const { prompt, Select } = require("enquirer");
const db = require("./db/connection.js");

//TODO:  We need to fix this mainMenu function

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
      "Exit",
    ],
  });
  const answer = await prompt.run();
  console.log(answer);
  switch (answer) {
    case "View All Employees":
      return;
    case "View All Employees By Department":
      return;
    case "View All Employees By Manager":
      return;
    case "Add Employee":
      return addEmployee();
    case "Remove Employee":
      return;
    case "Update Employee Role":
      return;
    case "Update Employee Manager":
      return;
    case "View All Roles":
      return;
    case "Add Role":
      return addEmployeeRole();
    case "Remove Role":
      return;
    case "View All Departments":
      return;
    case "Add Department":
      return;
    case "Remove Department":
      return;
    case "View Total Utilized Budget of a Department":
      return;
    case "Exit":
      return;
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
  const { title, salary, department_id } = answer;
  db.query(
    `INSERT INTO role SET  ?`,
    { title, salary, department_id },
    (err, res) => {
      if (err) throw err;
      console.table(res);
    }
  );
  db.query(`SELECT * FROM role`, (err, res) => console.table(res));
  mainMenu();
}

function addEmployee() {
  let firstList = [];
  let secondList = [];

  function handleLists(err) {
    if (err) throw err;

    // Check if both lists have been retrieved
    if (firstList.length > 0 && secondList.length > 0) {
      // Pass the lists as choices to an inquirer prompt
      const prompt1 = new enquirer.Select({
        name: "choice",
        type: "list",
        message: "Select a role:",
        choices: [...firstList],
      });

      prompt1
        .run()
        .then((answer1) => {
          console.log("role:", answer1);
          const prompt2 = new enquirer.Select({
            name: "choice",
            type: "list",
            message: "Select a manager:",
            choices: [...secondList],
          });

          prompt2
            .run()
            .then((answer2) => {
              console.log("manager:", answer2);
              console.table([answer1, answer2]);
            })
            .catch(console.error);
        })
        .catch(console.error);
    }
  }

  db.query("SELECT * FROM role", (err, results) => {
    if (err) throw err;
    // Map the results to get only the relevant data
    firstList = results.map((result) => result.title);
    handleLists(err);
  });

  db.query("SELECT * FROM employee", (err, results) => {
    if (err) throw err;
    // Map the results to get only the relevant data
    secondList = results.map((result) => result.last_name);
    handleLists(err);
  });
}

mainMenu();
