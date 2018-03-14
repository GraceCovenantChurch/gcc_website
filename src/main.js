import { spawn } from 'child_process';
import path from 'path';

spawn('node', [path.resolve(__dirname, './server/app.js')], {
  shell: true,
  stdio: 'inherit',
});

spawn('node', [path.resolve(__dirname, './admin_server/app.js')], {
  shell: true,
  stdio: 'inherit',
});
