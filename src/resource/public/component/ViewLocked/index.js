import React, { useState, useRef, Fragment } from 'react';

import { Terminal } from 'xterm';
import { PlayArrow, Pause } from '@mui/icons-material';
import { Modal, Button, Paper, CircularProgress } from '@mui/material';

import 'xterm/css/xterm.css';

const ViewLocked = ({ appEnv, appPath, appPlatform, buildApp }) => {
  const [isLoading, setLoading] = useState(false);

  const scriptBuild = useRef('');
  const scripOpenFile = useRef('');

  const _getPlatform = () => {

  }

  const _stop = () => buildApp();

  return (
    <Modal open={true} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }} >
      <Paper elevation={3} style={{ display: 'flex', flexDirection: 'column', padding: 16, paddingRight: 16, backgroundColor: '#FFFFFF', borderRadius: 12 }}>
        <div style={{ width: 800, height: 400, backgroundColor: '#000000' }}>
          <div id="output-terminate"></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 24, columnGap: 24 }}>
          <Button variant="contained" color="error" onClick={_stop}>Stop <Pause /></Button>
          <Button variant="contained" color="primary" disabled={!!isLoading} onClick={_getPlatform}>
            {!isLoading ? <Fragment>Build <PlayArrow /></Fragment> : <CircularProgress size={20} />}
          </Button>
        </div>
      </Paper>
    </Modal>
  )

}

export default ViewLocked;
