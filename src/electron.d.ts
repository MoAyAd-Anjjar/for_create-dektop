// src/electron.d.ts
interface Window {
    electron: {
      fetchData: () => Promise<any>;
      insertData: (item: any) => Promise<any>;
    };
  }
  