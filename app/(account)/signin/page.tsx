// app/(account)/signin/page.tsx
import { cookies } from "next/headers";
import SignInForm from "./SignInForm"; // Import Form ที่เราแยกออกมา

export default async function SignInPage() {
  // ตรงนี้สามารถเรียกใช้ cookies() ได้โดยไม่ Error แล้ว
  const cookieStore = await cookies();

  // (Optional) ถ้าต้องการเช็ค Session ฝั่ง Server เพื่อ Redirect ถ้า Login แล้ว
  // const supabase = createServerClient(...)
  // const { data: { session } } = await supabase.auth.getSession()
  // if (session) redirect("/")

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-slate-900 overflow-hidden">
      {/* --- Background Elements --- */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[100px]" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[500px] w-[500px] rounded-full bg-fuchsia-600/20 blur-[100px]" />
      </div>

      {/* --- เรียกใช้ Client Component --- */}
      <SignInForm />
    </div>
  );
}
