import { screen } from "@testing-library/dom";
import { fireEvent, render } from "@testing-library/react";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import SignUp from "./SignUp";
import { BrowserRouter } from "react-router-dom";
import { Welcome } from "../welcome/Welcome";

it("check login forms render on time", () => {
  const { getByText, queryByText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    </Provider>
  );
  // Verify that Dropdown items are hidden from the DOM
  expect(queryByText(/username/i));

  // Click the Dropdown toggle
  fireEvent.click(getByText(/back/i));
});

// test("render and test SignUp form", () => {
//   ReactDOM.createRoot(document.getElementById("root")).root.render(
//     <Provider store={store}>
//       <BrowserRouter>
//         <SignUp />
//       </BrowserRouter>
//     </Provider>
//   );
//
//   const backButton = screen.getByText(/back/i);
//   expect(backButton).toBeInTheDocument();
// });
