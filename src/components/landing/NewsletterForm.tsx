"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { subscribeToNewsletter } from "@/server/newsletter";

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    const response = await subscribeToNewsletter(null, formData);
    setState(response);
    setLoading(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative mx-auto max-w-md sm:max-w-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full blur opacity-20 group-hover:opacity-30 transition-all duration-300" />
        <input
          type="email"
          name="email"
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
          {loading ? "Subscribing..." : "Subscribe"}
          <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform" />
        </motion.button>
      </div>
      {state && (
        <motion.p
          className={`mt-4 text-sm ${state.success ? "text-green-400" : "text-red-400"}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {state.message}
        </motion.p>
      )}
    </motion.form>
  );
};

export default NewsletterForm;
