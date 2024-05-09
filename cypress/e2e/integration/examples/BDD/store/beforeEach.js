//Loads test data before each test case
beforeEach(function ()
{
    // Loading test data from the fixture file 'example' and assigning it to a variable accessible within each test case
    cy.fixture('example').then(function (data) {
        //     data = jsonData;
        this.data = data;
    })
})