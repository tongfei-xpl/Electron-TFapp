const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('clickThroughElement')
    el.addEventListener('mouseenter', () => {
      ipcRenderer.send('set-ignore-mouse-events', true, { forward: true })
    })
    el.addEventListener('mouseleave', () => {
      ipcRenderer.send('set-ignore-mouse-events', false)
    })
})


contextBridge.exposeInMainWorld('myAPI', {
    setUserselect: (data)=>{
      ipcRenderer.on('setUserselectBtn', data)
    },
    setBrowserWindow: (data)=>{
      ipcRenderer.on('setBrowserWindowBtn', data)
    },
    saveBrowserWindow: (data) => {
      ipcRenderer.send('saveBrowserWindowBtn', data);
    },



})
