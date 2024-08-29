const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
  // Add your APIs here
});
