import Link from "next/link";

export default function SignupVerifyEmailPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-slate-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[100px]" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md space-y-8 rounded-2xl bg-white p-6 shadow-xl sm:p-8 dark:bg-slate-950 dark:border dark:border-slate-800">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Verify your email
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            We've sent a verification code to your email address
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="code" className="text-sm font-medium text-slate-200">
              Verification Code
            </label>
            <input
              id="code"
              placeholder="123456"
              type="text"
              maxLength={6}
              className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 tracking-widest text-center"
            />
          </div>

          <button className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 mt-5">
            Verify Email
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-500 dark:bg-slate-950 dark:text-slate-400">
              Need help?
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="space-y-3">
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            Didn't receive the code?{" "}
            <button className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              Resend
            </button>
          </p>
          <p className="px-8 text-center text-sm text-slate-500 dark:text-slate-400">
            <Link
              href="/signup"
              className="font-semibold text-slate-900 underline underline-offset-4 hover:text-slate-800 dark:text-slate-100 dark:hover:text-slate-300"
            >
              Back to sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
