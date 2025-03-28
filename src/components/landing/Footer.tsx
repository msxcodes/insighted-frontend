"use client";
import React from "react";
import Link from "next/link";
import { Github, Linkedin, Cloud } from "lucide-react";
import MaxWidthWrapper from "../common/MaxWidthWrapper";
import { ABOUT_URL, FEATURES_URL, GITHUB_URL, LINKEDIN_URL } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";


const socialLinks = [
  {
    name: "GitHub",
    href: GITHUB_URL,
    icon: Github,
    external: true,
  },
  {
    name: "LinkedIn",
    href: LINKEDIN_URL,
    icon: Linkedin,
    external: true,
  },

] as const;

const Footer = () => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="py-16 relative overflow-hidden">
      <MaxWidthWrapper>
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} Byto. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="p-2 rounded-full bg-white/5 hover:bg-cyan-500/20 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5 text-gray-300 group-hover:text-cyan-300 transition-colors" />
              </Link>
            ))}
          </div>
        </motion.div>

        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
