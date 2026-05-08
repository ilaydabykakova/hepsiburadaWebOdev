import { Page } from '@playwright/test';

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.hepsiburada.com/');
  }

  async acceptCookies() {
   const acceptButton = this.page.getByText('Kabul Et', { exact: true });
    if (await acceptButton.isVisible({ timeout: 10000 })) {
      const popupPromise = this.page.waitForEvent('popup').catch(() => null);
      await acceptButton.click();
      await Promise.race([popupPromise, this.page.waitForTimeout(2000)]);
    }
  }

async selectFirstProduct(productName: string) {
  const firstProduct = this.page.getByRole('link', { name: productName, exact: true });
  await firstProduct.waitFor({ state: 'visible', timeout: 15000 });

  const [popup] = await Promise.all([
    this.page.waitForEvent('popup', { timeout: 10000 }).catch(() => null),
    firstProduct.click(),
  ]);

  if (popup) {
    await popup.waitForLoadState('domcontentloaded');
    return popup;
  }

  await this.page.waitForLoadState('domcontentloaded');
  return this.page;
}
}