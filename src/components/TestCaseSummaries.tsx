import React, { useState } from 'react';
import { Clock, Code, FileText, Zap, CheckCircle } from 'lucide-react';
import { TestCaseSummary } from '../types';

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
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFrameworkIcon = (framework: string) => {
    switch (framework) {
      case 'Jest':
        return <Code className="w-4 h-4" />;
      case 'Supertest':
        return <FileText className="w-4 h-4" />;
      case 'React Testing Library':
        return <Zap className="w-4 h-4" />;
      case 'Selenium WebDriver':
        return <Code className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center">
          <div className="loading-spinner mr-3"></div>
          <span className="text-gray-600">Generating test case suggestions...</span>
        </div>
      </div>
    );
  }

  if (summaries.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No test cases found for the selected files.</p>
          <p className="text-sm mt-1">Try selecting different files or check your repository structure.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Suggested Test Cases</h3>
        <p className="text-sm text-gray-500 mt-1">
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