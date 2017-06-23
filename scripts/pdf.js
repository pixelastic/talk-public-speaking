const chromeLauncher = require('lighthouse/chrome-launcher/chrome-launcher');
const CDP = require('chrome-remote-interface');
const brunchConfig = require('../brunch-config.js');
const fs = require('fs');

// // Launch Headless Chrome
// // Find port of brunch config
// // Open url on first slide
// // Get max number of slides
// // Take a screenshot
// // go to next url
// // take a screenshot
// // until last slide
// // merge slides into a pdf
const ExportToPdf = {
  getPort() {
    return brunchConfig.server.port;
  },
  async launchHeadlessChrome() {
    const chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--disable-gpu', '--window-size=1368,768'],
    });
    const client = await CDP({port: chrome.port});
    return client;
  },
  async run() {
    const cdp = await this.launchHeadlessChrome();
    const {Page} = cdp;
    const url = `http://localhost:${this.getPort()}/`;
    // TODO: Wait for the whole instanciation in one bit await function
    // TODO: Find the number of slides
    // TODO: Create a method to take a screenshot of a specific page
    // TODO: Loop through all pages
    // TODO: Convert all images to pdf
    console.info(url);
    try {
      await Page.enable();
      await Page.navigate({url});
      await Page.loadEventFired();
      const screen = await Page.captureScreenshot();
      fs.writeFileSync('./scrot.png', Buffer.from(screen.data, 'base64'));
    } catch (err) {
      console.info(err);
    } finally {
      console.info('over');
      // TODO: Find a way to close, terminate the script
      await cdp.close();
    }

    // try {
    //
    // } catch (err) {
    //   console.info(err);
    // } finally {
    //   if (client) {
    //     await client.close();
    //   }
    // }

    // this.launchHeadlessChrome().then(async chrome => {
    //   const version = await CDP.Version({port: chrome.port});
    //   console.log(version['User-Agent']);
    // });
    // Open slides
    // Get max number of slides
    // Take screenshots of them all
    // Make a PDF out of it

    // console.info(this.getPort());
  },
};

ExportToPdf.run();

