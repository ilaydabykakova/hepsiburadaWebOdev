import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';

test('Hepsiburada Sepete Ürün Ekleme Testi', async ({ page }) => {
  const homePage = new HomePage(page);

  // Ana sayfaya git ve çerezleri kabul et
  await homePage.goto();
  await homePage.acceptCookies();

  // İlk ürünü seç 
  const productPage = await homePage.selectFirstProduct();
  const productDetailPage = new ProductDetailPage(productPage);
  const cartPage = new CartPage(productPage);

  // Ürün detay sayfasında sepete ekle
  await productDetailPage.addToCart();

  // Pop-up'da Sepete Git butonuna tıkla
  await productDetailPage.goToCart();

  // Sepet sayfasında ürünü doğrula
  await cartPage.verifyAllProductDetails('Altınmarka ALT211 Sütlü Damla Çikolata 1Kg');
});