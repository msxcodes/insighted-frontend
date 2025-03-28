"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import MaxWidthWrapper from "../MaxWidthWrapper";

const faqs = [
  {
    category: "General",
    questions: [
      {
        question: "What is Byto.cloud?",
        answer:
          "Byto.cloud is a secure cloud storage platform designed to simplify file management. It offers instant uploads, easy sharing, and robust encryption, ensuring your data is always safe and accessible.",
      },
      {
        question: "How do I get started with Byto.cloud?",
        answer:
          "Getting started is simple! Sign up for a free account, upload your files, and explore all the features Byto.cloud offers. Early adopters can enjoy exclusive benefits and perks.",
      },
      {
        question: "Is there a free plan available?",
        answer:
          "Yes, we offer a free plan with basic features, perfect for personal use. For additional storage and advanced functionalities, you can explore our premium plans.",
      },
    ],
  },
  {
    category: "Security & Privacy",
    questions: [
      {
        question: "How secure is my data on Byto.cloud?",
        answer:
          "Your data's security is our top priority. We use end-to-end encryption to protect your files during transmission and storage. Only you control who can access your content.",
      },
      {
        question: "How can I delete my account or data?",
        answer:
          "You can delete your account or request data removal at any time by contacting our support team. We ensure your data is securely erased from our servers.",
      },
      {
        question: "What happens if I lose my account credentials?",
        answer:
          "If you lose access to your account, you can use our secure recovery options to reset your password. For further assistance, reach out to our support team.",
      },
    ],
  },
  {
    category: "Features & Usage",
    questions: [
      {
        question: "Can I share files with others?",
        answer:
          "Yes! Byto.cloud makes sharing files simple. You can generate secure, sharable links with options like password protection, expiration dates, and permissions to control access.",
      },
      {
        question: "What types of files can I upload?",
        answer:
          "Byto.cloud supports a wide variety of file types, including documents, images, videos, and more. If your file meets our size and usage policies, it can be uploaded and stored securely.",
      },
      {
        question: "Does Byto.cloud offer temporary storage?",
        answer:
          "Yes, we provide temporary storage options. You can upload files for short-term use and easily delete them when no longer needed.",
      },
      {
        question: "Can I access my files on multiple devices?",
        answer:
          "Byto.cloud is compatible with desktops, tablets, and smartphones, allowing you to sync and access your files anytime, anywhere.",
      },
    ],
  },
  {
    category: "Business & Support",
    questions: [
      {
        question: "Can businesses use Byto.cloud?",
        answer:
          "Yes, Byto.cloud is perfect for individuals and businesses. Our team plans include advanced collaboration tools, priority support, and expanded storage options.",
      },
      {
        question: "How do I contact Byto.cloud support?",
        answer:
          "You can reach our dedicated support team via email at mukulanand.dev@gmail.com. We're here to assist you with any questions or issues.",
      },
    ],
  },
];

const FAQItem: React.FC<{
  faq: { question: string; answer: string };
  isOpen: boolean;
  toggleOpen: () => void;
}> = ({ faq, isOpen, toggleOpen }) => {
  return (
    <motion.div
      layout
      className="mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        className="w-full text-left p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-teal-500/10 hover:from-blue-500/20 hover:to-teal-500/20 transition-all duration-300 flex justify-between items-center"
        onClick={toggleOpen}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-lg font-semibold text-white">{faq.question}</span>
        {isOpen ? (
          <ChevronUp className="text-blue-400" />
        ) : (
          <ChevronDown className="text-blue-400" />
        )}
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="p-4 text-gray-300 bg-black/50 rounded-b-lg">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFAQs = useMemo(() => {
    return faqs
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter((category) => category.questions.length > 0);
  }, [searchTerm]);

  return (
    <section className="relative overflow-hidden bg-black py-24" id="faq">
      <MaxWidthWrapper>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#1a365d,#000000)] opacity-40" />
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mt-6 max-w-3xl mx-auto">
              Get answers to common questions about Byto.cloud and discover how
              we&apos;re revolutionizing cloud storage.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-12 rounded-full bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <AnimatePresence>
            {filteredFAQs.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  {category.category}
                </h3>
                {category.questions.map((faq, index) => (
                  <FAQItem
                    key={`${category.category}-${index}`}
                    faq={faq}
                    isOpen={openIndex === `${category.category}-${index}`}
                    toggleOpen={() =>
                      setOpenIndex(
                        openIndex === `${category.category}-${index}`
                          ? null
                          : `${category.category}-${index}`
                      )
                    }
                  />
                ))}
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredFAQs.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-400 mt-8"
            >
              No matching FAQs found. Please try a different search term.
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-16"
          >
            <a
              href="#"
              className="inline-block bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold px-10 py-4 rounded-full text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Get Started with Byto
            </a>
          </motion.div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default FAQSection;
