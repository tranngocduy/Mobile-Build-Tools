import React, { useState, useMemo } from 'react';

import { Paper, Box, Tabs, Tab } from '@mui/material';

import EnvSelect from './component/EnvSelect';
import BuildInfo from './component/BuildInfo';
import EnvConfig from './component/EnvConfig';
import ThemeUI from './component/ThemeUI';
import PDF from './component/PDF';

const Setting = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const _handleChange = (_, value) => setTabIndex(value);

  const memoEnvSelect = useMemo(() => <EnvSelect />, []);

  const memoBuildInfo = useMemo(() => <BuildInfo />, []);

  const memoEnvConfig = useMemo(() => <EnvConfig />, []);

  const memoThemeUI = useMemo(() => <ThemeUI />, []);

  const memoPDF = useMemo(() => <PDF />, []);

  return (
    <Paper style={{ paddingRight: 16, paddingLeft: 16, paddingBottom: 16, borderRadius: 12 }}>
      {memoEnvSelect}

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={_handleChange} aria-label="basic tabs example">
          <Tab label="Build Info" />
          <Tab label="Environment Config" />
          <Tab label="Theme UI" />
          <Tab label="PDF Document" />
        </Tabs>
      </Box>

      <div style={{ marginTop: 24 }}>
        {(tabIndex === 0) && memoBuildInfo}
        {(tabIndex === 1) && memoEnvConfig}
        {(tabIndex === 2) && memoThemeUI}
        {(tabIndex === 3) && memoPDF}
      </div>
    </Paper>
  )

}

export default Setting;
