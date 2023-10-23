import { Box, Grid, Paper } from "@mui/material";
import Header from "../../etc/Header";
import TradingViewWidget from "./TradingViewChart";

const Risk = () => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="baseline">
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item md={10}>
        <Paper elevation={6}>
          <h1>Risk</h1>
        </Paper>
      </Grid>
      <Grid item md={8}>
        <Paper elevation={10} style={{ height: "50vh" }}>
          <TradingViewWidget />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Risk;
