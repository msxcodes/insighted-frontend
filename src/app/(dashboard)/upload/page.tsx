"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Clock } from "lucide-react";
import SwitchTab from "@/components/upload/switch-tab";
import LinkVideoSection from "@/components/upload/link-video";
import UploadVideoSection from "@/components/upload/upload-video";
import ImportantWarning from "@/components/upload/warning";
import StatusModal from "@/components/ui/status-modal";

export default function Dashboard() {
  const [isHovering, setIsHovering] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'link' | 'video'>('link');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(3);
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-grow flex flex-col items-center justify-center p-4 sm:p-4"
    >
      <div className="w-full max-w-4xl space-y-6">
        {/* Animated Header */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-block">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-lime-400 bg-clip-text text-transparent"
            >
              Convert Your Lecture
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 font-medium"
          >
            Transform educational videos into comprehensive study materials
          </motion.p>
        </motion.div>

        {/* New Tab Style Toggle */}
        <div className="relative">
          <SwitchTab uploadMethod={uploadMethod} setUploadMethod={setUploadMethod} />
        </div>

        {/* Main Content Area */}
        <motion.div
          className="relative group"
          animate={{ scale: isHovering ? 1.01 : 1 }}
          transition={{ duration: 0.2 }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-gray-800 rounded-2xl backdrop-blur-xl shadow-2xl p-6 sm:p-8">
            <motion.div
              key={uploadMethod}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {uploadMethod === 'link' ? (
                <LinkVideoSection setIsModalOpen={setIsModalOpen} />
              ) : (
                <UploadVideoSection />
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Disclaimers */}
        <ImportantWarning />
      </div>
      {isModalOpen && <StatusModal isOpen={isModalOpen} currentStep={currentStep} onClose={() => setIsModalOpen(false)} />}
    </motion.main>
  );
}
