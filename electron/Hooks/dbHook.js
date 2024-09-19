import { ipcMain } from 'electron';

const useDB = () => {


    const getCustomersNames = async (db) => {


        // Set up IPC handler for fetching customer names
        ipcMain.handle('fetch-Customers-Names', async () => {
            try {
                const collection = await db.collection('debt_db');
                console.log('Connected to collection:', collection.collectionName);
                const data = await collection.find({}).toArray(); // Ensure you convert it to array
                console.log('Data fetched in main process:', data);
                return data; // Return fetched customer data
            } catch (error) {
                console.error('Error fetching data in main process:', error);
                throw error; // Propagate the error
            }
        });


    };

    const getItemsInfo = async (db) => {


        // Set up IPC handler for fetching customer names
        ipcMain.handle('fetch-data', async () => {
            try {
                const collection = await db.collection('Items_db');
                console.log('Connected to collection:', collection.collectionName);
                const data = await collection.find({}).toArray();
                console.log('Data fetched in main process:', data);
                return data;
            } catch (error) {
                console.error('Error fetching data in main process:', error);
                throw error;
            }
        });

    };
    const InsertItemsInfo = async (db) => {


        // Set up IPC handler for fetching customer names

        ipcMain.handle('insert-data', async (event, item) => {
            try {
                const collection = db.collection('Items_db');
                const result = await collection.insertOne(item);
                return result.insertedId;
            } catch (error) {
                console.error('Error inserting data in main process:', error);
                throw error;
            }
        });
    };
    return {
        getCustomersNames,
        getItemsInfo,
        InsertItemsInfo // Return the function for external use
    };
};

export default useDB;
