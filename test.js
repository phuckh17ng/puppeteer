const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.youtube.com/watch?v=Qyepm5HhUs8", {
    waitUntil: "domcontentloaded",
  });

  const songs = await page.evaluate(() => {
    let items = document.querySelectorAll(
      "#count > yt-formatted-string > span:nth-child(1)"
    );
    console.log("12312312", items);
    let links = [];
    items.forEach((item) => {
      links.push({
        title: item.innerText,
        url: item.getAttribute("href"),
      });
    });
    return links;
  });
  console.log(songs);
  await browser.close();
})();
