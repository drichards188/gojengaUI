// @ts-ignore
describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/diversification");
  });

  it("should have diversification page", () => {
    cy.get("Typography").contains("Diversification");
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
    cy.get("#divers-retrieve").click();
    cy.get("h2").contains("Recommendations");
  });
});
