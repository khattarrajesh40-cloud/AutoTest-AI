import React, { useState } from 'react';
import { Github, Search, AlertCircle } from 'lucide-react';
import { RepositoryInfo } from '../types';

interface GitHubConnectProps {
  onRepositoryConnected: (repoInfo: RepositoryInfo, token: string) => void;
}

const GitHubConnect: React.FC<GitHubConnectProps> = ({ onRepositoryConnected }) => {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // In a real app, you would validate the token and fetch repo info here
      // For demo purposes, we'll simulate this
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const repoInfo: RepositoryInfo = {
        name: repo,
        owner: owner,
        description: 'Sample repository for test case generation',
        defaultBranch: 'main',
        language: 'JavaScript',
      };

      onRepositoryConnected(repoInfo, token);
    } catch (err) {
      setError('Failed to connect to repository. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-center mb-6">
                  <Github className="w-8 h-8 text-gray-700 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">Connect to GitHub</h2>
      </div>

      <form onSubmit={handleConnect} className="space-y-4">
        <div>
          <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-1">
            Repository Owner
          </label>
          <input
            type="text"
            id="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="username or organization"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="repo" className="block text-sm font-medium text-gray-700 mb-1">
            Repository Name
          </label>
          <input
            type="text"
            id="repo"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            placeholder="repository-name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
            GitHub Personal Access Token
          </label>
          <input
            type="password"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Create a token with repo access at{' '}
            <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
              GitHub Settings
            </a>
          </p>
        </div>

        {error && (
          <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="loading-spinner mr-2"></div>
              Connecting...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Connect Repository
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default GitHubConnect; 