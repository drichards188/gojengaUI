import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import bankingReducer from "../components/banking/bankingSlice";
import dashboardSlice from "../components/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    banking: bankingReducer,
    dashboard: dashboardSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
