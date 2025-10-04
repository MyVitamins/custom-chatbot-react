import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SuggestedQuestionsProps {
  onQuestionClick: (question: string) => void;
  questions?: string[];
  variant?: 'onboarding' | 'dynamic';
}

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ 
  onQuestionClick, 
  questions = [
    "What supplements can help with sleep?",
    "What can I take for stress?",
    "How do I support my immune system?",
    "What vitamins should I take daily?",
    "Are there supplements for energy and focus?"
  ],
  variant = 'onboarding'
}) => {
  // Animation variants for onboarding
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  // Dynamic variant: pill-style buttons under bot messages
  if (variant === 'dynamic') {
    return (
      <motion.div 
        className="px-4 py-3 mt-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut", staggerChildren: 0.1 }}
      >
        <motion.div 
          className="flex flex-wrap gap-2"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {questions.map((question, index) => (
            <motion.button
              key={index}
              onClick={() => onQuestionClick(question)}
              className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out cursor-pointer"
              variants={buttonVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`Ask: ${question}`}
            >
              {question}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    );
  }
  
  // Onboarding variant: full-width buttons in a section
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ease-in-out"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h3 
            className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4 transition-colors duration-300 ease-in-out"
            variants={buttonVariants}
          >
            Suggested Questions
          </motion.h3>
          <motion.div 
            className="flex flex-col gap-y-2 max-w-lg mx-auto"
            variants={containerVariants}
          >
            {questions.map((question, index) => (
              <motion.button
                key={index}
                onClick={() => onQuestionClick(question)}
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-medium text-sm sm:text-base rounded-full shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 ease-in-out text-left"
                variants={buttonVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`Ask: ${question}`}
              >
                {question}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SuggestedQuestions;
