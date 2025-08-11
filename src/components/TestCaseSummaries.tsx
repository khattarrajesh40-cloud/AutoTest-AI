import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ClockIcon, 
  CodeBracketIcon, 
  DocumentTextIcon, 
  BoltIcon, 
  CheckCircleIcon,
  BeakerIcon,
  CpuChipIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { TestCaseSummary } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import LoadingSpinner from './ui/LoadingSpinner';

interface TestCaseSummariesProps {
  summaries: TestCaseSummary[];
  onGenerateCode: (summary: TestCaseSummary) => void;
  isLoading: boolean;
}

const TestCaseSummaries: React.FC<TestCaseSummariesProps> = ({ 
  summaries, 
  onGenerateCode, 
  isLoading 
}) => {
  const [selectedSummary, setSelectedSummary] = useState<string | null>(null);

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low':
        return 'bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getFrameworkIcon = (framework: string) => {
    switch (framework) {
      case 'Jest':
        return <BeakerIcon className="w-5 h-5 text-green-500" />;
      case 'Supertest':
        return <GlobeAltIcon className="w-5 h-5 text-blue-500" />;
      case 'React Testing Library':
        return <BoltIcon className="w-5 h-5 text-cyan-500" />;
      case 'Selenium WebDriver':
        return <CpuChipIcon className="w-5 h-5 text-purple-500" />;
      default:
        return <CodeBracketIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getFrameworkGradient = (framework: string) => {
    switch (framework) {
      case 'Jest':
        return 'from-green-500/10 to-green-600/10';
      case 'Supertest':
        return 'from-blue-500/10 to-blue-600/10';
      case 'React Testing Library':
        return 'from-cyan-500/10 to-cyan-600/10';
      case 'Selenium WebDriver':
        return 'from-purple-500/10 to-purple-600/10';
      default:
        return 'from-gray-500/10 to-gray-600/10';
    }
  };

  if (isLoading) {
    return (
      <Card className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Generating Test Cases
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          AI is analyzing your files and creating test suggestions...
        </p>
        <div className="mt-6 flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-2 h-2 bg-primary-500 rounded-full"
            />
          ))}
        </div>
      </Card>
    );
  }

  if (summaries.length === 0) {
    return (
      <Card className="text-center">
        <div className="text-gray-500 dark:text-gray-400">
          <DocumentTextIcon className="w-16 h-16 mx-auto mb-6 text-gray-300 dark:text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No Test Cases Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-1">
            No test cases found for the selected files.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Try selecting different files or check your repository structure.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Suggested Test Cases
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              AI-generated test case suggestions for your selected files
            </p>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center"
          >
            <BoltIcon className="w-6 h-6 text-white" />
          </motion.div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid gap-6">
          {summaries.map((summary, index) => (
            <motion.div
              key={summary.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                hover 
                className={`relative overflow-hidden border-l-4 ${
                  summary.complexity === 'Low' ? 'border-l-accent-500' :
                  summary.complexity === 'Medium' ? 'border-l-yellow-500' :
                  'border-l-red-500'
                }`}
              >
                {/* Background gradient */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getFrameworkGradient(summary.framework)} rounded-full -translate-y-16 translate-x-16`} />
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mr-4">
                          {summary.title}
                        </h4>
                        <motion.span 
                          whileHover={{ scale: 1.05 }}
                          className={`px-3 py-1 text-xs font-bold rounded-full ${getComplexityColor(summary.complexity)}`}
                        >
                          {summary.complexity}
                        </motion.span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        {summary.description}
                      </p>
                      
                      <div className="flex items-center flex-wrap gap-4 text-sm">
                        <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                          {getFrameworkIcon(summary.framework)}
                          <span className="ml-2 font-medium text-gray-700 dark:text-gray-300">
                            {summary.framework}
                          </span>
                        </div>
                        
                        <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                          <ClockIcon className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {summary.estimatedTime}
                          </span>
                        </div>
                        
                        <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                          <DocumentTextIcon className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {summary.files.length} file{summary.files.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                      
                      {summary.files.length > 0 && (
                        <div className="mt-4">
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                            Files Covered:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {summary.files.map((file, fileIndex) => (
                              <motion.span
                                key={fileIndex}
                                whileHover={{ scale: 1.05 }}
                                className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-xs font-medium rounded-lg border border-primary-200 dark:border-primary-700"
                              >
                                {file}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-6 flex-shrink-0">
                      <Button
                        onClick={() => {
                          setSelectedSummary(summary.id);
                          onGenerateCode(summary);
                        }}
                        loading={selectedSummary === summary.id}
                        variant="primary"
                        size="lg"
                        className="shadow-lg"
                        icon={selectedSummary === summary.id ? undefined : <CodeBracketIcon className="w-5 h-5" />}
                      >
                        {selectedSummary === summary.id ? 'Generating...' : 'Generate Code'}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TestCaseSummaries;
          AI-generated test case suggestions for your selected files
        </p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {summaries.map((summary) => (
          <div key={summary.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h4 className="text-lg font-medium text-gray-900 mr-3">
                    {summary.title}
                  </h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getComplexityColor(summary.complexity)}`}>
                    {summary.complexity}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-3">{summary.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    {getFrameworkIcon(summary.framework)}
                    <span className="ml-1">{summary.framework}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{summary.estimatedTime}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    <span>{summary.files.length} file{summary.files.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
                
                {summary.files.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-1">Files:</p>
                    <div className="flex flex-wrap gap-1">
                      {summary.files.map((file, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {file}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="ml-4">
                <button
                  onClick={() => {
                    setSelectedSummary(summary.id);
                    onGenerateCode(summary);
                  }}
                  disabled={selectedSummary === summary.id}
                  className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedSummary === summary.id ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Code className="w-4 h-4 mr-2" />
                      Generate Code
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCaseSummaries; 