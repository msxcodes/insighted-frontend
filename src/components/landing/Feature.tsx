"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import {
  Upload,
  Share2,
  Shield,
  Zap,
  Clock,
  Layout,
  Smartphone,
  Lock,
  Leaf,
} from "lucide-react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

const features = [
  {
    icon: Upload,
    title: "Lightning Uploads",
    description: "Instant file transfers with parallel processing",
    gradient: "from-cyan-400/20 to-emerald-400/20",
  },
  {
    icon: Share2,
    title: "Secure Sharing",
    description: "Military-grade encrypted file links",
    gradient: "from-emerald-400/20 to-lime-400/20",
  },
  {
    icon: Shield,
    title: "Data Fortress",
    description: "AES-256 & RSA-4096 end-to-end protection",
    gradient: "from-lime-400/20 to-cyan-400/20",
  },
  {
    icon: Zap,
    title: "Global Network",
    description: "300+ edge locations worldwide",
    gradient: "from-cyan-400/20 to-lime-400/20",
  },
  {
    icon: Clock,
    title: "Temp Storage",
    description: "Auto-expiring files with audit logs",
    gradient: "from-emerald-400/20 to-cyan-400/20",
  },
  {
    icon: Layout,
    title: "Smart Interface",
    description: "AI-powered organization system",
    gradient: "from-lime-400/20 to-emerald-400/20",
  },
  {
    icon: Smartphone,
    title: "Universal Sync",
    description: "Seamless cross-device integration",
    gradient: "from-cyan-400/20 to-emerald-400/20",
  },
  {
    icon: Lock,
    title: "Granular Control",
    description: "Precision permission management",
    gradient: "from-emerald-400/20 to-lime-400/20",
  },
  {
    icon: Leaf,
    title: "Eco-Cloud",
    description: "Carbon-neutral data centers",
    gradient: "from-lime-400/20 to-cyan-400/20",
  },
];

const FeatureCard = React.memo(
  ({
    icon: Icon,
    title,
    description,
    gradient,
    index,
  }: {
    icon: React.ElementType;
    title: string;
    description: string;
    gradient: string;
    index: number;
  }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {
      once: true,
      margin: "0px 0px -50px 0px",
    });
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const [decorations, setDecorations] = React.useState<
      { duration: number; delay: number }[]
    >([]);
    React.useEffect(() => {
      if (isDesktop) {
        const settings = [...Array(2)].map(() => ({
          duration: 4 + Math.random() * 4,
          delay: Math.random() * 2,
        }));
        setDecorations(settings);
      }
    }, [isDesktop]);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative h-full"
      >
        <div
          className={cn(
            "h-full rounded-2xl md:rounded-3xl p-4 md:p-6 border border-white/10",
            "bg-gradient-to-br shadow-lg hover:shadow-xl transition-shadow duration-300",
            gradient,
            "relative overflow-hidden"
          )}
        >
          {isDesktop && decorations.length > 0 && (
            <div className="absolute inset-0 overflow-hidden">
              {decorations.map((decoration, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/10 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1, 0] }}
                  transition={{
                    duration: decoration.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: decoration.delay,
                  }}
                />
              ))}
            </div>
          )}

          <div className="relative z-10">
            <div className="mb-3 md:mb-4 flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-white/5 border border-white/10">
                <Icon className="h-6 w-6 md:h-7 md:w-7 text-cyan-300" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                {title}
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base font-medium">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }
);

FeatureCard.displayName = "FeatureCard";

export default function Features() {
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [backgroundDecorations, setBackgroundDecorations] = React.useState<
    { left: string; top: string; duration: number }[]
  >([]);
  React.useEffect(() => {
    if (isDesktop) {
      const settings = [...Array(8)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 8 + Math.random() * 5,
      }));
      setBackgroundDecorations(settings);
    }
  }, [isDesktop]);

  return (
    <section ref={ref} className="relative py-20 md:py-32" id="features">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" />
      </div>

      <MaxWidthWrapper className="px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-lime-300 bg-clip-text text-transparent">
              Transform Your
            </span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-lime-300 to-cyan-300 bg-clip-text text-transparent">
              Digital Workflow
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl md:max-w-3xl mx-auto">
            Enterprise-grade security meets consumer-friendly design in our
            revolutionary cloud platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mt-12 md:mt-20 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
        />
      </MaxWidthWrapper>

      {isDesktop && backgroundDecorations.length > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {backgroundDecorations.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute text-lg opacity-10"
              style={{ left: pos.left, top: pos.top }}
              animate={{ y: [0, -40, 0] }}
              transition={{
                duration: pos.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {["✦", "❉"][i % 2]}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
