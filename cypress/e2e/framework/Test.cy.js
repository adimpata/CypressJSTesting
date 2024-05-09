/// <reference types="Cypress />
//Test suite for network requests on example.cypress.io
describe('First Test Cypress', function () {
    // Test description: Verifies error message when updating comment via PUT request
    it('My first test case', function () {
        cy.visit('https://example.cypress.io/commands/network-requests')
        // Intercepting PUT request to comments and returning a custom response
        cy.intercept('PUT', 'comments/*', {
            statusCode: 404,
            body: {
                error: "Hey Comment does not exist"
            },
            delayMs: 1000
        }).as('UpdateComment')
        // Clicking on the button to trigger the PUT request
        cy.get('.network-put').click()
        // Verifying if the updated comment contains the expected error message
        cy.get('.network-put-comment').should('contain', "Hey Comment does not exist")
    })
})