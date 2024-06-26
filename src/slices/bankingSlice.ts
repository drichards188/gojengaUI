import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import {
  crtDelete,
  crtDeposit,
  crtGetAccount,
  crtInfo,
  crtTransaction,
  crtUser,
} from "../apis/bankingAPI";
import { crtLogin } from "../apis/bankingAPI";

export interface BankingState {
  amount: number;
  balance: number;
  user: string;
  destination: string;
  message: string;
  loggedIn: boolean;
  token: string;
  refreshToken: string;
  hasUpdate: boolean;
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
  hasUpdate: false,
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
    const response = await crtUser(payload.username, payload.password);
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
      payload.amountValue,
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
    const response = await crtDelete(payload.account, payload.jwt);
    // The value we return becomes the `fulfilled` action payload
    localStorage.removeItem("user");
    return response.data;
  }
);

export type responseType = {
  status: number;
  username: string;
  access_token: string;
  refresh_token: string;
  msg?: string;
};

export const createLoginAsync = createAsyncThunk(
  "banking/createLogin",
  async (payload: any) => {
    let response: responseType = await crtLogin(
      payload.username,
      payload.password
    );
    if ("access_token" in response) {
      if (response.msg === "Unauthorized") {
        return Promise.reject("Wrong Username or Password");
      }
    }
    return response;
  }
);

export const getUserAsync = createAsyncThunk(
  "banking/getLogin",
  async (payload: any) => {
    try {
      let response = await crtGetAccount(payload.username, payload.jwt);
      return response.data;
    } catch (e) {
      alert("getUserAsync failed");
    }
  }
);

export const bankingSlice = createSlice({
  name: "banking",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    resetBankState: (state) => {
      return initialState;
    },
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
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    createUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload.username;
      state.amount = action.payload.amount;
    },
    makeLogin: (state, action: PayloadAction<any>) => {
      if (action.payload !== undefined) {
        state.message = "";
        state.loggedIn = true;
        state.user = action.payload;
      }
      // let uppercase = username.charAt(0).toUpperCase() + username.slice(1);
    },
    makeLogout: (state) => {
      state.token = "";
      state.refreshToken = "";
      state.loggedIn = false;
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
      // let uppercase = username.charAt(0).toUpperCase() + username.slice(1);
      state.user = username;
    },
    setStatus: (
      state,
      action: PayloadAction<"idle" | "loading" | "failed">
    ) => {
      state.status = action.payload;
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
        state.hasUpdate = true;

        // todo message throws error because there is no message is respnse
        // state.message = action.payload["response"]["message"];
        state.message = "Transaction Successful";

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
        state.hasUpdate = true;
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
        if ("message" in action.payload) {
          state.message = action.payload["message"];
        } else {
          state.user = action.payload["user"];
          state.message = "User Created, please login";
          state.loggedIn = true;
          // alert("the state.message is now " + state.message)
        }
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
          if (action.payload.msg === "Network Error") {
            state.message = action.payload.msg;
          } else {
            if ("msg" in action.payload && action.payload.msg !== undefined) {
              state.message = action.payload.msg;
            }
          }
        } else {
          state.token = action.payload.access_token;
          state.refreshToken = action.payload.refresh_token;
          state.loggedIn = true;
        }
      })
      .addCase(createLoginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.token = "error";
        if (action.error.message === "Wrong Username or Password") {
          state.message = action.error.message;
        } else {
          state.message = "Network Error";
        }
      })

      //createDeleteAsync
      .addCase(createDeleteAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createDeleteAsync.fulfilled, (state, action) => {
        // todo cause page to refresh after delete
        state.status = "idle";
        state.user = action.payload.username;
        state.amount = action.payload.amount;
        state.token = "";
        state.message = "User Deleted";
        state.loggedIn = false;
      })
      .addCase(createDeleteAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = "getUserAsync Error";
        alert(`createDeleteAsync failed`);
      })

      //getUserAsync
      .addCase(getUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.balance = action.payload.balance;
        state.hasUpdate = false;
        state.loggedIn = true;
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = "getUserAsync Error";
        alert(`getUserAsync failed`);
        return initialState;
        // alert("createUser rejected " + action.payload)
        // alert("the state.message is now " + state.message)
      });
  },
});

export const {
  setAmount,
  resetBankState,
  setMessage,
  createUser,
  makeTransaction,
  makeLogout,
  makeLogin,
  makeDeposit,
  setUser,
  setToken,
  setRefreshToken,
  setLoggedIn,
  setStatus,
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
export const selectStatus = (state: RootState) => state.banking.status;
export const selectUpdate = (state: RootState) => state.banking.hasUpdate;

export default bankingSlice.reducer;
