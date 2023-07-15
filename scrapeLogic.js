const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });

  try {
    const searchAndScreenshot = async () => {
      const page = await browser.newPage();
console.log('started');
      await page.goto("https://www.free4talk.com"); // Replace with the URL of the website you want to navigate to
      await page.waitForTimeout(10000); // Wait for 10 seconds

      const screenshotPath = "screenshot.png"; // Replace with the desired path for the screenshot file

      try {
        // Type the search query in the search input
        await page.type(".ant-select-search__field", "Azeez");
        await page.waitForTimeout(3000);
        await page.keyboard.press("Enter");
        console.log("Enter pressed");

        await page.waitForTimeout(1000);
        
        // Take a screenshot of the page
        await page.screenshot({ path: screenshotPath });

        console.log(`Screenshot saved: ${screenshotPath}`);
      } catch (error) {
        console.error("Error occurred during search and screenshot:", error);
        // Handle the error gracefully or perform any necessary fallback logic
      }

      await browser.close();
    };

    await searchAndScreenshot();
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
