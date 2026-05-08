import { Page, expect } from '@playwright/test';

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyAllProductDetails(productName: string) {
    // Sepet sayfasında olduğunu doğrula
    await expect(this.page).toHaveURL(/checkout/);

    //Ürün adı 
    const productRow = this.page.locator('div').filter({ hasText: productName }).first();
    await expect(productRow).toBeVisible();

    // Ürün görseli ve linki
    const imgLink = productRow.locator('figure a');
    await expect(imgLink).toBeVisible();
    await expect(imgLink).toHaveAttribute('href', /.+/);

    // Sepetteki fiyat
    const price = productRow.locator('.product_price_uXU6Q');
    await expect(price).toBeVisible();
    await expect(price).toContainText('TL');

    // Üstü çizili fiyat
    const strikePrice = productRow.locator('.strike_price_17gHl');
    if (await strikePrice.count() > 0) {
      await expect(strikePrice).toBeVisible();
    }

    // Kazancını gör fiyatı butonu
    const savingBtn = productRow.locator('.saving_btn_1ocio');
    if (await savingBtn.count() > 0) {
      await expect(savingBtn).toBeVisible();
    }

    // Adet input'u
    const quantityInput = productRow.locator('input[name="quantity"]');
    await expect(quantityInput).toBeVisible();

    // Arttır butonu
    const increaseBtn = productRow.locator('a[aria-label="Ürünü Arttır"]');
    await expect(increaseBtn).toBeVisible();

    // Sepetten çıkar butonu
    const deleteBtn = productRow.locator('a[aria-label="Sepetten Çıkar"]');
    await expect(deleteBtn).toBeVisible();
  }
  
}