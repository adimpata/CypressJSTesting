describe('My second Test Suite', function () {

    it('My FirstTest case', function () {
        //Test case to perform actions on the product page
        // Visiting the website
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        // Typing 'be' in the search box
        cy.get('.search-keyword').type('be')
        // Waiting for 2 seconds
        cy.wait(2000)
        //selenium
        //Clicking 'ADD TO CART' button for products containing 'Cucumber' in their name
        cy.get('.products').as('productLocator')
        cy.get('.products').find('.product').each(($e1, index, $list) => {
            const textCucumber = $e1.find('h4.product-name').text()
            if (textCucumber.includes('Cucumber')) {
                $e1.find('button').click()
            }
        })
        // Clicking on the cart icon to proceed to checkout
        cy.get('.cart-icon > img').click()
        // Clicking 'PROCEED TO CHECKOUT' button
        cy.contains('PROCEED TO CHECKOUT').click()
        // Clicking 'Place Order' button
        cy.contains('Place Order').click()
        // Selecting 'Romania' from the dropdown
        cy.get('select').select('Romania')
        // Checking the checkbox for agreement
        cy.get('.chkAgree').check()
        // Clicking 'Proceed' button to complete the order
        cy.contains('Proceed').click()
        // Logging the text of the order confirmation
        cy.get('span').invoke('text').then((text) => {
            cy.log(text)
        });
    })
})