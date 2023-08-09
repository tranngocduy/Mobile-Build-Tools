import React, { useState } from 'react';

import { Button } from '@mui/material';

import EditThemeUI from '@app-component/EditThemeUI';

const ItemThemeUI = ({ item, path }) => {
  const width = 120;
  const imageSize = (item.size.height / item.size.width);
  const height = (width * imageSize);

  const [isShowModal, setShowModal] = useState(false);

  const _setShowModal = () => setShowModal(!isShowModal);

  return (
    <div>
      <div style={{ width, height, padding: 8, borderWidth: 1, borderColor: 'rgba(0,0,0,0.25)', borderStyle: 'dashed', borderRadius: 10 }}>
        <img src={`file://${path}/${item.name}?${Date.now()}`} style={{ width, height, backgroundColor: '#8DE1AF' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 12, rowGap: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>{item?.name}</span>
        <Button variant="outlined" style={{ padding: 0, textTransform: 'none' }} onClick={_setShowModal}>Change</Button>
      </div>

      {!!isShowModal && <EditThemeUI item={item} path={path} imageSize={imageSize} setShowModal={_setShowModal} />}
    </div>
  )

}

export default ItemThemeUI;
