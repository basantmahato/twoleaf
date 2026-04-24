"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import Link from "next/link";

import Image from "next/image";

export default function LoginPage() {
  const { login, accessToken } = useAuthStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (accessToken) {
      router.push("/dashboard");
    }
  }, [accessToken, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="mb-2">
            <Image 
              src="/logocp.JPG" 
              alt="Logo" 
              width={64} 
              height={64} 
              className="rounded-xl object-contain shadow-sm border border-slate-100"
            />
          </Link>
          <p className="text-black text-xl font-black tracking-tighter uppercase">TwoLeaf</p>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Digital CRM Access</p>
        </div>

        {/* Card */}
        <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error banner */}
            {error && (
              <div className="bg-red-50 border border-black p-3 text-red-600 text-xs font-bold uppercase tracking-widest">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-[10px] font-bold text-black uppercase tracking-widest mb-1" htmlFor="login-email">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ADMIN@ARCHITECT.DIGITAL"
                className="w-full bg-white border-2 border-black text-black placeholder-gray-300 px-4 py-3 text-sm outline-none focus:bg-gray-50 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] font-bold text-black uppercase tracking-widest mb-1" htmlFor="login-password">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border-2 border-black text-black placeholder-gray-300 px-4 py-3 pr-11 text-sm outline-none focus:bg-gray-50 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition"
                  tabIndex={-1}
                >
                  {showPass ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-bold uppercase tracking-widest px-4 py-4 text-xs hover:bg-white hover:text-black border-2 border-black transition-all active:translate-y-0.5 duration-75 disabled:opacity-50"
            >
              {loading ? "AUTHENTICATING…" : "SIGN IN"}
            </button>
          </form>

          <p className="text-center text-[10px] font-bold uppercase tracking-widest mt-8">
            <Link href="/" className="text-gray-400 hover:text-black transition">
              ← Return to Site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
