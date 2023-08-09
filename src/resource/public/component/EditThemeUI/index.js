import React, { useState } from 'react';

import { Button, Modal, Paper } from '@mui/material';

import { getImageDimensions } from '@app-utils';

const EditThemeUI = ({ item, path, imageSize, setShowModal }) => {
  const width = 300;
  const height = width * imageSize;

  const [src, setSrc] = useState(null);

  const _apply = async () => {
    await window.electron.ipcRenderer.invoke('exec.runScript', `cd ./src/resource && mkdir files`);
    await window.electron.ipcRenderer.invoke('exec.runScript', `cp -R ${src.file.path} ./src/resource/files`);

    await window.electron.ipcRenderer.invoke('fs.renameSync', `./src/resource/files/${src.file.name}`, `./src/resource/files/${item.name}`);
    await window.electron.ipcRenderer.invoke('exec.runScript', `cp -R ./src/resource/files/${item.name} ${path}`);
    await window.electron.ipcRenderer.invoke('fs.unlinkSync', `./src/resource/files/${item.name}`);
    
    setShowModal();
  }

  const _openFolder = () => {
    const inputFolderIcon = document.getElementById('input-file-icon');
    if (typeof (inputFolderIcon?.click) === 'function') inputFolderIcon?.click?.();
  }

  const _getIconFile = async event => {
    const inputFiles = event?.nativeEvent?.target?.files?.[0];

    if (!inputFiles?.path) return;

    const size = await getImageDimensions(inputFiles?.path);

    setSrc({ size, file: inputFiles });
  }

  const _onClose = () => setShowModal();

  return (
    <Modal open={true} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} style={{ padding: 16, paddingTop: 16 }}>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', width, height, backgroundColor: '#8DE1AF', padding: 8 }}>
              <img src={`file://${path}/${item?.name}?${Date.now()}`} style={{ flex: 1 }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 12, fontSize: 16, color: '#000000', fontWeight: 'bold' }}>
              {item?.size?.width} x {item?.size?.height}
            </div>
          </div>

          <div style={{ width: 1, marginRight: 16, marginLeft: 16, backgroundColor: '#e0e0e0' }} />

          <div style={{ flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', width, height, backgroundColor: '#8DE1AF', padding: 8, overflow: 'hidden' }}>
              {!!src && <img src={`file://${src?.file?.path}?${Date.now()}`} style={{ flex: 1 }} />}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 12, fontSize: 16, color: '#000000', fontWeight: 'bold' }}>
              {!!src ? `${src?.size?.width} x ${src?.size?.height}` : '---'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', columnGap: 12, marginTop: 24 }}>
          <Button variant="outlined" color='error' style={{ textTransform: 'none' }} onClick={_openFolder}>
            Select new image {item.name}
            <input type='file' hidden={true} accept='image/*' id='input-file-icon' onChange={_getIconFile} />
          </Button>
          <div style={{ display: 'flex', flexDirection: 'row', columnGap: 12 }}>
            <Button variant="outlined" style={{ textTransform: 'none' }} onClick={_onClose}>Cancel</Button>
            <Button variant="contained" disabled={!src?.file?.path} onClick={_apply}>Apply</Button>
          </div>
        </div>
      </Paper>
    </Modal>
  )

}

export default EditThemeUI;
