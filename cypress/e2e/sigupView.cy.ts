// @ts-ignore
describe("template spec", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/signup");
    });

    it("should have signup page", () => {
        cy.get('h1').contains("Signup");
    });

});
