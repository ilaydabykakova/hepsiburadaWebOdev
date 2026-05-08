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

    // Ürün fiyat
    const productPrice = productRow.locator('.product_price_uXU6Q');
    await expect(productPrice).toBeVisible();
    await expect(productPrice).toContainText('TL');

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

    //Sepet Fiyatı 
    const basketPrice = this.page.locator('.total_price_3V-CM');
    await expect(basketPrice).toBeVisible();
    await expect(basketPrice).toContainText('TL');

    // Tek ürün için sepet vs ürün fiyatı kontrolü
    const basketText = await basketPrice.textContent();
    const productText = await productPrice.textContent();
    expect(basketText?.trim()).toBe(productText?.trim());
   
    // Adet input'u
    const quantityInput = productRow.locator('input[name="quantity"]');
    await expect(quantityInput).toBeVisible();

    // Arttır butonu
    const increaseBtn = productRow.locator('a[aria-label="Ürünü Arttır"]');
    await expect(increaseBtn).toBeVisible();

    // Sepetten çıkar butonu
    const deleteBtn = productRow.locator('a[aria-label="Sepetten Çıkar"]');
    await expect(deleteBtn).toBeVisible();

    // Kargon bedava
    const kargoBedava = productRow.locator('.merchant_shipping_2bjR-');
    await expect(kargoBedava).toBeVisible();
    await expect(kargoBedava).not.toBeEmpty();

    // Kargo tarih alanı 
    const kargoDate= productRow.locator('.product_duedate_wrapper_4K6-9 span');
    const kargoIcon = productRow.locator('img').nth(3);
    await expect(kargoDate).toBeVisible();
    await expect(kargoDate).not.toBeEmpty();
    await expect(kargoIcon).toBeVisible();

     // Cehckbox butonu seçili gelir
    const checkbox = productRow.getByLabel('',{exact : true});
    await expect(checkbox).toBeChecked(); 
  }
  
  // Checkbox'ın seçili gelmediğini doğrula ve tıkla  
  async checkboxIsNotChecked() { 
    await this.page.locator('#selectedCheckBox').click();
    const checkbox = this.page.locator('#selectedCheckBox');
    await expect(checkbox).toHaveAttribute('data-test-class', 'selection-unselected');
  }

  // Checkbox'ın seçili olduğunu doğrula ve tıkla 
   async checkboxIsChecked() { 
        await this.page.getByLabel('',{exact : true}).click();
   }

   // Sepete bir ürün daha ekle
   async addOneMoreProduct() {
    const increaseBtn = this.page.getByLabel('Ürünü Arttır').first();
    await increaseBtn.click();
    const quantityInput = this.page.getByRole('spinbutton').first();
    await expect(quantityInput).toHaveValue('2');
  }

  // Sepetten bir ürün azalt  
   async reduceOneMoreProduct() {
    const increaseBtn = this.page.getByLabel('Sepetten Çıkar').first();
    await increaseBtn.click();
    const quantityInput = this.page.getByRole('spinbutton').first();
    await expect(quantityInput).toHaveValue('1');
  }
}