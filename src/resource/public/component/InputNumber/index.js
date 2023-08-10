import React, { useRef } from 'react';

import { IconButton } from '@mui/material';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';

const InputNumber = ({ title, initial, step, fixed, onChange }) => {
  const valueRef = useRef(initial);

  const _updateUp = () => {
    const value = (Number(valueRef.current.innerText) + step).toFixed(fixed);
    valueRef.current.innerText = value;
    onChange(valueRef.current.innerText);
  }

  const _updateDown = () => {
    const value = (Number(valueRef.current.innerText) - step).toFixed(fixed);

    if (value >= 1) {
      valueRef.current.innerText = value;
      onChange(valueRef.current.innerText);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingRight: 12, paddingLeft: 12, borderWidth: 1, borderColor: '#BFBFBF', borderRadius: 4, borderStyle: 'solid' }}>
      <div style={{ marginRight: 4, fontSize: 14, color: '#38383D' }}>{title}:</div>
      <span style={{ width: 30, marginLeft: 4, fontSize: 14, color: '#38383D', fontWeight: 'bold', textAlign: 'center' }} ref={valueRef}>{initial}</span>
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 4 }}>
        <IconButton size='small' style={{ width: 15, height: 15 }} onClick={_updateUp}><ArrowDropUp /></IconButton>
        <IconButton size='small' style={{ width: 15, height: 15 }} onClick={_updateDown}><ArrowDropDown /></IconButton>
      </div>
    </div>
  )

}

export default InputNumber;
