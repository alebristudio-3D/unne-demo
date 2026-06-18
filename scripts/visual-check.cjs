const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');

const baseUrl = process.env.VISUAL_BASE_URL || 'http://localhost:4174';
const outputDir = path.resolve('.visual-check');
fs.mkdirSync(outputDir, { recursive: true });

const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 900, height: 1000 },
  { name: 'mobile', width: 390, height: 844 }
];

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  });
  const report = [];

  for (const viewport of viewports) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1
    });
    const errors = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));

    await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
    const home = await page.evaluate(() => ({
      title: document.title,
      overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      viewportWidth: document.documentElement.clientWidth,
      documentWidth: document.documentElement.scrollWidth,
      navDisplay: getComputedStyle(document.querySelector('.site-nav')).display,
      menuDisplay: getComputedStyle(document.querySelector('.menu-toggle')).display,
      h1Size: getComputedStyle(document.querySelector('h1')).fontSize
    }));
    await page.screenshot({
      path: path.join(outputDir, `home-${viewport.name}-fold.png`),
      fullPage: false
    });
    await page.screenshot({
      path: path.join(outputDir, `home-${viewport.name}.png`),
      fullPage: true
    });

    if (viewport.name === 'mobile') {
      await page.locator('.menu-toggle').click();
      const expanded = await page.locator('.menu-toggle').getAttribute('aria-expanded');
      const menuVisible = await page.locator('#site-nav').isVisible();
      home.mobileMenu = { expanded, menuVisible };
    }

    await page.goto(`${baseUrl}/estudios/`, { waitUntil: 'networkidle' });
    const studyIndex = await page.evaluate(() => ({
      overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      cards: document.querySelectorAll('[data-filter-item]').length
    }));

    report.push({ viewport, home, studyIndex, errors });
    await page.close();
  }

  await browser.close();
  fs.writeFileSync(path.join(outputDir, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
