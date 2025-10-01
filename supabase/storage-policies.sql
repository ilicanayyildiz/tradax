-- Storage Policies for "images" bucket
-- Run these in Supabase SQL Editor after creating the bucket

-- 1. Public read access (herkes görselleri görebilir)
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- 2. Authenticated users can upload (giriş yapanlar yükleyebilir)
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'images' AND
  auth.role() = 'authenticated'
);

-- 3. Users can update own uploads (kendi yüklediklerini güncelleyebilir)
CREATE POLICY "Users can update own uploads"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'images' AND
  auth.uid() = owner
);

-- 4. Users can delete own uploads, or admin/editor can delete any
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

