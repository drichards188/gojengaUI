import React from "react";
import Login from "./Login";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

describe("<Login />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    cy.get('[data-cy="login-button"]').should("be.visible");
  });
});
