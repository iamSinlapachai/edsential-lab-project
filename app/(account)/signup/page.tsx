import Link from "next/link";

export default function SignupPage() {
    return (
        <div className="flex min-h-screen w-full bg-white dark:bg-slate-950">
            {/* Left Side - Visual (Hidden on mobile) */}
            <div className="hidden w-1/2 flex-col justify-between bg-slate-900 p-10 text-white lg:flex relative overflow-hidden">
                <div className="z-10 text-sm font-medium uppercase tracking-wider text-slate-400">
                    Edsential Lab
                </div>
                <div className="z-10 max-w-md space-y-4">
                    <blockquote className="text-2xl font-medium leading-normal text-slate-100">
                        "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
                    </blockquote>
                    <div className="text-sm text-slate-400">- Malcolm X</div>
                </div>
                <div className="z-10 text-xs text-slate-500">
                    © 2024 Edsential Lab. All rights reserved.
                </div>

                {/* Abstract Background Element - Midnight Blue Theme */}
                <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[100px]" />
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[100px]" />
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex w-full flex-col justify-center px-8 sm:px-12 lg:w-1/2 xl:px-24">
                <div className="mx-auto w-full max-w-sm space-y-8">
                    {/* Header */}
                    <div className="space-y-2 text-center lg:text-left">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                            Create an account
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Enter your email below to create your account
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-900 dark:text-slate-200">
                                Email
                            </label>
                            <input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-500 dark:focus:ring-blue-600"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-900 dark:text-slate-200">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-500 dark:focus:ring-blue-600"
                            />
                        </div>
                        <button
                            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus-visible:ring-blue-500"
                        >
                            Sign In with Email
                        </button>
                    </div>

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

                    <button
                        className="inline-flex h-10 w-full items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:hover:text-slate-50 dark:focus-visible:ring-blue-600"
                    >
                        <svg className="mr-2 h-4 w-4" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.0003 20.45c-4.647 0-8.4237-3.7915-8.4237-8.45 0-4.6585 3.7767-8.45 8.4237-8.45 4.647 0 8.4237 3.7915 8.4237 8.45 0 .4382-.034.8705-.1 1.2934H12.0003v-2.3847h6.6343c-.2765-1.4678-1.4795-2.618-2.986-2.618-1.666 0-3.044 1.3283-3.044 3 0 1.6718 1.378 3 3.044 3 .839 0 1.5976-.3334 2.1462-.873l1.8385 1.7712c-1.0495 1.0544-2.4988 1.7018-4.0847 1.7018z" />
                        </svg>
                        Google
                    </button>


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
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-slate-900 underline underline-offset-4 hover:text-slate-800 dark:text-slate-100 dark:hover:text-slate-300"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
