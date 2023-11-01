import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://reahvokhwbxlfxbcuupo.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;