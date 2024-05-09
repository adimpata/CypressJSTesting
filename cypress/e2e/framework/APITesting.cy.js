//Test suite for API operations related to books
describe('API suite',function (){
    // Test for adding a book
    it('My first testcase with API',function (){
        cy.request('POST','https://fakerestapi.azurewebsites.net/api/v1/Books',{
            "id": 0,
            "title": "string",
            "description": "string",
            "pageCount": 0,
            "excerpt": "string",
            "publishDate": "2024-05-09T09:40:51.389Z"
        }).then(function (response){
            // Checking if the book does not have a 'Description' property with value "Success"
            expect(response.body).not.to.have.property('Description',"Success");
            // Checking if the response has status 200
            expect(response.status).to.eql(200);
        })

    })
})
// Test suite for API operations related to cover photos
it('My second testcase with API',function (){
    cy.request('POST','https://fakerestapi.azurewebsites.net/api/v1/CoverPhotos',{
        "id": 0,
        "idBook": 0,
        "url": "string"
    }).then(function (response){
        // Checking if the response has status 200
        expect(response.status).to.eql(200);
        // Logging the response body to console
        console.log(response.body);
    })
})