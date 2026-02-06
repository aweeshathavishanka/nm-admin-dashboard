"use client";

import React, { useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import Header from "../dashboard/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // Updated for fixed layout: h-screen, overflow-hidden
    <div className="flex h-screen overflow-hidden bg-zinc-50 font-sans text-zinc-900">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden transition-all duration-300">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
