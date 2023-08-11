import React, { useMemo } from 'react';

import { Paper } from '@mui/material';

import { useAppStore } from '@app-utils';

import Android from './component/Android';

const Platform = () => {
  const appPlatform = useAppStore(state => state.appPlatform);

  const memoAndroid = useMemo(() => <Android />, [])

  return (
    <Paper style={{ paddingRight: 16, paddingLeft: 16, paddingBottom: 16, borderRadius: 12 }}>
      {appPlatform === 'Android' && memoAndroid}
    </Paper>
  )

}

export default Platform;
