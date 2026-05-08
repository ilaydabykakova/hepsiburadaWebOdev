import { Page } from '@playwright/test';

export class ProductDetailPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addToCart() {
    await this.page.waitForTimeout(2000);
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.locator('[data-test-id="addToCart"]').waitFor({ state: 'visible', timeout: 20000 });
    await this.page.waitForFunction(() => {
      const button = document.querySelector('[data-test-id="addToCart"]') as HTMLButtonElement;
      return button && !button.disabled;
    });
    await this.page.locator('[data-test-id="addToCart"]').click({ force: true });
  }

  async goToCart() {
    await this.page.getByRole('button', { name: 'Sepete git' }).click();
  }
}