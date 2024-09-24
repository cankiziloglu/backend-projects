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
    console.log(activity);
  })
  .catch((error) => {
    console.log('Error fetching data:', error);
  });


