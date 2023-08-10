import React, { useState, useMemo } from 'react';

import { Box, Tabs, Tab } from '@mui/material';

import BuildInfo from './component/BuildInfo';
import IconApp from './component/IconApp';
import SplashScreen from './component/SplashScreen';
import PDFDocument from './component/PDFDocument';

const Android = () => {
  const [tabIndex, setTabIndex] = useState(0)

  const _handleChange = (_, newValue) => setTabIndex(newValue);

  const memoBuildInfo = useMemo(() => <BuildInfo />, []);

  const memoIconApp = useMemo(() => <IconApp />, []);

  const memoSplashScreen = useMemo(() => <SplashScreen />, []);

  const memoPDFDocument = useMemo(() => <PDFDocument />, []);

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

      {(tabIndex === 2) && memoSplashScreen}

      {(tabIndex === 3) && memoPDFDocument}
    </div>
  )

}

export default Android;
