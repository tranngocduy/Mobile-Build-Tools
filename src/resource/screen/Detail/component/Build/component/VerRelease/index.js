import React, { useState, Fragment } from 'react';

import { PlayArrow } from '@mui/icons-material';
import { Button, CircularProgress } from '@mui/material';

import { useAppStore } from '@app-utils';

const VerRelease = ({ path }) => {
  const appPath = useAppStore(state => state.appPath);

  const [isBuilding, setBuilding] = useState(false);

  const _buildApp = async () => {
    setBuilding(true);

    const result = await window.electron.ipcRenderer.invoke(
      'osascript.runScript',
      `cd ${appPath} && npx yarn install && cd android && ./gradlew clean && ./gradlew installRelease`
    );

    if (!result?.error)
      await window.electron.ipcRenderer.invoke('shell.openPath', `${appPath}/android/app/build/outputs/apk/release/app-release.apk`);

    setBuilding(false);
  }

  return (
    <div>
      <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', marginTop: 24 }}>
        <Button variant="contained" disabled={!!isBuilding} onClick={_buildApp}>
          {!isBuilding ? <Fragment>Build <PlayArrow /></Fragment> : <CircularProgress size={20} />}
        </Button>
      </div>
    </div>
  )

}

export default VerRelease;
