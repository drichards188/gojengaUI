// @ts-ignore
describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should have risk page", () => {
    cy.get("h1").contains("Risk");
  });

  it("should have data", () => {
    cy.get("#combo-box-demo").click();
    cy.focused().type("CR");
    cy.contains("CRM");
  });

  it("should open risk details", () => {
    cy.get("#combo-box-demo").click();
    cy.focused().type("CR");
    cy.contains("CRM").click();
    cy.get("#risk-retrieve").click();
    cy.get("h2").contains("Calculations");
  });
});
