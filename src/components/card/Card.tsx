import React, { useContext, useEffect } from "react";
import "./Card.css";
import { useState, createContext } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getPortfolio,
  removeCoinFromDisplayList,
  selectCoinDisplayList,
} from "../../slices/dashboardSlice";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styles from "../general/common.module.css";
import { selectBankingUser, selectToken } from "../../slices/bankingSlice";
import { updatePortfolio } from "../../apis/dashboardAPI";
import { getAccessToken } from "../../apis/bankingAPI";

const Card = (props: any) => {
  let { id, last, volume } = props.data;

  const displayCoinData = useAppSelector(selectCoinDisplayList);

  const [tradeAmount, setTradeAmount] = useState(0);
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectBankingUser);
  const token = getAccessToken();

  volume = volume.toFixed(2);

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    if (id in displayCoinData) {
      const newTradeAmount = displayCoinData[id].quantity;
      setTradeAmount(newTradeAmount);
    }
  }, [displayCoinData]);


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
      className="card"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} md={12}>
        <Grid item md={2}>
          <a
            style={closeCardStyle}
            onClick={() => {
              dispatch(removeCoinFromDisplayList(id));
            }}
          >
            X
          </a>
        </Grid>

        <Grid item md={12}>
          <p>{id}</p>
          <p>{USDollar.format(last)}</p>
          <p>
            Volume <br />
            {volume}
          </p>
        </Grid>

        <Grid
          container
          spacing={1}
          alignItems="center"
          justifyContent="center"
          md={12}
        >
          <Grid item md={10}>
            <TextField
              id="deposit-amount"
              label="Trade Amount"
              variant="standard"
              type="number"
              inputMode="numeric"
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
                  token,
                  dispatch
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
                  token,
                  dispatch
                )
              }
            >
              Sell
            </Button>
          </Grid>
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
  token: string,
  dispatch: any
) {
  try {
    quantity = parseInt(String(quantity));
    let resp = await updatePortfolio(
      {
        username: currentUser,
        order_type: updateType,
        quantity: quantity,
        asset: coinId,
      },
      token
    );
    dispatch(getPortfolio({ user: currentUser, jwt: token }));
    // alert(JSON.stringify(resp));
  } catch (err) {
    alert(`triggerPortfolioUpdate is ${err}`);
  }
}

export default Card;
