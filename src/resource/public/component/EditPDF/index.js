import React from 'react';

import { IconButton, Modal, Paper, Button } from '@mui/material';

const EditPDF = ({ items, setShowModal, setFilePDF }) => {

  const _apply = () => {

  }

  const _close = () => setShowModal();

  const _renderItem = (item, index) => {
    return (
      <div style={{ display: 'flex', width: '23%' }} key={index}>
        <Button
          style={{ flex: 1, borderWidth: 1, borderColor: '#000000', borderRadius: 4, borderStyle: 'dashed', marginLeft: 4, padding: 6, paddingRight: 8, paddingLeft: 8 }}
        >
          <span style={{ fontSize: 14, color: '#38383D', fontWeight: 'bold', textTransform: 'none' }}>{item}</span>
        </Button>
      </div>
    )
  }

  return (
    <Modal open={true} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} style={{ padding: 16, paddingTop: 16, maxWidth: '90%' }}>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100, borderWidth: 1, borderColor: 'rgba(0,0,0,0.25)', borderRadius: 4, borderStyle: 'dashed', marginLeft: 4, marginBottom: 24 }}>
          <div style={{ color: 'rgba(0,0,0,0.5)' }}>Select a file or drag and drop here</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {items?.map?.(_renderItem)}
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', columnGap: 12, marginTop: 24 }}>
          <Button variant="outlined" style={{ textTransform: 'none' }} onClick={_close}>Cancel</Button>
          <Button variant="contained" onClick={_apply}>Apply</Button>
        </div>
      </Paper>
    </Modal>
  )

}

export default EditPDF;
