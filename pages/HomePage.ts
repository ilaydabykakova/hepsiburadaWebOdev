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

  async selectFirstProduct() {
    const popupPromise = this.page.waitForEvent('popup');
    await this.page.locator('.productCard-module_productCardRoot__Yf7qs').nth(2).click();
    return await popupPromise;
  }
}