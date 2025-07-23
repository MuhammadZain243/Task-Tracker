# Task Tracker CLI

A simple, lightweight **Command Line Interface (CLI)** to track your tasks — what to do, what you're working on, and what you've completed. Built with **Node.js** using only native modules — no dependencies.


## Features

- Add, update, delete tasks
- Mark tasks as `todo`, `in-progress`, or `done`
- List all tasks or filter by status
- Saves tasks in a local `tasks.json` file
- No external libraries — uses Node.js core modules only


## Project Structure
```
Task-Tracker/
├── task-cli.js  # Main CLI logic
├── tasks.json   # Auto-generated task database (JSON format)
└── README.md    # Project documentation
```

## 🛠️ Getting Started

### 1. Clone or Download

```bash
git clone https://github.com/your-username/task-tracker-cli.git
cd task-tracker-cli
```

### 2. Commands
```bash
node task-cli.js add "Buy groceries"
node task-cli.js update 1 "Buy groceries and cook dinner"
node task-cli.js delete 1
node task-cli.js mark-in-progress 1
node task-cli.js mark-done 1
node task-cli.js mark-todo 1
node task-cli.js list
node task-cli.js list done
node task-cli.js list in-progress
node task-cli.js list todo
```
