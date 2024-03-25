const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    retries: 2,
    viewportHeight: 846,
    viewportWidth: 414,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
