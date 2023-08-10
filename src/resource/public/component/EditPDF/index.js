import React, { useState, useEffect } from 'react';

import { Modal, Paper, Button } from '@mui/material';

const EditPDF = ({ items, path, readData, setShowModal, setFilePDF }) => {
  const [data, setData] = useState([...items?.map(el => ({ name: el, path: null, isUpdate: false }))]);

  const _apply = async () => {
    for (let i = 0; i < data.length; i++) {
      const _path = data?.[i]?.path;
      const _fileName = data?.[i]?.name;

      if (!!_path && _fileName) {
        const filePath = _path?.replaceAll(' ', '\\ ');

        await window.electron.ipcRenderer.invoke('exec.runScript', `cd ./src/resource && mkdir files`);
        await window.electron.ipcRenderer.invoke('exec.runScript', `cp -R ${filePath} ./src/resource/files`);

        await window.electron.ipcRenderer.invoke('fs.renameSync', `./src/resource/files/${_fileName}`, `./src/resource/files/${_fileName}`);
        await window.electron.ipcRenderer.invoke('exec.runScript', `cp -R ./src/resource/files/${_fileName} ${path}`);
        await window.electron.ipcRenderer.invoke('fs.unlinkSync', `./src/resource/files/${_fileName}`);
      }
    }

    await readData();

    setShowModal();
  }

  const _getIconFile = async event => {
    const inputFiles = event?.nativeEvent?.target?.files || event?.dataTransfer?.files;

    if (!inputFiles?.[0]) return null;

    const _inputFiles = Array.from(inputFiles);
    const _items = [...data, ..._inputFiles.map(el => ({ name: el.name, path: el.path, isUpdate: false }))];

    const _data = [];
    for (let i = 0; i < _items.length; i++) {
      const _pdf = _items[i];
      const _elements = _items?.filter(el => (el.name === _pdf?.name));
      const _isExit = (_data?.findIndex(el => (el.name === _pdf?.name)) > -1);
      if (!_isExit) _data.push({
        name: _pdf.name,
        path: (_elements?.[0]?.path || _elements?.[1]?.path),
        isUpdate: !!_elements?.[1]?.path
      });
    }
    setData(_data);
  }

  const _openFolder = () => {
    const inputFolder = document.getElementById(`input-file-pdf`);
    if (typeof (inputFolder?.click) === 'function') inputFolder?.click?.();
  }

  const _close = () => setShowModal();

  useEffect(() => {
    setTimeout(() => {
      const holder = document.getElementById(`holder-file-pdf`);
      holder.ondragover = () => false;
      holder.ondrop = event => {
        event.preventDefault();
        _getIconFile(event);
      }
    }, 1000)
  }, [])

  const _renderItem = (item, index) => {
    const _pathFile = item?.path || `${path}/${item.name}`;
    return (
      <div style={{ display: 'flex', width: '24%' }} key={index}>
        <Button
          onClick={setFilePDF.bind(this, _pathFile)}
          style={{ flex: 1, borderWidth: 1, borderColor: '#000000', borderRadius: 4, borderStyle: 'dashed', marginLeft: 4, padding: 6, paddingRight: 8, paddingLeft: 8 }}
        >
          <span style={{ fontSize: 14, color: '#38383D', fontWeight: 'bold', textTransform: 'none' }}>{item.name}</span>
          {!!item.isUpdate ?
            <span style={{ fontSize: 12, marginLeft: 12, textTransform: 'none' }}>Edit</span>
            :
            !!item?.path ?
              <span style={{ fontSize: 12, marginLeft: 12, textTransform: 'none' }}>New</span>
              :
              <span />
          }
        </Button>
      </div>
    )
  }

  return (
    <Modal open={true} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} style={{ padding: 16, paddingTop: 16, maxWidth: '90%' }}>

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }} id={`holder-file-pdf`}>
          <Button
            onClick={_openFolder}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100, borderWidth: 1, borderColor: 'rgba(0,0,0,0.25)', borderRadius: 4, borderStyle: 'dashed', marginLeft: 4, marginBottom: 24 }}>
            <div style={{ color: 'rgba(0,0,0,0.5)' }}>Select files or drag and drop here</div>
            <input type='file' hidden={true} accept="application/pdf" multiple={true} id={`input-file-pdf`} onChange={_getIconFile} />
          </Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {data?.map?.(_renderItem)}
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
