// app\api\auth\delete-account\route.ts
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabaseServer'; // Client ปกติสำหรับเช็ค Session
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function DELETE() {
  const cookieStore = await cookies();
  
  // 1. ตรวจสอบก่อนว่า User Login อยู่จริงไหม (Security Check)
  const supabaseUser = createServerClient(cookieStore);
  const { data: { user }, error: authError } = await supabaseUser.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. สร้าง Admin Client (ใช้ Service Role Key)
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // ⚠️ ต้องมีใน .env.local
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  // 3. สั่งลบ User ออกจากระบบ Auth (ข้อมูลใน Table อื่นจะหายไปเองเพราะ Cascade)
  const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
    user.id
  );

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  // 4. ส่งผลลัพธ์กลับ
  return NextResponse.json({ message: 'User deleted successfully' });
}