/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import { app, BrowserWindow,ipcMain  } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import useDB from './Hooks/dbHook.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let db;

// MongoDB connection details
// eslint-disable-next-line react-hooks/rules-of-hooks
const {getCustomersNames,getItemsInfo,InsertItemsInfo}= useDB()
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connectToDb = async () => {
  try {
    await client.connect();
    const db = client.db('ITEMS_DB'); // Replace with your database name
    console.log('Connected to MongoDB successfully');


    return db;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    icon: path.join(process.resourcesPath, 'Images', `download-256x256.icns`),
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '../electron/preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    mainWindow.setMenuBarVisibility(false);
    mainWindow.removeMenu();
  }
  mainWindow.webContents.openDevTools();
}

app.on('ready', async () => {
  createWindow();
  try {
    ipcMain.handle('GETIMG',async (event, productName) => {
      console.log("Fetching image...");
      const imagePath = await path.join(process.resourcesPath, 'Images', `${productName}.png`);
      return imagePath;
    });
    db = await connectToDb();
    console.log('Database connected, registering ipcMain handlers...');
    getCustomersNames(db)
    getItemsInfo(db)
    InsertItemsInfo(db)
    
    
  } catch (error) {
    console.error('Error initializing main process:', error);
  }

 

});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
