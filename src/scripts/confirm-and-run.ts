// confirm-and-run.js
import readline from 'node:readline';
import  { spawn }from 'node:child_process';

// Get the actual command and arguments to run from the script's arguments
// process.argv contains ['node', 'confirm-and-run.js', 'actual', 'command', 'arg1', 'arg2', ...]
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Error: No command provided to confirm-and-run.js');
  process.exit(1);
}

// The command is the first argument, the rest are its arguments
const command = args[0];
const commandArgs = args.slice(1);
// const commandString = `${command} ${commandArgs.join(' ')}`.trim(); // For display

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// console.log(`\nYou are about to add dummy data in db, About to run: ${commandString}\n`);
console.log(`\nYou are about to add dummy data in db,make sure this is development env, ⚠️\n`);

rl.question('Are you sure you want to continue? [y/N] ', (answer) => {
  const normalizedAnswer = answer.trim().toLowerCase();

  if (normalizedAnswer === 'y' || normalizedAnswer === 'yes') {
    console.log('Confirmed. Running script...');
    rl.close(); // Close readline *before* spawning

    // Execute the actual command
    const proc = spawn(command, commandArgs, {
      stdio: 'inherit', // Use parent's stdio (allows seeing output, interaction)
      shell: process.platform === 'win32', // Use shell on Windows for better compatibility with things like `npm run` etc.
    });

    proc.on('error', (err) => {
        console.error(`Failed to start subprocess: ${err.message}`);
        process.exit(1); // Exit confirm script with error if spawn fails
    });

    // Exit the confirmation script with the same code as the child process
    proc.on('close', (code) => {
      process.exit(code ?? 0); // Exit with the child's code, or 0 if null/undefined
    });

  } else {
    console.log('Aborted by user.');
    rl.close();
    process.exit(1); // Exit with a non-zero code to indicate abortion
  }
});

// Handle Ctrl+C during the prompt
rl.on('SIGINT', () => {
    console.log('\nOperation cancelled by user (SIGINT).');
    rl.close();
    process.exit(1);
});