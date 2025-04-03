"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowRight, Mail, Lock, Sparkles, ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react"
import MaxWidthWrapper from "../common/MaxWidthWrapper"
import axios from "axios"
import { toast } from "sonner"

export default function LoginPage() {
    const controls = useAnimation()
    const [isLoaded, setIsLoaded] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isLoaded) {
            controls.start("visible")
        }
    }, [isLoaded, controls])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        // Basic validation
        if (!email || !password) {
            toast.error("Please fill in all fields")
            return
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address")
            return
        }

        try {
            setIsLoading(true)
            const response = await axios.post("http://localhost:5001/api/v1/user/login", {
                email,
                password
            })

            if (response.status === 200) {
                // Store the token in localStorage
                localStorage.setItem("token", response.data.token)

                // Clear form
                if (emailRef.current) emailRef.current.value = ""
                if (passwordRef.current) passwordRef.current.value = ""

                toast.success("Login successful!")
                router.push("/upload") // Redirect to dashboard or home page
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    toast.error("Invalid email or password")
                } else if (error.response?.status === 404) {
                    toast.error("User not found")
                } else if (error.response?.data?.message) {
                    toast.error(error.response.data.message)
                } else {
                    toast.error("An error occurred during login")
                }
            } else {
                toast.error("An unexpected error occurred")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
            <MaxWidthWrapper className="relative z-10">
                <motion.div
                    initial="hidden"
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-lg mx-auto p-10 bg-black/50 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.back()}
                        className="absolute top-6 left-6 p-2.5 rounded-full bg-black/30 border border-white/10 hover:bg-black/50 transition-all"
                    >
                        <ArrowLeft className="h-6 w-6 text-gray-400" />
                    </motion.button>

                    <div className="text-center mb-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="inline-flex items-center bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 mb-6"
                        >
                            <Sparkles className="h-5 w-5 text-cyan-300 mr-2" />
                            <span className="text-base font-medium text-gray-100">Welcome Back to InsightED</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-4xl font-bold mb-4"
                        >
                            <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-lime-300 bg-clip-text text-transparent">
                                Sign In
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-lg text-gray-400"
                        >
                            Continue your learning journey
                        </motion.p>
                    </div>

                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="space-y-8"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-6">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="relative group"
                            >
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-6 w-6 text-gray-400 group-hover:text-cyan-300 transition-colors" />
                                </div>
                                <input
                                    ref={emailRef}
                                    type="email"
                                    placeholder="Email address"
                                    className="w-full pl-12 pr-6 py-4 text-lg bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                                />
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="relative group"
                            >
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-6 w-6 text-gray-400 group-hover:text-cyan-300 transition-colors" />
                                </div>
                                <input
                                    ref={passwordRef}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full pl-12 pr-14 py-4 text-lg bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-6 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-6 w-6 text-gray-400 hover:text-gray-300 transition-colors" />
                                    ) : (
                                        <Eye className="h-6 w-6 text-gray-400 hover:text-gray-300 transition-colors" />
                                    )}
                                </button>
                            </motion.div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onHoverStart={() => setIsHovered(true)}
                            onHoverEnd={() => setIsHovered(false)}
                            disabled={isLoading}
                            className="w-full px-8 py-4 text-lg rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-medium flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-cyan-500/20 transition-all relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <motion.span
                                initial={{ x: 0 }}
                                animate={{ x: isHovered ? 4 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-3"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-6 w-6 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="h-5 w-5" />
                                    </>
                                )}
                            </motion.span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-emerald-600 opacity-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isHovered ? 0.2 : 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.button>

                        <div className="flex items-center justify-between text-base">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-cyan-300 hover:text-cyan-400 transition-colors"
                            >
                                Forgot Password?
                            </motion.button>
                            <motion.p className="text-gray-400">
                                Don't have an account?{" "}
                                <button
                                    onClick={() => router.push("/register")}
                                    className="text-cyan-300 hover:text-cyan-400 transition-colors"
                                >
                                    Sign up
                                </button>
                            </motion.p>
                        </div>
                    </motion.form>
                </motion.div>
            </MaxWidthWrapper>
        </section>
    )
}
