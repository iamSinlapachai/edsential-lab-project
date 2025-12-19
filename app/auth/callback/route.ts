import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // ถ้ามี code ส่งมา (จากลิงก์ในอีเมล)
  if (code) {
    const cookieStore = await cookies() // ต้อง await ใน Next.js 15+
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) { return cookieStore.get(name)?.value },
          set(name: string, value: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value, ...options })
            } catch (error) {
              // อาจเกิด error ถ้าเรียก set ใน Server Component บางประเภท แต่ใน Route Handler ปกติจะทำได้
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              cookieStore.delete({ name, ...options })
            } catch (error) {
               // concept เดียวกับ set
            }
          },
        },
      }
    )
    // แลก Code เป็น Session
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // ยืนยันสำเร็จ -> เด้งไปหน้าแรก
      return NextResponse.redirect(`${origin}/`)
    }
  }

  // ถ้าผิดพลาด -> เด้งไปหน้า Sign in
  return NextResponse.redirect(`${origin}/signin`)
}