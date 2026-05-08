import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';
import { NavigateToLogin } from '../pages/NavigateToLogin';

test('Hepsiburada Sepete Ürün Ekleme Testi', async ({ page }) => {
  const homePage = new HomePage(page);

  // Ana sayfaya git ve çerezleri kabul et
  await homePage.goto();
  await homePage.acceptCookies();

  // İlk ürünü seç 
  const productPage = await homePage.selectFirstProduct();
  const productDetailPage = new ProductDetailPage(productPage);
  const cartPage = new CartPage(productPage);
  const navigateToLogin = new NavigateToLogin(productPage);

  // Ürün detay sayfasında sepete ekle
  await productDetailPage.addToCart();

  // Pop-up'da Sepete Git butonuna tıkla
  await productDetailPage.goToCart();

  // Sepet sayfasında ürünü doğrula
  await cartPage.verifyAllProductDetails('Mf Superclean Duo Twısted Oto Kurulama Havlusu 1200GSM - 70X50CM');
  await cartPage.checkboxIsNotChecked();
  await cartPage.checkboxIsChecked();
  await cartPage.addOneMoreProduct();
  await cartPage.reduceOneMoreProduct();


  // Login sayfasına yönlen ve doğrula  
  await navigateToLogin.goto(); 
  await navigateToLogin.verifyLoginPage();  

});