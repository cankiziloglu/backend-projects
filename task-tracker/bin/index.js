#!/usr/bin/env node

const fs = require('fs');
const args = process.argv.slice(2);
const filePath = './tasks.json';

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify({ uid: 1, tasks: [] }));
}

// Function to list tasks
function listTasks(status) {
  const alltasks = JSON.parse(fs.readFileSync(filePath, 'utf8')).tasks;
  if (status === 'all') {
    return alltasks;
  }
  return alltasks.filter((task) => task.status === status);
}

// Function to add task
function addTask(task) {
  const tasks = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  tasks.tasks.push({
    id: tasks.uid,
    description: task,
    status: 'todo',
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  });
  tasks.uid++;
  fs.writeFileSync(filePath, JSON.stringify(tasks), 'utf8');
  return tasks.uid - 1;
}

// Function to Update task
function updateTask(id, task) {
  const tasks = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const taskIndex = tasks.tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    console.log('Task with this ID not found');
    return;
  }
  if (taskIndex !== -1) {
    tasks.tasks[taskIndex].description = task;
    tasks.tasks[taskIndex].updatedAt = new Date().toString();
    fs.writeFileSync(filePath, JSON.stringify(tasks), 'utf8');
    console.log('Task updated successfully');
  }
}

// Function to mark task as done/undone/in progress
function markTask(id, status) {
  const tasks = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const taskIndex = tasks.tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    console.log('Task with this ID not found');
    return;
  }
  if (taskIndex !== -1) {
    tasks.tasks[taskIndex].status = status;
    tasks.tasks[taskIndex].updatedAt = new Date().toString();
    fs.writeFileSync(filePath, JSON.stringify(tasks), 'utf8');
    console.log('Task status updated successfully');
  }
}

// Function to delete task
function deleteTask(id) {
  const tasks = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const taskIndex = tasks.tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    console.log('Task with this ID not found');
    return;
  }
  if (taskIndex !== -1) {
    tasks.tasks.splice(taskIndex, 1);
    fs.writeFileSync(filePath, JSON.stringify(tasks), 'utf8');
    console.log('Task deleted successfully');
  }
}

if (args[0] === 'add') {
  // Add task
  const words = args.slice(1).length;
  if (words === 0) {
    console.log('Please provide a task description');
  } else {
    const id = addTask(args.slice(1).join(' '));
    console.log('Task added successfully. Task ID:', id);
  }
} else if (args[0] === 'list') {
  // List tasks
  const status = args[1] || 'all';
  if (
    status !== 'todo' &&
    status !== 'in-progress' &&
    status !== 'done' &&
    status !== 'all'
  ) {
    console.log(
      'Invalid task status. Please provide a valid status (todo/in-progress/done)'
    );
  }
  const tasks = listTasks(status);
  if (tasks.length === 0) {
    console.log('No tasks found');
  } else {
    console.log('ID | Description | Status | Created At | Updated At');
    tasks.forEach((task) => {
      console.log(
        task.id,
        ' | ',
        task.description,
        ' | ',
        task.status,
        ' | ',
        task.createdAt,
        ' | ',
        task.updatedAt
      );
    });
  }
} else if (args[0] === 'mark') {
  // Mark task as done/undone/in-progress
  const id = parseInt(args[1]);
  const status = args[2];
  if (isNaN(id)) {
    console.log('Please provide a valid task ID');
  } else if (
    status !== 'todo' &&
    status !== 'in-progress' &&
    status !== 'done'
  ) {
    console.log(
      'Invalid task status. Please provide a valid status (todo/in-progress/done)'
    );
  } else {
    markTask(id, status);
  }
} else if (args[0] === 'delete') {
  // Delete task
  const id = parseInt(args[1]);
  if (isNaN(id)) {
    console.log('Please provide a valid task ID');
  } else {
    deleteTask(id);
  }
} else if (args[0] === '--help' || args[0] === '-h') {
  // Show help
  console.log('Usage:');
  console.log('tasks-cli add <task description> - Add a new task');
  console.log('tasks-cli list - List all tasks');
  console.log('tasks-cli list <status> - List tasks by status');
  console.log(
    'tasks-cli mark <task id> <status> - Mark task as todo/in-progress/done'
  );
  console.log('tasks-cli delete <task id> - Delete a task');
  console.log(
    'tasks-cli update <task id> <task description> - Update a task description'
  );
} else if (args[0] === 'update') {
  // Update task
  const id = parseInt(args[1]);
  const words = args.slice(2).length;
  if (isNaN(id)) {
    console.log('Please provide a valid task ID');
  } else if (words === 0) {
    console.log('Please provide a task description');
  } else {
    updateTask(id, args.slice(2).join(' '));
  }
} else {
  console.log('Invalid command. Use --help or -h for help');
}
