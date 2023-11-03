/// <reference types="Cypress" />
describe('Product search and Navigation', () => {

    beforeEach(() => {
        cy.visit("/");
        cy.contains("a", "Store").click();
    });

    it('Confirm that the search results display relevant products.', () => {
        cy.get('input[type="search"]').type("Gray Jeans{enter}")
        cy.get(".woocommerce-breadcrumb").eq(0).should('contain', 'Gray Jeans')
        cy.get('.woocommerce-loop-product__title').each(($item, index, $list) => {
            cy.wrap($item).should("contain", "Gray Jeans")
        });
    });

    const CategoryExamples = [
        { Name: 'Accessories', Categories: ["Accessories"] },
        { Name: 'Men', Categories: ["Men"] },
        { Name: 'Women', Categories: ["Women", "Accessories"] }
    ];

    CategoryExamples.forEach((categoryExample) => {
        it(`Test the navigation through different products categories and subcategories. (Category: ${categoryExample.Name})`, () => {
            cy.get(".product-categories").contains(categoryExample.Name).click();
            cy.get("#main").then(($main) => {
                if ($main.find(".page-numbers").length > 0) {
                    cy.get(".page-numbers li").each(($page) => {
                        if (!isNaN($page.text())) {
                            cy.wrap($page).click();
                        }
                        cy.get('.products li').each(($item) => {
                            cy.wrap($item).find(".ast-woo-product-category").invoke("text").then((text) => {
                                expect(text.trim()).to.be.oneOf(categoryExample.Categories);
                            })
                        });
                    })
                }
                else {
                    cy.get('.products li').each(($item) => {
                        cy.wrap($item).find(".ast-woo-product-category").invoke("text").then((text) => {
                            expect(text.trim()).to.be.oneOf(categoryExample.Categories);
                        })
                    });
                }
            });
        });
    });

});