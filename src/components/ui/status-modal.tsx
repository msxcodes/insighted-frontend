import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Brain, FileText, MessageSquare, Notebook } from 'lucide-react';

interface StatusModalProps {
    isOpen: boolean;
    currentStep: number;
    onClose: () => void;
}

const steps = [
    {
        title: 'Processing Video',
        description: 'Analyzing video content and extracting audio data...',
        icon: Loader2,
    },
    {
        title: 'Generating Summary',
        description: 'Creating detailed notes using AI analysis...',
        icon: Brain,
    },
    {
        title: 'Creating Study Materials',
        description: 'Organizing content into structured learning materials...',
        icon: FileText,
    },
    {
        title: 'Finalizing Notes',
        description: 'Finalizing notes and preparing for download...',
        icon: Notebook,
    },
];

export default function StatusModal({ isOpen, currentStep, onClose }: StatusModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="bg-gradient-to-br from-gray-900/95 via-gray-900/98 to-gray-950/95 border border-gray-800/50 rounded-3xl p-8 w-full max-w-lg backdrop-blur-xl shadow-2xl ring-1 ring-gray-800/30"
                    >
                        <div className="space-y-8">
                            {/* Progress Bar */}
                            <div className="relative h-2.5 bg-gray-800/50 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                                    className="absolute h-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-emerald-500 shadow-lg shadow-cyan-500/20"
                                />
                            </div>

                            {/* Steps */}
                            <div className="space-y-6">
                                {steps.map((step, index) => (
                                    <div key={step.title} className="flex items-start gap-5">
                                        <div className="relative mt-1">
                                            {index < currentStep ? (
                                                <motion.div
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                >
                                                    <CheckCircle2 className="w-7 h-7 text-emerald-400 drop-shadow-lg shadow-emerald-500/50" />
                                                </motion.div>
                                            ) : index === currentStep ? (
                                                <motion.div
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                                    className="drop-shadow-lg shadow-cyan-500/50"
                                                >
                                                    <step.icon className="w-7 h-7 text-cyan-400" />
                                                </motion.div>
                                            ) : (
                                                <div className="w-7 h-7 rounded-full border-2 border-gray-700/50 backdrop-blur" />
                                            )}
                                            {index < steps.length - 1 && (
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: "2rem" }}
                                                    className={`absolute left-3.5 top-8 w-0.5 ${index < currentStep
                                                        ? 'bg-gradient-to-b from-emerald-400/50 to-emerald-400/10'
                                                        : 'bg-gray-700/30'
                                                        }`}
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <h3 className={`font-semibold text-lg ${index <= currentStep ? 'text-white' : 'text-gray-500'
                                                }`}>
                                                {step.title}
                                            </h3>
                                            <p className={`text-sm ${index <= currentStep ? 'text-gray-300' : 'text-gray-600'
                                                }`}>
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Estimated Time */}
                            <motion.div
                                className="text-center text-sm text-gray-400 bg-gray-900/50 py-3 px-4 rounded-2xl border border-gray-800/30"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Estimated time remaining: ~{Math.max(1, 4 - currentStep)} minutes
                                </div>
                            </motion.div>

                            {/* Cancel Button */}
                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: 'rgb(31, 41, 55)' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onClose}
                                className="w-full py-3 px-4 rounded-xl bg-gray-800/80 hover:bg-gray-700/80 text-gray-200 font-medium transition-all duration-200 border border-gray-700/30 hover:border-gray-600/30 shadow-lg"
                            >
                                Cancel Process
                            </motion.button>

                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Usage example:
/*
const [isModalOpen, setIsModalOpen] = useState(false);
const [currentStep, setCurrentStep] = useState(0);

<StatusModal 
  isOpen={isModalOpen} 
  currentStep={currentStep} 
  onClose={() => setIsModalOpen(false)} 
/>
*/
