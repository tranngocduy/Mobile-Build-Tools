import React, { useState, useEffect } from 'react';

import { Button, IconButton } from '@mui/material';
import { SettingsOutlined } from '@mui/icons-material';

import { useAppStore } from '@app-utils';

import ViewPDF from '@app-component/ViewPDF';

const PDFDocument = () => {
  const appPath = useAppStore(state => state.appPath);
  const path = `${appPath}/android/app/src/main/assets/PDF`;

  const [items, setItems] = useState(null);
  const [filePDF, setFilePDF] = useState(null);

  const _readData = async () => {
    const result = await window.electron.ipcRenderer.invoke('fs.readdir', path);
    setItems(result || []);
  }

  const _setFilePDF = value => setFilePDF(value);

  useEffect(() => { _readData(); }, [])

  const _renderItem = (item, index) => {
    return (
      <div style={{ display: 'flex', width: '23%' }} key={index}>
        <Button
          onClick={_setFilePDF.bind(this, item)}
          style={{ flex: 1, borderWidth: 1, borderColor: '#000000', borderRadius: 4, borderStyle: 'dashed', marginLeft: 4, padding: 6, paddingRight: 8, paddingLeft: 8 }}
        >
          <span style={{ fontSize: 14, color: '#38383D', fontWeight: 'bold', textTransform: 'none' }}>{item}</span>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4>PDF Document</h4>
        <IconButton><SettingsOutlined color='primary' /></IconButton>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginLeft: -12 }}>
        {items?.map?.(_renderItem)}
      </div>

      {!!filePDF && <ViewPDF pathReadPDF={`${path}/${filePDF}`} setFilePDF={_setFilePDF} />}
    </div>
  )

}

export default PDFDocument;
