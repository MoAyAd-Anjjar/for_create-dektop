import React, { useState } from 'react';
import ItemView from './ItemView';
import ItemActions from './ItemActions';
import './MainPage.css'; // For styling

const MainPage = () => {
  const [scannedItem, setScannedItem] = useState(null);

  // Function to simulate scanning an item
  const scanItem = (item) => {
    setScannedItem(item);
  };

  return (
    <div className="main-container">
      <div className="left-section">
        <ItemView item={scannedItem} />
      </div>
      <div className="right-section">
        <ItemActions item={scannedItem} onScan={scanItem} />
      </div>
    </div>
  );
};

export default MainPage;
