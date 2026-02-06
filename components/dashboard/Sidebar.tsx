"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  LogOut,
  User,
  Settings,
  PieChart,
  Globe,
  Database,
  Newspaper,
  FilePlus,
  Calendar,
  Trash2,
  List,
  Tags,
  FolderPlus,
  Megaphone,
  ListVideo,
  Users,
  UserPlus,
  ChevronDown,
  ChevronRight,
  ShieldAlert,
  Languages,
  LayoutTemplate,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  href?: string;
  icon: React.ReactNode;
  submenu?: { title: string; href: string; icon?: React.ReactNode }[];
};

const navItems: { section: string; items: NavItem[] }[] = [
  {
    section: "Dashboard & Analytics",
    items: [
      {
        title: "Overview", // Renamed from Global Dashboard
        icon: <Globe className="w-5 h-5" />,
        href: "/", // Changed to root as requested
      },
      {
        title: "Personal Dashboard",
        icon: <LayoutDashboard className="w-5 h-5" />,
        href: "/dashboard/personal",
      },
      {
        title: "External Analytics",
        icon: <PieChart className="w-5 h-5" />,
        href: "/dashboard/external",
      },
      {
        title: "Database Stats",
        icon: <Database className="w-5 h-5" />,
        href: "/dashboard/database",
      },
    ],
  },
  {
    section: "Manage News Content",
    items: [
      {
        title: "News Management",
        icon: <Newspaper className="w-5 h-5" />,
        submenu: [
          {
            title: "Create News",
            href: "/news/create",
            icon: <FilePlus className="w-4 h-4" />,
          },
          {
            title: "News List",
            href: "/news/list",
            icon: <List className="w-4 h-4" />,
          },
          {
            title: "Scheduled News",
            href: "/news/scheduled",
            icon: <Calendar className="w-4 h-4" />,
          },
          {
            title: "Trash / Soft Deleted",
            href: "/news/trash",
            icon: <Trash2 className="w-4 h-4" />,
          },
        ],
      },
    ],
  },
  {
    section: "Manage Categories",
    items: [
      {
        title: "Categories",
        icon: <Tags className="w-5 h-5" />,
        submenu: [
          {
            title: "View Categories",
            href: "/categories/list",
            icon: <List className="w-4 h-4" />,
          },
          {
            title: "Create Category",
            href: "/categories/create",
            icon: <FolderPlus className="w-4 h-4" />,
          },
        ],
      },
    ],
  },
  {
    section: "Manage Ads",
    items: [
      {
        title: "Advertisements",
        icon: <Megaphone className="w-5 h-5" />,
        submenu: [
          {
            title: "Create Ad",
            href: "/ads/create",
            icon: <FilePlus className="w-4 h-4" />,
          },
          {
            title: "Ads List",
            href: "/ads/list",
            icon: <ListVideo className="w-4 h-4" />,
          },
        ],
      },
    ],
  },
  {
    section: "Manage Staff",
    items: [
      {
        title: "Staff Management",
        icon: <Users className="w-5 h-5" />,
        submenu: [
          {
            title: "View Staff",
            href: "/staff/list",
            icon: <List className="w-4 h-4" />,
          },
          {
            title: "Create Staff",
            href: "/staff/create",
            icon: <UserPlus className="w-4 h-4" />,
          },
        ],
      },
    ],
  },
  {
    section: "Settings & Profile",
    items: [
      {
        title: "Profile",
        icon: <User className="w-5 h-5" />,
        submenu: [
          { title: "View Profile", href: "/profile/view" },
          { title: "Manage Profile", href: "/profile/edit" },
        ],
      },
      {
        title: "Other Settings",
        icon: <Settings className="w-5 h-5" />,
        submenu: [
          {
            title: "Language Support",
            href: "/settings/language",
            icon: <Languages className="w-4 h-4" />,
          },
          {
            title: "Layout Toggle",
            href: "/settings/layout",
            icon: <LayoutTemplate className="w-4 h-4" />,
          },
          {
            title: "Sensitive Content",
            href: "/settings/sensitive",
            icon: <ShieldAlert className="w-4 h-4" />,
          },
        ],
      },
    ],
  },
];

export default function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleSubmenu = (title: string) => {
    setExpandedMenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  const handleLogout = () => {
    router.push("/login"); // Redirect to login
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Container */}
      <motion.aside
        initial={false}
        animate={{
          width: isOpen ? 280 : 0,
          opacity: isOpen ? 1 : 0,
        }}
        className={cn(
          "fixed top-0 left-0 z-50 h-screen bg-white border-r border-zinc-200 flex flex-col transition-all duration-300 overflow-hidden text-zinc-900", // Enforce light mode colors
          "lg:!w-72 lg:!opacity-100 lg:!translate-x-0 lg:static",
        )}
        style={{ width: undefined }}
      >
        {/* Logo / Brand */}
        <div className="flex flex-col items-center justify-center h-20 border-b border-zinc-200">
          <Link href="/">
            <h1 className="text-xl font-bold text-zinc-900 cursor-pointer">
              NM Dashboard
            </h1>
          </Link>
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mt-1">
            Super Admin
          </span>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {navItems.map((group, idx) => (
            <div key={idx}>
              <h3 className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                {group.section}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = item.href ? pathname === item.href : false;
                  const isExpanded = expandedMenus.includes(item.title);
                  const hasSubmenu = item.submenu && item.submenu.length > 0;

                  return (
                    <li key={item.title}>
                      {hasSubmenu ? (
                        <div>
                          <button
                            onClick={() => toggleSubmenu(item.title)}
                            className={cn(
                              "flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                              isExpanded
                                ? "bg-zinc-100 text-zinc-900"
                                : "text-zinc-600 hover:bg-zinc-50",
                            )}
                          >
                            <div className="flex items-center gap-3">
                              {item.icon}
                              <span>{item.title}</span>
                            </div>
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden pl-9 mt-1 space-y-1"
                              >
                                {item.submenu!.map((sub) => {
                                  const isSubActive = pathname === sub.href;
                                  return (
                                    <li key={sub.title}>
                                      <Link
                                        href={sub.href}
                                        className={cn(
                                          "block px-3 py-2 text-sm rounded-md transition-colors",
                                          isSubActive
                                            ? "bg-black text-white" // Active Tab Style Change
                                            : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100",
                                        )}
                                      >
                                        <div className="flex items-center gap-2">
                                          {sub.icon && sub.icon}
                                          <span>{sub.title}</span>
                                        </div>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href!}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                            isActive
                              ? "bg-black text-white" // Active Tab Style Change
                              : "text-zinc-600 hover:bg-zinc-50",
                          )}
                        >
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Actions (Logout) */}
        <div className="p-4 border-t border-zinc-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
}
