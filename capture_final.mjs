import { chromium } from 'playwright';
const OUT = 'C:/Users/PRATHMESH/.gemini/antigravity-ide/brain/113eb2a7-85bf-4119-96c9-f9da39ef6e67';

(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: 1536, height: 826 } });
  const page = await ctx.newPage();
  
  await page.goto('http://localhost:5173/');
  
  // 1. Cyborg settled
  console.log('Waiting 6s for initial animations...');
  await page.waitForTimeout(6000);
  await page.screenshot({ path: `${OUT}/final_01_cyborg_settled.png` });
  console.log('Saved Cyborg settled');
  
  // 2. Human settled
  console.log('Clicking toggle to Human mode...');
  await page.locator('button[aria-label="Toggle Human / Cyborg Mode"]').click();
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${OUT}/final_02_human_settled.png` });
  console.log('Saved Human settled');
  
  // 3. Scroll full page then return top in Human mode
  console.log('Scrolling down and up...');
  await page.evaluate(() => window.scrollTo({ top: 3000, behavior: 'instant' }));
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(4000);
  await page.screenshot({ path: `${OUT}/final_03_human_return_top.png` });
  console.log('Saved Human return to top');
  
  // 4. Return to Cyborg mode and scroll down/up
  console.log('Clicking toggle to Cyborg mode...');
  await page.locator('button[aria-label="Toggle Human / Cyborg Mode"]').click();
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo({ top: 3000, behavior: 'instant' }));
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(4000);
  await page.screenshot({ path: `${OUT}/final_04_cyborg_return_top.png` });
  console.log('Saved Cyborg return to top');
  
  await browser.close();
  console.log('DONE');
})();
