"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import {
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock User Role (2 = Admin, 3 = Journalist)
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
  { id: "u1", name: "You (Admin)" },
  { id: "u2", name: "John Doe" },
  { id: "u3", name: "Sarah Smith" },
];

const generateNews = (count: number) => {
  return Array.from({ length: count }).map((_, i) => {
    const isScheduled = i % 10 === 0;
    const isDraft = i % 15 === 0;
    const isDeleted = false; // Initially no deleted items shown in main list
    const status = isScheduled ? "Scheduled" : isDraft ? "Draft" : "Published";

    return {
      id: `news-${i}`,
      title: `News Heading ${i + 1}: Important Event happening in Sri Lanka`,
      category: CATEGORIES[i % CATEGORIES.length],
      author: AUTHORS[i % AUTHORS.length],
      date: new Date(2026, 1, 5 - (i % 5)).toISOString().split("T")[0],
      publishTime: isScheduled ? new Date(2026, 2, 10).toISOString() : null, // Future date for scheduled
      views: Math.floor(Math.random() * 5000),
      status: status,
      isDeleted: isDeleted,
    };
  });
};

const INITIAL_DATA = generateNews(60);

export default function NewsList() {
  const [activeTab, setActiveTab] = useState<
    "All" | "Published" | "Scheduled" | "Drafts"
  >("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newsData, setNewsData] = useState(INITIAL_DATA);

  // Filter Logic
  const filteredData = newsData.filter((item) => {
    // Tab Filter
    if (activeTab === "Scheduled" && item.status !== "Scheduled") return false;
    if (activeTab === "Drafts" && item.status !== "Draft") return false;
    if (activeTab === "Published" && item.status !== "Published") return false;

    // Search
    if (!item.title.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;

    // Category
    if (selectedCategory !== "All" && item.category !== selectedCategory)
      return false;

    // Show only non-deleted (Soft delete logic)
    if (item.isDeleted) return false;

    return true;
  });

  // Top 50 Limit for "Default" view (simplified as slicing for now if requested, but list usually shows pagination)
  const displayData = filteredData.slice(0, 50);

  // Handlers
  const handleSoftDelete = (id: string, authorId: string) => {
    // Permission: Journalist (3) can only delete their own
    if (CURRENT_USER_ROLE === 3 && authorId !== CURRENT_USER_ID) {
      alert("Permission Denied: You can only delete your own articles.");
      return;
    }

    if (confirm("Are you sure you want to move this to trash?")) {
      setNewsData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isDeleted: true } : item,
        ),
      );
    }
  };

  const handleStatusToggle = (id: string, currentStatus: string) => {
    // Demo: Toggle functionality could go here
    console.log("Toggle status for", id);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 ">
              News Management
            </h1>
            <p className="text-zinc-500 ">
              Manage, edit, and track your news articles.
            </p>
          </div>
          <Link href="/news/create">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors ">
              + Create New Article
            </button>
          </Link>
        </div>

        {/* Filters & Tabs */}
        <div className="bg-white  rounded-xl border border-zinc-200   p-4">
          {/* Tabs */}
          <div className="flex items-center gap-1 border-b border-zinc-100  pb-4 mb-4 overflow-x-auto">
            {["All", "Published", "Scheduled", "Drafts"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap",
                  activeTab === tab
                    ? "bg-zinc-100  text-zinc-900 "
                    : "text-zinc-500 hover:text-zinc-700 ",
                )}
              >
                {tab}
                <span className="ml-2 text-xs opacity-60">
                  {/* Simple count based on initial data logic for demo */}
                  {tab === "All"
                    ? newsData.filter((i) => !i.isDeleted).length
                    : newsData.filter((i) => i.status === tab && !i.isDeleted)
                        .length}
                </span>
              </button>
            ))}
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search news by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-4 text-sm bg-zinc-50  border border-zinc-200  rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              />
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <Filter className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-10 pl-9 pr-8 text-sm bg-zinc-50  border border-zinc-200  rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none appearance-none cursor-pointer min-w-[160px]"
                >
                  <option value="All">All Categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <button className="h-10 px-4 text-sm font-medium text-zinc-600  bg-zinc-50  border border-zinc-200  rounded-lg hover:bg-zinc-100  flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Date</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white  rounded-xl border border-zinc-200   overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50  border-b border-zinc-200 ">
                <tr>
                  <th className="px-6 py-4 font-medium text-zinc-500 ">
                    Article Details
                  </th>
                  <th className="px-6 py-4 font-medium text-zinc-500 ">
                    Category
                  </th>
                  <th className="px-6 py-4 font-medium text-zinc-500 ">
                    Author
                  </th>
                  <th className="px-6 py-4 font-medium text-zinc-500 ">
                    Date/Time
                  </th>
                  <th className="px-6 py-4 font-medium text-zinc-500 ">
                    Status
                  </th>
                  <th className="px-6 py-4 font-medium text-zinc-500  text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 ">
                {displayData.length > 0 ? (
                  displayData.map((item) => (
                    <tr
                      key={item.id}
                      className="group hover:bg-zinc-50  transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="max-w-[300px]">
                          <p className="font-medium text-zinc-900  truncate mb-1">
                            {item.title}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" /> {item.views}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-zinc-100  text-zinc-600 ">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-600 ">
                        {item.author.name}
                      </td>
                      <td className="px-6 py-4 text-zinc-600 ">
                        <div className="flex flex-col">
                          <span>{item.date}</span>
                          {item.status === "Scheduled" && (
                            <span className="text-xs text-orange-500 flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3" /> Due:{" "}
                              {item.publishTime?.split("T")[0]}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                            item.status === "Published"
                              ? "bg-green-100 text-green-700  "
                              : item.status === "Scheduled"
                                ? "bg-orange-100 text-orange-700  "
                                : "bg-zinc-100 text-zinc-700  ",
                          )}
                        >
                          {item.status === "Published" && (
                            <CheckCircle2 className="w-3 h-3" />
                          )}
                          {item.status === "Scheduled" && (
                            <Clock className="w-3 h-3" />
                          )}
                          {item.status === "Draft" && (
                            <AlertCircle className="w-3 h-3" />
                          )}
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50  rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleSoftDelete(item.id, item.author.id)
                            }
                            className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50  rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-zinc-500 "
                    >
                      No articles found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination (Visual Only) */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-200  bg-zinc-50 ">
            <span className="text-sm text-zinc-500 ">
              Showing {displayData.length} of {filteredData.length} results
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled
                className="p-2 text-zinc-400 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium text-zinc-700 ">
                Page 1
              </span>
              <button className="p-2 text-zinc-600  hover:bg-zinc-200  rounded">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
