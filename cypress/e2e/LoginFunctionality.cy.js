/// <reference types="Cypress" />

describe('Login Functionality', () => {

    beforeEach(() => {
        cy.visit("/");
        cy.contains("a", "Account").click();
    });

    it('Confirm that users can log in with valid credentials', () => {
        cy.login("test_admin","admin");
        cy.contains("Hello ahoj cau (not ahoj cau? Log out)").should("be.visible");
    });

    it('Verify that appropriate error messages are displayed for invalid login attempts (wrong password)', () => {
        cy.login("test_admin","wrong");
        cy.containsErrorMessage("Error: The password you entered for the username test_admin is incorrect. Lost your password?");
    });

    it('Verify that appropriate error messages are displayed for invalid login attempts (wrong username)', () => {
        cy.login("non_existing_user","admin");
        cy.containsErrorMessage("Error: The username non_existing_user is not registered on this site. If you are unsure of your username, try your email address instead.");
    });
});