import { toast } from "react-toastify";
const useDebt=()=>{


const addDebt=(data)=>{

    if (data && data.CustomerName && data.CustomerDebt) {
        toast.success(
          `تم اضافة دين جديد على حساب ${data.CustomerName} بقيمة ${data.CustomerDebt} شيكل بنجاح`,
          { autoClose: 2000, position: "top-center" }
        );
      } else {
        toast.error(
            `لم تتوفر المعلومات الكافيه لاضافة الدين`,
            { autoClose: 2000, position: "top-center" }
          );
      }
    
}

return {addDebt}
}

export default useDebt;

