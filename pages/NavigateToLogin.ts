import { Page, expect } from '@playwright/test';


export class NavigateToLogin {
    private page: Page;

    constructor(page: Page) {
    this.page = page;
  }

async goto() {
  await this.page.getByRole('button', { name: 'Alışverişi tamamla' }).click();
  await this.page.waitForURL(/uyelik\/giris|giris\.hepsiburada\.com/, { 
    timeout: 15000, 
    waitUntil: 'domcontentloaded' 
  });
}

  async verifyLoginPage() { 
    const loginText = this.page.getByText('Giriş yap').first();
    await expect(loginText).toBeVisible({ timeout: 15000 });
    await expect(loginText).toHaveText('Giriş yap');
    
    const loginWithoutText = this.page.getByText('Üye olmadan devam et');
    await expect(loginWithoutText).toBeVisible({ timeout: 15000 });
    await expect(loginText).toHaveText('Üye olmadan devam et');

  }

}