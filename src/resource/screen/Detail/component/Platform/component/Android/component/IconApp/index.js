import React, { useState } from 'react';

import { Button } from '@mui/material';

import { useAppStore } from '@app-utils';

import ItemImage from '@app-component/ItemImage';

const IconApp = () => {
  const appPath = useAppStore(state => state.appPath);

  const [type, setType] = useState(null);

  const _store = { name: 'ic_launcher-playstore.png', size: { width: 512, height: 512 } }

  const _hdpi = [['ic_launcher.png', '72 x 72'], ['ic_launcher_round.png', '72 x 72'], ['ic_launcher_foreground.png', '162 x 162']];

  const _mdpi = [['ic_launcher.png', '48 x 48'], ['ic_launcher_round.png', '48 x 48'], ['ic_launcher_foreground.png', '108 x 108']];

  const _xhdpi = [['ic_launcher.png', '96 x 96'], ['ic_launcher_round.png', '96 x 96'], ['ic_launcher_foreground.png', '216 x 216']];

  const _xxhdpi = [['ic_launcher.png', '144 x 144'], ['ic_launcher_round.png', '144 x 144'], ['ic_launcher_foreground.png', '324 x 324']];

  const _xxxhdpi = [['ic_launcher.png', '192 x 192'], ['ic_launcher_round.png', '192 x 192'], ['ic_launcher_foreground.png', '432 x 432']];

  const _setShowModal = (value) => setType(type);

  const _renderItem = (path, value, index) => {
    const _size = value?.[1]?.split(' x ');
    const item = { name: value[0], size: { width: +_size[0], height: +_size[1] } };
    return <ItemImage widthSize={40} isView={true} isHideTitle={true} isMustSize={true} item={item} path={path} key={index} />;
  }

  return (
    <div>
      <h4>Icon</h4>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }}>
          <ItemImage widthSize={150} item={_store} path={`${appPath}/android/app/src/main`} isMustSize={true} />
          <span style={{ marginTop: 8, fontSize: 14 }}>(Used to declare the application icon on the play store)</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 24 }}>

          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', columnGap: 48 }}>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', rowGap: 12 }}>
              <div style={{ display: 'flex', flex: 1, flexDirection: 'row', columnGap: 12 }}>
                {_hdpi.map(_renderItem.bind(this, `${appPath}/android/app/src/main/res/mipmap-hdpi`))}
              </div>
              <span style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>mipmap-hdpi</span>
              <Button variant="outlined" style={{ padding: 0, textTransform: 'none' }} onClick={_setShowModal.bind(this, 'mipmap-hdpi')}>Change Icon</Button>
            </div>


            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', rowGap: 12 }}>
              <div style={{ display: 'flex', flex: 1, flexDirection: 'row', columnGap: 12 }}>
                {_mdpi.map(_renderItem.bind(this, `${appPath}/android/app/src/main/res/mipmap-mdpi`))}
              </div>
              <span style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>mipmap-mdpi</span>
              <Button variant="outlined" style={{ padding: 0, textTransform: 'none' }} onClick={_setShowModal.bind(this, 'mipmap-mdpi')}>Change Icon</Button>
            </div>
          </div>


          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', columnGap: 48 }}>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', rowGap: 12 }}>
              <div style={{ display: 'flex', flex: 1, flexDirection: 'row', columnGap: 12 }}>
                {_xhdpi.map(_renderItem.bind(this, `${appPath}/android/app/src/main/res/mipmap-xhdpi`))}
              </div>
              <span style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>mipmap-xhdpi</span>
              <Button variant="outlined" style={{ padding: 0, textTransform: 'none' }} onClick={_setShowModal.bind(this, 'mipmap-xhdpi')}>Change Icon</Button>
            </div>

            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', rowGap: 12 }}>
              <div style={{ display: 'flex', flex: 1, flexDirection: 'row', columnGap: 12 }}>
                {_xxhdpi.map(_renderItem.bind(this, `${appPath}/android/app/src/main/res/mipmap-xxhdpi`))}
              </div>
              <span style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>mipmap-xxhdpi</span>
              <Button variant="outlined" style={{ padding: 0, textTransform: 'none' }} onClick={_setShowModal.bind(this, 'mipmap-xxhdpi')}>Change Icon</Button>
            </div>
          </div>

          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', columnGap: 48 }}>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', rowGap: 12 }}>
              <div style={{ display: 'flex', flex: 1, flexDirection: 'row', columnGap: 12 }}>
                {_xxxhdpi.map(_renderItem.bind(this, `${appPath}/android/app/src/main/res/mipmap-xxxhdpi`))}
              </div>
              <span style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>mipmap-xxxhdpi</span>
              <Button variant="outlined" style={{ padding: 0, textTransform: 'none' }} onClick={_setShowModal.bind(this, 'mipmap-xxxhdpi')}>Change Icon</Button>
            </div>

            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', rowGap: 12 }} />
          </div>

        </div>
      </div>
    </div>
  )

}

export default IconApp;
