/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import "./debt.css";
import { DataContext } from "../../Provider/DataProvider";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const CreateDebtModel = ({ onClose, totalPrice, List }) => {
  const { DebtUser } = useContext(DataContext);
  const [customerName, setCustomerName] = useState("");
  const [initialValue, setinitialValue] = useState(totalPrice);


  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (customerName && initialValue > 0 && List.length != 0) {
      List={...List,customerName:customerName,Debt:initialValue}
      if (window.electron) {
        try {
          const res=await window.electron.CreateUserDebt(List);
          console.log(res);
          if(res)
            toast.success("تم عملة الانشاء بنجاح")
          else
          toast.error("حدث خطا ربما اسم العميل موجود بالفعل", { style: { direction: "rtl" } });
          
        } catch (error) {
          console.error("Error sending data:", error);
        }
      } else {
        console.error("window.electron is undefined");
      }
      onClose();
    } else
      toast.error(
        "الرجاء إدخال اسم العميل وقيمة الدين بشكل صحيح، والتأكد من محتويات السلة.",
        { style: { direction: "rtl" } }
      );
  };

  const getUserName = (value) => {
    if (value) {
      setCustomerName(value);
    }
  };

  return (
    <div className="debt-model-container">
      <div className="debt-model">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2 className="hidder">معلومات الزبون</h2>

        <form className="add-debt-form" onSubmit={HandleSubmit}>
          <div>
            <div>
              <label>اسم الزبون:</label>
              <input
                onChange={(e) => {
                  getUserName(e.target.value);
                }}
                type="text"
              />
            </div>
            <div>
              <label>القيمه الاوليه:</label>
              <input
                defaultValue={totalPrice}
                onChange={(e) => {
                  setinitialValue(e.target.value);
                }}
                type="number"
              />
            </div>
          </div>
          <div className="button-debt">
            <button className="button-5" type="submit">
              اضافة زبون جديد
            </button>
            <button className="button-5" type="button">
              &nbsp;ازالة زبون الحالي
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDebtModel;
