describe('My third Suite Test', function () {
    it('Test Case with boxes', () => {
        //Check boxes
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
        cy.get('#checkBoxOption2').uncheck().should('not.be.checked')
        cy.get('input[type="checkbox"]').check(['option2', 'option3'])
        //Static Dropdown
        cy.get('select').select('option2').should('have.value', 'option2')
        //Dynamic Dropdown
        cy.get('#autocomplete').type('Ro')
        cy.get('.ui-menu-item').each(($e1, index, $list) => {
            if ($e1.text()==="Romania") {
                $e1.click()
            }
        })
        //autocomplete
       // cy.get('#autocomplete').should('have.value','Romania')
        //visible invisible
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        //radio buttons
cy.get('[value="radio1"]').check().should('be.checked')

    });
})