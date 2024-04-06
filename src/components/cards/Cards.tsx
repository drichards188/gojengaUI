import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { useState, createContext } from "react";
import Card from "../card/Card";
import { Grid } from "@mui/material";

const Cards = ({ cardData }: any) => {
  if (cardData.length >= 0) {
    return (
      <Grid
        container
        direction="row"
        alignContent="center"
        justifyContent="center"
      >
        <Grid item md={12}>
          <Grid container spacing={2} justifyContent="space-evenly">
            {cardData.map((coinData: any) => (
              <Grid item xs={4} sm={4} md={2}>
                <Card key={coinData.id} data={coinData} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return <div></div>;
  }
};

export default Cards;
