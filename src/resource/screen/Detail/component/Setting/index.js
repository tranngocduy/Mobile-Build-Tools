import React, { useState, useMemo } from 'react';

import { Paper, Box, Tabs, Tab } from '@mui/material';

import EnvSelect from './component/EnvSelect';
import BuildInfo from './component/BuildInfo';
import EnvConfig from './component/EnvConfig';
import ThemeUI from './component/ThemeUI';

const Setting = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const _handleChange = (_, value) => setTabIndex(value);

  const memoEnvSelect = useMemo(() => <EnvSelect />, []);

  const memoBuildInfo = useMemo(() => <BuildInfo />, []);

  const memoEnvConfig = useMemo(() => <EnvConfig />, []);

  const memoThemeUI = useMemo(() => <ThemeUI />, []);

  return (
    <Paper style={{ paddingRight: 16, paddingLeft: 16, paddingBottom: 16, borderRadius: 12 }}>
      {memoEnvSelect}

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={_handleChange} aria-label="basic tabs example">
          <Tab label="Build Info" />
          <Tab label="Environment Config" />
          <Tab label="Theme UI" />
        </Tabs>
      </Box>

      <div style={{ marginTop: 24 }}>
        {(tabIndex === 0) && memoBuildInfo}
        {(tabIndex === 1) && memoEnvConfig}
        {(tabIndex === 2) && memoThemeUI}
      </div>
    </Paper>
  )

}

export default Setting;
