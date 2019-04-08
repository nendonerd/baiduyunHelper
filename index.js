const puppeteer = require('puppeteer-core')
const path = require('path')

const [,, ...argv] = process.argv
const args = argv.join().match(/([A-Za-z0-9\-_]+)/g)

const [hash] = args.slice().sort((a, b) => b.length - a.length) || ''
const index = args.findIndex(str => str === hash)

const psw = args.slice(index).find(x => x.length === 4) || ''


const options = {
  executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
  headless: false,
  userDataDir: path.resolve('./profile')   // use custom profile
};


(async () => {
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();

  await page.goto(`https://pan.baidu.com/s/${hash}`);

  console.log(psw)

  // handle page redirection
  try {
    await page.evaluate((psw) => {
      document.querySelector('input').value = psw
    }, psw)

    await Promise.all([
      page.waitForNavigation({timeout: 3000}), // setting timeout due to slow loading of some analytics api
      page.click('.g-button')
    ])

    // Auto download all files
    // .then(() => page.click('.Qxyfvg'))
      // .then(() => page.evaluate(() => {
        //   document.querySelectorAll('.g-button')[1].click()
        // }))
  } catch (err) {
    // timeout handling
    await page._client.send("Page.stopLoading")
  }

  // implement closing browser behavior when window is not focused
  try {
    await page.exposeFunction('tellPuppetToClose', () => {
      browser.close()
    })
    await page.evaluate(() => {
      // only detects tab changes
      document.addEventListener("visibilitychange", () => {
        console.log('switched tab')
        window.tellPuppetToClose()
      })

      // weird browser behavior, must click(focus) on the page first
      // before click(focus) outside the browser to make this event fires.
      window.addEventListener('blur', () => {
        console.log('window blurred')
        window.tellPuppetToClose()
      })

    })
  } catch(e) {}

})();

