"use client";

import AboutSummarySection from "@/components/dashboard/about-data";
import SummaryBox from "@/components/dashboard/summary-box";
import { motion } from "framer-motion";
import { Download, FileText, Brain, ArrowRight, Lock, Maximize2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ResultsPage() {
    // const [activeTab, setActiveTab] = useState<'notes' | 'mcq'>('notes');
    // const [isPreviewOpen, setIsPreviewOpen] = useState(true);

    const [summary, setSummary] = useState<string>('');
    const params = useSearchParams();
    console.log(summary);

    useEffect(() => {
        const summary = params.get('summary');
        if (summary) {
            setSummary(summary);
        }
    }, [params]);



    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen p-4 sm:p-8"
        >
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-lime-400 bg-clip-text text-transparent">
                        Your Study Materials
                    </h1>
                    <p className="text-gray-400">AI-generated notes and study materials are ready!</p>
                </motion.div>

                {/* Main Content */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Left Panel - Document Preview */}
                    <SummaryBox />

                    {/* Right Panel - Actions */}
                    <AboutSummarySection />
                </div>
            </div>
        </motion.main>
    );
}
