"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import {
  MoreVertical,
  Search,
  Filter,
  Plus,
  Trash2,
  ExternalLink,
  Eye,
  MousePointer2,
  Calendar,
  ToggleLeft,
  ToggleRight,
  Ban,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock Data
type AdStatus = "Active" | "Inactive" | "Blocked";

const INITIAL_ADS = Array.from({ length: 120 }).map((_, i) => {
  const status: AdStatus =
    i % 10 === 0 ? "Blocked" : i % 3 === 0 ? "Inactive" : "Active";
  return {
    id: `ad-${i}`,
    title: `Campaign ${i + 1}: Seasonal Promo`,
    advertiser: i % 2 === 0 ? "TechCorp Ltd" : "FashionHub",
    image: "/placeholder-ad.jpg", // Mock
    url: "https://example.com",
    clicks: Math.floor(Math.random() * 50000),
    impressions: Math.floor(Math.random() * 500000),
    status: status,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    isDeleted: false,
  };
});

// DEFAULT SORT: Click Count Descending
const SORTED_INITIAL = INITIAL_ADS.sort((a, b) => b.clicks - a.clicks);

export default function AdListPage() {
  const [ads, setAds] = useState(SORTED_INITIAL);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | AdStatus>("All");

  // Filter Logic
  const filteredAds = ads.filter((ad) => {
    if (ad.isDeleted) return false;
    if (statusFilter !== "All" && ad.status !== statusFilter) return false;
    if (
      !ad.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !ad.advertiser.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  // Top 50 of the filtered result (Requirements: "Default: Show Top 50 rows based on Click Count")
  // Since we already sorted INITIAL_ADS by clicks, slicing here works for the default view.
  const displayAds = filteredAds.slice(0, 50);

  // Handlers
  const handleStatusToggle = (id: string, currentStatus: AdStatus) => {
    // Rotation Logic: Active -> Inactive -> Blocked -> Active (or simple Active/Inactive toggle?)
    // Requirement: "Quick action ... Set status to Active, Inactive, or Blocked immediately."
    // A dropdown is cleaner, but let's do a smart toggle or rotation for quick action.
    // Let's assume a cycle for single-click, or we implement a small dropdown.
    // For "Quick action in table row", a dropdown is best for 3 states.

    // Changing status
    const newStatus =
      currentStatus === "Active"
        ? "Inactive"
        : currentStatus === "Inactive"
          ? "Active" // Skip Blocked in simple toggle? Or cycle?
          : "Active"; // Unblock to Active

    setAds((prev) =>
      prev.map((ad) => (ad.id === id ? { ...ad, status: newStatus } : ad)),
    );
  };

  const setSpecificStatus = (id: string, status: AdStatus) => {
    setAds((prev) =>
      prev.map((ad) => (ad.id === id ? { ...ad, status: status } : ad)),
    );
  };

  const handleSoftDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this ad?")) {
      setAds((prev) =>
        prev.map((ad) => (ad.id === id ? { ...ad, isDeleted: true } : ad)),
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 ">
              Advertisements
            </h1>
            <p className="text-zinc-500 ">
              Manage ad campaigns, track performance, and control visibility.
            </p>
          </div>
          <Link href="/ads/create">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors  flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create New Ad
            </button>
          </Link>
        </div>

        {/* Stats / Controls */}
        <div className="bg-white  rounded-xl border border-zinc-200   p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by title or advertiser..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-4 text-sm bg-zinc-50  border border-zinc-200  rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <Filter className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="w-full md:w-40 h-10 pl-9 pr-8 text-sm bg-zinc-50  border border-zinc-200  rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none appearance-none cursor-pointer"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>
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
                    Campaign
                  </th>
                  <th className="px-6 py-4 font-medium text-zinc-500 ">
                    Advertiser
                  </th>
                  <th className="px-6 py-4 font-medium text-zinc-500  text-right">
                    Clicks
                  </th>
                  <th className="px-6 py-4 font-medium text-zinc-500 ">
                    Duration
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
                {displayAds.length > 0 ? (
                  displayAds.map((ad) => (
                    <tr
                      key={ad.id}
                      className="group hover:bg-zinc-50  transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {/* Thumbnail Placeholder */}
                          <div className="w-10 h-10 rounded-md bg-zinc-200  flex-shrink-0" />
                          <div>
                            <p
                              className="font-medium text-zinc-900  line-clamp-1 max-w-[200px]"
                              title={ad.title}
                            >
                              {ad.title}
                            </p>
                            <a
                              href={ad.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                            >
                              Visit URL <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-zinc-600 ">
                        {ad.advertiser}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex flex-col items-end">
                          <span className="font-semibold text-zinc-900 ">
                            {ad.clicks.toLocaleString()}
                          </span>
                          <span className="text-xs text-zinc-500">
                            Impressions: {(ad.impressions / 1000).toFixed(1)}k
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-zinc-600 ">
                        <div className="flex flex-col text-xs">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {ad.startDate}
                          </span>
                          <span className="flex items-center gap-1 text-zinc-400">
                            <Clock className="w-3 h-3" /> {ad.endDate}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                              ad.status === "Active"
                                ? "bg-green-100 text-green-700 border-green-200   "
                                : ad.status === "Inactive"
                                  ? "bg-zinc-100 text-zinc-700 border-zinc-200   "
                                  : "bg-red-100 text-red-700 border-red-200   ",
                            )}
                          >
                            {ad.status === "Active" && (
                              <CheckCircle2 className="w-3 h-3" />
                            )}
                            {ad.status === "Inactive" && (
                              <ToggleRight className="w-3 h-3 rotate-180" />
                            )}
                            {ad.status === "Blocked" && (
                              <Ban className="w-3 h-3" />
                            )}
                            {ad.status}
                          </span>

                          {/* Quick Status Actions (Hover) */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            {ad.status !== "Active" && (
                              <button
                                onClick={() =>
                                  setSpecificStatus(ad.id, "Active")
                                }
                                title="Set Active"
                                className="p-1 text-green-600 hover:bg-green-50 rounded"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                            )}
                            {ad.status !== "Inactive" && (
                              <button
                                onClick={() =>
                                  setSpecificStatus(ad.id, "Inactive")
                                }
                                title="Set Inactive"
                                className="p-1 text-zinc-500 hover:bg-zinc-100 rounded"
                              >
                                <ToggleRight className="w-4 h-4" />
                              </button>
                            )}
                            {ad.status !== "Blocked" && (
                              <button
                                onClick={() =>
                                  setSpecificStatus(ad.id, "Blocked")
                                }
                                title="Block"
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Ban className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleSoftDelete(ad.id)}
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
                      No ads found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-zinc-200  bg-zinc-50  text-center text-xs text-zinc-500">
            Showing Top {displayAds.length} by Clicks
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
