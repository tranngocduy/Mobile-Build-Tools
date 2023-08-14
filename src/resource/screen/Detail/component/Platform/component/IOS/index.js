import React, { useState, useMemo } from 'react';

import { Box, Tabs, Tab } from '@mui/material';

const IOS = () => {
  const [tabIndex, setTabIndex] = useState(0)

  const _handleChange = (_, newValue) => setTabIndex(newValue);

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

    </div>
  )

}

export default IOS;
