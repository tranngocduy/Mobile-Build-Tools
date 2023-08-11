import React, { useEffect } from 'react';

import { FormControl, Select, MenuItem } from '@mui/material';

import { useAppStore } from '@app-utils';

const BuildEnv = () => {
  const appEnv = useAppStore(state => state.appEnv);
  const appPath = useAppStore(state => state.appPath);
  const appPlatform = useAppStore(state => state.appPlatform);

  const _loadData = async () => {
    const _script = `.\\/env\\/env.${appEnv}`;
    const _path = `${appPath}/src/builder/index.js`;

    await window.electron.ipcRenderer.invoke(
      'exec.runScript',
      `find ${_path} -type f -print0 | xargs -0 perl -pi -w -e 's/.\\/env\\/env.UAT/${_script}/g;'`
    );

    await window.electron.ipcRenderer.invoke(
      'exec.runScript',
      `find ${_path} -type f -print0 | xargs -0 perl -pi -w -e 's/.\\/env\\/env.STG/${_script}/g;'`,
    );

    await window.electron.ipcRenderer.invoke(
      'exec.runScript',
      `find ${_path} -type f -print0 | xargs -0 perl -pi -w -e 's/.\\/env\\/env.PROD/${_script}/g;'`,
    );
  }

  const _onChangeEnv = event => {
    useAppStore.getState().updateEnv(event.target.value);
  }

  const _onChangePlatform = event => {
    useAppStore.getState()?.updatePlatform?.(event.target.value);
  }

  useEffect(() => { _loadData(); }, [appEnv]);

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', columnGap: 48 }}>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <h4>Platform: </h4>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select value={appPlatform} onChange={_onChangePlatform}>
              <MenuItem value='Android'>Android</MenuItem>
              <MenuItem value='iOS'>iOS</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <h4>Environment: </h4>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select value={appEnv} onChange={_onChangeEnv}>
              <MenuItem value='UAT'>UAT</MenuItem>
              <MenuItem value='STG'>STG</MenuItem>
              <MenuItem value='PROD'>PRODUCTION</MenuItem>
            </Select>
          </FormControl>
        </div>

      </div>
    </div>
  )

}

export default BuildEnv;
