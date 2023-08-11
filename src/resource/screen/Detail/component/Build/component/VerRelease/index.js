import React, { useState } from 'react';

import { Button } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';

import { useAppStore } from '@app-utils';

const VerRelease = ({ path }) => {
  const appPath = useAppStore(state => state.appPath);

  const [isBuilding, setBuilding] = useState(false);

  const _buildApp = async () => {
    const result = await window.electron.ipcRenderer.invoke(
      'osascript.runScript',
      `cd ${appPath}; npm install -g yarn; yarn install; cd android; ./gradlew clean; ./gradlew bundleRelease; exit`
    );

    console.log('result', result)
  }

  return (
    <div>
      <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', marginTop: 24 }}>
        <Button variant="contained" onClick={_buildApp}>
          <div>Build App</div><PlayArrow />
        </Button>
      </div>
      {!!isBuilding && <Terminal path={path} buildApp={_buildApp} />}
    </div>
  )

}

export default VerRelease;
