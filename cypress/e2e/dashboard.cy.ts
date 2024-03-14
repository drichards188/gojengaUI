// @ts-ignore
describe("template spec", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/dashboard");
        cy.get("[data-cy='username-field']").type("hire");
        cy.get("[data-cy='password-field']").type("me");
        cy.get("[data-cy='login-button']").click();
    });

    it("should have portfolio page", () => {
        cy.get('a').contains("Portfolio");
    });

    it("should have default cards", () => {
        cy.contains("default");
        cy.contains("$1,654.32");
        cy.contains("placeholder");
        cy.contains("Volume");
        cy.contains("Offline Demo Mode");
    });

    it("should verify search works", () => {
        cy.get("[data-cy='search-input']").type("bitcoin");
        cy.contains("bitcoin");
    });
});
