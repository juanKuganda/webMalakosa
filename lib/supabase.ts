import { createClient } from '@supabase/supabase-js'

// Provide default dummy values if not set to avoid crashing the app
// in local dev if the user hasn't set up the variables yet.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy_key'

export const supabase = createClient(supabaseUrl, supabaseKey)
