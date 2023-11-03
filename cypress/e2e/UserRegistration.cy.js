/// <reference types="Cypress" />
var Aliases = {
  RegisterButton: "@RegisterButton",
  EmailInput: "@EmailInput",
  PasswordInput: "@PasswordInput",
  UsernameInput: "@UsernameInput"
}

describe('User registration', () => {

  beforeEach(() => {
    cy.visit("/");
    cy.contains("a", "Account").click();
    cy.get("[name='register']").as("RegisterButton");
    cy.get("#reg_email").as("EmailInput");
    cy.get("#reg_password").as("PasswordInput")
    cy.get("#reg_username").as("UsernameInput");
  });

  it('Verify that users can successfully register with valid information', () => {
    cy.get(Aliases.UsernameRegisterInput).typeRandomString(5).then($username => {
      cy.get(Aliases.EmailRegisterInput).typeRandomString(5).type("@mail.com");
      cy.get(Aliases.PasswordRegisterInput).typeRandomString(20);
      cy.get(Aliases.RegisterButton).click();
      cy.url().should('contain', 'http://uiautomation.domain.local/my-account/');
      cy.contains(`Hello ${$username.val()} (not ${$username.val()}? Log out)`).should("be.visible");
    });
  });

  it('Validate that error messages are displayed for invalid or missing information (all informations are missing)', () => {
    cy.get(Aliases.RegisterButton).click();
    cy.containsErrorMessage("Error: Please provide a valid email address.");
  });

  it('Validate that error messages are display for invalid or missing information (missing email)', () => {
      cy.get(Aliases.UsernameRegisterInput).typeRandomString(5);
      cy.get(Aliases.RegisterButton).click();
      cy.containsErrorMessage("Error: Please enter a valid account username");
  });

  it('Validate that error messages are display for invalid or missing information (missing username)', () => {
      cy.get(Aliases.EmailRegisterInput).typeRandomString(5).type("@mail.com");
      cy.get(Aliases.RegisterButton).click();
      cy.containsErrorMessage("Error: Please provide a valid email address");
  });

  it('Validate that error messages are display for invalid or missing information (missing passwd)', () => {
      cy.get(Aliases.EmailRegisterInput).typeRandomString(5).type("@mail.com");
      cy.get(Aliases.UsernameRegisterInput).typeRandomString(5);
      cy.get(Aliases.RegisterButton).click();
      cy.containsErrorMessage("Error: Please enter an account password");
  });

  it('Ensure that duplicate registrations are not allowed for the same email address (already used username)', () => {
      cy.get(Aliases.UsernameRegisterInput).type("test_admin");
      cy.get(Aliases.EmailRegisterInput).typeRandomString(5).type("@mail.com");
      cy.get(Aliases.PasswordRegisterInput).typeRandomString(20);
      cy.get(Aliases.RegisterButton).click();
      cy.containsErrorMessage("Error: An account is already registered with that username. Please choose another.");
  });

  it('Ensure that duplicate registrations are now allowed for the same email address (already used password)', () => {
      cy.get(Aliases.EmailRegisterInput).type("trala@halala.com");
      cy.get(Aliases.UsernameRegisterInput).typeRandomString(5);
      cy.get(Aliases.PasswordRegisterInput).typeRandomString(20);
      cy.get(Aliases.RegisterButton).click();
      cy.containsErrorMessage("Error: An account is already registered with your email address.")
  });

})