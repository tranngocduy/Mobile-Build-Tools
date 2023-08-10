import React from 'react';

import { Alert, Button, Modal, Paper } from '@mui/material';

const ViewImage = ({ item, src, path, imageSize, isMustMatch, apply, close }) => {
  const width = 260;
  const height = width * imageSize;

  const isNameError = !!isMustMatch && (item?.name !== src?.file?.name);

  const isSizeError = !!isMustMatch && (
    `${item?.size?.width} x ${item?.size?.height}` !== `${src.size.width} x ${src.size.height}`
  );

  return (
    <Modal open={true} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} style={{ padding: 16, paddingTop: 16 }}>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 8 }}>
            <div style={{ display: 'flex', width, height, backgroundColor: '#8DE1AF', padding: 8 }}>
              <img src={`file://${path}/${item?.name}?${Date.now()}`} style={{ width, height, backgroundColor: '#8DE1AF' }} />
            </div>
            <span style={{ fontSize: 16, color: '#000000', fontWeight: 'bold' }}>{item?.size?.width} x {item?.size?.height}</span>
            <span style={{ fontSize: 16, color: '#000000', fontWeight: 'bold' }}>{item?.name}</span>
          </div>

          <div style={{ width: 1, marginRight: 16, marginLeft: 16, backgroundColor: '#e0e0e0' }} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 8 }}>
            <div style={{ display: 'flex', width, height, backgroundColor: '#8DE1AF', padding: 8 }}>
              {!!src && <img src={`file://${src?.file?.path}?${Date.now()}`} style={{ width, height, backgroundColor: '#8DE1AF' }} />}
            </div>
            <span style={{ fontSize: 16, color: '#000000', fontWeight: 'bold' }}>{src.size.width} x {src.size.height}</span>
            <span style={{ fontSize: 16, color: '#000000', fontWeight: 'bold' }}>{src?.file?.name}</span>
          </div>
        </div>

        {!!isNameError &&
          <Alert severity="error" style={{ marginTop: 24 }}>
            <div>Name of the current picture: <span style={{ fontWeight: 'bold' }}>{item?.name}</span></div>
            <div>The name of the new image: <span style={{ fontWeight: 'bold' }}>{src?.file?.name}</span></div>
            <div>The name of the new image must match the name of the current picture</div>
          </Alert>
        }

        {!!isSizeError &&
          <Alert severity="error" style={{ marginTop: 24 }}>
            <div>Size of the current picture: <span style={{ fontWeight: 'bold' }}>{item?.size?.width} x {item?.size?.height}</span></div>
            <div>The size of the new image: <span style={{ fontWeight: 'bold' }}>{src.size.width} x {src.size.height}</span></div>
            <div>The size of the new image must match the size of the current picture</div>
          </Alert>
        }

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 24, columnGap: 12 }}>
          <Button variant="outlined" style={{ textTransform: 'none' }} onClick={close}>Cancel</Button>
          <Button variant="contained" disabled={(!!isNameError || !!isSizeError)} onClick={apply}>Apply</Button>
        </div>
      </Paper>
    </Modal>
  )

}

export default ViewImage;
