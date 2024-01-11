const puppeteer = require("puppeteer");
const data = [
  { title: "i don't feel so good", url: "/watch?v=HlZ9PAWEjC4" },
  {
    title: "「your lie in april」watashi no uso (fingerstyle guitar)",
    url: "/watch?v=Qyepm5HhUs8",
  },
  {
    title: "Sylas 1vs5 PENTAKILL by Chú của Mỡ aka Khang Honda",
    url: "/watch?v=pbUrotv-0OM",
  },
  { title: "Katarina S11 PENTAKILL", url: "/watch?v=0HpFPGA699A" },
  { title: "3KA vs TPV (+1)", url: "/watch?v=fF6iK5EyfD0" },
  { title: "3KA vs TPV", url: "/watch?v=8m98gcDyjU4" },
  { title: "TFT YASUO SUPA CARRY (SS4)", url: "/watch?v=vV22ko-5f4E" },
  { title: "Lỗi game LOL Kayn", url: "/watch?v=fwVvXVaDF4s" },
  {
    title: "Darius 1 cân 5 PENTAKILL by Khang đẹp trai vkl!!!",
    url: "/watch?v=SAyHm7BYEsU",
  },
];

async function crawlFunc(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.youtube.com" + url, {
    waitUntil: "domcontentloaded",
    // timeout: "5000",
  });

  const songs = await page.evaluate(() => {
    let items = document.querySelectorAll("#content-text");
    // let title = document.querySelectorAll("#title > h1 > yt-formatted-string");
    console.log("12312312", items);
    let links = [];
    items.forEach((item) => {
      links.push({
        // title: title[0].innerHTML,
        comment: item.innerHTML,
        // url: item.getAttribute("href"),
      });
    });
    return links;
  });
  console.log(songs);
  await browser.close();
}

data.forEach(async (element) => {
  await crawlFunc(element.url);
});

// crawlFunc();
