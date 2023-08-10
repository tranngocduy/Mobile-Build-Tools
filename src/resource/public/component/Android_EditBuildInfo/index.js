import React, { useRef } from 'react';

import { Modal, Button, Paper, TextField } from '@mui/material';

import InputNumber from '@app-component/InputNumber';

const Android_EditBuildInfo = ({ appInfo, appPath, readData, setModal }) => {
  const appName = useRef(appInfo?.appName || '');
  const versionCode = useRef(appInfo?.versionCode || '');
  const versionName = useRef(appInfo?.versionName || '');
  const bundleID = useRef(appInfo?.bundleID || '');

  const _onChangeVersionCode = e => (versionCode.current = e);

  const _onChangeVersionName = e => (versionName.current = e);

  const _onChangeAppName = e => (appName.current = e.nativeEvent.target.value);

  const _onChangeBundleID = e => (bundleID.current = e.nativeEvent.target.value);

  const _apply = async () => {
    const _bundleID = bundleID.current?.replace?.('com.', '');
    const _applicationId = appInfo?.bundleID?.replace?.('com.', '');

    await window.electron.ipcRenderer.invoke(
      'exec.runScript',
      `find ${appPath}/android/app/src/main/res/values/strings.xml -type f -print0 | xargs -0 perl -pi -w -e 's/${appInfo.appName}/${appName.current}/g;'`
    );

    await window.electron.ipcRenderer.invoke(
      'exec.runScript',
      `find ${appPath}/android/app/build.gradle -type f -print0 | xargs -0 perl -pi -w -e 's/versionCode ${appInfo.versionCode}/versionCode ${versionCode.current}/g;'`
    );

    await window.electron.ipcRenderer.invoke(
      'exec.runScript',
      `find ${appPath}/android/app/build.gradle -type f -print0 | xargs -0 perl -pi -w -e 's/versionName "${appInfo.versionName}"/versionName "${versionName.current}"/g;'`
    );

    await window.electron.ipcRenderer.invoke(
      'exec.runScript',
      `find ${appPath}/android -type f -print0 | xargs -0 perl -pi -w -e 's/com\\.${_applicationId}/com\\.${_bundleID}/g;'`
    );

    await readData();

    setModal();
  }

  return (
    <Modal open={true} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} style={{ padding: 16, paddingTop: 36 }}>
        <div style={{ display: 'flex', columnGap: 24 }}>
          <InputNumber title='Version Code' initial={versionCode.current} step={1} fixed={0} onChange={_onChangeVersionCode} />
          <InputNumber title='Version Name' initial={versionName.current} step={0.1} fixed={1} onChange={_onChangeVersionName} />
          <TextField label="App Name" variant="outlined" defaultValue={appName.current} onChange={_onChangeAppName} />
          <TextField label="Bundle ID" variant="outlined" defaultValue={bundleID.current} onChange={_onChangeBundleID} />
        </div>

        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', columnGap: 12, marginTop: 24, justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={setModal}>Cancel</Button>
          <Button variant="contained" onClick={_apply}>Apply</Button>
        </div>
      </Paper>
    </Modal>
  )

}

export default Android_EditBuildInfo;
