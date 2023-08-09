import { create } from 'zustand';

export const timeoutSleep = (ms) => new Promise((res) => setTimeout(res, ms));

export const getFolderPath = filePath => {
  const _path = filePath?.split?.('/');
  _path?.pop();

  return _path?.join('/');
}

export const getImageDimensions = async url => {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve({ with: img.width, height: img.height });
    img.src = `file://${url}`;
  });
}

export const getKeyValueItem = string => {
  const valueKey = string?.split?.(':')?.[0];
  const valueItem = string?.replaceAll?.(valueKey, '')?.substr(1)?.replaceAll(',', '')?.replaceAll(`'`, '')?.replaceAll(`"`, '')?.trim();
  return [valueKey, valueItem];
}

export const useAppStore = create((set) => ({
  appEnv: 'UAT',
  appPath: '',
  appPlatform: 'Android',

  updateEnv: params => set(() => ({ appEnv: params })),
  updatePath: params => set(() => ({ appPath: params })),
  updatePlatform: params => set(() => ({ appPlatform: params }))
}));
