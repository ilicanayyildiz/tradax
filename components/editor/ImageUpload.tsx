'use client'

import { useState } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import Image from 'next/image'

interface ImageUploadProps {
  onUploadComplete: (url: string) => void
  currentImage?: string | null
}

export function ImageUpload({ onUploadComplete, currentImage }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const supabase = createClient()

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image')
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Image must be less than 5MB')
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `articles/${fileName}`

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      setPreview(publicUrl)
      onUploadComplete(publicUrl)
      toast.success('Image uploaded successfully!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload image')
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  const removeImage = () => {
    setPreview(null)
    onUploadComplete('')
  }

  return (
    <div className="space-y-4">
      {preview ? (
        <div className="relative">
          <div className="relative aspect-video overflow-hidden rounded-lg border-2 border-navy-200 dark:border-navy-700">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={removeImage}
            className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white hover:bg-red-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={uploadImage}
            disabled={uploading}
            className="hidden"
          />
          <label
            htmlFor="image-upload"
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-navy-300 bg-navy-50 p-12 transition-colors hover:border-primary-500 hover:bg-primary-50 dark:border-navy-700 dark:bg-navy-900 dark:hover:border-primary-500 ${
              uploading ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            {uploading ? (
              <>
                <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
                <p className="mt-4 text-sm text-navy-600 dark:text-navy-400">
                  Uploading...
                </p>
              </>
            ) : (
              <>
                <Upload className="h-12 w-12 text-navy-400" />
                <p className="mt-4 text-sm font-medium text-navy-900 dark:text-navy-100">
                  Click to upload image
                </p>
                <p className="mt-2 text-xs text-navy-500">
                  PNG, JPG, GIF up to 5MB
                </p>
              </>
            )}
          </label>
        </div>
      )}
    </div>
  )
}

