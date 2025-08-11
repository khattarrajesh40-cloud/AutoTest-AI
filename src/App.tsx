import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BoltIcon, 
  CodeBracketIcon, 
  DocumentTextIcon, 
  CheckCircleIcon 
} from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/24/solid';
import GitHubConnect from './components/GitHubConnect';
import FileExplorer from './components/FileExplorer';
import TestCaseSummaries from './components/TestCaseSummaries';
import TestCaseCode from './components/TestCaseCode';
import SuccessPage from './components/SuccessPage';
import StepIndicator from './components/ui/StepIndicator';
import DarkModeToggle from './components/ui/DarkModeToggle';
import { ToastProvider } from './components/ui/Toast';
import { RepositoryInfo, GitHubFile, TestCaseSummary, TestCaseCode as TestCaseCodeType, GitHubConfig } from './types';
import AIService from './services/aiService';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'connect' | 'select' | 'generate' | 'code' | 'complete'>('connect');
  const [repositoryInfo, setRepositoryInfo] = useState<RepositoryInfo | null>(null);
  const [githubToken, setGithubToken] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<GitHubFile[]>([]);
  const [testCaseSummaries, setTestCaseSummaries] = useState<TestCaseSummary[]>([]);
  const [testCaseCode, setTestCaseCode] = useState<TestCaseCodeType | null>(null);
  const [isGeneratingSummaries, setIsGeneratingSummaries] = useState(false);
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);

  const steps = [
    { key: 'connect', label: 'Connect', icon: Bars3Icon },
    { key: 'select', label: 'Select Files', icon: DocumentTextIcon },
    { key: 'generate', label: 'Generate Tests', icon: BoltIcon },
    { key: 'code', label: 'View Code', icon: CodeBracketIcon },
    { key: 'complete', label: 'Complete', icon: CheckCircleIcon },
  ];

  const handleRepositoryConnected = (repoInfo: RepositoryInfo, token: string) => {
    setRepositoryInfo(repoInfo);
    setGithubToken(token);
    setCurrentStep('select');
  };

  const handleFilesSelected = (files: GitHubFile[]) => {
    console.log('App received files:', files.map(f => f.name));
    setSelectedFiles(files);
  };

  const handleFileSelectionNext = async () => {
    if (selectedFiles.length > 0) {
      setIsGeneratingSummaries(true);
      try {
        const aiService = new AIService();
        const summaries = await aiService.generateTestCaseSummaries(selectedFiles);
        console.log('Generated summaries:', summaries.length);
        setTestCaseSummaries(summaries);
        setCurrentStep('generate');
      } catch (error) {
        console.error('Error generating test case summaries:', error);
      } finally {
        setIsGeneratingSummaries(false);
      }
    }
  };

  const handleGenerateCode = async (summary: TestCaseSummary) => {
    setIsGeneratingCode(true);
    try {
      const aiService = new AIService();
      const code = await aiService.generateTestCaseCode(summary, selectedFiles);
      setTestCaseCode(code);
      setCurrentStep('code');
    } catch (error) {
      console.error('Error generating test case code:', error);
    } finally {
      setIsGeneratingCode(false);
    }
  };

  const handleCopyCode = () => {
    // This could be used for analytics or other purposes
    console.log('Code copied to clipboard');
  };

  const handleNextStep = () => {
    setCurrentStep('complete');
  };

  const getGitHubConfig = (): GitHubConfig | null => {
    if (!repositoryInfo || !githubToken) return null;
    
    return {
      owner: repositoryInfo.owner,
      repo: repositoryInfo.name,
      branch: repositoryInfo.defaultBranch,
      token: githubToken,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <ToastProvider />
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center">
                <BoltIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Test Case Generator
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  AI-powered testing automation
                </p>
              </div>
            </motion.div>
            
            <DarkModeToggle />
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        {/* Step Indicator */}
        <StepIndicator steps={steps} currentStep={currentStep} />

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {currentStep === 'connect' && (
              <motion.div
                key="connect"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <GitHubConnect onRepositoryConnected={handleRepositoryConnected} />
              </motion.div>
            )}

            {currentStep === 'select' && repositoryInfo && (
              <motion.div
                key="select"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mr-4">
                          <Bars3Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            {repositoryInfo.owner}/{repositoryInfo.name}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400">{repositoryInfo.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <FileExplorer
                    owner={repositoryInfo.owner}
                    repo={repositoryInfo.name}
                    token={githubToken}
                    onFilesSelected={handleFilesSelected}
                    onNextStep={handleFileSelectionNext}
                  />
                </div>
                
                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-24"
                  >
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Selected Files</h3>
                    {selectedFiles.length === 0 ? (
                      <div className="text-center py-8">
                        <DocumentTextIcon className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">No files selected yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedFiles.map((file, index) => (
                          <motion.div
                            key={file.path}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600"
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 'generate' && (
            <TestCaseSummaries
              summaries={testCaseSummaries}
              onGenerateCode={handleGenerateCode}
              isLoading={isGeneratingSummaries}
            />
          )}

          {currentStep === 'code' && (
            <TestCaseCode
              testCaseCode={testCaseCode}
              githubConfig={getGitHubConfig()}
              onCopyCode={handleCopyCode}
              onNextStep={handleNextStep}
              showNextStepButton={true}
            />
          )}

          {currentStep === 'complete' && (
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-center">
                <CheckCircle className="w-16 h-16 mx-auto mb-6 text-green-500" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Test Case Generation Complete!
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Your test case has been successfully generated and is ready for use.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-blue-600 font-semibold">1</span>
                      </div>
                      <p className="text-gray-700">Copy the generated test code to your project</p>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-blue-600 font-semibold">2</span>
                      </div>
                      <p className="text-gray-700">Install the required dependencies</p>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-blue-600 font-semibold">3</span>
                      </div>
                      <p className="text-gray-700">Run your tests and verify functionality</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setCurrentStep('connect')}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                  >
                    Start Over
                  </button>
                  <button
                    onClick={() => setCurrentStep('generate')}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                  >
                    Generate More Tests
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        {currentStep !== 'connect' && currentStep !== 'complete' && (
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => setCurrentStep('connect')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              ← Back to Connect
            </button>
            {currentStep === 'code' && (
              <button
                onClick={() => setCurrentStep('generate')}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                ← Back to Test Cases
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App; 