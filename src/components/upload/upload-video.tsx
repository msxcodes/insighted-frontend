import { motion } from 'framer-motion'
import { Upload } from 'lucide-react'
import React from 'react'

export default function UploadVideoSection() {
    return (
        <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                <div className="absolute inset-0 bg-gray-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-cyan-400 font-semibold text-lg mb-2"
                        >
                            Coming Soon!
                        </motion.div>
                        <p className="text-gray-400 text-sm">Direct video upload feature is under development</p>
                    </div>
                </div>
                <Upload className="w-8 h-8 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400">Drag and drop your video file or click to browse</p>
            </div>
            <button
                disabled
                className="w-full py-3 bg-gray-800 rounded-lg font-medium text-gray-500 cursor-not-allowed opacity-50"
            >
                Upload & Convert
            </button>
        </motion.div>
    )
}
