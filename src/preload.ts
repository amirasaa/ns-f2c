import { contextBridge, ipcRenderer } from 'electron';

export interface IElectronAPI {
    openFile: () => Promise<any>,
  }

declare global {
    interface Window {
      electronAPI: IElectronAPI;
    }
  }

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile')
});