import { useState, useContext } from "react";
import { DataContext } from "../../Provider/DataProvider";
import * as XLSX from 'xlsx'; // Import XLSX correctly
import "./debt.css";

const CustomerModel = ({ List, onClose }) => {
  const { DebtUser } = useContext(DataContext); // List of customers
  const [selectedCus, setSelectedCus] = useState("");
  const [customerData, setCustomerData] = useState(null); // Customer data after selection

  // Sample function to fetch customer data (simulate an API call or fetch from state)
  const fetchCustomerData = (customerName) => {
    const purchases = List.filter(item => item.customerName === customerName);
    return purchases.length ? purchases : null;
  };

  // Handle customer selection
  const handleCustomerSelect = (e) => {
    const customerName = e.target.value;
    setSelectedCus(customerName);
    const data = fetchCustomerData(customerName);
    setCustomerData(data);
  };

  // Download function to export data to .xlsm format
  const handleDownload = () => {
    if (!customerData) return;

    const worksheet = XLSX.utils.json_to_sheet(customerData.map(item => ({
      ProductName: item.productName,
      Price: item.price,
      Date: item.date,
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customer Purchases");

    XLSX.writeFile(workbook, `${selectedCus}-purchases.xlsm`);
  };

  return (
    <div className="customer-model-container">
      <div className="customer-model">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Customer Purchase History</h2>

        <div>
          <label>Select Customer:</label>
          <select value={selectedCus} onChange={handleCustomerSelect} required>
            <option value="" disabled>Select a customer</option>
            {DebtUser.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
        </div>

        {customerData ? (
          <div className="customer-data">
            <h3>{selectedCus}'s Purchases</h3>
            <table className="customer-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {customerData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.productName}</td>
                    <td>{item.price}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="download-button" onClick={handleDownload}>
              Download XLSM
            </button>
          </div>
        ) : (
          <p>Select a customer to view their purchase history.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerModel;
