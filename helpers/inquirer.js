const inquirer = require("inquirer");
const { menuOpts } = require("./messages");
require("colors");

const inquirerMenu = async () => {
  console.clear();
  console.log("====================".green);
  console.log("      TODO App".white.bold);
  console.log("====================\n".green);
  const { option } = await inquirer.prompt(menuOpts);
  return option;
};

const deleteMenu = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    return {
      name: `${`${i + 1}.`.green} ${task.desc}`,
      value: task.id,
    };
  });
  choices.unshift({
    name: `${`${0}.`.green} Cancel`,
    value: 0,
  });

  const { id } = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Which task do you want to delete?",
      choices,
    },
  ]);
  return id;
};

const completedPendingTasks = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    return {
      name: `${`${i + 1}.`.green} ${task.desc}`,
      value: task.id,
      checked: task.completedIn ? true : false,
    };
  });

  const { ids } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "ids",
      message: "Which task do you want to delete?",
      choices,
    },
  ]);
  return ids;
};

const confirmationMessage = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Please type your task description";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const pausa = async () => {
  console.log("\n");
  await inquirer.prompt([
    {
      type: "input",
      name: "enter",
      message: `Press ${"ENTER".green.bold} to continue`,
    },
  ]);
};

module.exports = {
  inquirerMenu,
  pausa,
  readInput,
  deleteMenu,
  confirmationMessage,
  completedPendingTasks,
};
