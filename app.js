require("colors");
const fs = require("fs");
const {
  inquirerMenu,
  pausa,
  readInput,
  deleteMenu,
  confirmationMessage,
  completedPendingTasks,
} = require("./helpers/inquirer");
const { saveDB, readDB } = require("./helpers/saveFile");
const Tasks = require("./models/tasks");
console.clear();

const main = async () => {
  let opt = -1;
  const dbTasks = readDB() || {}; // Read Tasks from DB
  const tasks = new Tasks();
  tasks.loadTasksFromArray(dbTasks);
  do {
    // Print Menu
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        // Create Task
        const desc = await readInput("Description:");
        tasks.createTask(desc);
        break;
      case 2:
        // Print Tasks
        tasks.listTasks();
        break;
      case 3:
        // List Completed Tasks
        tasks.listCompletedPending(true);
        break;
      case 4:
        // List Pending Tasks
        tasks.listCompletedPending(false);
        break;
      case 5:
        // Complete task(s)
        const ids = await completedPendingTasks(tasks.tasksArr);
        tasks.toggleComplete(ids);
        break;
      case 6:
        // Delete Task
        const id = await deleteMenu(tasks.tasksArr);
        if (id !== 0) {
          const ok = await confirmationMessage("Are you sure?");
          if (ok) {
            tasks.deleteTask(id);
            console.log("Task deleted successfully".green.bold);
          }
        }
        break;
    }
    saveDB(tasks.tasksArr);
    await pausa();
  } while (opt !== 0);
};

main();
