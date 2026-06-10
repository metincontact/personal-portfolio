import { chromium } from "playwright";

const targets = [
  ["https://metin-ecommerce.vercel.app", "public/ecommerce.png"],
  ["https://metin-chatbot.vercel.app", "public/chatbot.png"],
  ["https://job-tracker-matin.vercel.app", "public/job-tracker.png"],
  ["https://github-explorer-matin.vercel.app", "public/github-explorer.png"],
  ["https://weather-dashboard-matin.vercel.app", "public/weather-dashboard.png"],
  ["https://crypto-tracker-matin.vercel.app", "public/crypto-tracker.png"],
];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
});

for (const [url, file] of targets) {
  console.log("capturing", url);
  await page.goto(url, { waitUntil: "load", timeout: 60000 });
  // give SPAs time to fetch data and finish entrance animations
  await page.waitForTimeout(5000);
  await page.screenshot({ path: file });
  console.log("saved", file);
}

await browser.close();
