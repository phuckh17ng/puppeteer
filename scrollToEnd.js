const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--window-size=800,600"],
  });
  const page = await browser.newPage();
  await page.goto("https://www.youtube.com/watch?v=Qyepm5HhUs8");

  const delay = 3000;
  let preCount = 0;
  let postCount = 0;
  do {
    preCount = await getCount(page);
    await scrollDown(page);
    await page.waitFor(delay);
    postCount = await getCount(page);
  } while (postCount > preCount);
  await page.waitFor(delay);

  await browser.close();
})();

async function getCount(page) {
  return await page.$$eval(".style-scope.ytd-app", (a) => a.length);
}

async function scrollDown(page) {
  await page.$eval(".style-scope.", (e) => {
    e.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
  });
}
