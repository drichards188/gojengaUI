// @ts-ignore
describe("template spec", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
    });

    it("should have login page", () => {
        cy.get('h1').contains("Login");
    });

    it("should have info snackbar", () => {
        cy.get("[data-cy='info-icon']").click();
        cy.contains("Demo account: user = hire, pwd = me");
    });

    it("should login with demo account creds", () => {
        cy.get("[data-cy='username-field']").type("hire");
        cy.get("[data-cy='password-field']").type("me");
        cy.get("[data-cy='login-button']").click();
        cy.get("a").contains("Portfolio");
        cy.contains("Offline Demo Mode");
    });
});
