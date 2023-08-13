import React, { useState, useEffect } from 'react';

import { Checkbox } from '@mui/material';

import { getKeyValueItem, useAppStore } from '@app-utils';

import InputNumber from '@app-component/InputNumber';

const BuildInfo = () => {
  const appEnv = useAppStore(state => state.appEnv);
  const appPath = useAppStore(state => state.appPath);
  const path = `${appPath}/src/builder/env/env.${appEnv}.js`;

  const [data, setData] = useState(null);

  const _readData = async () => {
    const listFilter = ['APP_VERSION:', 'IS_MANUAL:'];

    let envFile = await window.electron.ipcRenderer.invoke('fs.readFileSync', path);
    envFile = envFile?.split?.('\n')?.filter?.(el => el.includes?.(':'))?.filter(el => !el?.includes('{'));
    envFile = envFile?.filter?.(el => !!listFilter.filter(i => !!el.includes(i))?.[0])?.map(el => el.trim?.());
    envFile = envFile.map(element => getKeyValueItem(element));

    const isManual = envFile?.[1]?.[1];

    const appVersion = envFile?.[0]?.[1];
    const appIsManual = (isManual === 'true') ? true : (isManual === 'false') ? false : null;
    setData({ appVersion, appIsManual });
  }

  const _updateVersion = async value => {
    let envFile = await window.electron.ipcRenderer.invoke('fs.readFileSync', path);
    envFile = envFile?.split?.('\n')?.filter?.(el => el.includes?.(':'))?.filter(el => !el?.includes('{'));
    envFile = envFile?.filter?.(el => !!el.includes('APP_VERSION:'))?.map(el => el.trim?.());

    const infoVersion = envFile?.[0];
    const endLine = infoVersion.endsWith(',') ? ',' : '';

    await window.electron.ipcRenderer.invoke(
      'exec.runScript',
      `find ${path} -type f -print0 | xargs -0 perl -pi -w -e "s/${infoVersion}/APP_VERSION: ${value}${endLine}/g;"`
    );

    await _readData();
  }

  const _updateManual = async () => {
    let envFile = await window.electron.ipcRenderer.invoke('fs.readFileSync', path);
    envFile = envFile?.split?.('\n')?.filter?.(el => el.includes?.(':'))?.filter(el => !el?.includes('{'));
    envFile = envFile?.filter?.(el => !!el.includes('IS_MANUAL:'))?.map(el => el.trim?.());

    const manualStatus = envFile?.[0];
    const endLine = manualStatus.endsWith(',') ? ',' : '';

    const isManual = getKeyValueItem(manualStatus)?.[1];
    const _manual = (isManual === 'true') ? false : (isManual === 'false') ? true : null;

    if (typeof (_manual) === 'boolean') {
      await window.electron.ipcRenderer.invoke(
        'exec.runScript',
        `find ${path} -type f -print0 | xargs -0 perl -pi -w -e "s/${manualStatus}/IS_MANUAL: ${_manual}${endLine}/g;"`
      );
    }

    await _readData();
  }

  useEffect(() => { _readData(); }, [appEnv]);

  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', columnGap: 48 }}>
      <InputNumber title='Version Build Number' value={data?.appVersion} step={0.1} fixed={1} onChange={_updateVersion} />

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <span style={{ marginRight: 4, fontSize: 14, color: '#38383D' }}>Build App Manual:</span>
        {!!data && <Checkbox checked={data.appIsManual} onChange={_updateManual} />}
      </div>
    </div>
  )

}

export default BuildInfo;
