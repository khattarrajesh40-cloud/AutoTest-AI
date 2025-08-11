import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';
import { clsx } from 'clsx';

interface Step {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: string;
  className?: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep, className }) => {
  const currentIndex = steps.findIndex(step => step.key === currentStep);

  return (
    <div className={clsx('flex items-center justify-center mb-12', className)}>
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.key;
          const isCompleted = currentIndex > index;
          const isUpcoming = currentIndex < index;

          return (
            <div key={step.key} className="flex items-center">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    backgroundColor: isCompleted 
                      ? '#22c55e' 
                      : isActive 
                      ? '#2563eb' 
                      : '#e5e7eb'
                  }}
                  transition={{ duration: 0.3 }}
                  className={clsx(
                    'flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300',
                    {
                      'border-accent-500 bg-accent-500 text-white shadow-lg': isCompleted,
                      'border-primary-600 bg-primary-600 text-white shadow-lg animate-pulse-soft': isActive,
                      'border-gray-300 bg-gray-200 text-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500': isUpcoming,
                    }
                  )}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <CheckIcon className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                </motion.div>
                
                <motion.span
                  initial={false}
                  animate={{
                    color: isCompleted 
                      ? '#22c55e' 
                      : isActive 
                      ? '#2563eb' 
                      : '#9ca3af'
                  }}
                  className="mt-2 text-sm font-medium text-center"
                >
                  {step.label}
                </motion.span>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex items-center mx-4">
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: currentIndex > index ? '#22c55e' : '#e5e7eb'
                    }}
                    className="w-16 h-1 rounded-full transition-all duration-500"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;