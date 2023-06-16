import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { useState, createContext } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  removeCoinFromDisplayList,
  selectCoinDisplayList,
} from "./dashboardSlice";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styles from "../banking/Banking.module.css";
import { selectBankingUser, selectToken } from "../banking/bankingSlice";
import { updatePortfolio } from "./dashboardAPI";
import { getAccessToken } from "../banking/bankingAPI";

const Card = (props: any) => {
  let { id, last, volume } = props.data;

  const dispatch = useAppDispatch();

  const displayCoinData = useAppSelector(selectCoinDisplayList);

  // when deleting a coin this card still wants the quantity
  const [tradeAmount, setTradeAmount] = useState(0);

  const currentUser = useAppSelector(selectBankingUser);
  const token = getAccessToken();

  const currentUser = useAppSelector(selectBankingUser);
  const token = getAccessToken();

  last = last.toFixed(4);
  volume = volume.toFixed(2);

  useEffect(() => {
    if (id in displayCoinData) {
      const newTradeAmount = displayCoinData[id].quantity;
      setTradeAmount(newTradeAmount);
    }
  }, [displayCoinData]);

  const divStyle = {
    display: "inline-block",
    marginRight: "25px",
    padding: "10px",
    backgroundColor: "#363940",
    color: "#BA79F7",
    boxShadow:
      "0px 3px 1px -2px rgba(112,76,182),0px 2px 2px 0px rgba(112,76,182,0.9),0px 1px 5px 0px rgba(82,0,130,0.12)",
  };

  const closeCardStyle = {
    display: "block",
    marginLeft: "10px",
    fontStyle: "normal",
    color: "#BA79F7",
    width: "16px",
    height: "16px",
    cursor: "pointer",
  };

  return (
    <Grid
      container
      spacing={1}
      style={divStyle}
      md={2}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item md={2}>
        <p
          style={closeCardStyle}
          onClick={() => {
            dispatch(removeCoinFromDisplayList(id));
          }}
        >
          X
        </p>
      </Grid>

      <Grid item md={12}>
        <p>{id}</p>
        <p>${last}</p>
        <p>{volume}</p>
      </Grid>

      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
        md={12}
      >
        <Grid item md={12}>
          <TextField
            id="deposit-amount"
            label="Trade Amount"
            variant="standard"
            type="number"
            inputMode="numeric"
            autoFocus={true}
            className={styles.textbox}
            aria-label="Trade Amount"
            value={tradeAmount}
            sx={{
              "& .MuiInputBase-root": {
                color: "primary.main",
              },
              "& .MuiFormLabel-root": {
                color: "secondary.main",
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: "primary.main",
              },
            }}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setTradeAmount(value);
            }}
          />
        </Grid>

        <Grid item md={4}>
          <Button
            onClick={() =>

              triggerPortfolioUpdate(
                "buy",
                currentUser,
                id,
                id,
                tradeAmount,
                token
              )
            }
          >
            Buy
          </Button>
        </Grid>

        <Grid item md={4}>
          <Button
            onClick={() =>

              triggerPortfolioUpdate(
                "sell",
                currentUser,
                id,
                id,
                tradeAmount,
                token
              )
            }
          >
            Sell
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

async function triggerPortfolioUpdate(
  updateType: string,
  currentUser: string,
  coinName: string,
  coinId: string,
  quantity: number,
  token: string
) {
  quantity = parseInt(String(quantity));
  let resp = await updatePortfolio(
    {
      username: currentUser,
      portfolio: [{ name: coinName, amount: quantity, id: coinId }],
    },
    updateType,
    token
  );
  alert(JSON.stringify(resp));
}

async function triggerPortfolioUpdate(
  currentUser: string,
  coinName: string,
  coinId: string,
  quantity: number,
  token: string
) {
  quantity = parseInt(String(quantity));
  let resp = await updatePortfolio(
    {
      username: currentUser,
      portfolio: [{ name: coinName, amount: quantity, id: coinId }],
    },
    token
  );
  alert(JSON.stringify(resp));
}

export default Card;
