#!/usr/bin/env node
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set NODE_ENV for cross-platform compatibility
process.env.NODE_ENV = 'production';

// Run the production build
const child = spawn('node', ['dist/index.js'], {
  stdio: 'inherit',
  shell: process.platform === 'win32', // Use shell on Windows
  env: {
    ...process.env,
    NODE_ENV: 'production'
  }
});

child.on('close', (code) => {
  process.exit(code);
});

child.on('error', (err) => {
  console.error('Failed to start production server:', err);
  process.exit(1);
});