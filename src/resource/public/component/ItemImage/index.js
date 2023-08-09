import React, { useState } from 'react';

import { Button } from '@mui/material';

import { getImageDimensions } from '@app-utils';

import ViewImage from '@app-component/ViewImage';

const ItemImage = ({ item, path, isMustSize }) => {
  const imageSize = (item.size.height / item.size.width);

  const width = 120;
  const height = (width * imageSize);

  const [src, setSrc] = useState(null);

  const _getIconFile = async event => {
    const inputFiles = event?.nativeEvent?.target?.files?.[0] || event?.dataTransfer?.files?.[0];

    if (!inputFiles?.path) return;

    const size = await getImageDimensions(inputFiles?.path);

    setSrc({ size, file: inputFiles });

    document.getElementById('input-file-icon').value = "";
  }

  const _openFolder = () => {
    const inputFolderIcon = document.getElementById('input-file-icon');
    if (typeof (inputFolderIcon?.click) === 'function') inputFolderIcon?.click?.();
  }

  const _onLoad = () => {
    const holder = document.getElementById(`holder-${item?.name}`);
    holder.ondragover = () => false;
    holder.ondrop = event => {
      event.preventDefault();
      _getIconFile(event);
    }
  }

  const _apply = async () => {
    const filePath = src.file.path?.replaceAll(' ', '\\ ');

    await window.electron.ipcRenderer.invoke('exec.runScript', `cd ./src/resource && mkdir files`);
    await window.electron.ipcRenderer.invoke('exec.runScript', `cp -R ${filePath} ./src/resource/files`);

    await window.electron.ipcRenderer.invoke('fs.renameSync', `./src/resource/files/${src.file.name}`, `./src/resource/files/${item.name}`);
    await window.electron.ipcRenderer.invoke('exec.runScript', `cp -R ./src/resource/files/${item.name} ${path}`);
    await window.electron.ipcRenderer.invoke('fs.unlinkSync', `./src/resource/files/${item.name}`);

    setSrc(null);
  }

  const _close = () => setSrc(null);

  return (
    <div>
      <Button style={{ margin: 0, padding: 0, borderRadius: 10 }} onClick={_openFolder}>
        <div style={{ width, height, padding: 8, borderWidth: 1, borderColor: 'rgba(0,0,0,0.25)', borderStyle: 'dashed', borderRadius: 10 }} id={`holder-${item?.name}`}>
          <img src={`file://${path}/${item.name}?${Date.now()}`} style={{ width, height, backgroundColor: '#8DE1AF' }} onLoad={_onLoad} />
          <input type='file' hidden={true} accept='image/*' id='input-file-icon' onChange={_getIconFile} />
        </div>
      </Button>

      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 8, rowGap: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>{item?.name}</span>
      </div>

      {!!src?.file?.path && <ViewImage item={item} src={src} path={path} imageSize={imageSize} apply={_apply} close={_close} />}
    </div>
  )

}

export default ItemImage;
