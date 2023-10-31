import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAccessToken, getSharpeRatio } from "../banking/bankingAPI";

const SharpeRatio = (props: any) => {
  let symbol = props.symbol;
  const jwtToken = getAccessToken();
  const [sharpeRatio, setSharpeRatio] = useState(0.0);
  const [sharpeEval, setSharpeEval] = useState("");

  useEffect(() => {
    async function getRatio() {
      let response = await getSharpeRatio(symbol, jwtToken);
      let sharpeRatio = response.data.ratio;
      let sharpeEval = response.data.eval;
      // alert(`ratio is ${sharpeRatio}`);
      if (sharpeRatio) {
        setSharpeRatio(sharpeRatio);
      }
      if (sharpeEval) {
        setSharpeEval(sharpeEval);
      }
    }
    getRatio();
  }, [props.symbol]);

  return (
    <Grid item sm={12}>
      <p>Sharpe Ratio</p>
      <p>{sharpeRatio}</p>
      <p>{sharpeEval}</p>
    </Grid>
  );
};

export default SharpeRatio;
