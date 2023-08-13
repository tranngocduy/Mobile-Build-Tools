import React, { useEffect } from 'react';

import { Modal, Paper, CircularProgress } from '@mui/material';

const ViewLocked = ({ appPath, appPlatform, appIsManual, buildApp }) => {

  const _getBuildScript = async () => {
    let scriptBuild = '';
    let scripOpenFile = '';
    if (appPlatform === 'IOS') {

    }
    else if (appPlatform === 'Android') {
      if (!appIsManual) {
        scripOpenFile = `${appPath}/android/app/build/outputs/bundle/release/app-release.aab`;
        scriptBuild = `cd ${appPath} && npx yarn install && cd android && ./gradlew clean && ./gradlew bundleRelease`;
      }
      else {
        scripOpenFile = `${appPath}/android/app/build/outputs/apk/release/app-release.apk`;
        scriptBuild = `cd ${appPath} && npx yarn install && cd android && ./gradlew clean && ./gradlew installRelease`;
      }
    }

    const result = await window.electron.ipcRenderer.invoke('osascript.runScript', scriptBuild);

    if (!result?.error) {
      const isExit = await window.electron.ipcRenderer.invoke('shell.openPath', scripOpenFile);
      if (!isExit) alert('Build Fail!');
    }

    buildApp();
  }

  useEffect(() => {
    _getBuildScript();
  }, []);

  return (
    <Modal open={true} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }} >
      <Paper elevation={3} style={{ padding: 16, backgroundColor: '#FFFFFF' }}>
        <CircularProgress />
      </Paper>
    </Modal>
  )

}

export default ViewLocked;
