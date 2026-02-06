"use client";

import React from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { User, Mail, Shield, Lock, AlertCircle } from "lucide-react";

// Mock User Data
// Change this Role ID to test read-only behavior vs potential edit hints
const CURRENT_USER = {
  name: "Alice Administrator",
  email: "alice@newsmate.lk",
  roleId: 1, // 1=Super Admin, 2=Admin, 3=Journalist, 4=Analyst
  roleName: "Super Admin",
};

export default function ProfileViewPage() {
  const isReadOnly = [2, 3, 4].includes(CURRENT_USER.roleId);

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-zinc-900 ">
          My Profile
        </h1>

        <div className="bg-white  rounded-xl border border-zinc-200   overflow-hidden">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
            <div className="absolute -bottom-12 left-8">
              <div className="w-24 h-24 rounded-full bg-white  p-1 ">
                <div className="w-full h-full rounded-full bg-zinc-200  flex items-center justify-center text-3xl font-bold text-zinc-400">
                  {CURRENT_USER.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16 pb-8 px-8 space-y-8">
            {/* Warning for Read-Only Users */}
            {isReadOnly && (
              <div className="bg-amber-50  border border-amber-100  rounded-lg p-3 flex gap-3 text-sm text-amber-800 ">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>
                  Your profile details are managed by the Super Admin. You
                  cannot edit these fields directly.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-500  flex items-center gap-2">
                  <User className="w-4 h-4" /> Full Name
                </label>
                <div className="p-3 bg-zinc-50  rounded-lg border border-zinc-100  text-zinc-900  font-medium">
                  {CURRENT_USER.name}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-500  flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email Address
                </label>
                <div className="p-3 bg-zinc-50  rounded-lg border border-zinc-100  text-zinc-900  font-medium opacity-80">
                  {CURRENT_USER.email}
                  <span className="ml-2 text-xs text-zinc-400">(Verified)</span>
                </div>
              </div>

              {/* Role */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-500  flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Assigned Role
                </label>
                <div className="p-3 bg-blue-50  rounded-lg border border-blue-100  text-blue-700  font-medium inline-flex items-center gap-2">
                  {CURRENT_USER.roleName}
                  {isReadOnly && <Lock className="w-3 h-3 opacity-50" />}
                </div>
              </div>
            </div>

            {!isReadOnly && (
              <div className="pt-4 border-t border-zinc-100  flex justify-end">
                <a
                  href="/profile/edit"
                  className="px-4 py-2 bg-zinc-900  text-white  text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  Edit Profile
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
