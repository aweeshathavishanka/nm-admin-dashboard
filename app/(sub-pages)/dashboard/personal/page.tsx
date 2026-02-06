"use client";

import React from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import {
  Eye,
  Share2,
  Heart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

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

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  trend,
  trendLabel,
}: any) => (
  <Card>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-zinc-500 ">
          {title}
        </p>
        <h3 className="text-2xl font-bold mt-2 text-zinc-900 ">
          {value}
        </h3>
      </div>
      <div
        className={`p-2 rounded-lg ${trend === "up" ? "bg-blue-50 text-blue-600  " : trend === "down" ? "bg-red-50 text-red-600  " : "bg-violet-50 text-violet-600  "}`}
      >
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span
        className={`flex items-center gap-1 font-medium ${trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-zinc-600 "}`}
      >
        {trend === "up" ? (
          <ArrowUpRight className="w-4 h-4" />
        ) : trend === "down" ? (
          <ArrowDownRight className="w-4 h-4" />
        ) : null}
        {change}
      </span>
      {trendLabel && <span className="text-zinc-500 ml-2">{trendLabel}</span>}
    </div>
  </Card>
);

// Mock Data for Recent Articles to add context
const RECENT_ARTICLES = [
  {
    id: 1,
    title: "The Future of AI in Local News",
    views: "12.5k",
    shares: "1.2k",
    reactions: "3.4k",
    date: "2 hrs ago",
    status: "Trending",
  },
  {
    id: 2,
    title: "Community Guidelines Update 2026",
    views: "8.1k",
    shares: "854",
    reactions: "2.1k",
    date: "5 hrs ago",
    status: "Steady",
  },
  {
    id: 3,
    title: "Tech Trends in Colombo",
    views: "5.4k",
    shares: "320",
    reactions: "1.2k",
    date: "1 day ago",
    status: "Growing",
  },
];

export default function PersonalDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 ">
            Personal Dashboard
          </h1>
          <p className="text-zinc-500 ">
            Analytics for your published content.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Views"
            value="284,592"
            change="+18.2%"
            icon={Eye}
            trend="up"
            trendLabel="vs last month"
          />
          <StatCard
            title="Total Shares"
            value="15,231"
            change="+5.4%"
            icon={Share2}
            trend="up"
            trendLabel="vs last month"
          />
          <StatCard
            title="Total Reactions"
            value="48.2k"
            change="+12.1%"
            icon={Heart}
            trend="up"
            trendLabel="vs last month"
          />
          <StatCard
            title="Trending Status"
            value="High"
            change="Top 5%"
            icon={TrendingUp}
            trend="neutral"
            trendLabel="of platform authors"
          />
        </div>

        {/* Recent Performance Section */}
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <h3 className="font-semibold text-zinc-900  mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              Recent Articles Performance
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 ">
                    <th className="pb-3 font-medium text-zinc-500 ">
                      Article Title
                    </th>
                    <th className="pb-3 font-medium text-zinc-500  text-right">
                      Views
                    </th>
                    <th className="pb-3 font-medium text-zinc-500  text-right">
                      Shares
                    </th>
                    <th className="pb-3 font-medium text-zinc-500  text-right">
                      Reactions
                    </th>
                    <th className="pb-3 font-medium text-zinc-500  text-right">
                      Published
                    </th>
                    <th className="pb-3 font-medium text-zinc-500  text-right">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 ">
                  {RECENT_ARTICLES.map((article) => (
                    <tr key={article.id} className="group">
                      <td className="py-4 pr-4 font-medium text-zinc-900 ">
                        {article.title}
                      </td>
                      <td className="py-4 text-right text-zinc-600 ">
                        {article.views}
                      </td>
                      <td className="py-4 text-right text-zinc-600 ">
                        {article.shares}
                      </td>
                      <td className="py-4 text-right text-zinc-600 ">
                        {article.reactions}
                      </td>
                      <td className="py-4 text-right text-zinc-500">
                        <div className="flex items-center justify-end gap-1">
                          <Clock className="w-3 h-3" />
                          {article.date}
                        </div>
                      </td>
                      <td className="py-4 pl-4 text-right">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${
                            article.status === "Trending"
                              ? "bg-green-100 text-green-800  "
                              : article.status === "Growing"
                                ? "bg-blue-100 text-blue-800  "
                                : "bg-zinc-100 text-zinc-800  "
                          }`}
                        >
                          {article.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
