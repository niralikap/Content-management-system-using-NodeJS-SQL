const inquirer = require('inquirer');
//const fs = require('fs');
const selectHelper = require('./lib/selectionHelper');

const sql = require('.db/query');
const cTable = require('console.table');


// const PORT = process.env.PORT || 3001;
// const app = express();

const emplTracker = () => {
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'request',
      message: 'What would you like to do?',
      choices: ['View All Employees',
                'Add an Employee',
                'Update Employee Role',
                'Update Employees Manager',
                'View Employees by Department',
                'View Employees by Manager',
                'Delete an Employee',
                'View All Roles',
                'Add a Role',
                'View All Departments',
                'Add a Department',
                'View Department Budget',
                'Quit'
                ],
        loop: false,
    },
  ])
  
  .then((data) => {
    console.log(answers);
    const {request} = data;

    switch (request){
      case 'View All Employees':
        viewEmps();
        break;
      
      case 'Add an Employee':
        newEmp();
        break;

      case 'Update Employee Role':
        updateEmpRole();
        break;

      case 'Update Employees Manager':
        updateEmpManager();
        break;

      case 'View Employees by Department':
        viewEmpByDept();
        break;

      case 'View Employees by Manager':
        viewEmpByMgr();
        break;

      case 'Delete an Employee':
        delEmp();
        break;

      case 'View All Roles':
        viewRoles();
        break;

      case 'Add a Role':
        newRole();
        break;

      case 'View All Departments':
        viewDepts();
        break;

      case 'Add a Department':
        newDept();
        break;
       
      case 'View Department Budget':
        viewBudgets();
        break;

      default:
        break;

    }
  })
};

//Add a department
const newDept = async () => {

  const department = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of the Department?",
      validate: (name) => {
        if (name) {
          return true;
        } else {
          console.log("Please enter a department name!");
          return false;
        }
      }
    }
  ]);

  await sql.addDept(department);

  emplTracker();
}

//Add an employee
const newEmp = async() => {

  const roleArr = await selectHelper.roleChoices();

  const mgmtArr = await selectHelper.mgmtChoices();

  const emp = await inquirer.prompt([
    {
      type: "input",
      name: "first",
      message: "What is the Employees First Name?",
      validate: (first) => {
        if (first && isNaN(first)) {
          return true;
        } else {
          console.log ("Please enter the first name!");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "last",
      message: "What is the Employees Last Name?",
      validate: (last) => {
        if (last && isNaN(last)){
          return true;
        } else {
          console.log ("Please enter the last name!");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "role_id",
      message: "What is the employee role?",
      choices: roleArr,
      loop: false,
    },
    {
      type: "list",
      name: "manager_id",
      message: "Who is the employees manager?",
      choices: mgmtArr,
      loop: false,
    }
  ]);

  await sql.addEmp(emp);

  emplTracker();

}


//Add a role
const newRole = async () => {

  const choicesArr = await selectHelper.deptChoices();

  const role = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the name of the role?",
      validate: (title) => {
        if (title) {
          return true;
        } else {
          console.log("Please enter a role name!");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary?",
      validate: (salary) => {
        if(salary && isNaN(salary)){
          return true;
        } else {
          console.log("Please enter the salary!");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "department_id",
      message: "What department is the role associated to?",
      choices: choicesArr,
      loop: false,
    }
  ]);

  await sql.addRole(role);

  emplTracker();

}

const delEmp = async () => {

}

const updateEmpRole = async () => {

  const roleArr = await selectHelper.roleChoices();
  const empArr = await selectHelper.empChoices();

  const emp = await inquirer.prompt([
    {
      type: "input",
      name: "emp_id",
      message: "Please enter the name of the employee that you want to update.",
      choices: empArr,
      loop: false,
    },
    {
      type: "input",
      name: "role_id",
      message: "What is the role of the employee?",
      choices: roleArr,
      loop: false,
    }
  ]);

  await sql.updateEmpRoleById(emp);

  emplTracker();

}

const updateEmpManager = async () => {

  const empArr = await selectHelper.NonMgmtChoices();
  const mgmtArr = await selectHelper.mgmtChoices();

  const emp = await inquirer.prompt([
    {
      type: "list",
      name: "emp_id",
      message: "Please enter the name of the employee that you would like to update.",
      choices: empArr,
      loop: false,
    },
    {
      type: "list",
      name: "manager_id",
      message: "Who is the employees manager?",
      choices: mgmtArr,
      loop: false,
    }
  ]);

  await sql.updataEmpManagerById(emp);

  emplTracker();

}

//Get all departments
const viewDepts = () => {
  sql.getDepts()

  .then(([rows]) => {
    console.log('\n');
    console.log(cTable.getTable(rows));
  })

  .then(() => {
    emplTracker();
  })
    
}

//Get all rows
const viewRoles = () => {
  sql.getRoles()

  .then(([rows]) => {
    console.log('\n');
    console.log(cTable.getTable(rows));
  })

  .then(() => {
    emplTracker();
  })
}

//Get all employees
const viewEmps = () => {
  sql.getEmps()

  .then(([rows]) => {
    console.log('\n');
    console.log(cTable.getTable(rows));
  })

  .then(() => {
    emplTracker();
  })
}

//Get all departments and their budget
const viewBudgets = async () => {
  sql.getBudgetByDept()

  .then(([rows]) => {
    console.log('\n');
    console.log(cTable.getTable(rows));
  })

  .then(() => {
    emplTracker();
  })
}

//Get all employees in a specific department
const viewEmpByDept = async () => {

const deptArr = await selectHelper.deptChoices();

inquirer.prompt([
  {
    type: "list",
    name: "dept_id",
    message: "Please specify the department that you would like to view the employees for.",
    choices: deptArr,
    loop: false
  }
])

.then((data) => {
  sql.getEmpByDeptId(data)
  .then(([rows]) => {
    console.log('\n');
    console.log(cTable.getTable(rows))
    emplTracker();
  })
})

}

const viewEmpByMgr = async () => {
  const mgmtArr = await selectHelper.mgmtChoices();

  inquirer.prompt([
    {
      type: "list",
      name: "manager_id",
      message: "Please enter the manager you want to view the employees for.",
      choices: mgmtArr,
      loop: false
    }
  ])

  .then((data) => {
    sql.viewEmpByMgrId(data)
    .then(([rows]) => {
      console.log('\n');
      console.log(cTable.getTable(rows));
      emplTracker();
    })
  })

}


emplTracker();