describe('My first Test Suite', function () {

    it('My FirstTest case', function () {
        //Test case to perform actions on the product page
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('.search-keyword').type('be')
        cy.wait(2000)
        // cy.get('.product').should('have.length',5)
        cy.get('.product:visible').should('have.length', 5)
        //Parent child
        cy.get('.products').find('.product').should('have.length', 5);
        cy.get(':nth-child(3) > .product-action > button').click()
        cy.get('.products').find('.product').eq(1).contains('ADD TO CART').click()
        //Clicking 'ADD TO CART' button for products containing 'Cucumber' in their name
        cy.get('.products').find('.product').each(($e1, index, $list) => {
            const textCucumber = $e1.find('h4.product-name').text()
            if (textCucumber.includes('Cucumber')) {
                $e1.find('button').click()
            }
        })
        // Using .then()
        //Logging text of the brand element using .then()
        cy.get('.brand').then((logoElement) => {
            const logoText = logoElement.text();
            cy.log(logoText);
        });
        //Logging text of the brand element using Cypress chaining
        cy.get('.brand').invoke('text').then((logoText) => {
            cy.log(logoText);
        });
    })
})