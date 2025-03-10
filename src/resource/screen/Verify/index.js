import React from 'react';

import { Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { getFolderPath, useAppStore } from '@app-utils';

const Verify = () => {
  const navigate = useNavigate();

  const _selectProject = () => {
    const inputFile = document.getElementById('input-file');
    inputFile?.click?.();
  };

  const _openFile = async event => {
    const _filePath = event?.nativeEvent?.target?.files?.[0]?.path;

    if (!_filePath) return;

    if (!_filePath?.endsWith?.('/package.json')) {
      alert('Can not find package.json');
      return;
    }

    const projectPath = getFolderPath(_filePath);
    const projectIOS = await window.electron.ipcRenderer.invoke('fs.readdir', `${projectPath}/ios`);
    const projectName = projectIOS?.filter?.(el => !!el?.includes?.('.xcodeproj'))?.[0]?.split('.')?.[0];

    if (['KSM'].includes(projectName)) {
      useAppStore.getState().updatePath(projectPath);
      useAppStore.getState().updateProjectName(projectName);

      navigate('/Detail');
      return;
    }

    else alert('The project is not supported');
  }

  return (
    <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e0e0e0' }} >
      <Paper elevation={3} style={{ padding: 16, borderRadius: 12 }}>
        <Button variant="outlined" style={{ textTransform: 'none' }} onClick={_selectProject}>
          Select file <span style={{ fontWeight: 'bold' }}>"package.json"</span> in project folder
          <input type="file" hidden={true} id="input-file" onChange={_openFile} />
        </Button>
      </Paper>
    </div>
  );
};

export default Verify;
