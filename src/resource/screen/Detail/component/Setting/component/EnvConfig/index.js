import React, { useState, useEffect } from 'react';

import { IconButton } from '@mui/material';
import { SettingsOutlined } from '@mui/icons-material';

import { getKeyValueItem, useAppStore } from '@app-utils';

import EditEnvConfig from '@app-instance/EditEnvConfig';

const EnvConfig = () => {
  const appEnv = useAppStore(state => state.appEnv);
  const appPath = useAppStore(state => state.appPath);
  const path = `${appPath}/src/builder/env/env.${appEnv}.js`;

  const [data, setData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const _setModal = () => setOpenModal(!openModal);

  const _readData = async () => {
    const listFilter = ['ENV:', 'APP_VERSION:', 'IS_MANUAL:'];

    let envFile = await window.electron.ipcRenderer.invoke('fs.readFileSync', path);
    envFile = envFile?.split?.('\n')?.filter?.(el => el.includes?.(':'))?.filter(el => !el?.includes('{'));
    envFile = envFile?.filter?.(el => !listFilter.filter(i => !!el.includes(i))?.[0])?.map(el => el.trim?.());

    setData(envFile);
  }

  useEffect(() => { _readData(); }, [appEnv]);

  const _renderItem = (item, index) => {
    const [valueKey, valueItem] = getKeyValueItem(item);
    return (
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center' }} key={index}>
        <div style={{ fontSize: 14, color: '#38383D', width: 230 }}>{valueKey}:</div>
        <span style={{ marginLeft: 4, fontSize: 14, color: '#38383D', fontWeight: 'bold' }}>{valueItem || '---'}</span>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', rowGap: 24 }}>
          {data?.map?.(_renderItem)}
        </div>
        <div style={{ marginTop: -12, marginRight: -8 }}>
          <IconButton size='small' onClick={_setModal}><SettingsOutlined color='primary' /></IconButton>
        </div>
      </div>

      {!!openModal && <EditEnvConfig appInfo={data} path={path} readData={_readData} setModal={_setModal} />}
    </div>
  )

}

export default EnvConfig;
