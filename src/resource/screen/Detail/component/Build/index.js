import React from 'react';

import { Paper } from '@mui/material';

import BuildEnv from './component/EnvBuild';
import VerRelease from './component/VerRelease';

const Build = () => {

  return (
    <Paper style={{ paddingRight: 16, paddingLeft: 16, paddingBottom: 16, borderRadius: 12 }}>
      <BuildEnv />
      <VerRelease />
    </Paper>
  )

}

export default Build;
