import React, { useState, useMemo } from 'react';

import { Paper, Box, Tabs, Tab } from '@mui/material';

import EnvConfig from './component/EnvConfig';
import ThemeUI from './component/ThemeUI';

const Setting = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const _handleChange = (_, value) => setTabIndex(value);

  const memoEnvConfig = useMemo(() => <EnvConfig />, []);

  const memoThemeUI = useMemo(() => <ThemeUI />, []);

  return (
    <Paper style={{ paddingRight: 16, paddingLeft: 16, paddingBottom: 16, borderRadius: 12 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={_handleChange} aria-label="basic tabs example">
          <Tab label="Environment Config" />
          <Tab label="Theme UI" />
        </Tabs>
      </Box>

      <div style={{ marginTop: 24 }}>
        {(tabIndex === 0) && memoEnvConfig}
        {(tabIndex === 1) && memoThemeUI}
      </div>
    </Paper>
  )

}

export default Setting;
