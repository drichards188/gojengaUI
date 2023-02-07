import {
  createAsyncThunk,
  createReducer,
  createSlice,
  PayloadAction,
  unwrapResult,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import {
  crtDelete,
  crtDeposit,
  crtInfo,
  crtLogin,
  getCoinsList,
  crtUser,
  fetchCount,
  getCoinBatch,
  crtPing,
} from "./dashboardAPI";

export interface DashboardState {
  // coinData: { last: number},
  coinData: any;
  coinList: any;
  displayCoinList: any;
  amount: number;
  balance: number;
  user: string;
  password: string;
  destination: string;
  message: string;
  loggedIn: boolean;
  token: string;
  status: "idle" | "loading" | "failed";
}

const initialState: DashboardState = {
  coinData: [{ id: "bitcoin", last: 1, volume: 2400 }],
  coinList: [{ id: "bitcoin", name: "og-bitcoin" }],
  displayCoinList: ["bitcoin", "ethereum"],
  amount: 0,
  balance: 0,
  user: "david",
  password: "12345",
  destination: "allie",
  message: "",
  loggedIn: false,
  token: "token",
  status: "idle",
};

export const getCoinDataAsync = createAsyncThunk(
  "dashboard/createUser",
  async (payload: any) => {
    const response = await crtUser(payload.coinKey);
    // The value we return becomes the `fulfilled` action payload
    let encapsulatedData = { geckoData: response.data };
    return encapsulatedData;
  }
);

export const getCoinListAsync = createAsyncThunk(
  "dashboard/getCoinlist",
  async () => {
    const response = await getCoinsList();
    // The value we return becomes the `fulfilled` action payload
    let wrappedData = { coinList: response.data };
    return wrappedData;
  }
);

export const getCoinBatchAsync = createAsyncThunk(
  "dashboard/getCoinBatch",
  async (payload: any) => {
    const response = await getCoinBatch(payload.coinArray);
    // The value we return becomes the `fulfilled` action payload
    let wrappedData = { coinData: response };
    return wrappedData;
  }
);

export const createDepositAsync = createAsyncThunk(
  "dashboard/createDeposit",
  async (payload: any) => {
    const response = await crtDeposit(payload.account, payload.amount);
    // The value we return becomes the `fulfilled` action payload

    return response.data;
  }
);

export const createInfoAsync = createAsyncThunk(
  "dashboard/createInfo",
  async (payload: any) => {
    const response = await crtInfo(payload.account);
    // The value we return becomes the `fulfilled` action payload

    return response.data;
  }
);

export const createDeleteAsync = createAsyncThunk(
  "dashboard/createDelete",
  async (payload: any) => {
    const response = await crtDelete(payload.account);
    // The value we return becomes the `fulfilled` action payload

    return response.data;
  }
);

export const pingExpressAsync = createAsyncThunk(
  "dashboard/pingExpress",
  async (payload: any) => {
    let response = await crtPing();
    // alert("pingExpressAsync " + JSON.stringify(response));
    // return response.data;
    return response;
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
      alert("setUser state is " + state.user);
    },
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    addCoinToDisplayList: (state, action: PayloadAction<string[]>) => {
      for (let i = 0; i < action.payload.length; i++) {
        const elem = action.payload[i];
        let arr = state.displayCoinList;
        arr.push(elem);
        state.displayCoinList = arr;
      }
    },
    removeCoinFromDisplayList: (state, action: PayloadAction<string[]>) => {
      state.displayCoinList = state.displayCoinList.filter(
        (x: any) => x !== action.payload
      );
    },
    resetState: (state) => {
      return initialState;
    },
    resetMessage: (state) => {
      state.message = "";
    },
    createUser: (state, action: PayloadAction<any>) => {
      alert(action.payload);
      state.user = action.payload.username;
      state.amount = action.payload.amount;
    },
    makeLogin: (state, action: PayloadAction<any>) => {
      let username = action.payload.account;
      let uppercase = username.charAt(0).toUpperCase() + username.slice(1);
      state.user = uppercase;
      state.password = action.payload.password;
    },
    makeTransaction: (state, action: PayloadAction<any>) => {
      state.destination = action.payload.destination;
      state.amount = action.payload.amount;
      let intBalance: number =
        Number(state.balance) - Number(action.payload.amount);
      state.balance = Number(intBalance.toFixed(2));
    },
    makeDeposit: (state, action: PayloadAction<any>) => {
      state.amount = action.payload.amount;
    },
    makeInfo: (state, action: PayloadAction<any>) => {
      let username = action.payload.account;
      let uppercase = username.charAt(0).toUpperCase() + username.slice(1);
      state.user = uppercase;
    },
    makeDelete: (state, action: PayloadAction<any>) => {
      state.user = action.payload.username;
      state.amount = action.payload.amount;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      //createTransaction
      .addCase(getCoinListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCoinListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.coinList = action.payload.coinList;
        // alert("the state.user is now " + state.user)
      })

      //createDeposit
      .addCase(createDepositAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createDepositAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.message = action.payload["response"]["message"];
        state.balance = Number(state.balance) + Number(state.amount);
      })

      //createLogin
      .addCase(getCoinBatchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCoinBatchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.coinData = action.payload.coinData;
        state.loggedIn = true;
        // alert("the state.user is now " + state.user)
      })
      .addCase(getCoinBatchAsync.rejected, (state, action) => {
        state.status = "failed";
        // alert("login rejected " + action.payload)
        // alert("the state.user is now " + state.user)
      })

      //createUser
      .addCase(getCoinDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCoinDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.coinData = action.payload.geckoData;
        // alert("the state.coinData is now " + state.coinData)
      })
      .addCase(getCoinDataAsync.rejected, (state, action) => {
        state.status = "failed";
        // alert("createUser rejected " + action.payload)
        // alert("the state.message is now " + state.message)
      })

      //createInfo
      .addCase(createInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload["response"]["username"];
        state.balance = action.payload["response"]["balance"];
        state.loggedIn = true;
      })
      .addCase(createInfoAsync.rejected, (state, action) => {
        state.status = "failed";
        // alert("createUser rejected " + action.payload)
        // alert("the state.message is now " + state.message)
      })

      //pingExpress
      .addCase(pingExpressAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(pingExpressAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload.data.access_token;
        state.loggedIn = true;
      })
      .addCase(pingExpressAsync.rejected, (state, action) => {
        state.status = "failed";
        // alert("createUser rejected " + action.payload)
        // alert("the state.message is now " + state.message)
      });
  },
});

export const {
  setUser,
  setAmount,
  resetState,
  resetMessage,
  createUser,
  makeTransaction,
  makeLogin,
  makeDeposit,
  makeDelete,
  makeInfo,
  addCoinToDisplayList,
  removeCoinFromDisplayList,
} = dashboardSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBanking = (state: RootState) => state.dashboard.amount;
export const selectCoinData = (state: RootState) => state.dashboard.coinData;
export const selectCoinDisplayList = (state: RootState) =>
  state.dashboard.displayCoinList;
export const selectCoinList = (state: RootState) => state.dashboard.coinList;
export const selectLoggedIn = (state: RootState) => state.dashboard.loggedIn;
export const selectToken = (state: RootState) => state.dashboard.token;
export const selectMessage = (state: RootState) => state.dashboard.message;
export const selectBalance = (state: RootState) => state.dashboard.balance;
export const selectAmount = (state: RootState) => state.dashboard.amount;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default dashboardSlice.reducer;
