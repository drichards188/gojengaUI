import counterReducer, { BankingState } from "./bankingSlice";

describe("counter reducer", () => {
  const initialState: BankingState = {
    amount: 0,
    balance: 0,
    user: "david",
    destination: "allie",
    message: "",
    loggedIn: false,
    token: "token",
    refreshToken: "token",
    hasUpdate: false,
    status: "idle",
  };
  it("should handle initial state", () => {
    expect(counterReducer(undefined, { type: "unknown" })).toEqual({
      value: 0,
      status: "idle",
    });
  });
});
