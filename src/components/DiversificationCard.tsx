import { Grid } from "@mui/material";
import React from "react";

const DiversificationCard = (props: any) => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item sm={4} style={{ backgroundColor: "grey" }}>
        <p>{props.name}</p>
        <p>{props.symbol}</p>
      </Grid>
    </Grid>
  );
};

export default DiversificationCard;
