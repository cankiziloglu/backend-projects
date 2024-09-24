#!/usr/bin/env node

const args = process.argv.slice(2);

if (args.length < 1) {
  console.log('Please provide a username');
  process.exit(1);
}

if (args.length > 1) {
  console.log('Username cannot include spaces');
  process.exit(1);
}

const username = args[0];
console.log(`Fetching activity for ${username}...`);

const activity = fetch(`https://api.github.com/users/${username}/events`)
  .then((response) => response.json())
  .then((data) => {
    return data.map((event) => {
      return {
        type: event.type,
        repo: event.repo.name,
        created_at: event.created_at,
        action: event.payload.action,
      };
    });
  })
  .then((activity) => {
    return activity.forEach(element => {
      if (element.action) {
        console.log(`${element.action} ${element.type} on ${element.repo} at ${element.created_at}`);
      }
      else {
        console.log(`${element.type} on ${element.repo} at ${element.created_at}`);
      }
    });
  })
  .catch((error) => {
    console.log('Error fetching data');
  });
