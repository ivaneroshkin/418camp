import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

let rl: readline.Interface | null = null;

function getInterface(): readline.Interface {
  if (!rl) {
    rl = readline.createInterface({ input, output });
  }
  return rl;
}

async function question(query: string): Promise<string> {
  const rlInterface = getInterface();
  return await rlInterface.question(query);
}

function close(): void {
  if (rl) {
    rl.close();
    rl = null;
  }
}

export default {
  question,
  close,
  getInterface
};
