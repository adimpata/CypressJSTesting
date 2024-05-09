///<reference types="Cypress" />
import {Given, Then, When} from "cypress-cucumber-preprocessor/steps";
import HomePage from "../../../../pageObjects/HomePage";
import ProductPage from "../../../../pageObjects/ProductPage";


const homePage = new HomePage();
const productPage = new ProductPage();
Given('I open ECommerce Website page', () => {
    //Visiting the ECommerce Website page
    cy.fixture('cypress.json').then((cypressConfig) => {
        console.log(cypressConfig);
        const baseUrl = cypressConfig.env.url;
        console.log(baseUrl);
        const url = baseUrl + "/angularpractice/";
        console.log(url);
        cy.visit(url);
    });
})
When('I add items to cart', function () {
    //Clicking on the shop tab to add items to cart
    homePage.getShopTab().click()
//Adding items to cart based on test data
    this.data.productName.forEach(function (element) {
        cy.selectProduct(element)
    })
    productPage.checkOutButton().click()
})
// Calculating and verifying total price of products in cart
And('I validate the total price of several products', () => {
    var sum = 0
    cy.get('tr td:nth-child(4) strong').each(($e1, index, $list) => {
        const amount = $e1.text()
        var res = amount.split(" ")
        res = res[1].trim()
        sum = Number(sum) + Number(res)
    }).then(function () {
        cy.log(sum)
    })
    cy.get('h3 strong').then(function (element) {
        const amount = element.text()
        var res = amount.split(" ")
        var total = res[1].trim()
        expect(Number(total)).to.equal(sum)
    })
})
//Selecting country, submitting form and verifying response
Then('I select the country submit and check the response received', () => {
    cy.contains('Checkout').click()
    cy.get('#country').type('Romania')
    cy.wait(5000)
    cy.get('.suggestions > ul > li > a').click()
    cy.get('.checkbox').click()
    cy.wait(5000)
    cy.get('input[type="submit"]').click()
    //cy.get('.alert').should('have.text','Success! Thank you! Your order will be delivered in next few weeks :-).')
    cy.get('.alert').then(function (element) {
        const actualText = element.text()
        expect(actualText.includes("Success")).to.be.true
    })
})
When('The form is completed with the details', function (dataTable) {
    //Filling the form with details from the data table
    homePage.getEditBox().type(dataTable.rawTable[1][0])
    homePage.getGender().select(dataTable.rawTable[1][1])
})
Then('The form is validated', function () {
    // Validating form attributes
    homePage.getEditBox().should('have.attr', 'minlength', '2')
    homePage.getEntrepreneaur().should('be.disabled')
    Cypress.config('defaultCommandTimeout', 8000)
})
And('The shop page is selected', function () {
    //Clicking on the shop tab
    homePage.getShopTab().click()
})
