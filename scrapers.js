const puppeteer = require('puppeteer');

async function scrapeProduct(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="landingImage"]');
    const src = await el.getProperty('src');
    const imgURL = await src.jsonValue();
    
    const [el2] = await page.$x('//*[@id="productTitle"]');
    const txt = await el2.getProperty('textContent');
    let title = await txt.jsonValue();
        title = title.replace(/\r?\n|\r/g, '');

    const [el3] = await page.$x('//*[@id="priceblock_ourprice"]');
    const txt2 = await el3.getProperty('textContent');
    const price = await txt2.jsonValue();

    browser.close();

    return {imgURL, title, price}
}

scrapeProduct('URL')
        .then(val => console.log(val));