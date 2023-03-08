import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { useState, createContext } from "react";
import Card from "./Card";

//trying to do object destructuring on props
export const Cards = ({ cardData }: any) => {
  return (
    <div>
      <div>
        {cardData.map((coinData: any) => (
          <Card key={coinData.id} data={coinData} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
