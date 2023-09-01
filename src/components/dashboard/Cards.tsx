import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { useState, createContext } from "react";
import Card from "./Card";
import { Grid } from "@mui/material";

export const Cards = ({ cardData }: any) => {
  if (cardData.length >= 0) {
    return (
      <Grid container md={12} alignContent="center" justifyContent="center">
        <Grid item md={12}>
          <a style={{ color: "#BA79F7" }}>Portfolio</a>
        </Grid>
        <Grid item md={12}>
          {cardData.map((coinData: any) => (
            <Card key={coinData.id} data={coinData} />
          ))}
        </Grid>
      </Grid>
    );
  } else {
    return <div></div>;
  }
};

export default Cards;
