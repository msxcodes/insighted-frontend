"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowRight, Mail, Lock, User, Sparkles, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react"
import MaxWidthWrapper from "../common/MaxWidthWrapper"
import { toast } from "sonner"
import axios from "axios"

export default function RegisterPage() {
    const controls = useAnimation()
    const [isLoaded, setIsLoaded] = useState(true)
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Basic validation
        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
            toast.error("Please fill in all fields")
            return
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        try {
            setIsLoading(true)
            const response = await axios.post("http://localhost:5001/api/v1/user/register", {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.status === 201) {
                toast.success("Account created successfully!")
                // Clear form
                setFormData({
                    fullName: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
                router.push("/login")
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message || "Something went wrong")
            } else {
                toast.error("An error occurred. Please try again.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (isLoaded) {
            controls.start("visible")
        }
    }, [isLoaded, controls])

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
                        onClick={() => router.push("/")}
                        className="cursor-pointer absolute top-6 left-6 p-2.5 rounded-full bg-black/30 border border-white/10 hover:bg-black/50 transition-all"
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
                            <span className="text-base font-medium text-gray-100">Join the Learning Revolution</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-4xl font-bold mb-4"
                        >
                            <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-lime-300 bg-clip-text text-transparent">
                                Create Your Account
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-lg text-gray-400"
                        >
                            Start your journey with InsightED today
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
                                    <User className="h-6 w-6 text-gray-400 group-hover:text-cyan-300 transition-colors" />
                                </div>
                                <input
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full pl-12 pr-6 py-4 text-lg bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                                />
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="relative group"
                            >
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-6 w-6 text-gray-400 group-hover:text-cyan-300 transition-colors" />
                                </div>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
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
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="relative group"
                            >
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-6 w-6 text-gray-400 group-hover:text-cyan-300 transition-colors" />
                                </div>
                                <input
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    className="w-full pl-12 pr-14 py-4 text-lg bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-6 flex items-center"
                                >
                                    {showConfirmPassword ? (
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
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Create Account
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

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="text-center text-base text-gray-400"
                        >
                            Already have an account?{" "}
                            <button
                                onClick={() => router.push("/login")}
                                className="text-cyan-300 hover:text-cyan-400 transition-colors"
                            >
                                Sign in
                            </button>
                        </motion.p>
                    </motion.form>
                </motion.div>
            </MaxWidthWrapper>
        </section>
    )
}
