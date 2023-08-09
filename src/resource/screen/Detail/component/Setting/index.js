import React, { useState, useMemo } from 'react';

import { Paper, Box, Tabs, Tab } from '@mui/material';

import EnvSelect from './component/EnvSelect';

const Setting = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const _handleChange = (_, value) => setTabIndex(value);

  const memoEnvSelect = useMemo(() => <EnvSelect />, []);

  return (
    <Paper style={{ paddingRight: 16, paddingLeft: 16, paddingBottom: 16, borderRadius: 12 }}>
      {memoEnvSelect}

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={_handleChange} aria-label="basic tabs example">
          <Tab label="Environment Info" />
          <Tab label="Image Theme" />
        </Tabs>
      </Box>

    </Paper>
  )

}

export default Setting;
