import React from 'react';

import { useAppStore } from '@app-utils';

import ItemImage from '@app-component/ItemImage';

const IconApp = () => {
  const appPath = useAppStore(state => state.appPath);

  const item = { name: 'ic_launcher.png', size: { width: 72, height: 72 } }

  return (
    <div>
      <h4>Icon</h4>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

      </div>
    </div>
  )

}

export default IconApp;
