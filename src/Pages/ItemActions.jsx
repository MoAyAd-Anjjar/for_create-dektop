/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../Provider/DataProvider";
import DebtModel from "./Debt/debt";
import CreateDebtModel from "./Debt/create_debt_user";
import Product from "./Product/Product";
import { toast } from "react-toastify";
import { GrClearOption } from "react-icons/gr";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { RiEditBoxFill, RiUserAddFill } from "react-icons/ri";
import { MdCreate } from "react-icons/md";
import EditDebtModel from "./Debt/edit_debt_user";

const ItemActions = () => {
  const [itemsList, setItemsList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [clicked_2, setClicked_2] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [FullList, setFullList] = useState();
  const [clicked_3, setClicked_3] = useState(false);
  const [clicked_1, setClicked_1] = useState(false);
  const { Items, clearitems, getAllData } = useContext(DataContext);

  useEffect(() => {
    if (Items.length > 0) {
      const filteredItems = getAllData.filter((itm) =>
        Items.includes(itm.productBarcode)
      );
      setItemsList(filteredItems);
      setFullList({
        items: filteredItems?filteredItems:[],
        InsertTime: {
          day: new Date().toISOString().split("T")[0], // Extracts YYYY-MM-DD
          time: new Date().toISOString().split("T")[1].split(".")[0], // Extracts HH:MM:SS
          data: new Date().toUTCString(), // Full UTC Date-Time String
        },
      });
      const totals = filteredItems.reduce(
        (total, item) => total + Number(item.productPrice),
        0
      );
      setTotalPrice(totals);
    } else {
      setItemsList([]);
      setFullList([])
      setTotalPrice(0);
    }
  }, [Items, getAllData]);

  const openModal = (modal) => {
    if (modal == "add") setClicked_1(true);
    if (modal == "debt") setClicked(true);
    if (modal == "create") setClicked_2(true);
    if (modal == "edit") {
      setClicked_3(true);
    }
  };
  const closeProductModal = () => {
    setClicked_1(false);
    setClicked(false);
    setClicked_2(false);
    setClicked_3(false);
  };

  const onClear = () => {
    clearitems();
    console.log("Items after clear:", Items); // This may still show old values due to async state updates
    console.log("ItemsList before clear:", itemsList);

    toast.success("!تم ازالة المنتجات بنجاح", {
      autoClose: 2000,
      position: "top-center",
    });
  };

  return (
    <div className={"action-style"}>
      <div className="item-info">
        {itemsList.length > 0 ? (
          itemsList.map((itm, index) => (
            <div className="info" key={index}>
              <span>المنتج: {itm.productName}</span>
              <span>السعر: {itm.productPrice} شيكل</span>
            </div>
          ))
        ) : (
          <p>لا يوجد منتجات بعد.</p>
        )}
      </div>
      <div className="under">
        <span className="under-button">
          <button className="button-36" onClick={onClear}>
            <GrClearOption color="red"></GrClearOption>
          </button>
          <button className="button-36" onClick={() => openModal("debt")}>
            <FaMoneyBillTransfer color="green"></FaMoneyBillTransfer>
          </button>
          <button className="button-36" onClick={() => openModal("add")}>
            <RiEditBoxFill></RiEditBoxFill>{" "}
          </button>
          <button className="button-36" onClick={() => openModal("create")}>
            <RiUserAddFill color="purple"></RiUserAddFill>{" "}
          </button>
          <button className="button-36" onClick={() => openModal("edit")}>
            <MdCreate color="#e17914"></MdCreate>{" "}
          </button>

          {clicked && (
            <DebtModel
              List={itemsList}
              totalPrice={totalPrice}
              onClose={closeProductModal}
            />
          )}
          {clicked_1 && <Product onClose={closeProductModal} />}
          {clicked_2 && (
            <CreateDebtModel
              List={FullList?FullList:[]}
              totalPrice={totalPrice}
              onClose={closeProductModal}
            />
          )}
          {clicked_3 && <EditDebtModel onClose={closeProductModal} />}
        </span>
        <span>السعر الاجمالي: {totalPrice} شيكل</span>
      </div>
    </div>
  );
};

export default ItemActions;
