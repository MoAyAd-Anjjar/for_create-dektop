/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-binary-expression */
import React, { useState, useEffect, useContext } from "react";
import noitem from "../../Images/nopro.png";
import { DataContext } from "../Provider/DataProvider";

const ItemView = () => {
  const [itemsView, setItemsView] = useState([]);
  const { Items, getAllData } = useContext(DataContext);
  const [noprodeuct, setnoprodeuct] = useState("");
  const [imgPaths, setImgPaths] = useState({}); // State to store image paths for items

  useEffect(() => {
    const NoProdeuctIMG = async () => {
      var imagePath = await getImagePath("nopro");
      setnoprodeuct(imagePath);
    };
    NoProdeuctIMG()
    if (Items.length > 0) {
      const filteredItems = getAllData.filter((itm) =>
        Items.includes(itm.productBarcode)
      );
      setItemsView(filteredItems);
      
      
      


      
    } else {
      setItemsView([]);
    }
  }, [Items, getAllData]);

  useEffect(() => {
    // Fetch images for all items when the itemsView changes
    const fetchImagePaths = async () => {
      const paths = {};
      for (const item of itemsView) {
        const imagePath = await getImagePath(item.productName);
        paths[item.productName] = imagePath;
      }
      setImgPaths(paths); // Set all image paths at once
    };

    if (itemsView.length > 0) {
      fetchImagePaths();
    }
  }, [itemsView]);

  const getImagePath = async (productName) => {
    if (window.electron) {
      try {
        const imagePath = await window.electron.getimgpath(productName);
        return imagePath;
      } catch (error) {
        console.error("Error get path data:", error);
      }
    } else {
      console.error("window.electron is undefined");
    }
    return null; // Fallback if something goes wrong
  };

  return (
    <div className={"view-style"}>
      {itemsView.length > 0 ? (
        <div className="wrapper" >
          {itemsView.map((item) => (
            <div key={item} className="item-view-style">
              <img
                src={imgPaths[item.productName] || "No Image"}
                alt={item.productName}
              />
              <span>{item.productName}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="view-styel-noitmeimg">
          <img src={noprodeuct} alt="لا يوجد منتجات بعد" />
          <p>لا يوجد منتجات بعد.</p>
        </div>
      )}
    </div>
  );
};

export default ItemView;
