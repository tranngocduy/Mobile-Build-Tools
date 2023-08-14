import React, { useMemo } from 'react';

import { Paper, FormControl, Select, MenuItem } from '@mui/material';

import { useAppStore } from '@app-utils';

import IOS from './component/IOS';
import Android from './component/Android';

const Platform = () => {
  const appPlatform = useAppStore(state => state.appPlatform);

  const _handleChange = event => {
    useAppStore.getState()?.updatePlatform?.(event.target.value);
  }

  const memoIOS = useMemo(() => <IOS />, []);

  const memoAndroid = useMemo(() => <Android />, []);

  return (
    <Paper style={{ paddingRight: 16, paddingLeft: 16, paddingBottom: 16, borderRadius: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <h4>Platform: </h4>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select value={appPlatform} onChange={_handleChange}>
            <MenuItem value='Android'>Android</MenuItem>
            <MenuItem value='iOS'>iOS</MenuItem>
          </Select>
        </FormControl>
      </div>

      {(appPlatform === 'Android') && memoAndroid}
      {(appPlatform === 'iOS') && memoIOS}
    </Paper>
  )

}

export default Platform;
