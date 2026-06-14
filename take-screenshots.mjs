import { chromium } from "playwright";
import sharp from "sharp";

const targets = [
  ["https://finance-tracker-matin.vercel.app", "public/finance-tracker.webp"],
  ["https://metin-ecommerce.vercel.app", "public/ecommerce.webp"],
  ["https://metin-chatbot.vercel.app", "public/chatbot.webp"],
  ["https://job-tracker-matin.vercel.app", "public/job-tracker.webp"],
  ["https://github-explorer-matin.vercel.app", "public/github-explorer.webp"],
  ["https://weather-dashboard-matin.vercel.app", "public/weather-dashboard.webp"],
  ["https://crypto-tracker-matin.vercel.app", "public/crypto-tracker.webp"],
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
  const png = await page.screenshot();
  await sharp(png).webp({ quality: 82 }).toFile(file);
  console.log("saved", file);
}

await browser.close();
