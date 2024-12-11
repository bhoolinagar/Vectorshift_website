import React from "react";
import "./AlertBox.css";
import resultIcon from 'C:/Users/bhool/Downloads/frontend-bhooli/frontend/src/assets/result.png';

export const AlertBox = ({ title, message, onClose }) => {
  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <div className="alert-icon">
        <img src={resultIcon} alt="custom Icon" className="Images" />
       
        </div>
        <h2 className="alert-title">{title}</h2>
        <p className="alert-message">{message}</p>
        <button className="alert-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};
