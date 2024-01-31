"use client";
import React, { useEffect } from "react";

const Button = ({ children, text }) => {
  const handleClick = () => {
    console.log("log click value", text
    );
  };

  return (
    <button
      id="myButton"
      style={{
        padding: "8px",
        margin: "4px",
        border: "1px solid black",
        borderRadius: 16,
      }}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
