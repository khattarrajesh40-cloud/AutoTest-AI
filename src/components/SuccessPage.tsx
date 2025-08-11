import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  ArrowPathIcon, 
  PlusIcon,
  DocumentDuplicateIcon,
  PlayIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import Card from './ui/Card';
import Button from './ui/Button';

interface SuccessPageProps {
  onStartOver: () => void;
  onGenerateMore: () => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ onStartOver, onGenerateMore }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const nextSteps = [
    {
      icon: DocumentDuplicateIcon,
      title: 'Copy Test Code',
      description: 'Copy the generated test code to your project',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: CogIcon,
      title: 'Install Dependencies',
      description: 'Install the required testing dependencies',
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      icon: PlayIcon,
      title: 'Run Tests',
      description: 'Execute your tests and verify functionality',
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 1, 
                y: -100, 
                x: Math.random() * window.innerWidth,
                rotate: 0 
              }}
              animate={{ 
                opacity: 0, 
                y: window.innerHeight + 100,
                rotate: 360 
              }}
              transition={{ 
                duration: 3, 
                delay: Math.random() * 2,
                ease: 'easeOut'
              }}
              className={`absolute w-3 h-3 ${
                Math.random() > 0.5 ? 'bg-primary-500' : 'bg-accent-500'
              } rounded-full`}
            />
          ))}
        </div>
      )}

      <Card className="text-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary-500/10 via-accent-500/10 to-primary-500/10" />
        
        <div className="relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full mb-8 shadow-2xl"
          >
            <CheckCircleIcon className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Test Case Generation Complete! 🎉
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Your test case has been successfully generated and is ready for use. 
            Follow the next steps to integrate it into your project.
          </motion.p>
          
          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              What's Next?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nextSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="relative"
                  >
                    <Card hover className="text-center h-full">
                      <div className={`inline-flex items-center justify-center w-16 h-16 ${step.bgColor} rounded-2xl mb-4`}>
                        <Icon className={`w-8 h-8 ${step.color}`} />
                      </div>
                      
                      <div className={`absolute -top-2 -right-2 w-8 h-8 ${step.bgColor} rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800`}>
                        <span className={`text-sm font-bold ${step.color}`}>
                          {index + 1}
                        </span>
                      </div>
                      
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {step.description}
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              onClick={onStartOver}
              variant="secondary"
              size="lg"
              icon={<ArrowPathIcon className="w-5 h-5" />}
            >
              Start Over
            </Button>
            
            <Button
              onClick={onGenerateMore}
              variant="primary"
              size="lg"
              className="shadow-lg"
              icon={<PlusIcon className="w-5 h-5" />}
            >
              Generate More Tests
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

export default SuccessPage;