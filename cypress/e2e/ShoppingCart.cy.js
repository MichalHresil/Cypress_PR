/// <reference types="Cypress" />
///<reference types="cypress-iframe" />
import 'cypress-iframe';

describe('Shopping cart', () => {


    beforeEach(() => {
        cy.visit("/product/anchor-bracelet/");
        cy.get(".quantity > input").clear().type("1");
        cy.get('.single_add_to_cart_button').click();
        cy.visit("/product/basic-gray-jeans/");
        cy.get(".quantity > input").clear().type("2");
        cy.get('.single_add_to_cart_button').click();
        cy.get('.cart-container').click();
    })

    it('Test the calculator of the total order amount based on the products and quantities in the cart.', () => {
        cy.get(".cart_totals").should("be.visible");
        cy.get('.shop_table tbody .cart-subtotal').expectNumberFromTextToEqual(450);
        cy.get('#shipping_method label').expectNumberFromTextToEqual(69);
        cy.get(".order-total bdi").expectNumberFromTextToEqual(519);
    });

    it('Verify that users can update quantities or remove products from the cart.', () => {
        cy.get("table").contains("Anchor Bracelet").parent().parent().find("input").clear().type("2");
        cy.intercept("POST", '**/cart*').as('waitForUpdatePost');
        cy.intercept("GET", '**/cart*').as('waitForUpdateGet');
        cy.get('[name="update_cart"]').click()
        cy.wait(["@waitForUpdatePost", "@waitForUpdateGet"]);
        cy.get(".order-total bdi").expectNumberFromTextToEqual(669);
    });

    it('Test the checkout process, including address input, shipping options, and payment methods.', () => {
        cy.contains("Proceed to checkout").click();
        cy.get("#billing_first_name").type("John");
        cy.get('#billing_last_name').type("Doe");
        cy.get('#billing_address_1').type("Nonexistent street 13");
        cy.get('#billing_city').type("Kampala");
        cy.get('#billing_postcode').type("00259");
        cy.get('#billing_phone').type("3969896");
        cy.get('#billing_email').type("doejohn@mail.com");
        cy.iframe(`iframe[title="Secure card number input frame"]`).find("input.InputElement").type("4242424242424242");
        cy.iframe('iframe[title="Secure expiration date input frame"]').find("input.InputElement").then((yearInput) => {
            var currentDate = new Date();
            var nextMonth = (currentDate.getMonth() + 1) % 12;
            var fullYear = nextMonth === 0 ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
            cy.wrap(yearInput).type(`${String(nextMonth + 1).padStart(2, '0')}/${String(fullYear).slice(-2)}`);
        });
        cy.iframe('iframe[title="Secure CVC input frame"]').find("input.InputElement").type("123");
        cy.get('#place_order').click();
        cy.get('.elementor-heading-title').should("be.visible").and("have.text", "Checkout");
        cy.get('.woocommerce-notice').should("be.visible").and("have.text", "Thank you. Your order has been received.");
    });

});