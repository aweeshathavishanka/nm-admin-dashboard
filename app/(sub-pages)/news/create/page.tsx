"use client";

import React, { useState, useRef } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import {
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Upload,
  X,
  Sparkles,
  Calendar,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Bell,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock Categories
const CATEGORIES = [
  "Local News",
  "Politics",
  "Sports",
  "Business",
  "Entertainment",
  "Technology",
];

export default function CreateNews() {
  // Form State
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [image, setImage] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [sendNotification, setSendNotification] = useState(true);
  const [isSensitive, setIsSensitive] = useState(false);
  const [publishDate, setPublishDate] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handlers
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAiTags = () => {
    setIsAiLoading(true);
    // Simulate AI delay
    setTimeout(() => {
      setTags([
        "News",
        "Update",
        "Sri Lanka",
        "Latest",
        category.replace(" ", ""),
      ]);
      setIsAiLoading(false);
    }, 1500);
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col xl:flex-row gap-6 h-[calc(100vh-8rem)]">
        {/* LEFT SIDE: Editor Form */}
        <div className="flex-1 overflow-y-auto pr-2 pb-10">
          <div className="bg-white  rounded-xl border border-zinc-200   p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-200  pb-4">
              <h1 className="text-xl font-bold text-zinc-900 ">
                Create News Article
              </h1>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm font-medium text-zinc-600  bg-zinc-100  rounded-lg hover:bg-zinc-200  transition-colors">
                  Save Draft
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors  -500/20">
                  Publish
                </button>
              </div>
            </div>

            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 ">
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter article title (Sinhala/English)..."
                className="w-full h-11 px-4 text-base bg-zinc-50  border border-zinc-200  rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-zinc-400"
              />
            </div>

            {/* Category & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 ">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-11 px-4 text-sm bg-zinc-50  border border-zinc-200  rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700  flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Schedule Publish (Optional)
                </label>
                <input
                  type="datetime-local"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  className="w-full h-11 px-4 text-sm bg-zinc-50  border border-zinc-200  rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-zinc-600 "
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 ">
                Cover Image
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-40 border-2 border-dashed border-zinc-300  rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500  bg-zinc-50  transition-colors group relative overflow-hidden"
              >
                {image ? (
                  <img
                    src={image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="p-3 bg-white  rounded-full  group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6 text-zinc-400  group-hover:text-blue-500" />
                    </div>
                    <p className="mt-3 text-sm text-zinc-500 ">
                      Click to upload image
                    </p>
                  </>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>

              {/* Sensitive Toggle */}
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="sensitive"
                  checked={isSensitive}
                  onChange={(e) => setIsSensitive(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="sensitive"
                  className="text-sm text-zinc-600  cursor-pointer select-none flex items-center gap-1"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  Mark as Sensitive Content (Blur Initially)
                </label>
              </div>
            </div>

            {/* Rich Text Editor Simulation */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 ">
                Content Body{" "}
                <span className="text-xs font-normal text-zinc-500 ml-1">
                  (Unicode Supported)
                </span>
              </label>
              <div className="border border-zinc-200  rounded-lg overflow-hidden bg-white  border-b-4 focus-within:border-b-blue-500 focus-within:border-blue-200 transition-all">
                {/* Toolbar */}
                <div className="flex items-center gap-1 p-2 border-b border-zinc-100  bg-zinc-50 ">
                  <button className="p-1.5 hover:bg-zinc-200  rounded text-zinc-600 ">
                    <Bold className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 hover:bg-zinc-200  rounded text-zinc-600 ">
                    <Italic className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 hover:bg-zinc-200  rounded text-zinc-600 ">
                    <Underline className="w-4 h-4" />
                  </button>
                  <div className="w-px h-4 bg-zinc-300  mx-1" />
                  <button className="p-1.5 hover:bg-zinc-200  rounded text-zinc-600 ">
                    <AlignLeft className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 hover:bg-zinc-200  rounded text-zinc-600 ">
                    <AlignCenter className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 hover:bg-zinc-200  rounded text-zinc-600 ">
                    <AlignRight className="w-4 h-4" />
                  </button>
                  <div className="w-px h-4 bg-zinc-300  mx-1" />
                  <button className="p-1.5 hover:bg-zinc-200  rounded text-zinc-600 ">
                    <LinkIcon className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 hover:bg-zinc-200  rounded text-zinc-600 ">
                    <ImageIcon className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write your article content here..."
                  className="w-full h-64 p-4 bg-transparent outline-none resize-none text-zinc-800  leading-relaxed font-sans"
                />
              </div>
            </div>

            {/* AI Keyword Gen */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-700 ">
                  Tags & Keywords
                </label>
                <button
                  onClick={generateAiTags}
                  disabled={isAiLoading}
                  className="text-xs flex items-center gap-1.5 text-violet-600  hover:text-violet-700 font-medium disabled:opacity-50"
                >
                  {isAiLoading ? (
                    <span className="animate-spin">✨</span>
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                  {isAiLoading ? "Generating..." : "AI Auto-Generate"}
                </button>
              </div>
              <div className="flex flex-wrap gap-2 min-h-[40px] p-2 bg-zinc-50  rounded-lg border border-zinc-200 ">
                {tags.length > 0 ? (
                  tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-violet-100  text-violet-700 "
                    >
                      #{tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1.5 hover:text-violet-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-zinc-400 py-1 px-1">
                    No tags generated yet.
                  </span>
                )}
              </div>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between p-4 bg-zinc-50  rounded-lg border border-blue-100 ">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${sendNotification ? "bg-blue-100 text-blue-600  " : "bg-zinc-200 text-zinc-400 "}`}
                >
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900 ">
                    Push Notifications
                  </p>
                  <p className="text-xs text-zinc-500">
                    Send alerts to mobile app users upon publish
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={sendNotification}
                  onChange={(e) => setSendNotification(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Mobile Preview */}
        <div className="hidden xl:flex w-[400px] flex-col overflow-hidden sticky top-6 self-start">
          <div className="text-center mb-4">
            <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider flex items-center justify-center gap-2">
              <Smartphone className="w-4 h-4" /> Live Mobile Preview
            </h3>
          </div>

          <div className="relative mx-auto border-zinc-800 bg-zinc-900 border-14 rounded-[2.5rem] h-[750px] w-[370px]  overflow-hidden ring-1 ring-zinc-900/5">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[32px] w-[150px] bg-zinc-800 rounded-b-2xl z-20"></div>

            {/* Screen Content */}
            <div className="h-full w-full bg-white  overflow-y-auto no-scrollbar relative">
              {/* Simulated Stack Header */}
              <div className="sticky top-0 z-10 h-20 bg-white/80  backdrop-blur-md flex items-end pb-3 px-4 border-b border-zinc-100 ">
                <div className="flex-1 text-center font-bold text-lg text-zinc-900 ">
                  News Detail
                </div>
              </div>

              {/* Content */}
              <div className="pb-10">
                {/* Image */}
                <div className="w-full h-56 bg-zinc-100  relative">
                  {image ? (
                    <div className="relative w-full h-full">
                      <img
                        src={image}
                        className={`w-full h-full object-cover ${isSensitive ? "blur-md" : ""}`}
                        alt="Preview"
                      />
                      {isSensitive && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <p className="text-white text-xs font-medium px-3 py-1 bg-black/50 rounded-full backdrop-blur-sm flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Sensitive
                            Content
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-300 ">
                      <ImageIcon className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-black/60 to-transparent"></div>
                  <span className="absolute bottom-3 left-4 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wide">
                    {category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-4 space-y-3">
                  <h2
                    className={`text-xl font-bold leading-tight ${title ? "text-zinc-900 " : "text-zinc-300 "}`}
                  >
                    {title || "Your Title Will Appear Here..."}
                  </h2>

                  <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
                    <span>Just now</span> • <span>2 min read</span>
                  </div>

                  <div
                    className={`prose prose-sm  leading-relaxed ${body ? "text-zinc-700 " : "text-zinc-300 "}`}
                  >
                    {body ||
                      "Start typing to see your content preview here. This area supports simulated rich text rendering."}
                  </div>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-blue-600 "
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Action Bar Sim */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-white  border-t border-zinc-100  flex items-center justify-around px-2 text-zinc-400">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-5 h-5 bg-zinc-200  rounded-sm"></div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-5 h-5 bg-zinc-200  rounded-sm"></div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-5 h-5 bg-zinc-200  rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
