import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { useState, createContext } from "react";

const Card = (props: any) => {
  let { id, last, volume } = props.data;

  last = last.toFixed(4);
  volume = volume.toFixed(2);

  const divStyle = {
    display: "inline-block",
    marginRight: "25px",
    padding: "10px",
    backgroundColor: "#4d535c",
    color: "#4fc3f7",
  };

  return (
    <div style={divStyle}>
      <p>{id}</p>
      <p>${last}</p>
      <p>{volume}</p>
    </div>
  );
};

export default Card;
