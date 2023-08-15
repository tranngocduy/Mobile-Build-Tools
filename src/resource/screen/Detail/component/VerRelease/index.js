import React, { useState } from 'react';

import { Paper, Button } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';

import { useAppStore } from '@app-utils';

import ViewLocked from '@app-component/ViewLocked';

const VerRelease = () => {
  const appPath = useAppStore(state => state.appPath);
  const appPlatform = useAppStore(state => state.appPlatform);
  const appIsManual = useAppStore(state => state.appIsManual);

  const isIOS = (appPlatform === 'iOS');
  const title = !!isIOS ? 'Instruction for Build' : 'Build App';

  const [isBuilding, setBuilding] = useState(false);

  const _buildApp = () => {
    if (!isIOS) setBuilding(!isBuilding);
  }

  return (
    <Paper style={{ padding: 12, borderRadius: 12 }}>
      <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={_buildApp}>
          <div>{title}</div>{!isIOS && <PlayArrow />}
        </Button>
      </div>

      {!!isBuilding && <ViewLocked appPath={appPath} appPlatform={appPlatform} appIsManual={appIsManual} buildApp={_buildApp} />}
    </Paper>
  )

}

export default VerRelease;