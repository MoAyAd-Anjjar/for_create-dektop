/* eslint-disable no-undef */
import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import path from 'path';
import useDB from './Hooks/dbHook.js';
import useDebt from './Hooks/DebtHook.js';

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let db;

// MongoDB connection details
const { getCustomersNames, getItemsInfo, InsertItemsInfo } = useDB();
const { CreateUserDebt } = useDebt();

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri); // ✅ Removed deprecated options

const connectToDb = async () => {
  try {
    await client.connect();
    const db = client.db('ITEMS_DB'); // Replace with your actual database name
    console.log('Connected to MongoDB successfully');
    return db;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};


async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    icon: path.join(__dirname, 'assets/icons/icon.ico'), // for Windows
    webPreferences: {
      preload: path.join(__dirname, '../electron/preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      devTools:process.env.NODE_ENV === 'development'
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173/');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    mainWindow.setMenuBarVisibility(false);
    mainWindow.removeMenu();
  }
}
app.commandLine.appendSwitch('disable-autofill-keyboard-accessory-view');
app.commandLine.appendSwitch('disable-features', 'AutofillEnablePaymentsUpdate');

app.whenReady().then(async () => {
  await createWindow();
  
  try {
    // Ensure IPC handlers are registered only after the DB is ready
    db = await connectToDb();
    if (db) {
      console.log('Database connected, registering ipcMain handlers...');
      
      // Pass DB instance to hooks (assuming they are structured correctly)
      getCustomersNames(db);
      getItemsInfo(db);
      InsertItemsInfo(db);
      CreateUserDebt(db);
    } else {
      console.log('Database connection failed');
    }

    // IPC Handler for Image Path
    ipcMain.handle('GETIMG', (event, productName) => {
      const imagePath = path.join(process.resourcesPath, 'Images', `${productName}.png`);
      return imagePath;
    });

  } catch (error) {
    console.error('Error initializing main process:', error);
  }
});

// Quit the app when all windows are closed, except on macOS
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
