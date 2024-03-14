// @ts-ignore
describe("template spec", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/signup");
    });

    it("should have signup page", () => {
        cy.get('h1').contains("Signup");
    });

    it("should create account with demo creds", () => {
        cy.get("[data-cy='username-field']").type("hire");
        cy.get("[data-cy='password-field']").type("me");
        cy.get("[data-cy='login-button']").click();
        cy.get("a").contains("Portfolio");
        cy.contains("Offline Demo Mode");
    });
});
