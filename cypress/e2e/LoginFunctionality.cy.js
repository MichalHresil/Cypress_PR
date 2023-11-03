/// <reference types="Cypress" />
var Aliases = {
  LoginButton: "@LoginButton",
  PasswordInput: "@PasswordInput",
  UsernameInput: "@UsernameInput"
}

describe('Login Functionality', () => {

    beforeEach(() => {
        cy.visit("/");
        cy.contains("a", "Account").click();
        cy.get("[name='login']").as("LoginButton");
        cy.get("#password").as("PasswordInput");
        cy.get("#username").as("UsernameInput");
    });

    it('Confirm that users can log in with valid credentials', () => {
        cy.get(Aliases.UsernameInput).type("test_admin");
        cy.get(Aliases.PasswordInput).type("admin");
        cy.get(Aliases.LoginButton).click();
        cy.contains("Hello ahoj cau (not ahoj cau? Log out)").should("be.visible");
    });

    it('Verify that appropriate error messages are displayed for invalid login attempts (wrong password)', () => {
        cy.get(Aliases.UsernameInput).type("test_admin");
        cy.get(Aliases.PasswordInput).type("wrong");
        cy.get(Aliases.LoginButton).click();
        cy.containsErrorMessage("Error: The password you entered for the username test_admin is incorrect. Lost your password?");
    });

    it('Verify that appropriate error messages are displayed for invalid login attempts (wrong username)', () => {
        cy.get(Aliases.UsernameInput).type("non_existing_user");
        cy.get(Aliases.PasswordInput).type("wrong");
        cy.get(Aliases.LoginButton).click();
        cy.containsErrorMessage("Error: The username non_existing_user is not registered on this site. If you are unsure of your username, try your email address instead.");
    });
});