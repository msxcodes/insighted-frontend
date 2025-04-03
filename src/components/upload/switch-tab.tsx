import { Youtube } from "lucide-react";
import { Video } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

interface SwitchTabProps {
  uploadMethod: "link" | "video";
  setUploadMethod: (method: "link" | "video") => void;
}

export default function SwitchTab({
  uploadMethod,
  setUploadMethod,
}: SwitchTabProps) {
  return (
    <div>
      <div className="relative rounded-xl flex justify-center">
        <div className="bg-gray-800/50 rounded-full grid grid-cols-2 w-full max-w-md p-2 gap-1">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setUploadMethod("link")}
            className={`relative rounded-full px-6 py-3 flex items-center justify-center gap-2 transition-all duration-300 ${uploadMethod === "link"
              ? "text-white"
              : "text-gray-400 hover:text-gray-300"
              }`}
          >
            {uploadMethod === "link" && (
              <motion.div
                layoutId="tab-background"
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-teal-800 to-emerald-500 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Youtube className="w-4 h-4 relative z-10" />
            <span className="relative z-10 font-medium">Video Link</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setUploadMethod("video")}
            className={`relative rounded-full px-6 py-3 flex items-center justify-center gap-2 transition-all duration-300 ${uploadMethod === "video"
              ? "text-white"
              : "text-gray-400 hover:text-gray-300"
              }`}
          >
            {uploadMethod === "video" && (
              <motion.div
                layoutId="tab-background"
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-teal-800 to-emerald-500 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Video className="w-4 h-4 relative z-10" />
            <span className="relative z-10 font-medium">Upload Video</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
