"use client";

import type React from "react";
import { motion } from "framer-motion";

const backgroundVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 25,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    },
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full antialiased relative overflow-hidden scroll-smooth">
      <div className="absolute inset-0 z-0">
        <div className="absolute h-full w-full bg-[radial-gradient(#2C3E50_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-1/3 h-64 bg-gradient-to-r from-blue-500/20 to-teal-500/20 blur-3xl"
          variants={backgroundVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-1/3 h-64 bg-gradient-to-r from-teal-500/20 to-green-500/20 blur-3xl"
          variants={backgroundVariants}
          animate="animate"
          style={{ animationDirection: "reverse" }}
        />
      </div>
      {children}
    </div>
  );
}
