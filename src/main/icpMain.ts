import { exec } from 'child_process';
import { ipcMain, shell } from 'electron';

import fs from 'fs';
import fixPath from 'fix-path';

fixPath();

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
  if (!!/^(http|https)/.test(filePath)) {
    shell.openExternal(filePath);
  }
  else {
    const isExit = await fs.existsSync(filePath);

    if (!isExit) return false;

    shell.showItemInFolder(filePath);
    return true;
  }
});

ipcMain.handle('osascript.runScript', async (event, script) => {
  const bash = `
  tell application "Terminal"
    activate
    do script "${script}"
    delay 1
    set W_ to windows of application "Terminal"
    repeat until busy of (item 1 of W_) is false
    end repeat
  end tell
  `;

  const result = await new Promise(resolve => {
    exec(`osascript -e '${bash}'`, (error, stdout, stderr) => resolve({ error, stdout, stderr }));
  });
  return result;
});
