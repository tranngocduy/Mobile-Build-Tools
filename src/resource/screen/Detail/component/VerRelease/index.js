import React, { useState } from 'react';

import { Paper, Button } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';

import { useAppStore } from '@app-utils';

import ViewLocked from '@app-component/ViewLocked';

const VerRelease = () => {
  const appPath = useAppStore(state => state.appPath);
  const appPlatform = useAppStore(state => state.appPlatform);
  const appIsManual = useAppStore(state => state.appIsManual);

  const isIOS = !!(appPlatform === 'iOS');

  const [isBuilding, setBuilding] = useState(false);

  const _buildApp = () => setBuilding(!isBuilding);

  const _instruction = () => {
    window.electron.ipcRenderer.invoke('shell.openPath', 'https://1drv.ms/w/s!Aqmn6Fzb2InWoCIawi3LgYwaylPr?e=gJuIvv')
  }

  return (
    <Paper style={{ padding: 12, borderRadius: 12 }}>
      <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', columnGap: 24 }}>
        {!!isIOS &&
          <Button variant="contained" onClick={_instruction}>
            <div>Instruction for Build</div>
          </Button>
        }
        <Button variant="contained" onClick={_buildApp}>
          {!isIOS ? <div>Build App</div> : <div>Run Script</div>}<PlayArrow />
        </Button>
      </div>

      {!!isBuilding && <ViewLocked appPath={appPath} appPlatform={appPlatform} appIsManual={appIsManual} buildApp={_buildApp} />}
    </Paper>
  )

}

export default VerRelease;