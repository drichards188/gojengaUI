import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { useState, createContext } from "react";
import Card from "./Card";
import { Grid } from "@mui/material";

//trying to do object destructuring on props
export const Cards = ({ cardData }: any) => {
  return (
    <Grid container md={12} alignContent="center" justifyContent="center">
      <Grid item md={12}>
        <p>Portfolio</p>
      </Grid>
      <Grid item md={12}>
        {cardData.map((coinData: any) => (
          <Card key={coinData.id} data={coinData} />
        ))}
      </Grid>
    </Grid>
  );
};

export default Cards;
