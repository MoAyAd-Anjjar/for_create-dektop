/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from "react";
import { useEffect } from "react";

export const DataContext = createContext();

// eslint-disable-next-line react/prop-types
const DataProvider = ({ children }) => {
  
  // State to hold scanned items
  const [Items, setItems] = useState([]);
  const [getAllData, setgetAllData] = useState([])
  const [DebtUser, setDebtUser] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      if (window.electron) {
        try {
         
          const data = await window.electron.fetchData();
          setgetAllData(data)
          const Data = await window.electron.fetchCostumersNames();
          for (let index = 0; index < Data.length; index++) {
            DebtUser.push(Data[index].CustomerName);
            
          }
       
        
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        console.error('window.electron is undefined');
      }

      
    };
   

    fetchData();

  }, [Items]);



  // Function to add items to the state
  const addItem = (item) => {
   console.log(item);
   
    setItems((prevItems) => [...prevItems, item]);


  };
  const clearitems = () => {
    
    setItems([]);
  };
  
 

  return (
    <DataContext.Provider value={{ Items, addItem ,DebtUser,clearitems,getAllData}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
