import React from 'react';

import { Button } from '@mui/material';

const ItemThemeUI = ({ item, path }) => {
  const width = 120;
  const height = (width * (item.size.height / item.size.width));

  const _setShowModal = () => {

  }

  return (
    <div>
      <div style={{ width, height, padding: 8, borderWidth: 1, borderColor: 'rgba(0,0,0,0.25)', borderStyle: 'dashed', borderRadius: 10 }}>
        <img src={`file://${path}/${item.name}?${Date.now()}`} style={{ width, height, backgroundColor: '#8DE1AF' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 12, rowGap: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>{item?.name}</span>
        <Button variant="outlined" style={{ padding: 0, textTransform: 'none' }} onClick={_setShowModal}>Change</Button>
      </div>
    </div>
  )

}

export default ItemThemeUI;
