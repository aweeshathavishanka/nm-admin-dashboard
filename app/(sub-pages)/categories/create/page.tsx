"use client";

import React, { useState, useEffect, Suspense } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

function CreateCategoryForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit"); // Check if we are in Edit mode

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });

  // Mock Fetching Data if Editing
  useEffect(() => {
    if (editId) {
      // Simulate fetch
      setFormData({
        name: "Local News",
        slug: "local-news",
        description: "News related to local events and updates.",
      });
    }
  }, [editId]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    // Simple Auto-slug logic (only if not manually edited? simplified here)
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setFormData((prev) => ({
      ...prev,
      name,
      slug: editId ? prev.slug : slug, // Don't auto-update slug on edit unless explicit? usually safer to leave it.
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // alert(editId ? "Category updated!" : "Category created!");
      router.push("/categories/list");
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/categories/list">
          <button className="p-2 text-zinc-500 hover:text-zinc-900   hover:bg-zinc-100  rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 ">
            {editId ? "Edit Category" : "Create New Category"}
          </h1>
          <p className="text-zinc-500  text-sm">
            {editId
              ? "Update category details and settings."
              : "Add a new category to organize news articles."}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white  rounded-xl border border-zinc-200   p-6 space-y-4">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-700 ">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={handleNameChange}
              placeholder="e.g. Technology"
              className="w-full h-10 px-3 text-sm bg-zinc-50  border border-zinc-200  rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-700  flex items-center justify-between">
              Slug{" "}
              <span className="text-xs font-normal text-zinc-500">
                (URL friendly version)
              </span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-400 font-mono">/news/</span>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="flex-1 h-10 px-3 text-sm bg-zinc-50  border border-zinc-200  rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-mono text-zinc-600 "
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-700 ">
              Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Brief description of this category..."
              className="w-full p-3 text-sm bg-zinc-50  border border-zinc-200  rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none"
            />
          </div>

          <div className="bg-blue-50  border border-blue-100  rounded-lg p-3 flex gap-3 text-sm text-blue-700 ">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>
              Creating categories will update the available filters in the
              Create News page immediately.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/categories/list">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-zinc-700  bg-white  border border-zinc-200  rounded-lg hover:bg-zinc-50  transition-colors"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            disabled={loading}
            className={cn(
              "px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg  transition-all flex items-center gap-2",
              loading ? "opacity-70 cursor-wait" : "hover:bg-blue-700 hover:",
            )}
          >
            {loading ? (
              <span>Saving...</span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {editId ? "Update Category" : "Create Category"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function Page() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <CreateCategoryForm />
      </Suspense>
    </DashboardLayout>
  );
}
