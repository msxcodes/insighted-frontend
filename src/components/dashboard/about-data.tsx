import React from 'react'
import { motion } from 'framer-motion'
import { FileText, ArrowRight, Brain, Lock } from 'lucide-react'

export default function AboutSummarySection() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
        >
            {/* Notes Section */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-medium text-white">Smart Notes</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                    Comprehensive notes generated from your video lecture, including key points and summaries.
                </p>
                <ul className="space-y-2 text-sm text-gray-400 mb-4">
                    <li className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-emerald-400" />
                        Key concepts highlighted
                    </li>
                    <li className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-emerald-400" />
                        Important definitions
                    </li>
                    <li className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-emerald-400" />
                        Chapter summaries
                    </li>
                </ul>
            </div>

            {/* MCQ Section (Coming Soon) */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl overflow-hidden"
            >
                <div className="flex items-center gap-3 mb-4">
                    <Brain className="w-6 h-6 text-emerald-400" />
                    <h3 className="text-lg font-medium text-white">Practice MCQs</h3>
                </div>

                {/* Coming Soon Overlay */}
                <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                        <Lock className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                        <p className="text-cyan-400 font-medium">Coming Soon!</p>
                        <p className="text-sm text-gray-400 mt-1">
                            AI-generated practice questions
                        </p>
                    </div>
                </div>

                <p className="text-gray-400 text-sm mb-4">
                    Test your understanding with automatically generated multiple-choice questions.
                </p>
                <motion.button
                    disabled
                    className="w-full py-2 px-4 rounded-lg bg-gray-800 text-gray-500 font-medium cursor-not-allowed"
                >
                    Generate MCQs
                </motion.button>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-cyan-400">5</div>
                    <div className="text-sm text-gray-400">Pages Generated</div>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-emerald-400">98%</div>
                    <div className="text-sm text-gray-400">Accuracy</div>
                </div>
            </div>
        </motion.div>
    )
}
