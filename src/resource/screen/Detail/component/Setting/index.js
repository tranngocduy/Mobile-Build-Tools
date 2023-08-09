import React, { useState, useMemo } from 'react';

import { Paper, Box, Tabs, Tab } from '@mui/material';

import EnvSelect from './component/EnvSelect';
import EnvConfig from './component/EnvConfig';

const Setting = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const _handleChange = (_, value) => setTabIndex(value);

  const memoEnvSelect = useMemo(() => <EnvSelect />, []);

  const memoEnvConfig = useMemo(() => <EnvConfig />, []);

  return (
    <Paper style={{ paddingRight: 16, paddingLeft: 16, paddingBottom: 16, borderRadius: 12 }}>
      {memoEnvSelect}

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={_handleChange} aria-label="basic tabs example">
          <Tab label="Environment Config" />
          <Tab label="Image Theme" />
        </Tabs>
      </Box>

      <div style={{ marginTop: 24 }}>
        {(tabIndex === 0) && memoEnvConfig}
      </div>
    </Paper>
  )

}

export default Setting;
