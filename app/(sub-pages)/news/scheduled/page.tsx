"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import {
  Calendar,
  Clock,
  Search,
  Filter,
  MoreVertical,
  ArrowRight,
  Send,
  CalendarDays,
  XCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock Data Generator for Scheduled Items
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

const generateScheduledNews = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `scheduled-${i}`,
    title: `Future News ${i + 1}: Upcoming Event Coverage and Analysis`,
    category: CATEGORIES[i % CATEGORIES.length],
    author: AUTHORS[i % AUTHORS.length],
    createdAt: new Date(2026, 1, 5 - (i % 5)).toISOString().split("T")[0],
    // Scheduled for random dates in the future
    publishTime: new Date(
      2026,
      2,
      10 + i,
      Math.floor(Math.random() * 24),
      0,
    ).toISOString(),
    status: "Scheduled",
  }));
};

const INITIAL_DATA = generateScheduledNews(15);

export default function ScheduledNewsPage() {
  const [newsData, setNewsData] = useState(INITIAL_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filtering
  const filteredData = newsData.filter((item) => {
    if (!item.title.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;
    if (selectedCategory !== "All" && item.category !== selectedCategory)
      return false;
    return true;
  });

  // Handlers
  const handlePublishNow = (id: string) => {
    if (
      confirm(
        "Are you sure you want to publish this article immediately? It will go live now.",
      )
    ) {
      setNewsData((prev) => prev.filter((item) => item.id !== id));
      // In a real app, this would make an API call to update status to 'Published'
      console.log("Published immediately:", id);
    }
  };

  const handleReschedule = (id: string, current: string) => {
    const newDate = prompt(
      "Enter new publish date (YYYY-MM-DDTHH:mm):",
      current.slice(0, 16),
    );
    if (newDate) {
      setNewsData((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, publishTime: new Date(newDate).toISOString() }
            : item,
        ),
      );
    }
  };

  const handleCancelSchedule = (id: string) => {
    if (confirm("Cancel scheduling? This will revert the article to Draft.")) {
      setNewsData((prev) => prev.filter((item) => item.id !== id));
      console.log("Revert to draft:", id);
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
                Scheduled News
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700   text-xs font-medium">
                {newsData.length} upcoming
              </span>
            </div>
            <p className="text-zinc-500 ">
              Manage articles queued for future publication.
            </p>
          </div>
          <Link href="/news/create">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors  flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Schedule New Article
            </button>
          </Link>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white  rounded-xl border border-zinc-200   p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search scheduled news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-4 text-sm bg-zinc-50  border border-zinc-200  rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
              />
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <Filter className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-10 pl-9 pr-8 text-sm bg-zinc-50  border border-zinc-200  rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none appearance-none cursor-pointer min-w-[160px]"
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
        </div>

        {/* List of Scheduled Items */}
        <div className="grid gap-4">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="group bg-white  rounded-xl border border-zinc-200  p-5 hover: transition-all relative overflow-hidden"
              >
                {/* Status Stripe */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" />

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Date Block */}
                  <div className="shrink-0 flex flex-col items-center justify-center p-3 bg-orange-50  rounded-lg border border-orange-100  min-w-[100px]">
                    <span className="text-xs font-semibold text-orange-600  uppercase tracking-wider">
                      Scheduled
                    </span>
                    <span className="text-2xl font-bold text-zinc-900  my-1">
                      {new Date(item.publishTime).getDate()}
                    </span>
                    <span className="text-sm text-zinc-500 ">
                      {new Date(item.publishTime).toLocaleString("default", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <div className="mt-2 flex items-center gap-1 text-xs font-medium text-orange-700  bg-orange-100  px-2 py-0.5 rounded-full">
                      <Clock className="w-3 h-3" />
                      {new Date(item.publishTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 py-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-block px-2 py-0.5 mb-2 text-xs font-medium bg-zinc-100  text-zinc-600  rounded">
                          {item.category}
                        </span>
                        <h3 className="text-lg font-bold text-zinc-900  leading-tight mb-2 group-hover:text-blue-600  transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-zinc-500  flex items-center gap-2">
                          By{" "}
                          <span className="font-medium text-zinc-700 ">
                            {item.author.name}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-zinc-300 " />
                          Created on {item.createdAt}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 self-start">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handlePublishNow(item.id)}
                            className="p-2 text-zinc-500 hover:text-green-600 hover:bg-green-50  rounded-lg transition-colors border border-transparent hover:border-green-200 "
                            title="Publish Now"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleReschedule(item.id, item.publishTime)
                            }
                            className="p-2 text-zinc-500 hover:text-blue-600 hover:bg-blue-50  rounded-lg transition-colors border border-transparent hover:border-blue-200 "
                            title="Reschedule"
                          >
                            <Calendar className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleCancelSchedule(item.id)}
                            className="p-2 text-zinc-500 hover:text-red-600 hover:bg-red-50  rounded-lg transition-colors border border-transparent hover:border-red-200 "
                            title="Cancel Schedule"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                        <button className="p-1 text-zinc-400 hover:text-zinc-600  md:hidden">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-zinc-50  rounded-xl border border-dashed border-zinc-200  p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-zinc-100  rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-zinc-400" />
              </div>
              <h3 className="text-lg font-medium text-zinc-900  mb-1">
                No scheduled articles
              </h3>
              <p className="text-zinc-500  max-w-sm mb-6">
                You don't have any articles queued for future publication.
                Create a new article and set a publish date.
              </p>
              <Link href="/news/create">
                <button className="px-4 py-2 bg-zinc-900  text-white  text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                  Create Article
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
