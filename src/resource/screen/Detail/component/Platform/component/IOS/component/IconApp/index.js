import React from 'react';

import { IconButton } from '@mui/material';
import { SettingsOutlined } from '@mui/icons-material';

const IconApp = () => {

  const _setModal = () => {

  }

  return (
    <div>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4>Icon App</h4>
        <IconButton onClick={_setModal}><SettingsOutlined color='primary' /></IconButton>
      </div>


    </div>
  )

}

export default IconApp;
