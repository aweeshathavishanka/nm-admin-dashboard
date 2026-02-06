"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import {
  ArrowLeft,
  UserPlus,
  Shield,
  CreditCard,
  Mail,
  Key,
  Check,
  Copy,
  Info,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Generate fake credentials
const generateCredentials = (name: string) => {
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const suffix = Math.floor(Math.random() * 999);
  return {
    email: `${cleanName}${suffix}@newsmate.internal`,
    password: `NM-${Math.random().toString(36).slice(-8).toUpperCase()}`,
  };
};

export default function CreateStaffPage() {
  const [formData, setFormData] = useState({
    name: "",
    role: "3", // Default to Journalist
  });

  const [generatedCreds, setGeneratedCreds] = useState<{
    email: string;
    password: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  // Auto-generate credentials effect (simulation)
  useEffect(() => {
    if (formData.name.length > 2) {
      const creds = generateCredentials(formData.name);
      setGeneratedCreds(creds);
    } else {
      setGeneratedCreds(null);
    }
  }, [formData.name]);

  const handleCopy = () => {
    if (!generatedCreds) return;
    const text = `Email: ${generatedCreds.email}\nPassword: ${generatedCreds.password}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    // API Call would go here
    alert(
      `Account Created for ${formData.name}!\n\nUse the generated credentials.`,
    );
    // Reset or Redirect
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/staff/list">
            <button className="p-2 text-zinc-500 hover:text-zinc-900   hover:bg-zinc-100  rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 ">
              Create Staff Account
            </h1>
            <p className="text-zinc-500  text-sm">
              Manually provision access for new team members.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white  rounded-xl border border-zinc-200   p-6 space-y-6">
            {/* User Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-900  flex items-center gap-2 pb-2 border-b border-zinc-100 ">
                <UserPlus className="w-4 h-4 text-blue-500" />
                Staff Details
              </h3>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700 ">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. John Doe"
                  className="w-full h-10 px-3 bg-zinc-50  border border-zinc-200  rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700 ">
                  Role Assignment <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Role Options */}
                  {[
                    { id: "2", label: "Admin", desc: "Senior Journalist" },
                    { id: "3", label: "Journalist", desc: "Content Creator" },
                    { id: "4", label: "Analyst", desc: "Data Viewer" },
                  ].map((role) => (
                    <label
                      key={role.id}
                      className={cn(
                        "cursor-pointer border rounded-lg p-3 flex flex-col gap-1 transition-all",
                        formData.role === role.id
                          ? "bg-blue-50 border-blue-200   ring-1 ring-blue-500"
                          : "bg-zinc-50 border-zinc-200   hover:border-zinc-300 ",
                      )}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role.id}
                        checked={formData.role === role.id}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                        className="sr-only"
                      />
                      <span className="text-sm font-medium text-zinc-900 ">
                        {role.label}
                      </span>
                      <span className="text-xs text-zinc-500 ">
                        {role.desc}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Credential Preview */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-semibold text-zinc-900  flex items-center gap-2 pb-2 border-b border-zinc-100 ">
                <Key className="w-4 h-4 text-amber-500" />
                System Generated Credentials
              </h3>

              <div className="bg-zinc-900 rounded-lg p-4 font-mono text-sm relative group">
                {generatedCreds ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">Email:</span>
                      <span className="text-green-400 select-all">
                        {generatedCreds.email}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">Password:</span>
                      <span className="text-amber-400 select-all">
                        {generatedCreds.password}
                      </span>
                    </div>

                    <div className="absolute top-2 right-2">
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded transition-colors"
                        title="Copy Credentials"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-zinc-600 italic text-center py-2 flex items-center justify-center gap-2">
                    <Info className="w-4 h-4" />
                    Enter a name to generate credentials
                  </div>
                )}
              </div>
              <p className="text-xs text-zinc-500 ">
                Note: The system generates these credentials offline. Please
                copy and share them with the user securely manually.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Link href="/staff/list">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-zinc-700  bg-white  border border-zinc-200  rounded-lg hover:bg-zinc-50  transition-colors"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              disabled={!formData.name}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg  hover:bg-blue-700 hover: transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
