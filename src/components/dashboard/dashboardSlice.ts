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
  crtLogin,
  getCoinsList,
  crtUser,
  fetchCount,
  getCoinBatch,
  getUserPortfolio,
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
  status: "idle" | "loading" | "failed";
}

const initialState: DashboardState = {
  coinData: [],
  coinList: [{ id: "bitcoin", name: "og-bitcoin" }],
  displayCoinList: {},
  amount: 0,
  balance: 0,
  user: "david",
  password: "12345",
  destination: "allie",
  message: "",
  loggedIn: false,
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

export const getPortfolio = createAsyncThunk(
  "dashboard/getPortfolio",
  async (payload: any) => {
    const response = await getUserPortfolio(payload.user, payload.jwt);
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

export const createDeleteAsync = createAsyncThunk(
  "dashboard/createDelete",
  async (payload: any) => {
    const response = await crtDelete(payload.account);
    // The value we return becomes the `fulfilled` action payload

    return response.data;
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    resetDashboardState: (state) => {
      return initialState;
    },
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    addCoinToDisplayList: (state, action: PayloadAction<string[]>) => {
      for (let i = 0; i < action.payload.length; i++) {
        const elem = action.payload[i];
        const coin = { elem: { quantity: 0 } };
        let arr = state.displayCoinList;
        arr[elem] = { quantity: 0 };
        state.displayCoinList = arr;
      }
    },
    removeCoinFromDisplayList: (state, action: PayloadAction<string[]>) => {
      state.displayCoinList = state.displayCoinList.filter(
        (x: any) => x !== action.payload
      );
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

      //createLogin
      .addCase(getCoinBatchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCoinBatchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.coinData !== undefined) {
          state.coinData = action.payload.coinData;
        }
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
        if (action.payload.geckoData !== undefined) {
          state.coinData = action.payload.geckoData;
        }
      })
      .addCase(getCoinDataAsync.rejected, (state, action) => {
        state.status = "failed";
        // alert("createUser rejected " + action.payload)
        // alert("the state.message is now " + state.message)
      })

      //getPortfolio
      .addCase(getPortfolio.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPortfolio.fulfilled, (state, action) => {
        state.status = "idle";

        let toBeAdded: string[] = [];

        if ("portfolio" in action.payload.coinList) {
          let coins = action.payload.coinList.portfolio;

          coins.forEach(
            (item: { name: string; amount: number; id: string }) => {
              if (!(item.id in state.displayCoinList)) {
                // if (!state.displayCoinList.includes(item.id)) {
                // todo figure out how to add coins to the display list while removing the placeholder
                const coinName = item.id;
                state.displayCoinList[coinName] = { quantity: item.amount };
                // toBeAdded.push(item.id);
              }
            }
          );
        }
      })
      .addCase(getPortfolio.rejected, (state, action) => {
        state.status = "failed";
        // alert("createUser rejected " + action.payload)
        // alert("the state.message is now " + state.message)
      });
  },
});

export const {
  resetDashboardState,
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

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default dashboardSlice.reducer;
