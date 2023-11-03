/// <reference types="Cypress" />

describe('User account management', () => {

    beforeEach(() => {
         cy.visit("/");
        cy.contains("a", "Account").click();
        cy.get("#username").type("test_user");
        cy.get("#password").type("test_user123").type("{enter}");
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
    });

});