"use client";
import axios from 'axios';
import { motion } from 'framer-motion'
import { Youtube } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
interface LinkVideoSectionProps {
    setIsModalOpen: (isOpen: boolean) => void;
    setCurrentStep: (step: number) => void;
}
export default function LinkVideoSection({ setIsModalOpen, setCurrentStep }: LinkVideoSectionProps) {

    const router = useRouter();
    const [videoUrl, setVideoUrl] = useState('');
    const [summary, setSummary] = useState('');
    console.log(summary);

    const handleSubmit = async () => {

        setIsModalOpen(true);
        setCurrentStep(3);

        try {
            const res = await axios.post('https://insighted-server-production.up.railway.app/api/v1/summarize', {
                youtubeUrl: videoUrl,
                isPremium: false,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setSummary(res.data.summary);

            router.push(`/results?summary=${summary}`);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="space-y-4">
            <div className="relative">
                <input
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    type="text"
                    placeholder="Paste your video URL here..."
                    className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none text-gray-200 pr-12"
                />
                <Youtube className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <motion.button
                onClick={handleSubmit}
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-lg font-medium text-white hover:opacity-90 transition-all duration-300"
            >
                Convert to Notes
            </motion.button>
        </div>
    )
}
