import { useState, useContext } from "react";
import useDebt from "../../../electron/Hooks/DebtHook.js";
import "./debt.css";
import { DataContext } from "../../Provider/DataProvider";
import CustomerModel from "./download debt_xlsm.jsx"; // Import the XLSM model

const DebtModel = ({ List, onClose, totalPrice }) => {
  const { DebtUser } = useContext(DataContext);
  const [customerNames, setCustomerNames] = useState([]);
  const [selectedCus, setSelectedCus] = useState("");
  const [clicked, setClicked] = useState(false);
  const { addDebt } = useDebt();

  const HandleSubmit = (e) => {
    e.preventDefault();
    const customerProducts = List.map(item => item.productName);
    addDebt({
      CustomerName: selectedCus,
      CustomerDebt: totalPrice,
      CustomerList: customerProducts,
    });
    onClose(); // Close the modal after form submission
  };

  const userNameSearch = (value) => {
    if (value) {
      const filtered = DebtUser.filter(db => db.includes(value));
      setCustomerNames(filtered);
    } else {
      setCustomerNames([]);
    }
  };

  return !clicked ? (
    <div className="debt-model-container">
      <div className="debt-model">
        <button className="close-button" onClick={onClose}>×</button>
        <h2 className='header'>اعدادات الدين الحالي</h2>

        <form className='add-debt-form' onSubmit={HandleSubmit}>
          <div>
            <div>
              <label>اسم الزبون:</label>
              <input
                required
                onChange={(e) => userNameSearch(e.target.value)}
                type="text"
              />
            </div>
            <div>
              <label>الزبائن المقترحه:</label>
              <select
                value={selectedCus}
                onChange={(e) => setSelectedCus(e.target.value)}
                required
                name="cus-select"
              >
                <option value="" disabled>اختار الزبون</option>
                {customerNames.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>قيمة الدين الجديد:</label>
              <input
                type="text"
                readOnly
                defaultValue={totalPrice}
                name="totalize"
              />
            </div>
          </div>
          <div className='button-debt'>
            <button className="button-5" type='submit'>
              اضافة دين جديد
            </button>
            <button
              className="button-5"
              type='button'
              onClick={() => {
                setClicked(true); // Set clicked to true to open the CustomerModel
                onClose(); // Close the DebtModel
              }}
            >
              عرض جميع دين <br />الخاص بالزبون الحالي
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <CustomerModel
      List={List.filter(item => item.customerName === selectedCus)} // Pass filtered data for the selected customer
      onClose={() => setClicked(false)} // Allow closing the CustomerModel by resetting the clicked state
    />
  );
};

export default DebtModel;
