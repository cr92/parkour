const readline = require('readline');
const { exec } = require('../cmdr/cmdRouter');

/**
 * handles readline for cli
 */
const runShellMode = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'psh> ',
  });

  rl.prompt();

  for await (const line of rl) {
    try {
      exec(line);
    } catch (e) {
      console.error(e);
    }
    rl.prompt();
  }

  rl.on('close', () => {
    process.exit(0);
  });
};

module.exports = { runShellMode };
