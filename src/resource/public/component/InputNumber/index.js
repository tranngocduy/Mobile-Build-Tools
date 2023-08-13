import React from 'react';

import { IconButton } from '@mui/material';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';

const InputNumber = ({ title, value, step, fixed, onChange }) => {

  const _updateUp = () => {
    const _value = (Number(value) + step).toFixed(fixed);

    onChange(_value);
  }

  const _updateDown = () => {
    const _value = (Number(value) - step).toFixed(fixed);

    if (_value >= 1) onChange(_value);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: 4, paddingBottom: 4, paddingRight: 8, paddingLeft: 8, borderWidth: 1, borderColor: '#BFBFBF', borderRadius: 4, borderStyle: 'solid' }}>
      <div style={{ marginRight: 4, fontSize: 14, color: '#38383D' }}>{title}:</div>
      <span style={{ width: 30, marginLeft: 4, fontSize: 14, color: '#38383D', fontWeight: 'bold', textAlign: 'center' }}>{(Number(value)).toFixed(fixed)}</span>
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 4 }}>
        <IconButton size='small' style={{ width: 15, height: 15 }} onClick={_updateUp}><ArrowDropUp /></IconButton>
        <IconButton size='small' style={{ width: 15, height: 15 }} onClick={_updateDown}><ArrowDropDown /></IconButton>
      </div>
    </div>
  )

}

export default InputNumber;
