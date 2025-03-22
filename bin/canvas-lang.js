#!/usr/bin/env node

import fs from "fs";
import path from "path";
import chalk from "chalk";
import { tokenizeInput, parseTokens } from "../lib/parser.js";
import { interpretAST } from "../lib/interpreter.js";

// Read and parse command line arguments
const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: canvas-lang <script.canvas>");
  process.exit(1);
}

// Main execution
try {
  const code = fs.readFileSync(path.resolve(filePath), "utf-8");
  const tokens = tokenizeInput(code);
  const ast = parseTokens(tokens);
  interpretAST(ast);
} catch (error) {
  console.error(chalk.red(`Error: ${error.message}`));
  process.exit(1);
}