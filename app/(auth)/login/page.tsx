"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "", // Changed from 'email' to 'username' per requirement
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Hardcoded Validation
    if (
      formData.username === "awee wijesundara" &&
      formData.password === "aweesha123"
    ) {
      router.push("/");
    } else {
      setError("Invalid username or password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="w-full max-w-[400px] p-6">
        <div className="border border-zinc-200 rounded-xl p-6 md:p-8 ">
          {/* Header */}
          <div className="mb-6 space-y-1">
            <h1 className="text-xl font-bold text-zinc-900">
              Login to your account
            </h1>
            <p className="text-sm text-zinc-500">
              Enter your username below to login to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-2 rounded border border-red-100 mb-2">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-900">
                Username
              </label>
              <input
                type="text"
                placeholder="m@example.com"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-md outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all placeholder:text-zinc-400"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-900">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-zinc-500 hover:text-black hover:underline"
                >
                  Forgot your password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-md outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-950 hover:bg-zinc-900 text-white font-medium text-sm py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Login
            </button>
          </form>

          {/* Divider */}
          {/* While not explicitly in the image description, standard social logins often have spacing or dividers, 
              but the image shows "Login with Google" directly below. */}
          <div className="mt-4">
            <button
              type="button"
              className="w-full bg-white hover:bg-zinc-50 text-zinc-900 font-medium text-sm py-2 px-4 rounded-md border border-zinc-200 transition-colors flex items-center justify-center gap-2"
            >
              {/* Google Icon SVG */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Login with Google
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-500">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="text-zinc-900 font-medium hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
