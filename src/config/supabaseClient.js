// src/config/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// These variables are now loaded from the .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)