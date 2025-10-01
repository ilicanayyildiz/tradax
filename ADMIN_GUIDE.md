# 🎛️ Admin Panel Kullanım Kılavuzu

TradaX Admin Panel kullanımı ve özellikleri.

## 🔐 Giriş ve Yetkiler

### Roller:

| Rol | Makale Yaz | Kendi Makalelerini Düzenle | Tüm Makaleleri Düzenle | Makale Sil | Kullanıcı Yönet |
|-----|-----------|---------------------------|----------------------|-----------|----------------|
| **Reader** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Writer** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Editor** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Admin** | ✅ | ✅ | ✅ | ✅ | ✅ |

## 📝 Makale Oluşturma

### Adımlar:

1. **Dashboard'a git**: http://localhost:3000/dashboard
2. **"New Article"** butonuna tıkla
3. Formu doldur:
   - **Title** *(zorunlu)* - Makale başlığı
   - **Excerpt** - Kısa özet (liste sayfalarında görünür)
   - **Category** - Kategori seç
   - **Tags** - Virgülle ayır (forex, trading, btc)
   - **Featured Image** - Görsel yükle (Supabase Storage'a)
   - **Content** *(zorunlu)* - Rich text editor ile içerik yaz

4. Kaydet:
   - **Save as Draft** - Taslak olarak kaydet (yayınlanmaz)
   - **Publish** - Hemen yayınla

### 🖼️ Görsel Yükleme:

- **Maks boyut**: 5MB
- **Format**: PNG, JPG, GIF
- **Yüklenir**: Supabase Storage (`images` bucket)
- **Otomatik**: Public URL alınır

### ✍️ Rich Text Editor:

**Toolbar özellikleri:**
- **B** - Bold (kalın)
- **I** - Italic (italik)
- **H1, H2** - Başlıklar
- **•, 1.** - Liste (noktalı/numaralı)
- **🔗** - Link ekle
- **🖼️** - Görsel ekle
- **"** - Alıntı (blockquote)
- **<>** - Kod bloğu

## 📊 Makale Yönetimi

### `/dashboard/articles`

**Tabloda görünen:**
- Title & Slug
- Author (yazar)
- Category
- Status (Published/Draft)
- Date (oluşturma tarihi)
- Actions (görüntüle/düzenle/sil)

**Filtreler:**
- Tüm makaleler (admin/editor)
- Sadece kendi makaleleri (writer)

### Makale Düzenleme:

1. Article Management sayfasında **Edit** ikonuna tıkla
2. Formu güncelle
3. **Save as Draft** veya **Publish** 

### Makale Silme:

- Sadece **Admin** ve **Editor** silebilir
- Onay penceresi çıkar
- Geri alınamaz!

## 👥 Kullanıcı Yönetimi

### `/dashboard/users`

**Sadece Admin ve Editor erişebilir!**

**Tabloda görünen:**
- Name & Avatar
- Email
- Role (renk kodlu)
- Joined date
- Change Role butonu (sadece admin)

**Rol Renkleri:**
- 🔴 Admin - Kırmızı
- 🟣 Editor - Mor
- 🔵 Writer - Mavi
- ⚪ Reader - Gri

## 🔧 Supabase Storage Ayarları

### Bucket Politikaları:

`images` bucket için RLS ayarları gerekli:

```sql
-- Public read access
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Authenticated users can upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'images' AND
  auth.role() = 'authenticated'
);

-- Users can update/delete own uploads
CREATE POLICY "Users can update own uploads"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'images' AND
  auth.uid() = owner
);

CREATE POLICY "Users can delete own uploads"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'images' AND
  (auth.uid() = owner OR 
   EXISTS (
     SELECT 1 FROM profiles 
     WHERE id = auth.uid() 
     AND role IN ('admin', 'editor')
   ))
);
```

### Bucket Ayarları:

1. Supabase Dashboard → Storage → images
2. **Public bucket** işaretle
3. **File size limit**: 5MB
4. **Allowed MIME types**: image/*

## 🚀 İlk Admin Kullanıcı Oluşturma

### Yöntem 1: Supabase Dashboard

1. Table Editor → profiles
2. Kullanıcını bul
3. `role` kolonunu `admin` yap
4. Save

### Yöntem 2: SQL

```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'youremail@example.com';
```

## 📋 İş Akışı

### Yazar (Writer):
1. Login yap
2. Dashboard → New Article
3. Makale yaz
4. Draft olarak kaydet
5. Editor'a onay için gönder (is_published = false)

### Editor:
1. Dashboard → Manage Articles
2. Bekleyen makaleleri gör
3. Düzenle (gerekirse)
4. Publish et veya reddet

### Admin:
- Her şeyi yapabilir
- Kullanıcı rollerini değiştirebilir
- Herhangi bir makaleyi silebilir

## ⚙️ API Endpoints

### Articles:

```
GET    /api/articles          # Liste
GET    /api/articles/[id]     # Tek makale
POST   /api/articles          # Yeni oluştur
PUT    /api/articles/[id]     # Güncelle
DELETE /api/articles/[id]     # Sil
```

### Kimlik Doğrulama:

Tüm POST/PUT/DELETE işlemleri:
- ✅ Authentication gerektirir
- ✅ Role kontrolü yapar
- ✅ RLS policies uygulanır

## 🐛 Sorun Giderme

### "Insufficient permissions"
- Role'ünü kontrol et (Supabase → profiles)
- Writer sadece kendi makalelerini düzenleyebilir

### "Failed to upload image"
- Bucket policies doğru mu?
- File size 5MB'ın altında mı?
- Format destekleniyor mu?

### "Unauthorized"
- Login olmuş musun?
- Session expire olmuş olabilir, tekrar login yap

## 📚 Ekstra Özellikler

### Gelecekte Eklenebilir:

- [ ] Bulk delete (toplu silme)
- [ ] Article preview (önizleme)
- [ ] Revision history (versiyon geçmişi)
- [ ] Scheduled publishing (zamanlanmış yayın)
- [ ] SEO metadata editor
- [ ] Article analytics (view stats)
- [ ] Comment moderation
- [ ] Image gallery/library

---

**Admin panel tamamen hazır ve çalışır durumda!** 🎉

