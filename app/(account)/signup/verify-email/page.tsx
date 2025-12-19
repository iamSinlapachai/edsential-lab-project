import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react"; // ใช้ Icon จาก Lucide

export default function SignupVerifyEmailPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-slate-900 overflow-hidden">
      {/* --- Background --- */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[100px]" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[500px] w-[500px] rounded-full bg-fuchsia-600/20 blur-[100px]" />
      </div>

      {/* --- Card --- */}
      <div className="relative z-10 w-full max-w-md space-y-8 rounded-3xl bg-white/20 dark:bg-slate-950/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/40 p-8 shadow-2xl">
        {/* Icon & Header */}
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="p-4 bg-purple-500/20 rounded-full ring-1 ring-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            <Mail className="w-10 h-10 text-purple-400" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Check your inbox
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              We&apos;ve sent a verification link to your email address.{" "}
              <br className="hidden sm:block" />
              Please click the link to verify your account.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-transparent px-2 text-slate-500 dark:text-slate-500 font-medium">
              Did not receive the email?
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col gap-4">
          {/* ปุ่ม Resend (จำลอง UI ไว้ก่อน เพราะในหน้านี้เราอาจจะไม่มี Email state) */}
          <button className="w-full rounded-md bg-slate-800/50 hover:bg-slate-800 border border-slate-700 py-2.5 text-sm font-medium text-slate-300 transition-colors">
            Resend verification email
          </button>

          <Link
            href="/signin"
            className="flex items-center justify-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
