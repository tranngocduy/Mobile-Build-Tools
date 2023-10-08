import React, { useState, useEffect } from 'react';

import { IconButton } from '@mui/material';
import { SettingsOutlined } from '@mui/icons-material';

import { useAppStore } from '@app-utils';

import InputNumber from '@app-component/InputNumber';
import IOS_EditBuildInfo from '@app-component/IOS_EditBuildInfo';

const BuildInfo = () => {
  const appPath = useAppStore(state => state.appPath);
  const appProjectName = useAppStore(state => state.appProjectName);
  const path = `${appPath}/ios/${appProjectName}.xcodeproj/project.pbxproj`;

  const [appInfo, setAppInfo] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const _setModal = () => setOpenModal(!openModal);

  const _loadData = async productName => {
    const result = await window.electron.ipcRenderer.invoke('fs.readFileSync', path);
    const indexes = [...result.matchAll(new RegExp('buildSettings = {', 'gi'))].map(a => a.index);

    let indices = [];
    for (let i = 0; i < indexes.length; i++) {
      const _substr = result.substr(indexes[i]);
      const _index = (_substr.indexOf('}') + 1);
      indices.push(_substr?.substr(0, _index));
    }

    indices = indices.filter(el => el?.includes?.('ASSETCATALOG_COMPILER_APPICON_NAME'));

    const _version = indices?.[0]?.split('\n')?.filter(el => el.includes('MARKETING_VERSION ='))?.[0]?.replaceAll('\t', '');
    const _build = indices?.[0]?.split('\n')?.filter(el => el.includes('CURRENT_PROJECT_VERSION ='))?.[0]?.replaceAll('\t', '');
    const _appName = indices?.[0]?.split('\n')?.filter(el => el.includes('PRODUCT_NAME ='))?.[0]?.replaceAll('\t', '');

    const version = _version?.split?.('=')?.[1]?.trim()?.replaceAll(';', '');
    const build = _build?.split?.('=')?.[1]?.trim()?.replaceAll(';', '');
    const appName = productName || _appName?.split?.('=')?.[1]?.trim()?.replaceAll(';', '')?.replaceAll('"', '');

    setAppInfo({ version, build, appName });
  }

  const _onChangeVersion = async value => {
    await window.electron.ipcRenderer.invoke(
      'exec.runScript',
      `find ${path} -type f -print0 | xargs -0 perl -pi -w -e 's/MARKETING_VERSION = ${appInfo.version}/MARKETING_VERSION = ${value}/g;'`
    );
    await _loadData();
  }

  const _onChangeBuild = async value => {
    await window.electron.ipcRenderer.invoke(
      'exec.runScript',
      `find ${path} -type f -print0 | xargs -0 perl -pi -w -e 's/CURRENT_PROJECT_VERSION = ${appInfo.build}/CURRENT_PROJECT_VERSION = ${value}/g;'`
    );
    await _loadData();
  }

  useEffect(() => { _loadData(); }, []);

  return (
    <div>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4>Info</h4>
        <IconButton onClick={_setModal}><SettingsOutlined color='primary' /></IconButton>
      </div>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', columnGap: 86 }}>
        <InputNumber title='Version' value={appInfo?.version} step={1} fixed={1} onChange={_onChangeVersion} />
        <InputNumber title='Build' value={appInfo?.build} step={1} fixed={0} onChange={_onChangeBuild} />
        <div style={{ fontSize: 14 }}>App Name: <span style={{ fontWeight: 'bold' }}>{appInfo?.appName}</span></div>
      </div>

      {!!openModal && <IOS_EditBuildInfo appInfo={appInfo} path={path} loadData={_loadData} setModal={_setModal} />}
    </div>
  )

}

export default BuildInfo;
