"use client";

import AboutSummarySection from "@/components/dashboard/about-data";
import SummaryBox from "@/components/dashboard/summary-box";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { convertToMarkdown } from "@/hooks/formate-notes";
import { Spinner } from "@/components/common/spinner";

function ResultsContent() {
  const [notes, setNotes] = useState<string>("");
  const params = useSearchParams();

  useEffect(() => {
    const summaryParams = params.get("summary");
    if (summaryParams) {
      const decodedSummary = decodeURIComponent(summaryParams);
      setNotes(convertToMarkdown(decodedSummary));
    }
  }, [params]);

  console.log(notes);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 sm:p-8"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <p className="text-gray-400">
            AI-generated notes and study materials are ready!
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Panel - Document Preview */}
          <SummaryBox summary={notes} />

          {/* Right Panel - Actions */}
          <AboutSummarySection />
        </div>
      </div>
    </motion.main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<Spinner text="Loading..." />}>
      <ResultsContent />
    </Suspense>
  );
}
