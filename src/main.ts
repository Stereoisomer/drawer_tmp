import * as readline from "readline";
import { ConsolePainter } from "./consolePainter";

new ConsolePainter(
  readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  })
);
