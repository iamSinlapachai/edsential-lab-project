import Link from "next/link";
import GoogleLogo from "@/assets/image/GoogleLogo.png"
import Image from "next/image";


export default function LoginPage() {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center bg-slate-900 overflow-hidden">
            {/* --- Background Elements --- */}
            <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[100px]" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[500px] w-[500px] rounded-full bg-fuchsia-600/20 blur-[100px]" />
            </div>

            {/* --- Form Container --- */}
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

                {/* Form */}
                <form className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-200">
                            Email
                        </label>
                        <input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            // เดิม: focus:border-blue-500 focus:ring-blue-500 -> ใหม่: focus:border-purple-500 focus:ring-purple-500
                            className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-slate-200">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            // เดิม: focus:border-blue-500 focus:ring-blue-500 -> ใหม่: focus:border-purple-500 focus:ring-purple-500
                            className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                    </div>
                    <button
                        // เดิม: hover:bg-blue-700 focus:ring-blue-600 -> ใหม่: hover:bg-fuchsia-700 focus:ring-purple-600
                        className="w-full rounded-md bg-purple-700 py-2 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                        Sign In with Email
                    </button>
                </form>

                {/* Dividers */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-200 dark:border-slate-800" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                            Or continue with
                        </span>
                    </div>
                </div>

                {/* Google Login */}
                <button className="inline-flex h-10 w-full items-center justify-center rounded-md border bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-gray-200">
                    <Image
                        src={GoogleLogo}
                        alt="Google Logo"
                        width={16}
                        height={16}
                        className="mr-2"
                    />
                    Google
                </button>

                <div className="space-y-2">
                    <p className="px-8 text-center text-sm text-slate-500 dark:text-slate-400">
                        By clicking continue, you agree to our{" "}
                        <Link
                            href="/terms"
                            className="underline underline-offset-4 hover:text-slate-900 dark:hover:text-slate-50"
                        >
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="/privacy"
                            className="underline underline-offset-4 hover:text-slate-900 dark:hover:text-slate-50"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </p>
                    <p className="px-8 text-center text-sm text-slate-500 dark:text-slate-400">
                        Don't have an account?{" "}
                        <Link
                            href="/signup"
                            className="font-semibold text-slate-900 underline underline-offset-4 hover:text-slate-800 dark:text-slate-100 dark:hover:text-slate-300"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}