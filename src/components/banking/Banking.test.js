import renderer from "react-test-renderer";
import { Banking } from "../../views/Banking";
import { fireEvent, render } from "@testing-library/react";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectBankingUser, setAmount, setUser } from "../../slices/bankingSlice";

it("checking the render of the banking interface", () => {
  const { getByText, queryByText } = render(
    <Provider store={store}>
      <Banking />
    </Provider>
  );

  //    todo update store to have an amount
  const dispatch = useAppDispatch();

  dispatch(setUser("David"));
  dispatch(setAmount(243));

  const bankingUser = useAppSelector(selectBankingUser);

  // Verify that Dropdown items are hidden from the DOM
  expect(queryByText("Desposit")).toBeNull();
  expect(queryByText("Pay")).toBeNull();
  expect(queryByText("Account")).toBeNull();
  expect(queryByText("Exit")).toBeNull();

  // Click the Dropdown toggle
  fireEvent.click(getByText("Login"));

  // Verify that the Dropdown items now appear in the DOM
  expect(getByText("Username"));
});
