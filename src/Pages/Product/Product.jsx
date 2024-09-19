/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { toast } from "react-toastify";
import "./Product.css";

const Product = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [newItemInfo, setNewItemInfo] = useState({
    productName: '',
    productPrice: '',
    productBarcode: ''
  });
  const [imgPaths, setImgPaths] = useState({}); // State to store image paths for items
  const fileInputRef = useRef(null);

  const handleImageClick = (e) => {
    e.stopPropagation(); // Prevent click event from propagating
    fileInputRef.current.click(); // Trigger the file input click
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage({ url: imageURL, name: file.name });
    }
  };

  useEffect(() => {
    const getImagePath = async (productName) => {
      if (window.electron) {
        try {
          const imagePath = await window.electron.getimgpath("ADD-ITEM.png");
          setImgPaths(imagePath)
        } catch (error) {
          console.error('Error get path data:', error);
        }
      } else {
        console.error('window.electron is undefined');
      }
      return null; // Fallback if something goes wrong
    };
 
    getImagePath()
    return () => {
      if (selectedImage && selectedImage.url) {
        URL.revokeObjectURL(selectedImage.url);
      }
    };
  }, [selectedImage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItemInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      toast.error("يرجى تحديد صورة أولاً", { autoClose: 2000, position: "top-center" });
      return; // Exit the function if no image is selected
    }

    toast.success("!تم اضافة منتج جديد بنجاح", { autoClose: 2000, position: "top-center" });

    // Add image URL to newItemInfo
    const itemWithImage = { ...newItemInfo, productImage: selectedImage.url };

    // Insert data into MongoDB
    if (window.electron) {
      try {
        await window.electron.insertData(itemWithImage);
        onClose(); // Close the modal after successful submission
      } catch (error) {
        console.error('Error inserting data:', error);
      }
    } else {
      console.error('window.electron is undefined');
    }

    // Trigger download if an image is selected
    const link = document.createElement('a');
    link.href = selectedImage.url;
    link.download = `${newItemInfo.productName}.png`; // Desired filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="product-container">
      <div className="product">
        <button className="close-button" onClick={onClose}>×</button>
        <h2 className='hidder'>تفاصيل المنتج</h2>
        <form onSubmit={handleSubmit}>
          <div className='flex-div'>
            <div className='info-text-rap'>
              <div className='product-label'>
                <label>اسم المنتج:</label>
                <input
                  required
                  type="text"
                  name="productName"
                  value={newItemInfo.productName}
                  onChange={handleInputChange}
                />
                <label>سعر المنتج:</label>
                <input
                  required
                  type="number"
                  name="productPrice"
                  value={newItemInfo.productPrice}
                  onChange={handleInputChange}
                />
                <label>رقم المنتج (brcode):</label>
                <input
                  required
                  type="text"
                  name="productBarcode"
                  value={newItemInfo.productBarcode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className='pro-img'>
              <label htmlFor="image-upload">صورة المنتج:</label>
              <input
                type="file"
                id="image-upload"
                ref={fileInputRef}
                style={{ display: 'none' }} // Hide the file input
                onChange={handleImageChange}
                accept="image/*"
              />
              <img
                src={selectedImage ? selectedImage.url : "D:/myproject/for_create-dektop-main/dist/win-unpacked/resources/Images/ADD-ITEM.png"}
                alt="Product Preview"
                onClick={handleImageClick}
              />
            </div>
          </div>
          <div className='under-button-pro'>
            <button className="button-30" type='submit'>اضافة منتج</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
