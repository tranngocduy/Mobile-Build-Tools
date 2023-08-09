import React, { useState, useEffect } from 'react';

import { useAppStore, getImageDimensions } from '@app-utils';

import ItemThemeUI from '@app-component/ItemThemeUI';

const ThemeUI = () => {
  const [items, setItems] = useState(null);

  const appPath = useAppStore(state => state.appPath);
  const path = `${appPath}/src/public/assets/image/resource/themeUI`;

  const _readData = async () => {
    let _items = [];
    const result = await window.electron.ipcRenderer.invoke('fs.readdir', path);

    for (let i = 0; i < result?.length; i++) {
      const size = await getImageDimensions(`${path}/${result?.[i]}`);
      _items.push({ name: result?.[i], size });
    }

    _items = _items.sort((a, b) => (b?.size?.height - a?.size?.height));

    setItems(_items);
  }

  useEffect(() => { _readData(); }, []);

  const _renderItem = (item, index) => <ItemThemeUI item={item} path={path} key={index} />;

  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 24 }}>
      {items?.map?.(_renderItem)}
    </div>
  )

}

export default ThemeUI;
