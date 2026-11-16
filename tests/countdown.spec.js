// @ts-check
const fs = require('fs');
const { test, expect } = require('@playwright/test');

const UNLOCK = Date.UTC(2026, 10, 19, 5, 0, 0); // 05:00 UTC = 12:00 AM ET
const DAY = 864e5, HOUR = 36e5, MIN = 6e4, SEC = 1e3;

/** Freeze the page clock at a fixed offset before the unlock, then load the page.
 *  Time only moves when a test calls page.clock.runFor(). */
async function openAt(page, msBeforeUnlock, path = '/') {
  const at = UNLOCK - msBeforeUnlock;
  await page.clock.install({ time: new Date(at - 1000) });
  await page.clock.pauseAt(new Date(at));
  await page.goto(path, { waitUntil: 'domcontentloaded' });
}

test.describe('page health', () => {
  test('loads with no JavaScript errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1')).toContainText('VI');
    await page.waitForTimeout(1500);
    expect(errors).toEqual([]);
  });

  test('has no horizontal scroll', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('renders the generated scene', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    expect(await page.locator('#near rect').count()).toBeGreaterThan(20);
    expect(await page.locator('#stars circle').count()).toBe(150);
  });
});

test.describe('countdown', () => {
  test('shows the exact time remaining', async ({ page }) => {
    await openAt(page, 2 * DAY + 3 * HOUR + 4 * MIN + 5 * SEC);
    await expect(page.locator('#d')).toHaveText('02');
    await expect(page.locator('#h')).toHaveText('03');
    await expect(page.locator('#m')).toHaveText('04');
    await expect(page.locator('#s')).toHaveText('05');
    await expect(page).toHaveTitle('2d 03:04:05 · GTA VI Countdown');
  });

  test('ticks every second', async ({ page }) => {
    await openAt(page, 10 * MIN + 30 * SEC);
    await expect(page.locator('#s')).toHaveText('30');
    await page.clock.runFor(3000);
    await expect(page.locator('#s')).toHaveText('27');
  });

  test('glows during the final 24 hours', async ({ page }) => {
    await openAt(page, 2 * HOUR);
    await expect(page.locator('body')).toHaveClass(/\bfinal\b/);
  });

  test('switches to OUT NOW at unlock', async ({ page }) => {
    await openAt(page, 2 * SEC);
    await expect(page.locator('.outnow')).toBeHidden();
    await page.clock.runFor(3000);
    await expect(page.locator('body')).toHaveClass(/\breleased\b/);
    await expect(page.locator('.outnow')).toBeVisible();
    await expect(page.locator('.countdown')).toBeHidden();
    await expect(page).toHaveTitle('GTA VI is OUT NOW');
  });

  test('progress bar reports a percentage', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#pct')).toHaveText(/^\d{1,3}\.\d{5}%$/);
  });
});

test.describe('US time zones', () => {
  const expected = {
    ET: ['12:00 AM', 'Thu, Nov 19'],
    CT: ['11:00 PM', 'Wed, Nov 18'],
    MT: ['10:00 PM', 'Wed, Nov 18'],
    PT: ['9:00 PM', 'Wed, Nov 18'],
    AKT: ['8:00 PM', 'Wed, Nov 18'],
    HT: ['7:00 PM', 'Wed, Nov 18'],
  };

  test('lists the unlock time in all six zones', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const zones = page.locator('.zone');
    await expect(zones).toHaveCount(6);
    for (const [abbr, [time, day]] of Object.entries(expected)) {
      const zone = zones.filter({ hasText: new RegExp(`^${abbr}`) });
      await expect(zone).toContainText(time);
      await expect(zone).toContainText(day);
    }
    await expect(page.locator('#when')).toContainText('Thursday, November 19, 2026');
    await expect(page.locator('#when')).toContainText('12:00 AM ET');
  });

  test.describe('visitor in Los Angeles', () => {
    test.use({ timezoneId: 'America/Los_Angeles' });
    test('highlights Pacific time', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('.zone.you')).toHaveCount(1);
      await expect(page.locator('.zone.you')).toContainText('PT · You');
      await expect(page.locator('#local')).toContainText('Same instant nationwide');
    });
  });

  test.describe('visitor outside the US', () => {
    test.use({ timezoneId: 'Asia/Tokyo' });
    test('shows their local unlock time', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('.zone.you')).toHaveCount(0);
      await expect(page.locator('#local')).toContainText('Asia/Tokyo');
      await expect(page.locator('#local')).toContainText('Thu, Nov 19 · 2:00 PM');
    });
  });
});

test.describe('controls', () => {
  test('soundtrack toggles on and off', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const btn = page.locator('#musicBtn');
    await expect(btn).toHaveAttribute('aria-pressed', 'false');
    await btn.click();
    await expect(btn).toHaveAttribute('aria-pressed', 'true');
    await expect(btn).toContainText('Pause soundtrack');
    await btn.click();
    await expect(btn).toHaveAttribute('aria-pressed', 'false');
  });

  test('calendar export contains the unlock event', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const [download] = await Promise.all([page.waitForEvent('download'), page.click('#icsBtn')]);
    expect(download.suggestedFilename()).toBe('gta6-ps5-us-unlock.ics');
    const ics = fs.readFileSync(await download.path(), 'utf8');
    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('DTSTART:20261119T050000Z');
    expect(ics).toContain('TRIGGER:-PT30M');
  });
});

test.describe('stream mode', () => {
  test('?stream hides controls and the local-time line', async ({ page }) => {
    await page.goto('/?stream&mute', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toHaveClass(/\bstream\b/);
    await expect(page.locator('.audio')).toBeHidden();
    await expect(page.locator('.actions')).toBeHidden();
    await expect(page.locator('#local')).toBeHidden();
    await expect(page.locator('.countdown')).toBeVisible();
    await expect(page.locator('#musicBtn')).toHaveAttribute('aria-pressed', 'false');
  });

  test('?stream&vol sets the volume', async ({ page }) => {
    await page.goto('/?stream&mute&vol=0.3', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#vol')).toHaveValue('0.3');
  });
});
