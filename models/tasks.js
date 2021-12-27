const Task = require("./task");

class Tasks {
  _tasks = {};

  get tasksArr() {
    const tasks = [];
    Object.keys(this._tasks).forEach((key) => tasks.push(this._tasks[key]));
    return tasks;
  }

  constructor() {
    this._tasks = {};
  }

  loadTasksFromArray(tasks = []) {
    tasks.forEach((task) => {
      this._tasks[task.id] = task;
    });
  }

  listTasks() {
    const tasksArr = this.tasksArr;
    console.log();
    tasksArr.forEach((task, i) => {
      const isCompleted = task.completedIn ? "Completed".green : "Pending".red;
      console.log(`${`${i + 1}.`.green} ${task.desc} :: ${isCompleted}`);
    });
  }

  listCompletedPending(completed = true) {
    const taskArr = this.tasksArr;
    console.log();
    let i = 0;
    taskArr.forEach((task) => {
      const completedIn = task.completedIn ? "Completed".green : "Pending".red;
      if (completed) {
        // Print Completed Task
        if (task.completedIn) {
          console.log(
            `${`${i + 1}.`.green} ${task.desc} :: ${
              task.completedIn.green.bold
            }`
          );
          i++;
        }
      } else {
        // Print Pending Task
        if (!task.completedIn) {
          console.log(`${`${i + 1}.`.green} ${task.desc} :: ${completedIn}`);
          i++;
        }
      }
    });
  }

  toggleComplete(ids = []) {
    ids.forEach((id) => {
      const task = this._tasks[id];
      if (!task.completedIn) {
        task.completedIn = new Date().toISOString();
      }
    });

    this.tasksArr.forEach((task) => {
      if (!ids.includes(task.id)) this._tasks[task.id].completedIn = null;
    });
  }

  deleteTask(id = "") {
    if (this._tasks[id]) delete this._tasks[id];
  }

  createTask(desc = "") {
    const task = new Task(desc);
    this._tasks[task.id] = task;
  }
}

module.exports = Tasks;
