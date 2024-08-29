import React from 'react';

const ItemView = ({ item }) => {
  return (
    <div>
      <h2>Scanned Item</h2>
      {item ? (
        <div>
          <p>Name: {item.name}</p>
          <p>Description: {item.description}</p>
        </div>
      ) : (
        <p>No item scanned yet.</p>
      )}
    </div>
  );
};

export default ItemView;
