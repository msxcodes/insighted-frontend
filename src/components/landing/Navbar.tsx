"use client";

import React, { useState, useCallback, useTransition, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Rocket, LayoutDashboard, LogOut } from "lucide-react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NavbarProps, NavItem } from "@/types/nav";
import MaxWidthWrapper from "../common/MaxWidthWrapper";

const navItems: NavItem[] = [
  { name: "Home", href: "/#features" },
  { name: "AboutUs", href: "/#about" },
  { name: "Contact", href: "/contact" },
];

const navVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const mobileNavVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const controls = useAnimation();
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      setScrolled(window.scrollY > 50);
    });
  }, []);

  useEffect(() => {
    controls.start("visible");
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls, handleScroll]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const NavLink = useCallback(
    ({ item }: { item: NavItem }) => (
      <Link
        href={item.href}
        className={cn(
          "relative px-3 py-2 text-sm font-medium group transition-all duration-300",
          pathname === item.href
            ? "text-cyan-300"
            : "text-gray-300 hover:text-white"
        )}
      >
        {item.name}
        <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-emerald-400 group-hover:w-full transition-all duration-300" />
      </Link>
    ),
    [pathname]
  );

  const MobileNavLink = useCallback(
    ({ item }: { item: NavItem }) => (
      <Link
        href={item.href}
        className={cn(
          "block px-4 py-3 rounded-lg text-base font-medium transition-all",
          pathname === item.href
            ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-300"
            : "text-gray-300 hover:bg-white/5"
        )}
        onClick={() => setMobileMenuOpen(false)}
      >
        {item.name}
      </Link>
    ),
    [pathname]
  );

  const AuthButton = () => {
    return (
      <Link href="/sign-in">
        <Button
          variant="ghost"
          className="group relative bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 backdrop-blur-lg border border-white/10 hover:border-cyan-400/30 hover:from-cyan-500/30 hover:to-emerald-500/30 transition-all duration-300"
          aria-label="Get started"
        >
          <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
            Get Started
          </span>
          <Rocket className="ml-2 h-4 w-4 text-emerald-300 group-hover:animate-pulse" />
        </Button>
      </Link>
    );


  }

  return (
    <motion.nav
      style={{ clipPath: "ellipse(150% 100% at 50% 100%)" }}
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={cn(
        "sticky top-0 z-50 bg-black/80 backdrop-blur-xl transition-all duration-300",
        scrolled ? "border-b border-white/10" : "border-transparent",
        className
      )}
    >
      <MaxWidthWrapper>
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center group">
              <motion.div
                whileHover={{ rotate: [0, -15, 15, 0] }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />
              </motion.div>
              <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-lime-300 bg-clip-text text-transparent font-bold text-2xl">
                InsightsED
              </span>
            </Link>
          </motion.div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <NavLink item={item} />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="hidden md:block"
          >
            <AuthButton />
          </motion.div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-cyan-300" />
              ) : (
                <Menu className="h-6 w-6 text-cyan-300" />
              )}
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileNavVariants}
            className="md:hidden bg-black/80 backdrop-blur-2xl"
          >
            <div className="px-4 pt-2 pb-8 space-y-3">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MobileNavLink item={item} />
                </motion.div>
              ))}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="px-4 pt-4"
              >
                <AuthButton />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
