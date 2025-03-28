"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, Shield, Zap, Users, ChevronDown, Sparkles } from "lucide-react";
import MaxWidthWrapper from "../common/MaxWidthWrapper";

const AboutSection: React.FC = () => {
  const [expandedPoint, setExpandedPoint] = useState<number | null>(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const points = [
    {
      icon: Cloud,
      title: "Simplicity",
      description:
        "Cloud storage that adapts to your needs, personal or professional.",
      details:
        "Our intuitive interface makes file management a breeze. Whether you're storing personal memories or collaborating on professional projects, Byto's adaptive storage solutions cater to all your needs with unparalleled ease.",
    },
    {
      icon: Shield,
      title: "Security",
      description:
        "Advanced encryption and flexible options to keep your data safe.",
      details:
        "We employ state-of-the-art encryption protocols to ensure your data remains private and secure. With customizable sharing controls and temporary storage options, you have full control over who accesses your files and for how long.",
    },
    {
      icon: Zap,
      title: "Speed",
      description:
        "Lightning-fast uploads and downloads for seamless file management.",
      details:
        "Experience the power of rapid file transfers with Byto. Our optimized infrastructure ensures that your files are uploaded, downloaded, and synced across devices at breakneck speeds, saving you valuable time and enhancing productivity.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Join early and shape the future of cloud storage with us.",
      details:
        "As an early adopter, you'll have a unique opportunity to influence the development of Byto. Enjoy exclusive features, priority support, and be part of a growing community that's redefining the future of cloud storage.",
    },
  ];

  return (
    <section className="relative overflow-hidden py-12 md:py-24" id="about">
      <MaxWidthWrapper className="py-10 md:py-20">
        <div className="container relative px-4 sm:px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            variants={fadeIn}
            className="mx-auto max-w-4xl text-center mb-12 md:mb-16 relative"
          >
            <div className="absolute -top-4 md:-top-8 left-1/2 -translate-x-1/2">
              <Sparkles className="h-12 w-12 md:h-16 md:w-16 text-cyan-400 animate-pulse" />
            </div>
            <h2 className="mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 bg-clip-text text-transparent drop-shadow">
                About Byto
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mt-4 md:mt-6 font-medium">
              At Byto, we&apos;re redefining cloud storage with a focus on{" "}
              <span className="bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
                simplicity
              </span>
              ,{" "}
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                security
              </span>
              , and{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                speed
              </span>
              .
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 text-white mb-12 md:mb-16">
            {points.map((point, index) => (
              <motion.div
                key={point.title}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10"
                whileHover={{ scale: 1.01 }}
              >
                <div className="relative">
                  <div className="flex items-center mb-3 md:mb-4">
                    <div className="relative mr-3 md:mr-4">
                      <point.icon className="h-6 w-6 md:h-8 md:w-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                      {point.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 mb-3 md:mb-4 font-medium text-sm md:text-base">
                    {point.description}
                  </p>
                  <motion.button
                    className="text-blue-400 flex items-center group/button text-sm md:text-base"
                    onClick={() =>
                      setExpandedPoint(expandedPoint === index ? null : index)
                    }
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="bg-gradient-to-r from-blue-400/0 via-blue-400/40 to-blue-400/0 h-px w-8 mr-2 transition-all group-hover/button:w-12" />
                    Learn More
                    <ChevronDown
                      className={`ml-2 transform transition-transform duration-200 ${expandedPoint === index
                          ? "rotate-180 text-teal-400"
                          : ""
                        }`}
                    />
                  </motion.button>
                  <AnimatePresence>
                    {expandedPoint === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 text-gray-400 font-medium text-sm md:text-base"
                      >
                        {point.details}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: 0.4 }}
            className="relative bg-gradient-to-br from-blue-500/15 to-teal-500/15 rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/10"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
              Our Commitment
            </h3>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed font-medium">
              We understand the importance of your data. That&apos;s why Byto
              offers <span className="text-teal-400">advanced encryption</span>,{" "}
              <span className="text-blue-400">temporary storage options</span>,
              and{" "}
              <span className="text-green-400">
                cross-platform compatibility
              </span>
              . Your data remains yours—we&apos;re just the safe and reliable
              vault you can trust.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              {["256-bit AES", "99.9% Uptime", "5s Sync Speed"].map((item) => (
                <div
                  key={item}
                  className="bg-white/5 rounded-lg p-3 md:p-4 text-center"
                >
                  <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                    {item.split(" ")[0]}
                  </div>
                  <div className="text-gray-400 text-xs md:text-sm mt-1">
                    {item.split(" ").slice(1).join(" ")}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default AboutSection;
