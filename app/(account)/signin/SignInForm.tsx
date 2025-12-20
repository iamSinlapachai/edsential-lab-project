// app/(account)/signin/SignInForm.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function SignInForm() {
  const router = useRouter();
  const supabase = createClient();

  // 1. State Management
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State สำหรับควบคุมการมองเห็นรหัสผ่าน
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 2. Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // 3. Handle Login Logic
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // Login สำเร็จ -> ไปหน้าแรก หรือ Dashboard
      router.push("/");
      router.refresh(); // รีเฟรชเพื่อให้ Server Components อัปเดตสถานะ Auth ทันที
    } catch (error: any) {
      console.error("Login Error:", error.message);
      setErrorMsg("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md space-y-8 rounded-3xl bg-white/20 dark:bg-slate-950/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/40 p-6 shadow-2xl sm:p-8">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Welcome back
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Enter your email to sign in to your account
        </p>
      </div>

      {/* Error Message Display */}
      {errorMsg && (
        <div className="flex items-center gap-2 p-3 text-sm text-red-400 bg-red-900/20 border border-red-900/50 rounded-lg animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSignIn} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-200">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="name@example.com"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
          />
        </div>

        {/* Password Input พร้อมปุ่ม Show/Hide */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-slate-200"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-800 bg-slate-950 pl-3 pr-10 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center rounded-md bg-purple-700 py-2 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <div className="space-y-2">
        <p className="px-8 text-center text-sm text-slate-500 dark:text-slate-400">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-slate-900 underline underline-offset-4 hover:text-slate-800 dark:text-slate-100 dark:hover:text-slate-300 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
