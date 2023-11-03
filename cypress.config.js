const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 15000,
  chromeWebSecurity: false,
  video: false,
  retries: {
    runMode: 1
  },
  e2e: {
    baseUrl: "http://uiautomation.domain.local/",
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
