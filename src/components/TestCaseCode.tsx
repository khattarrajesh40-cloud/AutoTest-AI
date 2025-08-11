import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardDocumentIcon, 
  ArrowDownTrayIcon,
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  CodeBracketIcon,
  LinkIcon
} from '@heroicons/react/24/outline';
import { TestCaseCode as TestCaseCodeType, GitHubConfig } from '../types';
import GitHubService from '../services/githubService';
import Card from './ui/Card';
import Button from './ui/Button';
import { showToast } from './ui/Toast';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';

interface TestCaseCodeProps {
  testCaseCode: TestCaseCodeType | null;
  githubConfig: GitHubConfig | null;
  onCopyCode: () => void;
  onNextStep?: () => void;
  showNextStepButton?: boolean;
}

const TestCaseCode: React.FC<TestCaseCodeProps> = ({ 
  testCaseCode, 
  githubConfig, 
  onCopyCode,
  onNextStep,
  showNextStepButton = false
}) => {
  const [isCreatingPR, setIsCreatingPR] = useState(false);
  const [prUrl, setPrUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (testCaseCode) {
      Prism.highlightAll();
    }
  }, [testCaseCode]);

  const handleCopyCode = () => {
    if (testCaseCode) {
      navigator.clipboard.writeText(testCaseCode.code);
      setCopied(true);
      onCopyCode();
      showToast.success('Code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadCode = () => {
    if (!testCaseCode) return;
    
    const blob = new Blob([testCaseCode.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = testCaseCode.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast.success('Test file downloaded successfully!');
  };

  const handleCreatePR = async () => {
    if (!testCaseCode || !githubConfig) return;

    setIsCreatingPR(true);
    setError(null);

    try {
      const githubService = new GitHubService(githubConfig.token);
      const prUrl = await githubService.createPullRequest(
        githubConfig,
        `Add test case: ${testCaseCode.fileName}`,
        `This PR adds automated test cases for ${testCaseCode.fileName}.\n\nGenerated using AI-powered test case generator.`,
        [{
          path: `tests/${testCaseCode.fileName}`,
          content: testCaseCode.code
        }]
      );
      
      setPrUrl(prUrl);
      showToast.success('Pull request created successfully!');
    } catch (err) {
      const errorMessage = 'Failed to create pull request. Please check your GitHub token permissions.';
      setError(errorMessage);
      showToast.error(errorMessage);
      console.error(err);
    } finally {
      setIsCreatingPR(false);
    }
  };

  if (!testCaseCode) {
    return (
      <Card className="text-center">
        <div className="text-gray-500 dark:text-gray-400">
          <CodeBracketIcon className="w-16 h-16 mx-auto mb-6 text-gray-300 dark:text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No Test Code Generated
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-1">
            No test case code generated yet.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Select a test case summary to generate code.
          </p>
        </div>
      </Card>
    );
  }

  const getLanguageFromFramework = (framework: string) => {
    if (framework.includes('Python') || framework.includes('pytest')) return 'python';
    if (framework.includes('JavaScript') || framework.includes('Jest') || framework.includes('React')) return 'javascript';
    return 'javascript';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card padding="none" className="overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 bg-gradient-to-br from-accent-500 to-primary-500 rounded-2xl flex items-center justify-center mr-4"
              >
                <CodeBracketIcon className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Generated Test Case
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {testCaseCode.fileName} • {testCaseCode.framework}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                onClick={handleCopyCode}
                variant="secondary"
                size="md"
                icon={copied ? <CheckCircleIcon className="w-4 h-4 text-accent-500" /> : <ClipboardDocumentIcon className="w-4 h-4" />}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              
              <Button
                onClick={handleDownloadCode}
                variant="secondary"
                size="md"
                icon={<ArrowDownTrayIcon className="w-4 h-4" />}
              >
                Download
              </Button>
              
              {githubConfig && (
                <Button
                  onClick={handleCreatePR}
                  loading={isCreatingPR}
                  variant="primary"
                  size="md"
                  icon={!isCreatingPR ? <LinkIcon className="w-4 h-4" /> : undefined}
                >
                  {isCreatingPR ? 'Creating PR...' : 'Create PR'}
                </Button>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800"
            >
              <div className="flex items-center">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                <span className="text-sm text-red-700 dark:text-red-400">{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {prUrl && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-accent-50 dark:bg-accent-900/20 border-b border-accent-200 dark:border-accent-800"
            >
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-accent-500 mr-3 flex-shrink-0" />
                <span className="text-sm text-accent-700 dark:text-accent-400 mr-3">
                  Pull request created successfully!
                </span>
                <a
                  href={prUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent-600 dark:text-accent-400 hover:underline font-medium"
                >
                  View PR →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {testCaseCode.dependencies && testCaseCode.dependencies.length > 0 && (
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
              Required Dependencies:
            </h4>
            <div className="flex flex-wrap gap-2">
              {testCaseCode.dependencies.map((dep, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-3 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-sm font-medium rounded-lg border border-primary-200 dark:border-primary-700"
                >
                  {dep}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900 dark:bg-gray-950 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-4 py-3 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-xs text-gray-400 font-mono">
                  {testCaseCode.fileName}
                </span>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="text-sm">
                  <code 
                    className={`language-${getLanguageFromFramework(testCaseCode.framework)}`}
                    dangerouslySetInnerHTML={{
                      __html: Prism.highlight(
                        testCaseCode.code,
                        Prism.languages[getLanguageFromFramework(testCaseCode.framework)] || Prism.languages.javascript,
                        getLanguageFromFramework(testCaseCode.framework)
                      )
                    }}
                  />
                </pre>
              </div>
            </motion.div>
          </div>
        </div>

        {showNextStepButton && onNextStep && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
            <div className="flex justify-center">
              <Button
                onClick={onNextStep}
                variant="success"
                size="lg"
                className="shadow-lg"
                icon={<CheckCircleIcon className="w-5 h-5" />}
              >
                Continue to Next Step
              </Button>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default TestCaseCode; 