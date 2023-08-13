import React, { useState, useEffect } from 'react';

import { IconButton } from '@mui/material';
import { SettingsOutlined } from '@mui/icons-material';

import { useAppStore } from '@app-utils';

import InputNumber from '@app-component/InputNumber';
import Android_EditBuildInfo from '@app-component/Android_EditBuildInfo';

const BuildInfo = () => {
  const appPath = useAppStore(state => state.appPath);

  const [appInfo, setAppInfo] = useState({ appName: '', versionCode: '', versionName: '', bundleID: '' })

  const [openModal, setOpenModal] = useState(false);

  const _setModal = () => setOpenModal(!openModal);

  const _getGradle = (gradle, strings) => {
    const result = gradle.substr(gradle.indexOf(strings)).substr(0, gradle.substr(gradle.indexOf(strings)).indexOf('\n'))?.split(' ')?.[1];
    return result?.replaceAll('"', '');
  }

  const _readData = async () => {
    const gradle_result = await window.electron.ipcRenderer.invoke('fs.readFileSync', `${appPath}/android/app/build.gradle`);
    const strings_result = await window.electron.ipcRenderer.invoke('fs.readFileSync', `${appPath}/android/app/src/main/res/values/strings.xml`);

    const gradle = gradle_result || '';
    const strings = strings_result || '';

    const appName = strings?.replace?.(/(<([^>]+)>)/gi, "")?.split('\n')?.filter?.(el => !!el)?.[0]?.trim?.();
    const versionCode = _getGradle(gradle, 'versionCode');
    const versionName = _getGradle(gradle, 'versionName');
    const bundleID = _getGradle(gradle, 'applicationId');

    setAppInfo({ appName, versionCode, versionName, bundleID });
  }

  const _onChangeVersionCode = async value => {
    await window.electron.ipcRenderer.invoke(
      'exec.runScript',
      `find ${appPath}/android/app/build.gradle -type f -print0 | xargs -0 perl -pi -w -e 's/versionCode ${appInfo.versionCode}/versionCode ${value}/g;'`
    );
    await _readData();
  }

  const _onChangeVersionName = async value => {
    await window.electron.ipcRenderer.invoke(
      'exec.runScript',
      `find ${appPath}/android/app/build.gradle -type f -print0 | xargs -0 perl -pi -w -e 's/versionName "${appInfo.versionName}"/versionName "${value}"/g;'`
    );
    await _readData();
  }

  useEffect(() => { _readData(); }, []);

  return (
    <div>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4>Info</h4>
        <IconButton onClick={_setModal}><SettingsOutlined color='primary' /></IconButton>
      </div>

      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <InputNumber title='Version Code' value={appInfo.versionCode} step={1} fixed={0} onChange={_onChangeVersionCode} />
        <InputNumber title='Version Name' value={appInfo.versionName} step={0.1} fixed={1} onChange={_onChangeVersionName} />
        <div style={{ fontSize: 14 }}>App Name: <span style={{ fontWeight: 'bold' }}>{appInfo.appName}</span></div>
        <div style={{ fontSize: 14 }}>Bundle ID: <span style={{ fontWeight: 'bold' }}>{appInfo.bundleID}</span></div>
      </div>

      {!!openModal && <Android_EditBuildInfo appInfo={appInfo} appPath={appPath} readData={_readData} setModal={_setModal} />}
    </div>
  )

}

export default BuildInfo;
