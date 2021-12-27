const inquirer = require("inquirer");
const Tasks = require("../models/tasks");

require("colors");

const showMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("====================".green);
    console.log("  Select an option".white.bold);
    console.log("====================\n".green);

    console.log(`${"1.".green} Create a new task`);
    console.log(`${"2.".green} List tasks`);
    console.log(`${"3.".green} List completed tasks`);
    console.log(`${"4.".green} List pending tasks`);
    console.log(`${"5.".green} Complete task(s)`);
    console.log(`${"6.".green} Delete task`);
    console.log(`${"0.".green} Log out\n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question("Select an option: ", (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const menuOpts = [
  {
    type: "list",
    name: "option",
    message: "What do you want to do?",
    choices: [
      {
        name: `${"1.".green} Create task`,
        value: 1,
      },
      {
        name: `${"2.".green} List task`,
        value: 2,
      },
      {
        name: `${"3.".green} List completed tasks`,
        value: 3,
      },
      {
        name: `${"4.".green} List pending tasks`,
        value: 4,
      },
      {
        name: `${"5.".green} Complete task(s)`,
        value: 5,
      },
      {
        name: `${"6.".green} Delete task`,
        value: 6,
      },
      {
        name: `${"0.".green} Log out`,
        value: 0,
      },
    ],
  },
];

const pause = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question(`Press ${"ENTER".green.bold} to continue`, (opt) => {
      readline.close();
      resolve();
    });
  });
};

module.exports = {
  showMenu,
  pause,
  menuOpts,
};
