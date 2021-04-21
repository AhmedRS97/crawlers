
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
	  headless: false,
	  executablePath: '/usr/lib/chromium/chromium',
	  args: ['--user-data-dir=/home/ahmedrs/.config/chromium/Profile\ 3'],
  });
  const page = await browser.newPage();
  await page.goto('https://web.telegram.org/#/im?p=@idle_city_games_bot', {
	  waitUntil: 'domcontentloaded',
  });
  let lastMsgSel = "div.im_history_message_wrap:last-of-type a.im_message_author";
  let betBtnSel = "div.im_send_keyboard_wrap div.reply_markup_row:first-of-type div.reply_markup_button_wrap:first-of-type button.reply_markup_button";
  await page.waitFor(4*1000);
  while (true) {
    await page.waitFor(3*1000);
    let lastMsg = await page.evaluate((sel) => {
      return document.querySelector(sel).textContent;
    }, lastMsgSel);
    if (lastMsg.includes('Idle')) {
      await page.click(betBtnSel);
    }
  }
})();
