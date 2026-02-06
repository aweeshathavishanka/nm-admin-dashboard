"use client";

import React, { useState } from "react";
import {
  Bell,
  Search,
  Menu,
  User,
  Globe,
  LogOut,
  Settings,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Header({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const router = useRouter();
  const [language, setLanguage] = useState<"en" | "si">("en");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Mock Notifications
  const notifications = [
    {
      id: 1,
      text: "New article 'Tech 2026' pending review.",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      text: "Server backup completed successfully.",
      time: "1 hour ago",
      unread: false,
    },
    {
      id: 3,
      text: "Ad campaign 'Summer Sale' approved.",
      time: "3 hours ago",
      unread: false,
    },
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-white/95 backdrop-blur-md border-b border-zinc-200">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 -ml-2 rounded-lg hover:bg-zinc-100 lg:hidden text-zinc-600"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Dashboard Title or Breadcrumb (Hidden on mobile usually) */}
        <h2 className="text-sm font-semibold text-zinc-800 hidden sm:block">
          Dashboard Overview
        </h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-64 pl-9 pr-4 text-sm bg-zinc-100 border-none rounded-full focus:ring-2 focus:ring-blue-500/20 text-zinc-800 placeholder:text-zinc-500 outline-none"
          />
        </div>

        {/* Language Toggle */}
        <button
          onClick={() => setLanguage((l) => (l === "en" ? "si" : "en"))}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors text-zinc-700"
        >
          <Globe className="w-3.5 h-3.5" />
          <span className="uppercase">{language}</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2 text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white border border-zinc-200 rounded-xl  z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-zinc-100 bg-zinc-50 flex justify-between items-center">
                <h3 className="font-semibold text-sm text-zinc-900">
                  Notifications
                </h3>
                <span className="text-xs text-blue-600 cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={cn(
                      "px-4 py-3 border-b border-zinc-50 last:border-0 hover:bg-zinc-50 cursor-pointer transition-colors",
                      n.unread ? "bg-blue-50/50" : "",
                    )}
                  >
                    <p className="text-sm text-zinc-800 mb-1">{n.text}</p>
                    <p className="text-xs text-zinc-400">{n.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-zinc-100 text-center">
                <button className="text-xs font-medium text-zinc-600 hover:text-zinc-900">
                  View All Updates
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative pl-2 border-l border-zinc-200">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="hidden text-right sm:block leading-tight">
              <p className="text-sm font-medium text-zinc-900">User Name</p>
              <p className="text-xs text-zinc-500">Super Admin</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs ">
              SA
            </div>
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          </button>

          {/* Profile Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 top-12 w-56 bg-white border border-zinc-200 rounded-xl  z-50 overflow-hidden py-1">
              <div className="px-4 py-3 border-b border-zinc-100 mb-1">
                <p className="font-medium text-sm text-zinc-900">
                  Hi, Super Admin
                </p>
                <p className="text-xs text-zinc-500 truncate">
                  superadmin@newsmate.lk
                </p>
              </div>

              <button
                onClick={() => router.push("/profile/view")}
                className="w-full text-left px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 flex items-center gap-2"
              >
                <User className="w-4 h-4" /> View Profile
              </button>
              <button
                onClick={() => router.push("/settings")}
                className="w-full text-left px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 flex items-center gap-2"
              >
                <Settings className="w-4 h-4" /> Settings
              </button>

              <div className="border-t border-zinc-100 my-1 pt-1">
                <button
                  onClick={() => router.push("/login")}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
