"use client";

import React from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import {
  Users,
  FileText,
  Share2,
  TrendingUp,
  MapPin,
  PieChart as PieIcon,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

// Mock Data
const DEMOGRAPHICS_DATA = [
  { name: "18-24", value: 35, color: "#8b5cf6" }, // Violet
  { name: "25-34", value: 40, color: "#3b82f6" }, // Blue
  { name: "35-44", value: 15, color: "#06b6d4" }, // Cyan
  { name: "45+", value: 10, color: "#64748b" }, // Slate
];

const INTERESTS_DATA = [
  { name: "Politics", value: 65 },
  { name: "Sports", value: 45 },
  { name: "Tech", value: 30 },
  { name: "Entertainment", value: 55 },
  { name: "Business", value: 25 },
];

const LOCATION_DATA = [
  { region: "Colombo", count: 12500, percentage: 45 },
  { region: "Kandy", count: 5400, percentage: 20 },
  { region: "Galle", count: 3200, percentage: 12 },
  { region: "Gampaha", count: 4100, percentage: 15 },
  { region: "Other", count: 2000, percentage: 8 },
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

const KPICard = ({ title, value, change, icon: Icon, trend }: any) => (
  <Card>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-zinc-500 ">{title}</p>
        <h3 className="text-2xl font-bold mt-2 text-zinc-900 ">{value}</h3>
      </div>
      <div
        className={`p-2 rounded-lg ${trend === "up" ? "bg-green-100 text-green-600 " : "bg-red-100 text-red-600 "}`}
      >
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span
        className={`flex items-center gap-1 font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}
      >
        {trend === "up" ? (
          <ArrowUpRight className="w-4 h-4" />
        ) : (
          <ArrowDownRight className="w-4 h-4" />
        )}
        {change}
      </span>
      <span className="text-zinc-500 ml-2">vs last month</span>
    </div>
  </Card>
);

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 ">Global Overview</h1>
          <p className="text-zinc-500 ">
            Real-time platform insights and analytics.
          </p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Users"
            value="124,592"
            change="+12.5%"
            icon={Users}
            trend="up"
          />
          <KPICard
            title="Total Articles"
            value="45,231"
            change="+8.2%"
            icon={FileText}
            trend="up"
          />
          <KPICard
            title="Ad CTR"
            value="2.4%"
            change="-0.5%"
            icon={Share2}
            trend="down"
          />
          <KPICard
            title="Active Traffic"
            value="1.2k"
            change="+24%"
            icon={TrendingUp}
            trend="up"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Demographics */}
          <Card className="min-h-[400px]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-zinc-900  flex items-center gap-2">
                <PieIcon className="w-5 h-5 text-blue-500" />
                User Demographics
              </h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DEMOGRAPHICS_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {DEMOGRAPHICS_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b",
                      borderColor: "#27272a",
                      color: "#fff",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center flex-wrap gap-4 mt-4">
              {DEMOGRAPHICS_DATA.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-zinc-600 ">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Interest Segmentation */}
          <Card className="min-h-[400px]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-zinc-900  flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-violet-500" />
                Interest Segmentation
              </h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={INTERESTS_DATA}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    stroke="#27272a"
                    opacity={0.1}
                  />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={80}
                    tick={{ fontSize: 12 }}
                    stroke="#71717a"
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      backgroundColor: "#18181b",
                      borderColor: "#27272a",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                    {INTERESTS_DATA.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index % 2 === 0 ? "#8b5cf6" : "#6366f1"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Geo Map Section & Location Data */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <h3 className="font-semibold text-zinc-900  mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" />
              Geographic Distribution
            </h3>
            <div className="bg-zinc-100  rounded-lg h-[300px] flex items-center justify-center border border-zinc-200  border-dashed">
              <span className="text-zinc-400 font-medium">
                Interactive Map Component Placeholder
              </span>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-zinc-900  mb-4">Top Regions</h3>
            <div className="space-y-4">
              {LOCATION_DATA.map((loc) => (
                <div
                  key={loc.region}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100  text-blue-600 flex items-center justify-center text-xs font-bold">
                      {loc.region.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-900 ">
                        {loc.region}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {loc.count.toLocaleString()} users
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-zinc-700 ">
                    {loc.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
