import React, { useState, useMemo } from 'react';

import { Box, Tabs, Tab } from '@mui/material';

import BuildInfo from './component/BuildInfo';
import IconApp from './component/IconApp';

const IOS = () => {
  const [tabIndex, setTabIndex] = useState(0)

  const _handleChange = (_, newValue) => setTabIndex(newValue);

  const memoBuildInfo = useMemo(() => <BuildInfo />, []);

  const memoIconApp = useMemo(() => <IconApp />, []);

  return (
    <div style={{ paddingBottom: 8, borderRadius: 12 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={_handleChange}>
          <Tab label="Build Info" />
          <Tab label="Icon App" />
          <Tab label="Splash Screen" />
          <Tab label="PDF Document" />
        </Tabs>
      </Box>

      {(tabIndex === 0) && memoBuildInfo}

      {(tabIndex === 1) && memoIconApp}

    </div>
  )

}

export default IOS;
