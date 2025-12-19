//edsential-lab-project\lib\supabaseClient.ts

// lib/supabaseClient.ts

import { createBrowserClient } from '@supabase/ssr'

// สร้างเป็น Function เพื่อเรียกใช้ใน Client Component
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}