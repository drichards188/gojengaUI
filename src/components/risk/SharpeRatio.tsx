import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getAccessToken,
  getCalcSymbols,
  getSharpeRatio,
} from "../banking/bankingAPI";

const SharpeRatio = (props: any) => {
  let symbol = props.symbol;
  const jwtToken = getAccessToken();
  const [sharpeRatio, setSharpeRatio] = useState(1.349);
  const [sharpeEval, setSharpeEval] = useState("");

  useEffect(() => {
    async function getRatio() {
      props.setIsLoading(true);
      let response = await getSharpeRatio(symbol, jwtToken);
      let sharpeRatio = response.data.sharpe_ratio;

      // todo actually evaluate the sharpe ratio
      let sharpeEval = "Good";
      if (sharpeRatio) {
        setSharpeRatio(sharpeRatio);
      }
      if (sharpeEval) {
        setSharpeEval(sharpeEval);
      }
      props.setIsLoading(false);
    }

    if (symbol !== "Symbol") {
      getRatio();
    }
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
