"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import {
  Search,
  Plus,
  MoreVertical,
  Shield,
  User,
  Edit,
  Trash2,
  Lock,
  Mail,
  CheckCircle2,
  Ban,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock User Roles
// 1 = Super Admin
// 2 = Admin (Senior Journalist)
// 3 = Journalist
// 4 = Analyst
const CURRENT_USER_ROLE: number = 1; // Change to 2 to test restriction

const ROLE_MAP: Record<number, string> = {
  1: "Super Admin",
  2: "Admin (Senior Journalist)",
  3: "Journalist",
  4: "Analyst",
};

const INITIAL_STAFF = [
  {
    id: "u-1",
    name: "Alice Administrator",
    email: "alice@newsmate.lk",
    role: 1,
    status: "Active",
    lastUpdated: "2026-02-03",
  },
  {
    id: "u-2",
    name: "Bob Editor",
    email: "bob@newsmate.lk",
    role: 2,
    status: "Active",
    lastUpdated: "2026-02-01",
  },
  {
    id: "u-3",
    name: "Charlie Writer",
    email: "charlie@newsmate.lk",
    role: 3,
    status: "Active",
    lastUpdated: "2026-01-28",
  },
  {
    id: "u-4",
    name: "Dave Analyst",
    email: "dave@newsmate.lk",
    role: 4,
    status: "Inactive",
    lastUpdated: "2026-01-15",
  },
];

export default function StaffListPage() {
  const [staff, setStaff] = useState(INITIAL_STAFF);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStaff = staff.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ROLE_MAP[user.role].toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleStatusToggle = (id: string) => {
    // Strictly Super Admin Only
    if (CURRENT_USER_ROLE !== 1) {
      alert("Permission Denied: Only Super Admins can edit staff status.");
      return;
    }

    setStaff((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user,
      ),
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 ">
              Staff Management
            </h1>
            <p className="text-zinc-500 ">
              Manage internal users and access roles.
            </p>
          </div>
          {CURRENT_USER_ROLE === 1 && (
            <Link href="/staff/create">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors  flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Staff
              </button>
            </Link>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white  rounded-xl border border-zinc-200   p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search staff by name, email, or role..."
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
                    User
                  </th>
                  <th className="px-6 py-4 font-medium text-zinc-500 ">
                    Role
                  </th>
                  <th className="px-6 py-4 font-medium text-zinc-500 ">
                    Last Updated
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
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((user) => (
                    <tr
                      key={user.id}
                      className="group hover:bg-zinc-50  transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-100  flex items-center justify-center text-blue-600  font-medium text-sm">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-zinc-900 ">
                              {user.name}
                            </p>
                            <p className="text-xs text-zinc-500  flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-zinc-200  bg-zinc-50  text-zinc-700 ">
                          <Shield className="w-3 h-3" />
                          {ROLE_MAP[user.role]}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-600  font-mono text-xs">
                        {user.lastUpdated}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "inline-flex items-center px-2 py-1 rounded text-xs font-medium",
                            user.status === "Active"
                              ? "bg-green-100 text-green-700  "
                              : "bg-zinc-100 text-zinc-700  ",
                          )}
                        >
                          {user.status === "Active" ? (
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                          ) : (
                            <Ban className="w-3 h-3 mr-1" />
                          )}
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {/* Strictly Super Admin Only for Edit */}
                        {CURRENT_USER_ROLE === 1 ? (
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleStatusToggle(user.id)} // Mock edit/toggle
                              className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50  rounded-lg transition-colors"
                              title="Edit Details / Toggle Status"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-zinc-400 italic">
                            View Only
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-zinc-500 "
                    >
                      No staff members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Note from Requirement */}
          <div className="px-6 py-3 bg-zinc-50  border-t border-zinc-200  text-xs text-zinc-400 text-right">
            Data updated last on 03 FEB 2026
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
