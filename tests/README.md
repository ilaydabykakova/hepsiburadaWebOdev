# Hepsiburada Mobil - Sepet UI Testleri

Hepsiburada Android uygulamasının sepet modülü için [Maestro](https://maestro.mobile.dev) ile yazılmış otomatik test senaryolarıdır.

## Testler

- Ürün doğrulama (görsel, ad, fiyat, vs.)
- Adet artırma / azaltma
- Ürün silme
- Checkbox seçimi
- Kargo bedava doğrulama
- Ödeme → login yönlendirme
- Ürün detaya geri dönüş

## Çalıştırma

```bash
maestro test sepet_urun_dogrulama.yaml
```

**Gereksinimler:** Maestro CLI, Android cihaz/emülatör, Hepsiburada uygulaması
