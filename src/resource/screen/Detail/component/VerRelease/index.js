import React, { useState } from 'react';

import { Paper, Button } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';

import { useAppStore } from '@app-utils';

import ViewLocked from '@app-component/ViewLocked';

const VerRelease = () => {
  const appEnv = useAppStore(state => state.appEnv);
  const appPath = useAppStore(state => state.appPath);
  const appPlatform = useAppStore(state => state.appPlatform);

  const [isBuilding, setBuilding] = useState(false);

  const _buildApp = () => {
    setBuilding(!isBuilding);
    window.electron.ipcRenderer.invoke('exec.killProcess');
  }

  return (
    <Paper style={{ padding: 12, borderRadius: 12 }}>
      <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={_buildApp}>
          <div>Build App</div><PlayArrow />
        </Button>
      </div>

      {!!isBuilding && <ViewLocked appEnv={appEnv} appPath={appPath} appPlatform={appPlatform} buildApp={_buildApp} />}
    </Paper>
  )

}

export default VerRelease;