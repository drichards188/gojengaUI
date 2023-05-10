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
  crtGetAccount,
  crtInfo,
  crtTransaction,
  crtUser,
  fetchCount,
} from "./bankingAPI";
import { crtLogin } from "./bankingAPI";

export interface BankingState {
  amount: number;
  balance: number;
  user: string;
  destination: string;
  message: string;
  loggedIn: boolean;
  token: string;
  refreshToken: string;
  status: "idle" | "loading" | "failed";
}

const initialState: BankingState = {
  amount: 0,
  balance: 0,
  user: "david",
  destination: "allie",
  message: "",
  loggedIn: false,
  token: "",
  refreshToken: "",
  status: "idle",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const createUserAsync = createAsyncThunk(
  "banking/createUser",
  async (payload: any) => {
    const response = await crtUser(
      payload.username,
      payload.password,
      payload.jwt
    );
    // The value we return becomes the `fulfilled` action payload

    return response.data;
  }
);

export const createTransactionAsync = createAsyncThunk(
  "banking/createTransaction",
  async (payload: any) => {
    const response = await crtTransaction(
      payload.bankingUser,
      payload.destination,
      payload.amount,
      payload.jwt
    );
    // The value we return becomes the `fulfilled` action payload

    return response.data;
  }
);

export const createDepositAsync = createAsyncThunk(
  "banking/createDeposit",
  async (payload: any) => {
    const response = await crtDeposit(
      payload.account,
      payload.amount,
      payload.jwt
    );
    // The value we return becomes the `fulfilled` action payload

    return response.data;
  }
);

export const createInfoAsync = createAsyncThunk(
  "banking/createInfo",
  async (payload: any) => {
    const response = await crtInfo(payload.account);
    // The value we return becomes the `fulfilled` action payload

    return response.data;
  }
);

export const createDeleteAsync = createAsyncThunk(
  "banking/createDelete",
  async (payload: any) => {
    const response = await crtDelete(payload.account);
    // The value we return becomes the `fulfilled` action payload

    return response.data;
  }
);

export const createLoginAsync = createAsyncThunk(
  "banking/createLogin",
  async (payload: any) => {
    let response = await crtLogin(payload.username, payload.password);
    return response.data;
  }
);

export const getUserAsync = createAsyncThunk(
  "banking/getLogin",
  async (payload: any) => {
    let response = await crtGetAccount(payload.username, payload.jwt);
    return response.data;
  }
);

export const bankingSlice = createSlice({
  name: "banking",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    resetState: (state) => {
      return initialState;
    },
    resetMessage: (state) => {
      state.message = "";
    },
    createUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload.username;
      state.amount = action.payload.amount;
    },
    makeLogin: (state, action: PayloadAction<any>) => {
      if (action.payload !== undefined) {
        state.message = "";
        state.user = action.payload;
      }
      // let uppercase = username.charAt(0).toUpperCase() + username.slice(1);
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
    setUser: (state, action: PayloadAction<any>) => {
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
      .addCase(createTransactionAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTransactionAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.message = action.payload["response"]["message"];
        // alert("the state.user is now " + state.user)
      })
      .addCase(createTransactionAsync.rejected, (state, action) => {
        state.status = "idle";
        state.message = "Transaction Failed";
        // alert("the state.user is now " + state.user)
      })

      //createDeposit
      .addCase(createDepositAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createDepositAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // state.message = action.payload["response"]["message"];
        state.message = "Deposit Successful";
      })
      .addCase(createDepositAsync.rejected, (state, action) => {
        state.status = "idle";
        // state.message = action.payload["response"]["message"];
        state.message = "Deposit Failed";
      })

      //createUser
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload["user"];
        state.token = action.payload["access_token"];
        // state.balance = action.payload["response"]["balance"];
        state.loggedIn = true;
        // alert("the state.message is now " + state.message)
      })
      .addCase(createUserAsync.rejected, (state, action) => {
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

      //createLoginAsync
      .addCase(createLoginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createLoginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.status !== 200) {
          if (action.payload.message === "Network Error") {
            state.message = action.payload.message;
          } else {
            state.message = action.payload.response.statusText;
          }
        } else {
          state.token = action.payload.data.access_token;
          state.refreshToken = action.payload.data.refresh_token;
          state.loggedIn = true;
        }
      })
      .addCase(createLoginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.token = "error";
        state.message = "Network Error";
        // alert("createUser rejected " + action.payload)
        // alert("the state.message is now " + state.message)
      })

      //getUserAsync
      .addCase(getUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.balance = action.payload.balance;
        state.loggedIn = true;
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.status = "failed";
        alert(`getUserAsync failed`);
        // alert("createUser rejected " + action.payload)
        // alert("the state.message is now " + state.message)
      });
  },
});

export const {
  setAmount,
  resetState,
  resetMessage,
  createUser,
  makeTransaction,
  makeLogin,
  makeDeposit,
  makeDelete,
  setUser,
  setToken,
  setRefreshToken,
  setLoggedIn,
} = bankingSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBanking = (state: RootState) => state.banking.amount;
export const selectBankingUser = (state: RootState) => state.banking.user;
export const selectLoggedIn = (state: RootState) => state.banking.loggedIn;
export const selectToken = (state: RootState) => state.banking.token;
export const selectRefreshToken = (state: RootState) =>
  state.banking.refreshToken;
export const selectMessage = (state: RootState) => state.banking.message;
export const selectBalance = (state: RootState) => state.banking.balance;
export const selectAmount = (state: RootState) => state.banking.amount;

export default bankingSlice.reducer;
