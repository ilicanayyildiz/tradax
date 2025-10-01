# Görsel Kaynakları

Bu klasör site genelinde kullanılan görsel URL'lerini ve yardımcı fonksiyonları içerir.

## 📸 Görsel Kaynakları

Tüm görseller **Unsplash** ve **Pexels**'ten alınmıştır:
- ✅ **Tamamen ücretsiz**
- ✅ **Ticari kullanım OK**
- ✅ **Attribution gerekmez** (ama güzel olur)
- ✅ **Yüksek kalite** (1200x800 ve üzeri)

## 🎨 Kullanım

### 1. Kategoriye Göre Random Görsel

```typescript
import { getRandomImage } from '@/lib/constants/images'

const forexImage = getRandomImage('forex')
const cryptoImage = getRandomImage('crypto')
```

### 2. Kategori Slug'ına Göre

```typescript
import { getImageByCategory } from '@/lib/constants/images'

const image = getImageByCategory('forex') // 'forex', 'crypto', 'stock-market', vb.
```

### 3. Akıllı Öneri (Title'a göre)

```typescript
import { suggestArticleImage } from '@/lib/constants/images'

const image = suggestArticleImage('Bitcoin Reaches New Highs') // → crypto görseli
const image = suggestArticleImage('EUR/USD Analysis', 'forex') // → forex görseli
```

## 🔄 Yeni Görsel Ekleme

1. Unsplash veya Pexels'e git
2. İstediğin görseli bul
3. URL'i kopyala
4. `lib/constants/images.ts` dosyasına ekle:

```typescript
forex: [
  'https://images.unsplash.com/photo-XXXXX?w=1200&h=800&fit=crop',
  // Yeni görsel buraya
],
```

## 📊 Mevcut Kategoriler

- **hero**: Hero section arka planları
- **forex**: Döviz, forex trading
- **crypto**: Bitcoin, Ethereum, blockchain
- **stockMarket**: Borsa, hisse senetleri
- **commodities**: Altın, petrol, emtia
- **education**: Eğitim, öğrenme
- **business**: İş, profesyonel
- **avatars**: Yazar profil resimleri

## 🌐 Alternatif Kaynaklar

Daha fazla görsel için:

1. **Unsplash**: https://unsplash.com
   - Arama: "finance trading", "forex", "cryptocurrency"
   
2. **Pexels**: https://pexels.com
   - Arama: "stock market", "trading", "business"
   
3. **Pixabay**: https://pixabay.com
   - Ücretsiz, geniş koleksiyon

4. **Freepik**: https://freepik.com
   - İllüstrasyonlar ve vektörler (free plan)

## 💡 İpuçları

1. **Tutarlı boyutlar kullan**: 1200x800 standart
2. **WebP formatı tercih et**: Daha hızlı yükleme
3. **Next.js Image component kullan**: Otomatik optimize eder
4. **Lazy loading aktif**: Performans için

## 🚀 Production İçin

Production'da bu görselleri:
- Supabase Storage'a yükleyebilirsin
- Cloudinary kullanabilirsin
- Kendi CDN'inde barındırabilirsin

Ama şimdilik Unsplash CDN ücretsiz ve hızlı! ✨

