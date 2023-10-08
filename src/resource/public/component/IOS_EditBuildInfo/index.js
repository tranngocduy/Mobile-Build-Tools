import React, { useRef } from 'react';

import { Modal, Button, Paper, TextField } from '@mui/material';

const IOS_EditBuildInfo = ({ appInfo, path, readData, setModal }) => {
  const appName = useRef(appInfo?.appName || '');

  const _onChangeAppName = e => (appName.current = e.nativeEvent.target.value.trim());

  const _apply = async () => {
    const newName = !!appName?.current?.includes?.(' ') ? `"${appName.current}.app"` : `${appName.current}.app`;
    const currentName = !!appInfo?.appName?.includes?.(' ') ? `"${appInfo?.appName}.app"` : `${appInfo?.appName}.app`;

    const newProductName = !!appName?.current?.includes?.(' ') ? `"${appName.current}"` : `${appName.current}`;
    const currentProductName = !!appInfo?.appName?.includes?.(' ') ? `"${appInfo?.appName}"` : `${appInfo?.appName}`;

    await window.electron.ipcRenderer.invoke(
      'exec.runScript',
      `find ${path} -type f -print0 | xargs -0 perl -pi -w -e 's/\\* ${appInfo.appName}.app \\*/\\* ${appName.current}.app \\*/g;'`
    );

    await window.electron.ipcRenderer.invoke(
      'exec.runScript',
      `find ${path} -type f -print0 | xargs -0 perl -pi -w -e 's/ path = ${currentName}/ path = ${newName}/g;'`
    );

    await window.electron.ipcRenderer.invoke(
      'exec.runScript',
      `find ${path} -type f -print0 | xargs -0 perl -pi -w -e 's/PRODUCT_NAME = ${currentProductName}/PRODUCT_NAME = ${newProductName}/g;'`
    );

    await readData();

    setModal();
  }

  return (
    <Modal open={true} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} style={{ padding: 16, paddingTop: 36 }}>
        <div style={{ display: 'flex', columnGap: 24 }}>
          <TextField label="App Name" variant="outlined" defaultValue={appName.current} onChange={_onChangeAppName} />
        </div>

        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', columnGap: 12, marginTop: 24, justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={setModal}>Cancel</Button>
          <Button variant="contained" onClick={_apply}>Apply</Button>
        </div>
      </Paper>
    </Modal>
  )

}

export default IOS_EditBuildInfo;
