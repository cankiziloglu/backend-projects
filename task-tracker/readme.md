# Task Tracker CLI App

This CLI app is a sample solution to the [task-tracker](https://roadmap.sh/projects/task-tracker) backend project on [roadmap.sh](https://roadmap.sh)

## Features
- Add, Update, and Delete tasks with unique ID, status, date created and date updated properties
- Mark a task as `todo`, `in-progress` or `done`
- List all tasks
- List all tasks that are done
- List all tasks that are not done
- List all tasks that are in progress
- Store all tasks in a json file

## Requirements
node.js installed

## Installation
Clone the repository and link the folder to use the app

```bash
   git clone --depth=1 https://github.com/cankiziloglu/backend-projects

   # Navigate to the project Directory
   cd backend-projects/task-tracker

   # Link the package globally to use it anywhere
   npm link
   ```

## Usage
#### 1. Adding a Task
```bash
task-cli add Pick children up from school
# Output:
# Task added successfully. Task ID: 1
```

#### 2. Updating a Task
```bash
task-cli update 1 Pick children up from concert
# Output:
# Task updated successfully
```
#### 3. Listing Tasks
```bash
task-cli list
#OR
task-cli list all
# Lists all tasks

task-cli list todo
# Lists all tasks with status todo

task-cli list done
# Lists all tasks with status done

task-cli list in-progress
# Lists all tasks with status in-progress
```
#### 4. Updating a Task's Status
```bash
task-cli mark 1 todo
# Marks task with ID 1 as todo. 
task-cli mark 1 in-progress
# Marks task with ID 1 as in progress. 
task-cli mark 1 done
# Marks task with ID 1 as done. 

#Output:
# Task status updated successfully
```

#### 5. Deleting a Task
```bash
task-cli delete 1
# Deletes task with ID 1

# Output:
# Task deleted successfully.
```

  **If no json file is provided the app will create one with the first command.**