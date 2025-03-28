"use client";

import { motion } from "framer-motion";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import NewsletterForm from "@/components/landing/NewsletterForm";

export default function NewsletterPage() {
  return (
    <section className="relative overflow-hidden py-16 md:py-32 bg-gradient-to-br from-gray-900 to-black">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-1/3 h-48 md:h-64 bg-gradient-to-r from-emerald-500/20 to-green-500/20 blur-2xl"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <MaxWidthWrapper className="relative mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h1
            className="mb-4 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 drop-shadow-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Stay Updated
          </motion.h1>

          <motion.p
            className="mb-8 text-lg md:text-xl text-gray-300 font-medium"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Subscribe to our newsletter for the latest updates on our products,
            features, and special offers.
          </motion.p>

          <NewsletterForm />
        </motion.div>
      </MaxWidthWrapper>
    </section>
  );
}
