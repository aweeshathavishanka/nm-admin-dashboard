"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { User, Mail, Save, AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Mock User Data
// 1 = Super Admin (Can edit)
// 2,3,4 = Others (Cannot edit - should be redirected or blocked)
const CURRENT_USER_ROLE: number = 1;

export default function ProfileEditPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "Alice Administrator",
    email: "alice@newsmate.lk",
  });
  const [isAllowed, setIsAllowed] = useState(true);

  // Security Check
  useEffect(() => {
    if (CURRENT_USER_ROLE !== 1) {
      setIsAllowed(false);
      // Optional: Redirect immediately
      // router.push("/profile/view");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAllowed) return;

    alert("Profile Updated Successfully!");
    router.push("/profile/view");
  };

  if (!isAllowed) {
    return (
      <DashboardLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center text-center p-6">
          <div className="w-16 h-16 bg-red-100  rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600 " />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 ">
            Access Denied
          </h2>
          <p className="text-zinc-500  mt-2 max-w-md">
            Only Super Admins have permission to edit their profile details
            directly. Please contact support or a Super Admin for changes.
          </p>
          <Link
            href="/profile/view"
            className="mt-6 px-4 py-2 bg-zinc-900  text-white  rounded-lg text-sm font-medium"
          >
            Back to Profile
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/profile/view">
            <button className="p-2 text-zinc-500 hover:text-zinc-900   hover:bg-zinc-100  rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 ">
              Edit Profile
            </h1>
            <p className="text-zinc-500  text-sm">
              Update your personal account information.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white  rounded-xl border border-zinc-200   p-6 space-y-6"
        >
          <div className="bg-blue-50  border border-blue-100  rounded-lg p-3 text-sm text-blue-700  mb-4">
            <p>
              As a Super Admin, you have full control over your profile
              settings.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700  flex items-center gap-2">
                <User className="w-4 h-4" /> Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full h-10 px-3 bg-zinc-50  border border-zinc-200  rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700  flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full h-10 px-3 bg-zinc-50  border border-zinc-200  rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium  transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
