// ***********************************************
// This commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add("selectProduct", (productName) => {
    cy.get('h4.card-title').each(($e1, index, $list) => {
        if($e1.text().includes(productName)) {
            cy.get('button.btn.btn-info').eq(index).click();
        }
    });
});