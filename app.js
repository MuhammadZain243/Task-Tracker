// add task
const addTask = (desciption) => {
  console.log(desciption);
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
    s;
    break;
}
