import React from 'react';

import { useAppStore } from '@app-utils';

import ItemImage from '@app-component/ItemImage';

const IconApp = () => {
  const appPath = useAppStore(state => state.appPath);
  const appProjectName = useAppStore(state => state.appProjectName);
  const path = `${appPath}/ios/${appProjectName}/Images.xcassets/AppIcon.appiconset`;

  const _store = { name: 'iTunesArtwork@2x.png', size: { width: 1024, height: 1024 } }
  const _icon20 = [['icon-20@2x.png', '40 x 40'], ['icon-20@3x.png', '60 x 60']];
  const _icon29 = [['icon-29@2x.png', '58 x 58'], ['icon-29@3x.png', '87 x 87']];
  const _icon40 = [['icon-40@2x.png', '80 x 80'], ['icon-40@3x.png', '120 x 120']];
  const _icon60 = [['icon-60@2x.png', '120 x 120'], ['icon-60@3x.png', '180 x 180']];

  const _renderItem = (path, value, index) => {
    const _size = value?.[1]?.split(' x ');
    const item = { name: value[0], size: { width: +_size[0], height: +_size[1] } };
    return <ItemImage widthSize={40} isMustMatch={true} item={item} path={path} key={index} />;
  }

  return (
    <div>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
        <h4>Icon App</h4>
      </div>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }}>
          <ItemImage widthSize={150} item={_store} path={path} isMustMatch={true} />
          <span style={{ marginTop: 8, fontSize: 14 }}>(Used to declare the application icon on the apple store)</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 24 }}>

          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', columnGap: 48 }}>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', rowGap: 12 }}>
              <div style={{ display: 'flex', flex: 1, flexDirection: 'row', columnGap: 12 }}>
                {_icon20.map(_renderItem.bind(this, path))}
              </div>
              <span style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>20pt</span>
            </div>

            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', rowGap: 12 }}>
              <div style={{ display: 'flex', flex: 1, flexDirection: 'row', columnGap: 12 }}>
                {_icon29.map(_renderItem.bind(this, path))}
              </div>
              <span style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>29pt</span>
            </div>
          </div>

          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', columnGap: 48 }}>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', rowGap: 12 }}>
              <div style={{ display: 'flex', flex: 1, flexDirection: 'row', columnGap: 12 }}>
                {_icon40.map(_renderItem.bind(this, path))}
              </div>
              <span style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>40pt</span>
            </div>

            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', rowGap: 12 }}>
              <div style={{ display: 'flex', flex: 1, flexDirection: 'row', columnGap: 12 }}>
                {_icon60.map(_renderItem.bind(this, path))}
              </div>
              <span style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>60pt</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )

}

export default IconApp;
