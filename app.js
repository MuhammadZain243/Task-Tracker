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
  console.log(id, desciption);
};

// delete task
const deleteTask = (id) => {
  console.log(id);
};

// Mark In Progress
const markStatus = (id, status) => {
  console.log(id, status);
};

// List
const listTask = (filter = null) => {
  console.log(filter);
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

  case 'list':
    const validStatuses = ['done', 'todo', 'in-progress'];
    const filter = args[1];
    if (filter && !validStatuses.find(filter)) {
      console.log('Invalid status. Use: done, todo, in-progress');
    } else {
      listTask(filter);
    }
    break;

  default:
    console.log('Unknown Command');
    break;
}
