const cucumber = require('cypress-cucumber-preprocessor').default
//Exports a function to configure Cypress plugins
module.exports = (on, config) => {
    //Registers the Cypress Cucumber Preprocessor as the preprocessor for feature files
    on('file:preprocessor', cucumber());
};