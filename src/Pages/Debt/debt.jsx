/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import useDebt from "../../../electron/Hooks/DebtHook.js";
import "./debt.css";
import { DataContext } from "../../Provider/DataProvider";

// eslint-disable-next-line react/prop-types
const DebtModel = ({ List,onClose, totalPrice }) => {
  const { DebtUser } = useContext(DataContext);

  const [customerNames, setCustomerNames] = useState([]);

  const [selectedCus, setSelectedCus] = useState("");
  const { addDebt } = useDebt();

  const HandleSubmit = (e) => {
    e.preventDefault();
    const element= []
    for (let index = 0; index < List.length; index++) 
      element[index]=List[index].productName;
    addDebt({CustomerName:selectedCus,CustomerDebt:totalPrice,CustomerList:element});
    onClose(); // Close the modal after form submission
  };

  const userNameSearch = (value) => {
    // Filter DebtUser based on whether the value is included in each element
    if (value) {
      const filtered = DebtUser.filter(db => db.includes(value));
      setCustomerNames(filtered);
    } else {
      setCustomerNames([]);
    }
  };

  return (
    <div className="debt-model-container">
      <div className="debt-model">
        <button className="close-button" onClick={onClose}>×</button>
        <h2 className='hidder'>الدين</h2>

        <form className='add-debt-form' onSubmit={HandleSubmit}>
          <div>
            <div>
              <label>اسم الزبون:</label>
              <input required onChange={(e) => { userNameSearch(e.target.value) }} type="text" />
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
                  <option key={index} value={name}>{name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="">قيمة الدين الجديد:</label>
              <input  type="text"  readOnly defaultValue={totalPrice} name="totalize" />
            </div>
          </div>
          <div className='button-debt'>
            <button className="button-5" type='submit'>اضافة دين جديد</button>
            <button className="button-5" type='button' onClick={onClose}>عرض جميع دين <br />الخاص بالزبون الحالي</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DebtModel;
