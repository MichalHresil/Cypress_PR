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

Cypress.Commands.add('typeRandomString', { prevSubject: 'element' }, (prevSubject, length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    cy.wrap(prevSubject).type(result);
});

Cypress.Commands.add('containsErrorMessage', (message) => {
    cy.contains(message).should("be.visible");
});

Cypress.Commands.add('expectNumberFromTextToEqual', { prevSubject: 'element' }, (subject, options) => {
    cy.wrap(subject).invoke("text").then((text) => {
        expect(parseFloat(text.match(/\d+(\.\d+)?/)[0])).to.equal(options);
    })
});

Cypress.Commands.add('getOrderByNumber', (orderNumber) => {
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

Cypress.Commands.add('login', (username, password) => {
    cy.get("#username").type(username);
    cy.get("#password").type(password).type("{enter}");
})

Cypress.Commands.add('changePassword', (currentPassword, newPassword, newRepeat) => {
    cy.get("#password_current").type(currentPassword);
    cy.get("#password_1").type(newPassword)
    cy.get("#password_2").type(newRepeat)
    cy.get('button[name="save_account_details"]').click();
})

Cypress.Commands.add('fillCardInfo', (number, cvc) => {
    cy.iframe(`iframe[title="Secure card number input frame"]`).find("input.InputElement").type(number);
    cy.iframe('iframe[title="Secure expiration date input frame"]').find("input.InputElement").then((yearInput) => {
        var currentDate = new Date();
        var nextMonth = (currentDate.getMonth() + 1) % 12;
        var fullYear = nextMonth === 0 ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
        cy.wrap(yearInput).type(`${String(nextMonth + 1).padStart(2, '0')}/${String(fullYear).slice(-2)}`);
    });
    cy.iframe('iframe[title="Secure CVC input frame"]').find("input.InputElement").type(cvc);
})

