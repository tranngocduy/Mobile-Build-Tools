import React from 'react';

import Setting from './component/Setting';
import Platform from './component/Platform';
import VerRelease from './component/VerRelease';

const Detail = () => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: 16, rowGap: 12, backgroundColor: '#e0e0e0' }}>
      <Setting />
      <Platform />
      <VerRelease />
    </div>
  )

}

export default Detail;
