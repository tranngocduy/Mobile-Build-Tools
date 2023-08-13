import { exec } from 'child_process';
import { ipcMain, shell } from 'electron';

import fs from 'fs';
import fixPath from 'fix-path';

fixPath();

let process_exec: any = null;

const msgTemplate = ({ data, error }: any) => ({ data, error });

ipcMain.handle('fs.readFileSync', async (event, filePath) => {
  const result = fs.readFileSync(filePath, 'utf-8');
  return result;
});

ipcMain.handle('fs.readdir', async (event, filePath) => {
  const result = fs.readdirSync(filePath, 'utf-8');
  return result;
});

ipcMain.handle('fs.renameSync', async (event, olaPath, newPath) => {
  const result = fs.renameSync(olaPath, newPath);
  return result;
});

ipcMain.handle('fs.unlinkSync', async (event, filePath) => {
  const result = fs.unlinkSync(filePath);
  return result;
});

ipcMain.handle('exec.runScript', async (event, script) => {
  const result = await new Promise(resolve => {
    exec(script, (error, stdout, stderr) => resolve({ error, stdout, stderr }));
  });
  return result;
});

ipcMain.handle('shell.openPath', async (event, filePath) => {
  const isExit = await fs.existsSync(filePath);

  if (!isExit) return false;

  shell.showItemInFolder(filePath);
  return true;
});

ipcMain.handle('exec.killProcess', async (event) => {
  if (!!process_exec?.kill) process_exec.kill();
  process_exec = null;
});

ipcMain.on('exec.runScript', async (event, script) => {
  process_exec = exec(script);

  if (!!process_exec?.stdout && !!process_exec?.stderr) {
    process_exec.stdout.on('data', function (stdout: any) {
      event.reply('exec.runScript', msgTemplate({ data: { stdout }, error: false }));
    });

    process_exec.stderr.on('data', function (stderr: any) {
      event.reply('exec.runScript', msgTemplate({ data: { stderr }, error: false }));
    });

    process_exec.on('exit', () => {
      event.reply('exec.runScript', msgTemplate({ data: { isExit: true }, error: false, }));
    });

    process_exec.on('error', () => {
      event.reply('exec.runScript', msgTemplate({ data: {}, error: true }));
    });
  }
});
