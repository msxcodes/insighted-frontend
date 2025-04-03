"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Share2, ThumbsUp, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function YouTubeModal() {
    const [open, setOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (open) {
            const interval = setInterval(() => {
                if (iframeRef.current) {
                    const player = iframeRef.current.contentWindow?.postMessage(
                        '{"event":"command","func":"getCurrentTime","args":""}',
                        '*'
                    );
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [open]);

    const handleTimeUpdate = (event: MessageEvent) => {
        if (event.data && typeof event.data === 'string') {
            try {
                const data = JSON.parse(event.data);
                if (data.info && data.info.currentTime) {
                    setCurrentTime(data.info.currentTime);
                    setProgress((data.info.currentTime / duration) * 100);
                }
                if (data.info && data.info.duration) {
                    setDuration(data.info.duration);
                }
            } catch (e) {
                // Ignore non-JSON messages
            }
        }
    };

    useEffect(() => {
        window.addEventListener('message', handleTimeUpdate);
        return () => window.removeEventListener('message', handleTimeUpdate);
    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleShare = () => {
        const videoUrl = "https://www.youtube.com/embed/bsjW19-eV70?si=I24lJuXsFA1wgCnn&rel=0&modestbranding=1";
        if (navigator.clipboard != undefined) {
            navigator.clipboard.writeText(videoUrl);
            toast.success("Link copied to clipboard!");
        } else {
            toast.error("Clipboard is not supported on this browser.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(true)}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 backdrop-blur-sm border border-white/10 text-white font-medium hover:from-cyan-500/30 hover:to-emerald-500/30 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
                Watch Demo
                <motion.span
                    initial={{ x: 0 }}
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="inline-block"
                >
                    <Play className="w-4 h-4" />
                </motion.span>
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
                        onClick={() => setOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-6xl aspect-video bg-gray-900/95 rounded-xl border border-white/10 overflow-hidden backdrop-blur-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute top-0 left-0 right-0 p-6 border-b border-white/10 z-10 bg-gray-900/95 backdrop-blur-xl">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                                        Product Demo Video
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={handleShare}
                                            className="p-2 rounded-full hover:bg-gray-800 transition-colors cursor-pointer"

                                        >

                                            <Share2 className="w-5 h-5 text-gray-400" />
                                        </button>
                                        <button
                                            onClick={() => setOpen(false)}
                                            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                                        >
                                            <X className="w-5 h-5 text-gray-400" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="relative w-full h-full p-4">
                                <iframe
                                    ref={iframeRef}
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/bsjW19-eV70?si=I24lJuXsFA1wgCnn&rel=0&modestbranding=1"
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full rounded-lg"
                                />
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}