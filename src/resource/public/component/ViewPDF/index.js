import React from 'react';

import { IconButton, Modal, Paper } from '@mui/material';
import { Close } from '@mui/icons-material';

const ViewPDF = ({ pathReadPDF, setFilePDF }) => {

  const _setFilePDF = () => setFilePDF(null);

  return (
    <Modal open={true} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} style={{ padding: 16, paddingTop: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: -12, marginBottom: 12 }}>
          <IconButton onClick={_setFilePDF}><Close /></IconButton>
        </div>

        <embed src={`file://${pathReadPDF}`} type="application/pdf" style={{ width: 800, height: 600 }} frameBorder="0" />
      </Paper>
    </Modal>
  )

}

export default ViewPDF;
