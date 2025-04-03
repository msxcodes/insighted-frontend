import { motion } from 'framer-motion'
import { Brain, Download, Maximize2 } from 'lucide-react'
import React from 'react'
import MarkdownRenderer from '../common/markdown-view';
import { PDFDownloadLink } from '@react-pdf/renderer';
import NotesPDF from '../common/create-pdf';

export default function SummaryBox({ summary }: { summary: string }) {
    console.log(summary);
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-2 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Document Preview</h2>
                <div className="flex gap-2">

                    <PDFDownloadLink document={<NotesPDF notes={summary} />} fileName="document_notes.pdf">
                        {({ loading }) =>
                            loading ? (
                                <button className="bg-gray-500 text-white py-2 px-4 rounded">Generating PDF...</button>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 cursor-pointer to-emerald-500 text-white font-medium flex items-center gap-2"
                                >
                                    <Download className="w-4 h-4" />
                                    Download PDF
                                </motion.button>
                            )
                        }
                    </PDFDownloadLink>




                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative px-4 py-2 rounded-lg bg-gray-800 text-gray-300 font-medium flex items-center gap-2 cursor-not-allowed opacity-70"
                    >
                        <Brain className="w-4 h-4" />
                        Generate MCQs
                        <span className="absolute -top-2 -right-2 bg-cyan-500 text-xs px-2 py-1 rounded-full text-white">Soon!</span>
                    </motion.button>
                </div>
            </div>

            {/* Document Preview Area */}
            <div className="aspect-[16/9] rounded-lg border border-gray-800 bg-gray-900/50 p-4 overflow-hidden relative">
                <div className="h-full overflow-y-auto space-y-4 text-gray-400">
                    {/* Preview content here */}
                    <h3 className="text-lg font-medium text-white">Lecture Summary</h3>
                    {/* {summary.map((item: any, index: number) => (
                        <div key={index}>
                            <h4 className="text-xl font-medium text-white">{item.heading}</h4>
                            <p className="text-sm text-gray-400">{item.subPoints.length > 0 && item.subPoints[0].title}</p>
                        </div>
                    ))} */}

                    <MarkdownRenderer markdown={summary} />

                </div>
                <button
                    className="absolute bottom-4 right-4 p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                // onClick={() => setIsPreviewOpen(true)}
                >
                    <Maximize2 className="w-4 h-4 text-gray-400" />
                </button>
            </div>
        </motion.div>
    )
}
