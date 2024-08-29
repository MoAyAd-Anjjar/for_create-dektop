import React from 'react';

const ItemActions = ({ item, onScan }) => {
  const handleScan = () => {
    const exampleItem = { name: 'Example Item', description: 'This is an example.' };
    onScan(exampleItem);
  };

  return (
    <div>
      <h2>Item Actions</h2>
      {item ? (
        <div>
          <button onClick={() => alert(`Action 1 on ${item.name}`)}>Action 1</button>
          <button onClick={() => alert(`Action 2 on ${item.name}`)}>Action 2</button>
        </div>
      ) : (
        <button onClick={handleScan}>Scan Item</button>
      )}
    </div>
  );
};

export default ItemActions;
