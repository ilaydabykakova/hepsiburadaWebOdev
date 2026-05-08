import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';
import { NavigateToLogin } from '../pages/NavigateToLogin';

test('Hepsiburada Sepete Ürün Ekleme Testi', async ({ page }) => {
  const productName = 'Mf Superclean Duo Twısted Oto Kurulama Havlusu 1200GSM - 70X50CM';
  const homePage = new HomePage(page);

  // Ana sayfaya git ve çerezleri kabul et
  await homePage.goto();
  await homePage.acceptCookies();

  // İlk ürünü seç 
  const productPage = await homePage.selectFirstProduct(productName);
  const productDetailPage = new ProductDetailPage(productPage);

  // Ürün detay sayfasında sepete ekle
  await productDetailPage.addToCart();
  // Pop-up'da Sepete Git butonuna tıkla
  await productDetailPage.goToCart();

  const cartPage = new CartPage(productPage);
  const navigateToLogin = new NavigateToLogin(productPage);

  // Sepet sayfasında ürünü doğrula
  await cartPage.verifyAllProductDetails(productName);
  await cartPage.addOneMoreProduct();
  await cartPage.reduceOneMoreProduct();
  await cartPage.checkboxIsNotChecked();
  await cartPage.checkboxIsChecked();

  // Login sayfasına yönlen ve doğrula  
  await navigateToLogin.goto(); 
  await navigateToLogin.verifyLoginPage();  

});