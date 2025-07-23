const fs = require('fs');
const path = require('path');

const TASK_FILE = path.join(__dirname, 'tasks.json');

// Load Task
const loadTask = () => {
  // If file is not created or empty
  if (!fs.existsSync(TASK_FILE)) return [];

  // If file contain data
  const data = fs.readFileSync(TASK_FILE, 'utf8');
  return data ? JSON.parse(data) : [];
};

// Save Task
const saveTask = (tasks) => {
  fs.writeFileSync(TASK_FILE, JSON.stringify(tasks));
};

const now = () => {
  return new Date().toISOString();
};

// Generate ID
const generateID = (tasks) => {
  return tasks.reduce((map, task) => Math.max(map, task.id), 0) + 1;
};

// add task
const addTask = (desciption) => {
  tasks = loadTask();
  task = {
    id: generateID(tasks),
    desciption,
    status: 'todo',
    createdAt: now(),
    updatedAt: now(),
  };
  tasks.push(task);
  saveTask(tasks);
  console.log(`Task added successfully (ID: ${task.id})`);
};

// update task
const updateTask = (id, desciption) => {
  tasks = loadTask();
  task = tasks.find((t) => t.id === id);
  if (!task) return console.log('Task not found');
  task.desciption = desciption;
  task.updatedAt = now();

  saveTask(tasks);
  console.log('Task updated successfully');
};

// delete task
const deleteTask = (id) => {
  tasks = loadTask();
  index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return console.log('Task not found');
  tasks.splice(index, 1);
  saveTask(tasks);
  console.log('Task deleted successfully');
};

// Mark In Progress
const markStatus = (id, status) => {
  tasks = loadTask();
  task = tasks.find((t) => t.id === id);
  if (!task) return console.log('Task not found');
  task.status = status;
  task.updatedAt = now();
  saveTask(tasks);
  console.log(`Task marked as ${status}`);
};

// List
const listTask = (filter = null) => {
  tasks = loadTask();
  filtered = filter ? tasks.filter((t) => t.status === filter) : tasks;
  if (filtered.length === 0) return console.log('No task found');
  filtered.forEach((task) => {
    console.log(
      `ID: ${task.id} | ${task.status} | ${task.desciption} | CreatedAt: ${task.createdAt} | UpdatedAt: ${task.updatedAt}`
    );
  });
};

// CLI argument parsing
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'add':
    addTask(args[1]);
    break;

  case 'update':
    updateTask(parseInt(args[1]), args[2]);
    break;

  case 'delete':
    deleteTask(parseInt(args[1]));
    break;

  case 'mark-in-progress':
    markStatus(parseInt(args[1]), 'in-progress');
    break;

  case 'mark-done':
    markStatus(parseInt(args[1]), 'done');
    break;

  case 'mark-todo':
    markStatus(parseInt(args[1]), 'todo');
    break;

  case 'list':
    const validStatuses = ['done', 'todo', 'in-progress'];
    const filter = args[1];
    if (filter && !validStatuses.includes(filter)) {
      console.log('Invalid status. Use: done, todo, in-progress');
    } else {
      listTask(filter);
    }
    break;

  default:
    console.log('Unknown Command');
    break;
}
