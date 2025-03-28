"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import MaxWidthWrapper from "../MaxWidthWrapper";

interface ContactSectionProps {
  isStandalone?: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  isStandalone = false,
}) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send the form data to your backend
    console.log("Form submitted:", formState);
    // Reset form after submission
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section
      className={`relative overflow-hidden bg-black ${isStandalone ? "py-24" : "py-16"}`}
        id="contact"
    >
      <MaxWidthWrapper className="py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,#1a365d,#000000)] opacity-40" />
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="mb-4 bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mt-6 max-w-3xl mx-auto">
              Have questions or need assistance? We&apos;re here to help. Reach
              out to our team and we&apos;ll get back to you as soon as
              possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                >
                  <Send className="mr-2" size={18} />
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="flex items-center">
                <Mail className="text-blue-400 mr-4" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    Email Us
                  </h3>
                  <p className="text-gray-300">support@byto.cloud</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="text-blue-400 mr-4" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    Call Us
                  </h3>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="text-blue-400 mr-4" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    Visit Us
                  </h3>
                  <p className="text-gray-300">
                    123 Cloud Street, Cyberspace, 54321
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default ContactSection;
