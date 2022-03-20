// 获取视频实际下载链接
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices.devicesMap['iPhone 6'];

const getUrl = async (item) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36");
  await page.evaluateOnNewDocument(() => {
    delete navigator.__proto__.webdriver;
  });
  await page.evaluateOnNewDocument(() => {
    delete navigator.__proto__.webdriver;
  });
  await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'plugins', {
          get: () => [1, 2, 3, 4, 5],
      });
  });
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'languages', {
        get: () => ['en-US', 'en'],
    })
  });
  await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'platform', {
          get: () => "Linux armxxxxx",
          configurable: true
      });
  });

  await page.evaluateOnNewDocument(() => {
      window.navigator.chrome = {
          runtime: {},
          getUserMedia: {},
      };
  });
  await page.emulate(iPhone);
  await page.goto(item.url);
  // await page.waitFor(1000);  //页面等待，可以是时间、某个元素、某个函数
  // await page.screenshot({
  //   path: 'google.png'
  // });
  const result = await page.evaluate((item) => {
    let url = document.querySelector('source').src;
    return {
      title: item.title,
      url
    }
  }, item);
  await browser.close();
  return result;
}

module.exports = getUrl