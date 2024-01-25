import { Grid } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";

const DiversificationCard = (props: any) => {
  const typingStyle = {
    mb: "1%",
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid
        item
        xs={12}
        sx={{ borderColor: "primary.dark", border: 1, borderRadius: 1 }}
        style={{ backgroundColor: "rgba(0,0,0,.1)" }}
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
