const express = require("express");
const { scrapeLogic } = require("./scrapeLogic");
const app = express();
const fs = require('fs');

const PORT = process.env.PORT || 4000;

app.get("/scrape", (req, res) => {
  scrapeLogic(res);
});

app.get('/image', (req, res) => {
  // Set the appropriate headers
  const imageBuffer = fs.readFileSync('screenshot.png');
  res.setHeader('Content-Type', 'image/png');

  // Send the image buffer as the response
  res.send(imageBuffer);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
