// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('typeRandomString',{ prevSubject: 'element'}, (prevSubject, length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    cy.wrap(prevSubject).type(result);
});

Cypress.Commands.add('containsErrorMessage', (message)=>{
    cy.contains(message).should("be.visible");
});

Cypress.Commands.add('expectNumberFromTextToEqual', { prevSubject: 'element'}, (subject, options) => {
    cy.wrap(subject).invoke("text").then((text)=>{
            expect(parseFloat(text.match(/\d+(\.\d+)?/)[0])).to.equal(options);
    })
});

Cypress.Commands.add('getOrderByNumber', (orderNumber)=>{
    cy.get('.woocommerce-orders-table').within(() => {
            cy.get('.order').each(($order) => {
                cy.wrap($order).find('td[data-title="Order"]').then(($OrderNumberCell) => {
                    if ($OrderNumberCell.length > 0) {
                        if ($OrderNumberCell.text().trim() === String(orderNumber)) {
                            return cy.wrap($order);
                        }
                    }
                })
            });
        });
});

