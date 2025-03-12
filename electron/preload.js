/* eslint-disable no-undef */
const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('electron', {
  fetchData: () => ipcRenderer.invoke('fetch-data'),
  insertData: (item) => ipcRenderer.invoke('insert-data', item),
  fetchCostumersNames: () => ipcRenderer.invoke('fetch-Customers-Names'),
  getimgpath: (productName) => ipcRenderer.invoke('GETIMG', productName),
  CreateUserDebt: (List) => ipcRenderer.invoke('Create-User-Debt',List)

});
