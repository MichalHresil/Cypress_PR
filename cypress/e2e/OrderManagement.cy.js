/// <reference types="Cypress" />

describe('Order management', () => {

    it('Confirm that users can view their order history and details', () => {
        cy.visit("/");
        cy.contains("a", "Account").click();
        cy.get("#username").type("test_user");
        cy.get("#password").type("test_user123");
        cy.get('button[name="login"]').click();
        cy.get('.woocommerce-MyAccount-navigation-link--orders > a').click();
        cy.getOrderByNumber("#3155").find('td[data-title="Actions"] > a').click();
    });
});