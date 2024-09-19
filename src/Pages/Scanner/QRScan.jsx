import React, { useRef, useCallback, useEffect, useState } from "react";
import Webcam from "react-webcam";
import Quagga from "quagga";
import { useContext } from "react";
import { DataContext } from "../../Provider/DataProvider";

const WebcamBarcodeScanner = ({ onClose, visible }) => {
  const webcamRef = useRef(null);
  const { Items, addItem } = useContext(DataContext);
 
  const handleBarcodeDetected = useCallback(
    (data) => {
      if (data && data.codeResult && data.codeResult.code) {
        addItem(data.codeResult.code)
        console.log(data.codeResult.code);
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (webcamRef.current) {
      const video = webcamRef.current.video;

      Quagga.init(
        {
          inputStream: {
            type: "LiveStream",
            constraints: {
              width: 640,
              height: 480,
              facingMode: "environment",
            },
            target: video,
          },
          decoder: {
            readers: ["code_128_reader", "ean_reader", "ean_8_reader"], // Add more barcode formats here if needed
          },
        },
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
          Quagga.start();
        }
      );

      Quagga.onDetected(handleBarcodeDetected);

      return () => {
        Quagga.offDetected(handleBarcodeDetected);
        Quagga.stop();
      };
    }
  }, [handleBarcodeDetected]);

  return (
    <div
      className="webcam-overlay"
      style={{ display: visible ? "block" : "none" }} // Toggle visibility
    >
      <Webcam ref={webcamRef} className="webcam" />
      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default WebcamBarcodeScanner;
