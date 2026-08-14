const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })

  for (const [name, url, dark] of [
    ['home-light', 'http://localhost:3000/fr', false],
    ['home-dark', 'http://localhost:3000/fr', true],
    ['article-light', 'http://localhost:3000/fr/blog/stack-ia-docker', false],
    ['article-dark', 'http://localhost:3000/fr/blog/stack-ia-docker', true],
  ]) {
    if (dark) {
      await page.addInitScript(() =>
        document.documentElement.classList.add('dark')
      )
    }
    await page.goto(url, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1200)

    const info = await page.evaluate(() => {
      const body = getComputedStyle(document.body)
      const p = document.querySelector('article p, .prose-blog p, main p')
      const h2 = document.querySelector('article h2, h2')
      const hero = document.querySelector('section')
      const get = (el, prop) => (el ? getComputedStyle(el)[prop] : null)
      return {
        htmlClass: document.documentElement.className,
        bodyColor: body.color,
        bodyBg: body.backgroundColor,
        pColor: get(p, 'color'),
        pBg: get(p, 'backgroundColor'),
        h2Color: get(h2, 'color'),
        heroBg: get(hero, 'backgroundColor'),
      }
    })
    console.log(`\n=== ${name} ===`)
    console.log(JSON.stringify(info, null, 1))
    await page.screenshot({ path: `/tmp/shot-${name}.png` })
  }

  await browser.close()
})()
