///<reference types="Cypress" />
import HomePage from "../pageObjects/HomePage";
import ProductPage from "../pageObjects/ProductPage";
//This test suite performs end-to-end testing for a shopping experience on the website
describe('My Second Test Suite', function () {
    let data;
    // Loading test data before running the tests
    before(function () {
        cy.fixture('example').then(function (data) {
            //     data = jsonData;
            this.data = data;
        })
    })
    it('My First Test Suite', function () {
        const homePage = new HomePage();
        const productPage = new ProductPage();
        //  cy.visit("https://rahulshettyacademy.com/angularpractice/")
        // Visiting the website and performing end-to-end shopping experience
        cy.fixture('cypress.json').then((cypressConfig) => {
            console.log(cypressConfig);
            const baseUrl = cypressConfig.env.url;
            console.log(baseUrl);
            const url = baseUrl + "/angularpractice/";
            console.log(url);
            cy.visit(url);
        });
        // Filling in user details and selecting products
        homePage.getEditBox().type(this.data.name)
        homePage.getGender().select(this.data.gender)
        homePage.getTwoWayDataBinding().should('have.value', this.data.name)
        homePage.getEditBox().should('have.attr', 'minlength', '2')
        homePage.getEntrepreneaur().should('be.disabled')
        Cypress.config('defaultCommandTimeout', 8000)
        homePage.getShopTab().click()
        this.data.productName.forEach(function (element) {
            cy.selectProduct(element)
        })
        // Proceeding to checkout
        productPage.checkOutButton().click()
        // Calculating and verifying total amount
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
        // Completing the purchase process
        cy.contains('Checkout').click()
        cy.get('#country').type('Romania')
        cy.wait(5000)
        cy.get('.suggestions > ul > li > a').click()
        cy.get('.checkbox').click()
        cy.wait(5000)
        cy.get('input[type="submit"]').click()
        //cy.get('.alert').should('have.text','Success! Thank you! Your order will be delivered in next few weeks :-).')
        // Verifying successful order placement
        cy.get('.alert').then(function (element) {
            const actualText = element.text()
            expect(actualText.includes("Success")).to.be.true
        })
    })
})