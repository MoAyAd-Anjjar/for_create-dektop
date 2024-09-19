/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import "./debt.css";
import { DataContext } from "../../Provider/DataProvider";

// eslint-disable-next-line react/prop-types
const CreateDebtModel = ({ onClose }) => {
    const { DebtUser } = useContext(DataContext);

    const [customerNames, setCustomerNames] = useState([]);

    const [selectedCus, setSelectedCus] = useState("");


    const HandleSubmit = (e) => {
        e.preventDefault();
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
                <h2 className='hidder'>معلومات الزبون</h2>

                <form className='add-debt-form' onSubmit={HandleSubmit}>
                    <div>
                        <div>
                            <label>اسم الزبون:</label>
                            <input required onChange={(e) => { userNameSearch(e.target.value) }} type="text" />
                        </div>
                        <div>
                            <label>القيمه الاوليه:</label>
                            <input required onChange={(e) => { userNameSearch(e.target.value) }} type="number" />

                     
                            
                        </div>

                    </div>
                    <div className='button-debt'>
                        <button className="button-5" type='submit'>اضافة زبون جديد</button>
                        <button className="button-5" type='submit'>&nbsp;ازالة زبون الحالي</button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateDebtModel;
