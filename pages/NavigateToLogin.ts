import { Page, expect } from '@playwright/test';


export class NavigateToLogin {
    private page: Page;

    constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.getByRole('button', { name: 'Alışverişi tamamla' }).click();
  }

  async verifyLoginPage() { 
    const loginText = this.page.getByText('Giriş yap');
    await expect(loginText).toBeVisible();
    await expect(loginText).toHaveText('Giriş yap');
    
    const loginWithoutText = this.page.getByText('Üye olmadan devam et');
    await expect(loginWithoutText).toBeVisible();
  }

}