const fs = require('fs');
const readline = require('readline');
const { exec } = require('../cmdr/cmdRouter');

/**
 * handles readline for file input
 */
const runFileMode = async () => {
  const rl = readline.createInterface({
    input: fs.createReadStream(process.argv[2]),
  });

  for await (const line of rl) {
    try {
      exec(line);
    } catch (e) {
      console.error(e);
    }
  }

  rl.on('close', () => {
    process.exit(0);
  });
};

module.exports = { runFileMode };
