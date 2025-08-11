import React, { useState } from 'react';
import { Zap, Github, Code, FileText, CheckCircle } from 'lucide-react';
import GitHubConnect from './components/GitHubConnect';
import FileExplorer from './components/FileExplorer';
import TestCaseSummaries from './components/TestCaseSummaries';
import TestCaseCode from './components/TestCaseCode';
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);

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

  const renderStepIndicator = () => {
    const steps = [
      { key: 'connect', label: 'Connect', icon: Github },
      { key: 'select', label: 'Select Files', icon: FileText },
      { key: 'generate', label: 'Generate Tests', icon: Zap },
      { key: 'code', label: 'View Code', icon: Code },
      { key: 'complete', label: 'Complete', icon: CheckCircle },
    ];

    return (
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.key;
            const isCompleted = steps.findIndex(s => s.key === currentStep) > index;
            
            return (
              <div key={step.key} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isActive 
                    ? 'border-primary-600 bg-primary-600 text-white' 
                    : isCompleted 
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-gray-300 bg-white text-gray-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Test Case Generator
          </h1>
          <p className="text-lg text-gray-600">
            AI-powered test case generation with GitHub integration
          </p>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {currentStep === 'connect' && (
            <GitHubConnect onRepositoryConnected={handleRepositoryConnected} />
          )}

          {currentStep === 'select' && repositoryInfo && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Repository: {repositoryInfo.owner}/{repositoryInfo.name}
                  </h2>
                  <p className="text-gray-600">{repositoryInfo.description}</p>
                </div>
                <FileExplorer
                  owner={repositoryInfo.owner}
                  repo={repositoryInfo.name}
                  token={githubToken}
                  onFilesSelected={handleFilesSelected}
                  onNextStep={handleFileSelectionNext}
                />
              </div>
              <div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Files</h3>
                  {selectedFiles.length === 0 ? (
                    <p className="text-gray-500">No files selected yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedFiles.map((file) => (
                        <div key={file.path} className="flex items-center p-2 bg-gray-50 rounded">
                          <FileText className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-700">{file.name}</span>
                        </div>
                      ))}
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