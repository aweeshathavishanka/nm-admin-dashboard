"use client";

import React from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import {
  Database,
  FileText,
  MousePointerClick,
  HardDrive,
  Server,
  Clock,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";

// Mock Data
const CONTENT_GROWTH_DATA = [
  { month: "Jan", articles: 4000 },
  { month: "Feb", articles: 4500 },
  { month: "Mar", articles: 5100 },
  { month: "Apr", articles: 5800 },
  { month: "May", articles: 6200 },
  { month: "Jun", articles: 7500 },
];

const AD_PERFORMANCE_DATA = [
  { day: "Mon", ctr: 2.1 },
  { day: "Tue", ctr: 2.4 },
  { day: "Wed", ctr: 2.2 },
  { day: "Thu", ctr: 2.8 },
  { day: "Fri", ctr: 2.5 },
  { day: "Sat", ctr: 3.1 },
  { day: "Sun", ctr: 2.9 },
];

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white  rounded-xl border border-zinc-200   p-6 ${className}`}
  >
    {children}
  </motion.div>
);

const MetricRow = ({
  label,
  value,
  subtext,
}: {
  label: string;
  value: string;
  subtext?: string;
}) => (
  <div className="flex items-center justify-between py-3 border-b border-zinc-100  last:border-0">
    <span className="text-sm text-zinc-600 ">{label}</span>
    <div className="text-right">
      <span className="block font-medium text-zinc-900 ">
        {value}
      </span>
      {subtext && <span className="text-xs text-zinc-500">{subtext}</span>}
    </div>
  </div>
);

export default function DatabaseStats() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900  flex items-center gap-2">
              <Database className="w-6 h-6 text-zinc-500" />
              Database Statistics
            </h1>
            <p className="text-zinc-500  mt-1">
              Read-only view of total platform content metrics.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50  text-green-700  rounded-full text-xs font-medium border border-green-200 ">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            System Healthy
          </div>
        </div>

        {/* Primary Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Total Articles Section */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50  text-blue-600 rounded-lg">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 ">
                    Total Articles
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Platform-wide content count
                  </p>
                </div>
              </div>
              <span className="text-3xl font-bold text-zinc-900 ">
                45,231
              </span>
            </div>

            {/* Growth Chart */}
            <div className="h-[200px] w-full mb-6 relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CONTENT_GROWTH_DATA}>
                  <defs>
                    <linearGradient
                      id="colorArticles"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b",
                      borderColor: "#27272a",
                      color: "#fff",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#27272a"
                    opacity={0.1}
                  />
                  <Area
                    type="monotone"
                    dataKey="articles"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorArticles)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-zinc-50  rounded-lg p-4">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                Detailed Breakdown
              </h3>
              <MetricRow
                label="Published News"
                value="42,150"
                subtext="93% of total"
              />
              <MetricRow
                label="Drafts & Scheduled"
                value="2,850"
                subtext="In queue"
              />
              <MetricRow
                label="Archived / Soft Deleted"
                value="231"
                subtext="Retained in DB"
              />
              <MetricRow
                label="Avg. Daily Output"
                value="145"
                subtext="Articles per day"
              />
            </div>
          </Card>

          {/* Ad Performance Section */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-violet-50  text-violet-600 rounded-lg">
                  <MousePointerClick className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 ">
                    Ad CTR
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Click-through rate average
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-zinc-900 ">
                  2.4%
                </span>
                <span className="block text-xs text-red-500 font-medium">
                  -0.5% vs last week
                </span>
              </div>
            </div>

            {/* CTR Chart */}
            <div className="h-[200px] w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={AD_PERFORMANCE_DATA}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#27272a"
                    opacity={0.1}
                  />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#71717a" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b",
                      borderColor: "#27272a",
                      color: "#fff",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ctr"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#8b5cf6" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-zinc-50  rounded-lg p-4">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                Performance Metrics
              </h3>
              <MetricRow
                label="Total Ad Impressions"
                value="8.5M"
                subtext="Last 30 days"
              />
              <MetricRow
                label="Total Clicks"
                value="204k"
                subtext="Last 30 days"
              />
              <MetricRow
                label="Active Campaigns"
                value="12"
                subtext="Currently running"
              />
              <MetricRow
                label="Top Performing Ad"
                value="Dialog 5G Promo"
                subtext="3.8% CTR"
              />
            </div>
          </Card>
        </div>

        {/* System / Tech Stats Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex items-center gap-4">
            <div className="p-3 bg-zinc-100  rounded-full">
              <HardDrive className="w-5 h-5 text-zinc-500" />
            </div>
            <div>
              <p className="text-xs text-zinc-500">Storage Usage</p>
              <p className="font-semibold text-zinc-900 ">
                45.2 GB / 1 TB
              </p>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="p-3 bg-zinc-100  rounded-full">
              <Server className="w-5 h-5 text-zinc-500" />
            </div>
            <div>
              <p className="text-xs text-zinc-500">Database Uptime</p>
              <p className="font-semibold text-zinc-900 ">
                99.98%
              </p>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="p-3 bg-zinc-100  rounded-full">
              <ShieldCheck className="w-5 h-5 text-zinc-500" />
            </div>
            <div>
              <p className="text-xs text-zinc-500">Last Backup</p>
              <p className="font-semibold text-zinc-900 ">
                Today, 04:00 AM
              </p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
