const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });

  const page = await browser.newPage();
  await page.goto("https://www.techmeme.com/");

  const techNewsApis = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#topcol1 .clus"), (e) => ({
      id: e.querySelector(".clus > a").name,
      title: e.querySelector("a.ourh").innerText,
      url: e.querySelector("a.ourh").href,
    }))
  );

  //Save data to JSON file
  fs.writeFile("techNewsApis.json", JSON.stringify(techNewsApis), (error) => {
    if (error) throw error;
    console.log(`techNewsApis is now saved on your project folder`);
  });

  console.log(techNewsApis);
  await browser.close();
}
  )();