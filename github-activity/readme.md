# GitHub Activity CLI App

This is a command line interface (CLI) app to view a user's GitHub activity.

This app is a sample solution to the [GitHub User Activity](https://roadmap.sh/projects/github-user-activity) backend project on [roadmap.sh](https://roadmap.sh)

## Features
- List latest 30 events on the user's GitHub activity history

## Requirements
node.js installed

## Installation
Clone the repository and link the folder to use the app

```bash
   git clone --depth=1 https://github.com/cankiziloglu/backend-projects

   # Navigate to the project Directory
   cd backend-projects/github-activity

   # Link the package globally to use it anywhere
   npm link
   ```

## Usage
```bash
github-activity <username>
# Output:
# Fetching activity for <username>...

```