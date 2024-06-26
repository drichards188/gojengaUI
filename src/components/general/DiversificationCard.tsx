import { Grid } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import styles from "./common.module.css";
import "./DiversificationCard.css";

const DiversificationCard = (props: any) => {

  return (
    <Grid container justifyContent="center">
      <Grid
        item
        xs={12}
        className={styles.statContainer}
        style={{ backgroundColor: "rgba(0,0,0,.1)", minHeight: "25vh" }}
      >
        <Typography variant="h4" component="h4" mb="1%">
          {props.name}
        </Typography>
        <Typography variant="h5" sx={{ color: "primary.light" }}>
          {props.symbol}
        </Typography>
        <Typography variant="h4">correlation</Typography>
        <Typography variant="h5" sx={{ color: "secondary.light" }}>
          {props.corr}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DiversificationCard;
