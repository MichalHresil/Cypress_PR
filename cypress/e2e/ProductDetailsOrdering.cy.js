/// <reference types="Cypress" />
describe('Product details and ordering', () => {

    it('Verify that users can view detailed information about a product.', () => {
        cy.visit("/");
        cy.contains("a", "Store").click();
        cy.get(".products li").eq(0).click();
        cy.get('figure a img').should('be.visible')
            .and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0);
                expect($img[0].naturalHeight).to.be.greaterThan(0);
            });
        cy.get(".woocommerce-breadcrumb").should("be.visible").and("not.be.empty");
        cy.get('.product_title').should("be.visible").and("not.be.empty");
        cy.get('.summary .price').should("be.visible").and("not.be.empty");
        cy.get('.woocommerce-product-details__short-description > p').should("be.visible").and("not.be.empty");
        cy.get(".quantity").should("be.visible").and("not.be.empty");
        cy.get('.single_add_to_cart_button').should("be.visible").and("not.be.empty");
        cy.get('#tab-title-description').should("be.visible");
        cy.get('#tab-title-additional_information').should("be.visible");
        cy.get('#tab-title-reviews').should("be.visible");
        cy.get(".related").should("be.visible");
    });

    it.only('Test adding products to the cart and validate correct products and quantities.', () => {
        cy.visit("/product/anchor-bracelet/");
        cy.get(".quantity > input").should("be.visible").and('have.value', '1');
        cy.get('.single_add_to_cart_button').click();
        cy.get(".woocommerce-message").should("be.visible").should("contain", "“Anchor Bracelet” has been added to your cart.");
        cy.get(".woocommerce-message > a").should("be.visible").and("have.text", "View cart");
        cy.visit("/product/basic-gray-jeans/");
        cy.get(".quantity > input").clear().type("2");
        cy.get('.single_add_to_cart_button').click();
        cy.get('.cart-container').click();
        cy.url().should("contain", "/cart/");
        cy.get("table").contains("Anchor Bracelet").parent().parent().find("input").should("have.value", 1);
        cy.get("table").contains("Basic Gray Jeans").parent().parent().find("input").should("have.value", 2);
    });
});