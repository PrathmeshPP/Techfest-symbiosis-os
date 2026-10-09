/**
 * Full 9-state screenshot verification for Phase 5 visual defect fix.
 * Requires dev server at http://localhost:5173
 */
import { chromium } from './node_modules/playwright/index.mjs';

const OUT = 'C:/Users/PRATHMESH/.gemini/antigravity-ide/brain/113eb2a7-85bf-4119-96c9-f9da39ef6e67';

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1536, height: 826 } });
const page = await ctx.newPage();

await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });

// A — Fresh load. Wait 6 s for: GSAP (1.5 s) + DecoderText at delay=500ms + rAF decode (~1.3 s) = 2.8 s total. 6 s is ample.
console.log('Waiting 6 s for page to settle...');
await page.waitForTimeout(6000);

await page.screenshot({ path: `${OUT}/v3_A_cyborg_settled.png` });
console.log('A — Cyborg settled');

// Capture console errors
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

// B — Human mode
const toggleBtn = page.locator('button', { hasText: /HUMAN|human/i }).first();
try { await toggleBtn.click({ timeout: 3000 }); } catch { console.log('Human toggle not found by text, trying role'); }
await page.waitForTimeout(2000);
await page.screenshot({ path: `${OUT}/v3_B_human_settled.png` });
console.log('B — Human settled');

// Back to Cyborg
const cyborgBtn = page.locator('button', { hasText: /CYBORG|cyborg/i }).first();
try { await cyborgBtn.click({ timeout: 2000 }); } catch { /**/ }
await page.waitForTimeout(1000);

// C — Partial scroll (300 px)
await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'instant' }));
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/v3_C_scroll_300.png` });
console.log('C — Scroll 300px');

// D — Symbiosis
await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'instant' }));
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/v3_D_symbiosis.png` });
console.log('D — Symbiosis');

// E — Capabilities
await page.evaluate(() => window.scrollTo({ top: 1600, behavior: 'instant' }));
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/v3_E_capabilities.png` });
console.log('E — Capabilities');

// F — Interface/HUD
await page.evaluate(() => window.scrollTo({ top: 2200, behavior: 'instant' }));
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/v3_F_hud.png` });
console.log('F — InterfaceHUD');

// G — Final CTA
await page.evaluate(() => window.scrollTo({ top: 99999, behavior: 'instant' }));
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/v3_G_cta.png` });
console.log('G — Final CTA');

// H — Return to Hero (Cyborg) — wait 3 s for damp to fully settle
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
await page.waitForTimeout(3500);
await page.screenshot({ path: `${OUT}/v3_H_return_cyborg.png` });
console.log('H — Return to Hero (Cyborg)');

// I — Return to Hero (Human) — toggle and capture
try { await toggleBtn.click({ timeout: 2000 }); } catch { /**/ }
await page.waitForTimeout(2000);
await page.screenshot({ path: `${OUT}/v3_I_return_human.png` });
console.log('I — Return to Hero (Human)');

// Report console errors
if (errors.length) {
  console.log('\nBrowser console errors:');
  errors.forEach(e => console.log('  ERROR:', e));
} else {
  console.log('\nNo browser console errors.');
}

await browser.close();
console.log('\nALL SCREENSHOTS DONE');
