const { chromium } = require('playwright')

const fecha16 = false
const fecha15 = false
;(async () => {
      var browser = await chromium.launch({ headless: false })
    var page = await browser.newPage()
  while(!fecha15 || !fecha16) {

    try {

      if (!fecha16){
        CheckDay(page, 'https://publico.elterrat.com/programa/la-resistencia/formulario/?gf_token=df1827c2180f4088a687077a42319257', 16)
      }

      if (!fecha15){
        CheckDay(page, 'https://publico.elterrat.com/programa/la-resistencia/formulario/?gf_token=68db1cbb30e34786a28681be383d19a4', 15)
      }
   
  } catch (error) {
      console.log("Timeout!")
  }
}

})()

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function CheckDay(page, url, day){
  await page.goto(url, {waitUntil: 'load', timeout: 0})

  await new Promise(resolve => setTimeout(resolve, 60000));
    
  await page.click('[type="submit"]');

  await new Promise(resolve => setTimeout(resolve, 5000));

  const content = await page.textContent('.validation_error')
    if (content.includes('No hay fechas') === false){
      console.log('Hay Fecha!!')
      await page.screenshot({path: 'despues' + day + '.png'});
      if (day == 15){fecha15 = true}
      if (day == 16){fecha16 = true}
    }
 
}

// function CheckCaptcha(page) {
//   const elementHandle = await page.$('.g-recaptcha > div > div > iframe')
//     const frame = await elementHandle.contentFrame()
//     const value = await frame.evaluate(() => document.getElementById('recaptcha-token').value)
//     //await page.click(await frame.evaluate(() => document.getElementById('recaptcha-token')))
//     console.log(value)

//         await frame.click('.recaptcha-checkbox');
// }
