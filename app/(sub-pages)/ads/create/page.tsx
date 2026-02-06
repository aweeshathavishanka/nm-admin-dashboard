"use client";

import React, { useState, useRef } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import {
  Upload,
  Image as ImageIcon,
  DollarSign,
  Calendar,
  Link as LinkIcon,
  User,
  ArrowLeft,
  Save,
  Smartphone,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CreateAdPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: "",
    advertiserName: "",
    targetUrl: "",
    startDate: "",
    endDate: "",
    budget: "",
    status: "Active",
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto h-[calc(100vh-100px)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/ads/list">
              <button className="p-2 text-zinc-500 hover:text-zinc-900   hover:bg-zinc-100  rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 ">
                Create New Advertisement
              </h1>
              <p className="text-sm text-zinc-500 ">
                Set up a new ad campaign with real-time preview.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-2  transition-all hover:">
              <Save className="w-4 h-4" />
              Publish Ad
            </button>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
          {/* Left: Form */}
          <div className="lg:col-span-7 xl:col-span-8 overflow-y-auto pr-2 pb-10">
            <div className="space-y-6">
              {/* Image Upload Section */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all group",
                  previewImage
                    ? "border-zinc-200  bg-zinc-50 "
                    : "border-blue-200  bg-blue-50  hover:border-blue-400 ",
                )}
              >
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {previewImage ? (
                  <div className="relative w-full aspect-video max-h-[300px] rounded-lg overflow-hidden ">
                    <img
                      src={previewImage}
                      alt="Ad Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white font-medium flex items-center gap-2">
                        <Upload className="w-4 h-4" /> Change Image
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 mx-auto bg-blue-100  rounded-full flex items-center justify-center text-blue-600 ">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-zinc-900 ">
                        Upload Ad Creative
                      </h3>
                      <p className="text-sm text-zinc-500 ">
                        PNG, JPG or GIF up to 5MB (1200x628 recommended)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Details */}
                <div className="space-y-4 bg-white  p-5 rounded-xl border border-zinc-200  ">
                  <h3 className="font-medium text-zinc-900  flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-500" /> Advertiser
                    Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-500  mb-1">
                        Campaign Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        placeholder="e.g. Summer Sale 2026"
                        className="w-full h-10 px-3 bg-zinc-50  border border-zinc-200  rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500  mb-1">
                        Advertiser Name
                      </label>
                      <input
                        type="text"
                        value={formData.advertiserName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            advertiserName: e.target.value,
                          })
                        }
                        placeholder="e.g. Coca-Cola Sri Lanka"
                        className="w-full h-10 px-3 bg-zinc-50  border border-zinc-200  rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* URL & Duration */}
                <div className="space-y-4 bg-white  p-5 rounded-xl border border-zinc-200  ">
                  <h3 className="font-medium text-zinc-900  flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-green-500" /> Links &
                    Duration
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-500  mb-1">
                        Target Link (URL)
                      </label>
                      <input
                        type="url"
                        value={formData.targetUrl}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            targetUrl: e.target.value,
                          })
                        }
                        placeholder="https://example.com/promo"
                        className="w-full h-10 px-3 bg-zinc-50  border border-zinc-200  rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-zinc-500  mb-1">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              startDate: e.target.value,
                            })
                          }
                          className="w-full h-10 px-3 bg-zinc-50  border border-zinc-200  rounded-lg text-sm outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-500  mb-1">
                          End Date
                        </label>
                        <input
                          type="date"
                          value={formData.endDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              endDate: e.target.value,
                            })
                          }
                          className="w-full h-10 px-3 bg-zinc-50  border border-zinc-200  rounded-lg text-sm outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Real-time Mobile Preview */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-6 h-[720px]  items-center justify-center perspective-1000 hidden lg:flex">
            {/* Preview Container Centering */}
            <div className="relative">
              <div className="absolute -left-16 top-1/2 -translate-y-1/2 text-right hidden xl:block">
                <div className="flex flex-col items-end gap-1 text-zinc-400">
                  <Smartphone className="w-6 h-6" />
                  <span className="text-xs font-medium uppercase tracking-wider">
                    Mobile Preview
                  </span>
                </div>
              </div>

              {/* Phone Frame */}
              <div className="w-[300px] h-[600px] border-8 border-zinc-900 rounded-[2.5rem] bg-white overflow-hidden  relative z-10 p-2">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-zinc-900 rounded-b-xl z-20"></div>

                {/* Content */}
                <div className="w-full h-full bg-zinc-50 overflow-y-auto hide-scrollbar rounded-[1.8rem]">
                  {/* Fake Header */}
                  <div className="h-14 bg-white border-b flex items-center justify-center  sticky top-0 z-10">
                    <span className="font-bold text-lg italic text-red-600">
                      NEWSMATE
                    </span>
                  </div>

                  {/* Fake News Feed Content */}
                  <div className="p-3 space-y-4">
                    {/* Mock Article 1 */}
                    <div className="space-y-2 opacity-30 pointer-events-none select-none grayscale">
                      <div className="h-32 bg-zinc-200 rounded-lg w-full"></div>
                      <div className="h-4 bg-zinc-300 rounded w-3/4"></div>
                      <div className="h-4 bg-zinc-300 rounded w-1/2"></div>
                    </div>

                    {/* THE AD */}
                    <div className="relative group">
                      <div className="bg-white rounded-lg  border border-zinc-100 overflow-hidden">
                        {/* Ad Header */}
                        <div className="px-3 py-2 flex items-center justify-between bg-zinc-50/50">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                              Ad
                            </div>
                            <span className="text-xs font-medium text-zinc-700">
                              {formData.advertiserName || "Advertiser Name"}
                            </span>
                          </div>
                          <span className="text-[10px] text-zinc-400 uppercase tracking-wide">
                            Sponsored
                          </span>
                        </div>

                        {/* Verified Image */}
                        <div className="aspect-video w-full bg-zinc-100 flex items-center justify-center relative overflow-hidden">
                          {previewImage ? (
                            <img
                              src={previewImage}
                              className="w-full h-full object-cover"
                              alt="Preview"
                            />
                          ) : (
                            <div className="text-zinc-300 flex flex-col items-center">
                              <ImageIcon className="w-8 h-8 mb-1" />
                              <span className="text-xs">Your Ad Here</span>
                            </div>
                          )}
                        </div>

                        {/* Action Bar */}
                        <div className="px-3 py-3 flex items-center justify-between">
                          <div className="flex-1 min-w-0 mr-2">
                            <p className="text-xs font-semibold text-zinc-900 truncate">
                              {formData.title || "Headline goes here"}
                            </p>
                            <p className="text-[10px] text-zinc-500 truncate">
                              {formData.targetUrl || "example.com"}
                            </p>
                          </div>
                          <button className="px-3 py-1.5 bg-blue-600 text-white text-[10px] font-bold uppercase rounded-full ">
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Mock Article 2 */}
                    <div className="space-y-2 opacity-30 pointer-events-none select-none grayscale">
                      <div className="h-4 bg-zinc-300 rounded w-full"></div>
                      <div className="h-4 bg-zinc-300 rounded w-5/6"></div>
                      <div className="h-32 bg-zinc-200 rounded-lg w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
