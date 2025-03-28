"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cloud, Lock, Zap } from "lucide-react";

const benefits = [
  { icon: Cloud, text: "Unlimited storage" },
  { icon: Lock, text: "End-to-end encryption" },
  { icon: Zap, text: "Lightning-fast uploads" },
];

const CallToAction: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      window.location.href = `/sign-up?email=${encodeURIComponent(email)}`;
    }
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-32">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-1/3 h-48 md:h-64 bg-gradient-to-r from-emerald-500/20 to-green-500/20 blur-lg md:blur-3xl"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container relative mx-auto px-4 sm:px-6"
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            className="mb-4 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Experience the Future of{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-lime-300 bg-clip-text text-transparent">
              Cloud Storage
            </span>
          </motion.h2>

          <motion.p
            className="mb-6 md:mb-8 text-lg md:text-xl text-gray-300 font-medium"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Join <span className="text-emerald-300 font-semibold">Byto</span>{" "}
            today and revolutionize the way you{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              store
            </span>
            ,{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-lime-300 bg-clip-text text-transparent">
              share
            </span>
            , and{" "}
            <span className="bg-gradient-to-r from-lime-300 to-cyan-300 bg-clip-text text-transparent">
              protect
            </span>{" "}
            your files.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3 mb-6 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-center bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-full px-4 py-2 sm:px-6 sm:py-3 backdrop-blur-lg border border-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative mr-2 sm:mr-3">
                  <div className="absolute inset-0 bg-cyan-400/10 blur-md" />
                  <benefit.icon className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-300 relative z-10" />
                </div>
                <span className="text-xs sm:text-sm text-white font-medium">
                  {benefit.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="relative mx-auto max-w-md sm:max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full blur opacity-20 group-hover:opacity-30 transition-all duration-300" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-full bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 backdrop-blur-lg text-sm sm:text-base"
                required
              />
              <motion.button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 sm:px-8 bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-semibold rounded-full transition-all duration-300 flex items-center hover:from-cyan-300 hover:to-emerald-300 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.form>

          <motion.p
            className="mt-4 md:mt-6 text-xs sm:text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            By signing up, you agree to our{" "}
            <a
              href="/tos"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors"
            >
              Privacy Policy
            </a>
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
