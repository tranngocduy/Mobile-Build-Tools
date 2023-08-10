import React from 'react';

import { useAppStore } from '@app-utils';

import ItemImage from '@app-component/ItemImage';

const SplashScreen = () => {
  const appPath = useAppStore(state => state.appPath);

  const _hdpi = { name: 'launch_screen.png', size: { width: 1125, height: 2001 } };
  const _mdpi = { name: 'launch_screen.png', size: { width: 750, height: 1334 } };
  const _xhdpi = { name: 'launch_screen.png', size: { width: 1500, height: 2668 } };
  const _xxhdpi = { name: 'launch_screen.png', size: { width: 2250, height: 4002 } };
  const _xxxhdpi = { name: 'launch_screen.png', size: { width: 3000, height: 5336 } };

  return (
    <div>
      <h4>Splash Screen</h4>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', columnGap: 48 }}>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', rowGap: 8 }}>
          <ItemImage item={_hdpi} isMustMatch={true} path={`${appPath}/android/app/src/main/res/drawable-hdpi`} />
          <span style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>drawable-hdpi</span>
        </div>

        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', rowGap: 8 }}>
          <ItemImage item={_mdpi} isMustMatch={true} path={`${appPath}/android/app/src/main/res/drawable-mdpi`} />
          <span style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>drawable-mdpi</span>
        </div>

        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', rowGap: 8 }}>
          <ItemImage item={_xhdpi} isMustMatch={true} path={`${appPath}/android/app/src/main/res/drawable-xhdpi`} />
          <span style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>drawable-xhdpi</span>
        </div>

        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', rowGap: 8 }}>
          <ItemImage item={_xxhdpi} isMustMatch={true} path={`${appPath}/android/app/src/main/res/drawable-xxhdpi`} />
          <span style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>drawable-xxhdpi</span>
        </div>

        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', rowGap: 8 }}>
          <ItemImage item={_xxxhdpi} isMustMatch={true} path={`${appPath}/android/app/src/main/res/drawable-xxxhdpi`} />
          <span style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>drawable-xxxhdpi</span>
        </div>
      </div>
    </div>
  )

}

export default SplashScreen;
