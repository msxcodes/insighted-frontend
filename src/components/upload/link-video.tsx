"use client";

import axios from "axios";
import { motion } from "framer-motion";
import { Youtube } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface LinkVideoSectionProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function LinkVideoSection({
  setIsModalOpen,
}: LinkVideoSectionProps) {
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!videoUrl) {
      toast.error("Please enter a video URL.");
      return;
    }

    setIsLoading(true);
    setIsModalOpen(true);

    try {
      const res = await axios.post("/api/summarize", {
        youtubeUrl: videoUrl,
      });

      if (res.status === 200) {
        router.push(`/results?summary=${encodeURIComponent(res.data.summary)}`);
        toast.success("Video summarized successfully!");
      }

    } catch (error) {
      console.error("Error summarizing video:", error);
      toast.error("Failed to summarize the video. Please try again.");
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          type="text"
          placeholder="Paste your video URL here..."
          className="w-full px-4 py-3 bg-gray-800/90 rounded-lg border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all outline-none text-gray-100 placeholder:text-gray-400 pr-12"
          disabled={isLoading}
        />
        <Youtube className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
      </div>

      <motion.button
        onClick={handleSubmit}
        whileHover={{
          scale: 0.99,
          boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
        }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3 bg-gradient-to-r from-cyan-500 via-teal-800 to-emerald-500 rounded-lg font-medium text-white transition-all duration-300 ${isLoading
          ? "opacity-70 cursor-not-allowed"
          : "cursor-pointer hover:opacity-90"
          }`}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Convert to Notes"}
      </motion.button>
    </div>
  );
}
