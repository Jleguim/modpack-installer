const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('chimbaland', {
    downloadMods: () => ipcRenderer.invoke('downloadMods'),
    copyMods: () => ipcRenderer.invoke('copyMods'),
    createProfile: () => ipcRenderer.invoke('createProfile')
})