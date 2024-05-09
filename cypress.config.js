const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
  projectId: 'okkpq3',
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber());
    },
  },
});
