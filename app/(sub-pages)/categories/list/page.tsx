"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Folder,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock Roles
// 1 = Super Admin (Can delete)
// 2 = Admin (Cannot delete)
// 3 = Journalist (View only)
const CURRENT_USER_ROLE: number = 1;

// Mock Data
const INITIAL_CATEGORIES = [
  {
    id: "cat-1",
    name: "Local News",
    slug: "local-news",
    articleCount: 145,
    createdAt: "2024-01-15",
  },
  {
    id: "cat-2",
    name: "Politics",
    slug: "politics",
    articleCount: 89,
    createdAt: "2024-02-01",
  },
  {
    id: "cat-3",
    name: "Sports",
    slug: "sports",
    articleCount: 230,
    createdAt: "2024-01-10",
  },
  {
    id: "cat-4",
    name: "Technology",
    slug: "technology",
    articleCount: 67,
    createdAt: "2024-03-05",
  },
  {
    id: "cat-5",
    name: "Entertainment",
    slug: "entertainment",
    articleCount: 112,
    createdAt: "2024-01-20",
  },
];

export default function CategoriesListPage() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = (id: string) => {
    // Strictly Super Admin Only
    if (CURRENT_USER_ROLE !== 1) {
      alert("Permission Denied: Only Super Admins can delete categories.");
      return;
    }

    if (
      confirm(
        "Are you sure you want to delete this category? This action cannot be undone.",
      )
    ) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 ">
              Categories
            </h1>
            <p className="text-zinc-500 ">
              Manage news categories.{" "}
              {CURRENT_USER_ROLE !== 1 && (
                <span className="text-zinc-400 text-xs">
                  (Delete restricted to Super Admin)
                </span>
              )}
            </p>
          </div>
          <Link href="/categories/create">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors  flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Category
            </button>
          </Link>
        </div>

        {/* Search & Toolbar */}
        <div className="bg-white  rounded-xl border border-zinc-200   p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 text-sm bg-zinc-50  border border-zinc-200  rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white  rounded-xl border border-zinc-200   overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50  border-b border-zinc-200 ">
                <tr>
                  <th className="px-6 py-4 font-medium text-zinc-500 ">
                    Category Name
                  </th>
                  <th className="px-6 py-4 font-medium text-zinc-500 ">
                    Slug
                  </th>
                  <th className="px-6 py-4 font-medium text-zinc-500 ">
                    Articles
                  </th>
                  <th className="px-6 py-4 font-medium text-zinc-500  text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 ">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((cat) => (
                    <tr
                      key={cat.id}
                      className="group hover:bg-zinc-50  transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-50  flex items-center justify-center text-blue-600 ">
                            <Folder className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-zinc-900 ">
                              {cat.name}
                            </p>
                            <p className="text-xs text-zinc-500 ">
                              Created: {cat.createdAt}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <code className="px-2 py-1 rounded bg-zinc-100  text-zinc-600  text-xs font-mono">
                          /{cat.slug}
                        </code>
                      </td>
                      <td className="px-6 py-4 text-zinc-600 ">
                        {cat.articleCount} articles
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/categories/create?edit=${cat.id}`}>
                            <button
                              className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50  rounded-lg transition-colors"
                              title="Edit Category"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          </Link>

                          {/* Delete Button - STRICTLY SUPER ADMIN ONLY */}
                          {CURRENT_USER_ROLE === 1 ? (
                            <button
                              onClick={() => handleDelete(cat.id)}
                              className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50  rounded-lg transition-colors"
                              title="Delete Category"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          ) : // Optional: Show a locked icon or nothing.
                          // Requirement says "Admin (2) cannot see the delete button".
                          // So we render NOTHING or strictly a placeholder functionality if needed, but 'cannot see' implies hidden.
                          // I will hide it completely.
                          null}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-zinc-500 "
                    >
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
