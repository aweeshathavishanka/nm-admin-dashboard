"use client";

import React from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import {
  Users,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  ArrowUpRight,
  Wifi,
} from "lucide-react";
import { motion } from "framer-motion";
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
  AreaChart,
  Area,
} from "recharts";

// -- MOCK DATA --

const DEVICE_DATA = [
  { name: "Mobile", value: 65, color: "#3b82f6", icon: Smartphone },
  { name: "Desktop", value: 30, color: "#8b5cf6", icon: Monitor },
  { name: "Tablet", value: 5, color: "#06b6d4", icon: Tablet },
];

const TRAFFIC_SOURCES = [
  { name: "Direct", value: 4000 },
  { name: "Organic Search", value: 3000 },
  { name: "Social Media", value: 2000 },
  { name: "Referral", value: 1000 },
];

const REALTIME_DATA = [
  { time: "1min", value: 120 },
  { time: "2min", value: 132 },
  { time: "3min", value: 101 },
  { time: "4min", value: 134 },
  { time: "5min", value: 190 },
  { time: "6min", value: 230 },
  { time: "7min", value: 210 },
  { time: "8min", value: 250 },
  { time: "9min", value: 220 },
  { time: "10min", value: 280 },
];

// -- COMPONENTS --

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

export default function ExternalAnalytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-zinc-900  flex items-center gap-2">
            <span className="bg-[#E37400] text-white text-xs px-2 py-0.5 rounded font-bold tracking-wider uppercase">
              Google Analytics
            </span>
            External Analytics
          </h1>
          <p className="text-zinc-500  mt-1">
            Real-time data fetched from Google Analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Real-time Users Widget */}
          <Card className="lg:col-span-2">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-sm font-medium text-zinc-500  uppercase tracking-widest">
                  Real-time Users
                </h3>
                <h2 className="text-5xl font-bold text-zinc-900  mt-2">
                  284
                </h2>
                <div className="flex items-center gap-2 mt-2 text-sm text-green-600 font-medium animate-pulse">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  Active on site right now
                </div>
              </div>
              <div className="p-3 bg-blue-50  text-blue-600 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
            </div>

            {/* Mini Chart for Decor (Real-time trend) */}
            <div className="h-[200px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REALTIME_DATA}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#27272a"
                    opacity={0.1}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b",
                      borderColor: "#27272a",
                      color: "#fff",
                    }}
                    itemStyle={{ color: "#fff" }}
                    cursor={{ stroke: "#3b82f6", strokeWidth: 1 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-zinc-400 mt-4 text-center">
              Per minute view over the last 30 minutes
            </p>
          </Card>

          {/* Device Split Widget */}
          <Card>
            <h3 className="font-semibold text-zinc-900  mb-6 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-zinc-500" />
              Device Allocation
            </h3>

            <div className="h-[220px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DEVICE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {DEVICE_DATA.map((entry, index) => (
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

              {/* Center Text Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-zinc-900 ">
                  65%
                </span>
                <span className="text-xs text-zinc-500">Mobile</span>
              </div>
            </div>

            <div className="space-y-4 mt-2">
              {DEVICE_DATA.map((device) => (
                <div
                  key={device.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <device.icon className="w-4 h-4 text-zinc-500" />
                    <span className="text-zinc-600 ">
                      {device.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-zinc-100  rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${device.value}%`,
                          backgroundColor: device.color,
                        }}
                      />
                    </div>
                    <span className="font-medium w-8 text-right text-zinc-900 ">
                      {device.value}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Traffic Sources */}
        <div className="grid grid-cols-1">
          <Card>
            <h3 className="font-semibold text-zinc-900  mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-500" />
              Traffic Sources
            </h3>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={TRAFFIC_SOURCES}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                  barSize={32}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    stroke="#27272a"
                    opacity={0.1}
                  />
                  <XAxis
                    type="number"
                    stroke="#71717a"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={100}
                    tick={{ fontSize: 13, fill: "#71717a" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      backgroundColor: "#18181b",
                      borderColor: "#27272a",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {TRAFFIC_SOURCES.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index === 0
                            ? "#E37400"
                            : index === 1
                              ? "#34A853"
                              : index === 2
                                ? "#4285F4"
                                : "#EA4335"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
