import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { WindowApiInterface } from './interfaces/window.api.interface';

// Custom APIs for renderer
const api: WindowApiInterface = {
  setWindowTitle: (title: string) => ipcRenderer.send('set-window-title', title),
  loadFiles: () => ipcRenderer.invoke('load-files'),
  loadFile: (filePath: string, mime: string) => ipcRenderer.invoke('load-file', filePath, mime),
  openFile: () => ipcRenderer.invoke('dialog:openFile')
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
