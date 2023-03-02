import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { useState, createContext } from "react";
import { useAppDispatch } from "../../app/hooks";
import { removeCoinFromDisplayList } from "./dashboardSlice";

const Card = (props: any) => {
  let { id, last, volume } = props.data;

  const dispatch = useAppDispatch();

  last = last.toFixed(4);
  volume = volume.toFixed(2);

  const divStyle = {
    display: "inline-block",
    marginRight: "25px",
    padding: "10px",
    backgroundColor: "#363940",
    color: "#4fc3f7",
    boxShadow:
      "0px 3px 1px -2px rgba(112,76,182),0px 2px 2px 0px rgba(112,76,182,0.9),0px 1px 5px 0px rgba(82,0,130,0.12)",
  };

  const closeCardStyle = {
    display: "block",
    marginLeft: "10px",
    fontStyle: "normal",
    color: "#4fc3f7",
    width: "16px",
    height: "16px",
    cursor: "pointer",
  };

  return (
    <div style={divStyle}>
      <p
        style={closeCardStyle}
        onClick={() => {
          dispatch(removeCoinFromDisplayList(id));
        }}
      >
        X
      </p>
      <p>{id}</p>
      <p>${last}</p>
      <p>{volume}</p>
    </div>
  );
};

export default Card;
