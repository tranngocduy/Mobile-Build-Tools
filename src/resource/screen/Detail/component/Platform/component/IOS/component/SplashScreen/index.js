import React from 'react';

import { useAppStore } from '@app-utils';

import ItemImage from '@app-component/ItemImage';

const SplashScreen = () => {
  const appPath = useAppStore(state => state.appPath);
  const appProjectName = useAppStore(state => state.appProjectName);
  const path = `${appPath}/ios/${appProjectName}/Images.xcassets/Image.imageset`;

  const _image = { name: 'Image.png', size: { width: 1500, height: 2668 } };
  const _image1x = { name: 'Image 1.png', size: { width: 1500, height: 2668 } };
  const _image2x = { name: 'Image 2.png', size: { width: 1500, height: 2668 } };

  return (
    <div>
      <h4>Splash Screen</h4>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', columnGap: 48 }}>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', rowGap: 8 }}>
          <ItemImage item={_image} isMustMatch={true} path={path} />
        </div>

        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', rowGap: 8 }}>
          <ItemImage item={_image1x} isMustMatch={true} path={path} />
        </div>

        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', rowGap: 8 }}>
          <ItemImage item={_image2x} isMustMatch={true} path={path} />
        </div>
      </div>
    </div>
  )

}

export default SplashScreen;
