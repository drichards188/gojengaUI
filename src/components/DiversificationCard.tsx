import { Grid } from "@mui/material";
import React from "react";

const DiversificationCard = (props: any) => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item sm={4} style={{ backgroundColor: "rgba(0,0,0,.1)" }}>
        <h5>{props.name}</h5>
        <h5>{props.symbol}</h5>
        <h4>correlation</h4>
        <h5>{props.corr}%</h5>
      </Grid>
    </Grid>
  );
};

export default DiversificationCard;
