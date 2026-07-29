/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Generate unique filename and put it in a 'wisata' folder
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `wisata/${uniqueSuffix}.${ext}`;

    // Convert file to Node Buffer to avoid Next.js fetch streaming issues (ECONNRESET)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('malakosa')
      .upload(filename, buffer, {
        contentType: file.type || 'image/jpeg',
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return NextResponse.json({ error: 'Gagal mengunggah gambar ke Supabase' }, { status: 500 });
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('malakosa')
      .getPublicUrl(filename);

    return NextResponse.json({ 
      url: publicUrlData.publicUrl,
      success: true 
    });
  } catch (error) {
    console.error('Upload handler error:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
