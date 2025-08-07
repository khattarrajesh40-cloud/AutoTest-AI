import React, { useState } from 'react';
import { Copy, GitPullRequest, CheckCircle, AlertCircle, Code } from 'lucide-react';
import { TestCaseCode as TestCaseCodeType, GitHubConfig } from '../types';
import GitHubService from '../services/githubService';

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

  const handleCopyCode = () => {
    if (testCaseCode) {
      navigator.clipboard.writeText(testCaseCode.code);
      setCopied(true);
      onCopyCode();
      setTimeout(() => setCopied(false), 2000);
    }
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
    } catch (err) {
      setError('Failed to create pull request. Please check your GitHub token permissions.');
      console.error(err);
    } finally {
      setIsCreatingPR(false);
    }
  };

  if (!testCaseCode) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-gray-500">
          <Code className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No test case code generated yet.</p>
          <p className="text-sm mt-1">Select a test case summary to generate code.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Generated Test Case</h3>
            <p className="text-sm text-gray-500 mt-1">
              {testCaseCode.fileName} - {testCaseCode.framework}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyCode}
              className="flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy Code
                </>
              )}
            </button>
            
            {githubConfig && (
              <button
                onClick={handleCreatePR}
                disabled={isCreatingPR}
                className="flex items-center px-3 py-2 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreatingPR ? (
                  <>
                    <div className="loading-spinner mr-2"></div>
                    Creating PR...
                  </>
                ) : (
                  <>
                    <GitPullRequest className="w-4 h-4 mr-1" />
                    Create PR
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border-b border-red-200">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        </div>
      )}

      {prUrl && (
        <div className="p-4 bg-green-50 border-b border-green-200">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-sm text-green-700 mr-2">Pull request created successfully!</span>
            <a
              href={prUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-600 hover:underline"
            >
              View PR
            </a>
          </div>
        </div>
      )}

      {testCaseCode.dependencies && testCaseCode.dependencies.length > 0 && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Required Dependencies:</h4>
          <div className="flex flex-wrap gap-2">
            {testCaseCode.dependencies.map((dep, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
              >
                {dep}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="p-4">
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-gray-100">
            <code>{testCaseCode.code}</code>
          </pre>
        </div>
      </div>

      {showNextStepButton && onNextStep && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-center">
            <button
              onClick={onNextStep}
              className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              <Code className="w-5 h-5 mr-2" />
              Continue to Next Step
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCaseCode; 