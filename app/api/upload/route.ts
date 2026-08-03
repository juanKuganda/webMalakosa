import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Max file size: 5 MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/jpg',
  'image/avif',
  'image/gif',
];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'File gambar tidak ditemukan dalam permintaan.' },
        { status: 400 }
      );
    }

    // 1. Validasi Tipe File (MIME Type)
    const fileType = file.type?.toLowerCase() || '';
    if (!ALLOWED_MIME_TYPES.includes(fileType)) {
      return NextResponse.json(
        {
          error:
            'Format file tidak didukung. Harap unggah gambar dengan format JPG, PNG, WEBP, atau AVIF.',
        },
        { status: 400 }
      );
    }

    // 2. Validasi Ukuran File (Max 5MB)
    if (file.size > MAX_FILE_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      return NextResponse.json(
        {
          error: `Ukuran file terlalu besar (${sizeMB} MB). Maksimal ukuran file yang diizinkan adalah 5 MB. Harap kompres foto Anda terlebih dahulu.`,
        },
        { status: 413 }
      );
    }

    // 3. Sanitasi Ekstensi & Nama File
    const rawExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const ext = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif'].includes(rawExt)
      ? rawExt
      : 'jpg';
    const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const filename = `wisata/${uniqueSuffix}.${ext}`;

    // Convert file to Node Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 4. Upload ke Supabase Storage
    const { data, error } = await supabase.storage
      .from('malakosa')
      .upload(filename, buffer, {
        contentType: file.type || 'image/jpeg',
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return NextResponse.json(
        {
          error: `Gagal menyimpan gambar ke penyimpanan cloud: ${error.message || 'Error Supabase Storage'}`,
        },
        { status: 500 }
      );
    }

    // 5. Ambil URL Publik
    const { data: publicUrlData } = supabase.storage
      .from('malakosa')
      .getPublicUrl(filename);

    return NextResponse.json({
      url: publicUrlData.publicUrl,
      success: true,
    });
  } catch (error: any) {
    console.error('Upload handler error:', error);
    return NextResponse.json(
      { error: error?.message || 'Terjadi kesalahan sistem saat mengunggah gambar.' },
      { status: 500 }
    );
  }
}
