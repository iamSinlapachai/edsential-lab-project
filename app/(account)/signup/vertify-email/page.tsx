import Link from "next/link";

export default function SignupVerifyEmailPage() {
    return (
        <div className="flex min-h-screen w-full bg-white dark:bg-slate-950">
            {/* Left Side - Visual (Hidden on mobile) */}
            <div className="hidden w-1/2 flex-col justify-between bg-slate-900 p-10 text-white lg:flex relative overflow-hidden">
                <div className="z-10 text-sm font-medium uppercase tracking-wider text-slate-400">
                    Edsential Lab
                </div>
                <div className="z-10 max-w-md space-y-4">
                    <blockquote className="text-2xl font-medium leading-normal text-slate-100">
                        "The beautiful thing about learning is that no one can take it away from you."
                    </blockquote>
                    <div className="text-sm text-slate-400">- B.B. King</div>
                </div>
                <div className="z-10 text-xs text-slate-500">
                    © 2024 Edsential Lab. All rights reserved.
                </div>

                {/* Abstract Background Element - Midnight Blue Theme (Consistent with Signup) */}
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
                            Check your email
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            We have sent a verification code to your email address. Please enter it below.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <label htmlFor="code" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-900 dark:text-slate-200">
                                Verification Code
                            </label>
                            <input
                                id="code"
                                placeholder="123456"
                                type="text"
                                maxLength={6}
                                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-500 dark:focus:ring-blue-600 tracking-widest text-center"
                            />
                        </div>
                   
                        <button
                            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus-visible:ring-blue-500"
                        >
                            Verify Email
                        </button>
                    </div>

                    {/* Footer Actions */}
                     <div className="space-y-4 text-center text-sm">
                        <p className="text-slate-500 dark:text-slate-400">
                            Didn't receive the code?{" "}
                            <button className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                                Click to resend
                            </button>
                        </p>
                        <div className="text-slate-500 dark:text-slate-400">
                           <Link
                                href="/signup"
                                className="underline underline-offset-4 hover:text-slate-900 dark:hover:text-slate-50"
                            >
                                Back to sign up
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
