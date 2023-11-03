/// <reference types="Cypress" />

describe('User account management', () => {

    beforeEach(() => {
        cy.visit("/");
        cy.contains("a", "Account").click();
        cy.login("test_user", "test_user123")
    });

    it('Test the functionality to update user profile information', () => {
        cy.get('.woocommerce-MyAccount-navigation-link--edit-address > a').click();
        cy.get(".title").contains("Billing address").should("be.visible");
        cy.get(".title").contains("Billing address").parent().find(".edit").should("be.visible");
        cy.get(".title").contains("Shipping address").should("be.visible");
        cy.get(".title").contains("Shipping address").parent().find(".edit").should("be.visible");
    });

    it.only('Verify that users can change their password successfully', () => {
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click();
        cy.get("fieldset > legend").contains("Password change").should("be.visible");
        cy.changePassword("test_user123", "123user_test", "123user_test");
        cy.get('[role="alert"]').contains("Account details changed successfully.").should("be.visible");
        cy.get('.woocommerce-MyAccount-navigation-link--customer-logout > a').click();
        cy.login("test_user", "123user_test");
        cy.contains("Hello test_user").should("be.visible");
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click();
        cy.changePassword("123user_test", "test_user123", "test_user123");
        cy.get('[role="alert"]').contains("Account details changed successfully.").should("be.visible");
    });

});