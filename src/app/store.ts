import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import bankingReducer from "../slices/bankingSlice";
import dashboardSlice from "../slices/dashboardSlice";

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
