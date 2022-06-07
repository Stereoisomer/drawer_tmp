import { exit } from "process";
import * as readline from "readline";
import { ConsolePainter } from "./consolePainter";

async function main() {
  const game = new ConsolePainter(
    readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true,
    })
  );
  await game.start();
  exit(0);
}
main();
