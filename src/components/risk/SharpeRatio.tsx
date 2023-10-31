import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAccessToken, getSharpeRatio } from "../banking/bankingAPI";

const SharpeRatio = (props: any) => {
  let symbol = props.symbol;
  const jwtToken = getAccessToken();
  const [sharpeRatio, setSharpeRatio] = useState(0.0);

  // useEffect(() => {
  //
  //   getRatio().then((r) => alert(`got r as: ${r}`));
  // }, [props.symbol]);

  async function getRatio() {
    let response = await getSharpeRatio(symbol, jwtToken);
    let sharpeRatio = response.data.ratio;
    alert(`ratio is ${sharpeRatio}`);
    if (sharpeRatio) {
      setSharpeRatio(sharpeRatio);
    }
  }

  return (
    <Grid item sm={12}>
      <button onClick={() => getRatio()}>Get Ratio</button>
      <p>Sharpe Ratio</p>
      <p>{sharpeRatio}</p>
    </Grid>
  );
};

export default SharpeRatio;
