"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import {
  Trash2,
  RefreshCcw,
  Search,
  Filter,
  AlertTriangle,
  FileText,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock User Role (2 = Admin, 3 = Journalist)
// Change this to 3 to test the permission restriction
const CURRENT_USER_ROLE: number = 2;
const CURRENT_USER_ID = "u1";

// Mock Data Generator
const CATEGORIES = [
  "Local News",
  "Politics",
  "Sports",
  "Business",
  "Entertainment",
  "Technology",
];
const AUTHORS = [
  { id: "u1", name: "You (Admin/Journalist)" },
  { id: "u2", name: "John Doe" },
  { id: "u3", name: "Sarah Smith" },
];

const generateTrashItems = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `trash-${i}`,
    title: `Deleted Article ${i + 1}: Old news story about something`,
    category: CATEGORIES[i % CATEGORIES.length],
    author: AUTHORS[i % AUTHORS.length],
    deletedAt: new Date(2026, 1, 5).toISOString().split("T")[0],
    originalStatus: i % 3 === 0 ? "Published" : "Draft",
    isDeleted: true,
  }));
};

const INITIAL_DATA = generateTrashItems(12);

export default function TrashPage() {
  const [trashData, setTrashData] = useState(INITIAL_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter Logic
  const filteredData = trashData.filter((item) => {
    if (!item.title.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;
    if (selectedCategory !== "All" && item.category !== selectedCategory)
      return false;
    return true;
  });

  // Handlers
  const handleRestore = (id: string) => {
    if (
      confirm("Restore this article? It will move back to its original status.")
    ) {
      setTrashData((prev) => prev.filter((item) => item.id !== id));
      // In real app: API call to set isDeleted = false
      console.log("Restored:", id);
    }
  };

  const handlePermanentDelete = (id: string, authorId: string) => {
    // Permission Check: Journalist (3) can only delete their own
    if (CURRENT_USER_ROLE === 3 && authorId !== CURRENT_USER_ID) {
      alert(
        "Permission Denied: You can only permanently delete your own articles.",
      );
      return;
    }

    if (
      confirm(
        "Are you sure you want to permanently delete this? This action CANNOT be undone.",
      )
    ) {
      setTrashData((prev) => prev.filter((item) => item.id !== id));
      // In real app: API call to DELETE from DB
      console.log("Deleted forever:", id);
    }
  };

  const handleEmptyTrash = () => {
    if (CURRENT_USER_ROLE === 3) {
      alert("Permission Denied: Only Admins can empty the entire trash.");
      return;
    }

    if (
      confirm(
        "Are you sure you want to empty the trash? All items will be permanently removed.",
      )
    ) {
      setTrashData([]);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-zinc-900 ">
                Trash
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700   text-xs font-medium">
                {trashData.length} items
              </span>
            </div>
            <p className="text-zinc-500 ">
              Manage deleted items. Restore them or permanently remove them from
              the database.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEmptyTrash}
              disabled={trashData.length === 0}
              className="px-4 py-2 bg-white  text-red-600 border border-zinc-200  hover:bg-red-50  text-sm font-medium rounded-lg transition-colors  disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Empty Trash
            </button>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-amber-50  border border-amber-200  rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600  flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800 ">
            <p className="font-medium">
              Items in Trash are hidden from the application.
            </p>
            <p className="opacity-80">
              They are retained in the database until permanently deleted here.
              {CURRENT_USER_ROLE === 2 &&
                " As an Admin, you can manage all trash."}
              {CURRENT_USER_ROLE === 3 &&
                " As a Journalist, you can only permanently delete your own items."}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white  rounded-xl border border-zinc-200   p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search deleted items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-4 text-sm bg-zinc-50  border border-zinc-200  rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-10 pl-9 pr-8 text-sm bg-zinc-50  border border-zinc-200  rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none appearance-none cursor-pointer min-w-[160px]"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="bg-white  rounded-xl border border-zinc-200   overflow-hidden">
          <div className="divide-y divide-zinc-100 ">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div
                  key={item.id}
                  className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-zinc-50  transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-50  flex items-center justify-center flex-shrink-0">
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900  line-clamp-1">
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-zinc-500 ">
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {item.category}
                        </span>
                        <span>•</span>
                        <span>Author: {item.author.name}</span>
                        <span>•</span>
                        <span>Deleted: {item.deletedAt}</span>
                        <span
                          className="px-1.5 py-0.5 rounded bg-zinc-100  text-zinc-600  border border-zinc-200  uppercase leading-none"
                          style={{ fontSize: "10px" }}
                        >
                          Was {item.originalStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pl-14 md:pl-0">
                    <button
                      onClick={() => handleRestore(item.id)}
                      className="px-3 py-1.5 text-xs font-medium text-green-700  bg-green-50  hover:bg-green-100  rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <RefreshCcw className="w-3.5 h-3.5" />
                      Restore
                    </button>
                    <button
                      onClick={() =>
                        handlePermanentDelete(item.id, item.author.id)
                      }
                      className="px-3 py-1.5 text-xs font-medium text-red-700  bg-red-50  hover:bg-red-100  rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete Forever
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-zinc-500 ">
                <div className="w-12 h-12 bg-zinc-100  rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6 text-zinc-400" />
                </div>
                <p>Trash is empty.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
