import puppeteer from 'puppeteer-core'
import config from './config'
import { pause } from './human/pause'
import { typeLikeHuman } from './human/type'

const start = async (): Promise<void> => {
  const { USER_AGENT, HEADLESS } = config()

  const browser = await puppeteer.launch({
    headless: HEADLESS,
    debuggingPort: 3000
  })


  const page = await browser.newPage()
  page.setUserAgent(USER_AGENT)

  await page.goto('https://order.chick-fil-a.com/get-started')
  await pause(5)
  await page.click('#onetrust-close-btn-container')
  await pause(2)
  await page.click('button[data-cy=Pickup]')
  await pause(5)
  await page.focus('input[data-cy=LocationSearch]')
  await typeLikeHuman(page, 'input[data-cy=LocationSearch]', 'Wilmington, NC')
  await pause(2)
  await page.click('button[data-cy=FindRestaurants]')
  await pause(5)
  await page.hover('button[title~=Independence]')
  await pause(1)
  await page.click('button[title~=Independence]')
  await pause(2)
  await page.click('button[data-cy=Carry-out]')
  await pause(5)
  await page.click('button[data-cy=MOBILE_ENTREES]')
  await pause(2)
  await page.click('button[data-cy=SANDWICH_CFA_CHICKEN]')
  await pause(2)
  await page.hover('button[data-cy=PICKLES]')
  await pause(1)
  await page.click('button[data-cy=PICKLES]')
  await pause(2)
  await page.click('button[data-cy=IncreaseQuantity]')
  await pause(1)
  await page.click('button[data-cy=IncreaseQuantity]')
  await pause(0.5)
  await page.click('button[data-cy=IncreaseQuantity]')
  await pause(3.0)
  await page.click('button[data-cy=AddToOrder]')


  console.log('about to click button[data-cy=Cart]')
  await page.waitForNavigation()
  const myCartButton = await page.waitForSelector('button[data-cy=Cart]');
  await pause(3.0)
  await myCartButton.click()
  await page.click('button[data-cy=CheckOut]')
  await pause(2.0)
  await page.hover('button[data-cy=CheckOutSignInButton]')
  await page.click('button[data-cy=CheckOutSignInButton]')
  await pause(2.0)
  await page.focus('input[name=pf.username]')
  await typeLikeHuman(page, 'input[name=pf.username]', 'zaytesthacz@mailinator.com')

  await pause(1.2)
  await page.focus('input[name=pf.pass]')
  await typeLikeHuman(page, 'input[name=pf.pass]', '4hV(6Y2+NKEEG$-m')
  await pause(1.2)
  await page.click('button[name=pf.ok]')
  await pause(10)
}

start().catch((err) => {
  console.error('Error occured: ', err)
})
