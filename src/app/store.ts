import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../components/counter/counterSlice';
import bankingReducer from "../components/banking/BankingSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    banking: bankingReducer
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
