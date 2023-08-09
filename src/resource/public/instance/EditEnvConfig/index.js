import React, { useRef } from 'react';

import { Modal, Button, Paper, TextField } from '@mui/material';

import { getKeyValueItem } from '@app-utils';

const EditEnvConfig = ({ appInfo, path, readData, setModal }) => {

  const infoRef = useRef([...appInfo]);

  const _apply = async () => {
    for (let i = 0; i < appInfo.length; i++) {
      const _envSetting = appInfo[i]?.replaceAll?.(`:`, `\\:`)?.replaceAll(`'`, `\\'`)
        ?.replaceAll(`/`, `\\/`)?.replaceAll(`.`, `\\.`)?.replaceAll(`"`, `\\"`)?.replaceAll(`,`, `\\,`);

      const _envScript = infoRef.current[i]?.replaceAll?.(`:`, `\\:`)?.replaceAll(`'`, `\\'`)
        ?.replaceAll(`/`, `\\/`)?.replaceAll(`.`, `\\.`)?.replaceAll(`"`, `\\"`)?.replaceAll(`,`, `\\,`);;

      const result = await window.electron.ipcRenderer.invoke(
        'exec.runScript',
        `find ${path} -type f -print0 | xargs -0 perl -pi -w -e "s/${_envSetting}/${_envScript}/g;"`
      );

      if (!!result?.data?.error) {
        alert('Can not load setting, please check file ENV');
        break;
      }
    }

    await readData();

    setModal();
  }

  const _onChangeText = (valueKeys, e) => {
    const value = e.nativeEvent.target.value;

    const index = infoRef.current?.findIndex?.(el => !!el?.includes(valueKeys));

    const item = infoRef.current[index]?.replaceAll(',', '');

    infoRef.current[index] = infoRef.current[index]?.replaceAll(item, `${valueKeys}: '${value}'`);
  }

  const _renderItem = (item, index) => {
    const [valueKey, valueItem] = getKeyValueItem(item);
    return <TextField style={{ width: '32.3%' }} label={valueKey} defaultValue={valueItem} onChange={_onChangeText.bind(this, valueKey)} key={index} />;
  }

  return (
    <Modal open={true} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} style={{ padding: 16, paddingTop: 36, maxWidth: '90%' }}>

        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 24, columnGap: 14 }}>
          {appInfo?.map?.(_renderItem)}
        </div>

        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', columnGap: 12, marginTop: 24, justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={setModal}>Cancel</Button>
          <Button variant="contained" onClick={_apply}>Apply</Button>
        </div>

      </Paper>
    </Modal>
  )

}

export default EditEnvConfig;
