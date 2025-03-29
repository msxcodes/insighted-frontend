"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import Image from "next/image"
import MaxWidthWrapper from "../common/MaxWidthWrapper"
import { Sparkles, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
export function Hero() {
    const controls = useAnimation()
    const [isLoaded, setIsLoaded] = useState(true)

    const router = useRouter()

    useEffect(() => {
        if (isLoaded) {
            controls.start("visible")
        }
    }, [isLoaded, controls])

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            <MaxWidthWrapper className="relative z-10 md:mb-12 mt-0 md:mt-12">
                <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6">
                    <motion.div
                        initial="hidden"
                        animate={controls}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.5 }}
                        className="mb-6 md:mb-8"
                    >
                        <div className="inline-flex items-center bg-black/50 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-white/10">
                            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-300 mr-1.5 sm:mr-2" />
                            <span className="text-xs sm:text-sm font-medium text-gray-100">AI-Powered Learning Assistant</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        animate={controls}
                        variants={{
                            hidden: { opacity: 0, scale: 0.95 },
                            visible: { opacity: 1, scale: 1 },
                        }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">
                            <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-lime-300 bg-clip-text text-transparent">
                                Transform Video Lectures
                            </span>
                            <br className="hidden md:block" />
                            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl block mt-3 md:mt-4">
                                Into Smart{" "}
                                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                    Study Materials
                                </span>
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial="hidden"
                        animate={controls}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 },
                        }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl md:max-w-3xl mx-auto font-medium"
                    >
                        InsightsED transforms educational videos into <span className="text-cyan-300">comprehensive study notes</span>{" "}
                        and <span className="text-emerald-300">practice questions</span>. Perfect for students, educators, and
                        lifelong learners.
                    </motion.p>

                    <motion.div
                        initial="hidden"
                        animate={controls}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button onClick={() => router.push("/upload")} className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-medium flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
                            Get Started Free
                            <ArrowRight className="h-4 w-4" />
                        </button>
                        <button className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white font-medium hover:bg-white/20 transition-colors cursor-not-allowed opacity-70">
                            Watch Demo
                        </button>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        animate={controls}
                        variants={{
                            hidden: { opacity: 0, y: 40 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-8 md:mt-12 w-full max-w-5xl lg:max-w-7xl px-4 sm:px-6"
                    >
                        <div className="relative aspect-video bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-xl md:rounded-3xl border border-white/10 backdrop-blur-sm p-1.5 overflow-hidden">
                            <Image
                                src="/insightsed.png"
                                alt="InsightsED AI Learning Platform"
                                width={1920}
                                height={1080}
                                quality={75}
                                loading="eager"
                                className="object-contain object-top rounded-xl"
                                priority
                                onLoad={() => setIsLoaded(true)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={controls}
                    variants={{
                        hidden: { scaleX: 0 },
                        visible: { scaleX: 1 },
                    }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="mt-12 md:mt-20 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
                />
            </MaxWidthWrapper>
        </section>
    )
}

