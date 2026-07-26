import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const ext = file.name.split('.').pop()
    const filename = `${uniqueSuffix}.${ext}`

    // Upload to Supabase Storage in 'wisata-images' bucket
    const { error } = await supabase.storage
      .from('wisata-images')
      .upload(filename, buffer, {
        contentType: file.type,
      })

    if (error) {
      console.error('Supabase upload error:', error)
      return NextResponse.json({ error: 'Failed to upload to Supabase' }, { status: 500 })
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('wisata-images')
      .getPublicUrl(filename)

    return NextResponse.json({ 
      url: publicUrlData.publicUrl,
      success: true 
    })
  } catch (error) {
    console.error('Upload handler error:', error)
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}
