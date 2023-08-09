import React from 'react';

import { Button, Modal, Paper } from '@mui/material';

const ViewImage = ({ item, src, path, imageSize, apply, close }) => {
  const width = 300;
  const height = width * imageSize;

  return (
    <Modal open={true} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} style={{ padding: 16, paddingTop: 16 }}>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 12 }}>
            <div style={{ display: 'flex', width, height, backgroundColor: '#8DE1AF', padding: 8 }}>
              <img src={`file://${path}/${item?.name}?${Date.now()}`} style={{ width, height, backgroundColor: '#8DE1AF' }} />
            </div>
            <span style={{ fontSize: 16, color: '#000000', fontWeight: 'bold' }}>{item?.size?.width} x {item?.size?.height}</span>
          </div>

          <div style={{ width: 1, marginRight: 16, marginLeft: 16, backgroundColor: '#e0e0e0' }} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 12 }}>
            <div style={{ display: 'flex', width, height, backgroundColor: '#8DE1AF', padding: 8 }}>
              {!!src && <img src={`file://${src?.file?.path}?${Date.now()}`} style={{ width, height, backgroundColor: '#8DE1AF' }} />}
            </div>
            <span style={{ fontSize: 16, color: '#000000', fontWeight: 'bold' }}>{src.size.width} x {src.size.height}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 24, columnGap: 12 }}>
          <Button variant="outlined" style={{ textTransform: 'none' }} onClick={close}>Cancel</Button>
          <Button variant="contained" disabled={!src?.file?.path} onClick={apply}>Apply</Button>
        </div>
      </Paper>
    </Modal>
  )

}

export default ViewImage;
