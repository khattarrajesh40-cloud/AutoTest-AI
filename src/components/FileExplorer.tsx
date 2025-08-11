import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderIcon, 
  FolderOpenIcon, 
  DocumentIcon, 
  CheckCircleIcon,
  ChevronRightIcon,
  ChevronDownIcon 
} from '@heroicons/react/24/outline';
import { 
  CodeBracketIcon,
  DocumentTextIcon,
  PhotoIcon,
  CogIcon
} from '@heroicons/react/24/solid';
import { GitHubFile } from '../types';
import GitHubService from '../services/githubService';
import Card from './ui/Card';
import Button from './ui/Button';
import LoadingSpinner from './ui/LoadingSpinner';
import { showToast } from './ui/Toast';

interface FileExplorerProps {
  owner: string;
  repo: string;
  token: string;
  onFilesSelected: (files: GitHubFile[]) => void;
  onNextStep: () => void;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ owner, repo, token, onFilesSelected, onNextStep }) => {
  const [files, setFiles] = useState<GitHubFile[]>([]);
  const [folderContents, setFolderContents] = useState<Map<string, GitHubFile[]>>(new Map());
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadFiles = useCallback(async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const githubService = new GitHubService(token);
      const repoFiles = await githubService.getRepositoryFiles(owner, repo);
      setFiles(repoFiles);
      showToast.success('Repository files loaded successfully!');
    } catch (err) {
      const errorMessage = 'Failed to load repository files';
      setError(errorMessage);
      showToast.error(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [owner, repo, token]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const toggleFileSelection = (filePath: string) => {
    const newSelected = new Set(selectedFiles);
    if (newSelected.has(filePath)) {
      newSelected.delete(filePath);
    } else {
      newSelected.add(filePath);
    }
    setSelectedFiles(newSelected);
    
    // Get all selected files from root and all expanded folders
    const allFiles = [...files];
    folderContents.forEach((folderFiles) => {
      allFiles.push(...folderFiles);
    });
    
    const selectedFileObjects = allFiles.filter(file => newSelected.has(file.path));
    console.log('Selected files:', selectedFileObjects.map(f => f.name));
    onFilesSelected(selectedFileObjects);
  };

  const toggleFolderExpansion = async (folderPath: string) => {
    const newExpanded = new Set(expandedFolders);
    
    if (newExpanded.has(folderPath)) {
      // Collapse folder
      newExpanded.delete(folderPath);
      setExpandedFolders(newExpanded);
    } else {
      // Expand folder - load contents if not already loaded
      if (!folderContents.has(folderPath)) {
        try {
          const githubService = new GitHubService(token);
          const contents = await githubService.getRepositoryFiles(owner, repo, folderPath);
          setFolderContents(prev => new Map(prev).set(folderPath, contents));
        } catch (err) {
          console.error('Failed to load folder contents:', err);
          const errorMessage = 'Failed to load folder contents';
          setError(errorMessage);
          showToast.error(errorMessage);
          return;
        }
      }
      
      newExpanded.add(folderPath);
      setExpandedFolders(newExpanded);
    }
  };

  const isFolderExpanded = (folderPath: string) => expandedFolders.has(folderPath);
  const isFileSelected = (filePath: string) => selectedFiles.has(filePath);

  const getFileTypeIcon = (file: GitHubFile) => {
    if (file.type === 'dir') {
      return isFolderExpanded(file.path) ? 
        <FolderOpenIcon className="w-5 h-5 text-blue-500" /> : 
        <FolderIcon className="w-5 h-5 text-blue-500" />;
    }
    
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
      case 'py':
      case 'java':
      case 'cpp':
      case 'c':
        return <CodeBracketIcon className="w-5 h-5 text-green-500" />;
      case 'md':
      case 'txt':
      case 'json':
      case 'yml':
      case 'yaml':
        return <DocumentTextIcon className="w-5 h-5 text-gray-500" />;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'svg':
        return <PhotoIcon className="w-5 h-5 text-purple-500" />;
      case 'config':
      case 'env':
        return <CogIcon className="w-5 h-5 text-orange-500" />;
      default:
        return <DocumentIcon className="w-5 h-5 text-gray-400" />;
    }
  };

  const renderFileItem = (file: GitHubFile, level: number = 0) => {
    const indent = level * 20;
    
    return (
      <motion.div 
        key={file.path} 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="group"
      >
        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => file.type === 'dir' ? toggleFolderExpansion(file.path) : toggleFileSelection(file.path)}
          className="flex items-center w-full text-left px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group-hover:shadow-sm"
          style={{ paddingLeft: `${indent + 8}px` }}
        >
          <div className="flex items-center flex-1">
            {file.type === 'dir' && (
              <motion.div
                animate={{ rotate: isFolderExpanded(file.path) ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="mr-2"
              >
                <ChevronRightIcon className="w-4 h-4 text-gray-400" />
              </motion.div>
            )}
            
            <div className="mr-3">
              {getFileTypeIcon(file)}
            </div>
            
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
              {file.name}
            </span>
          </div>
          
          {file.type === 'file' && (
            <motion.div 
              className="flex items-center"
              initial={false}
              animate={{ 
                scale: isFileSelected(file.path) ? 1.1 : 1,
                opacity: isFileSelected(file.path) ? 1 : 0.6
              }}
            >
              {isFileSelected(file.path) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <CheckCircleIcon className="w-5 h-5 text-accent-500" />
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.button>
      </motion.div>
    );
  };

  const renderFilesRecursively = (fileList: GitHubFile[], level: number = 0) => {
    return fileList.map((file) => (
      <motion.div key={file.path}>
        {renderFileItem(file, level)}
        <AnimatePresence>
          {file.type === 'dir' && isFolderExpanded(file.path) && folderContents.has(file.path) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderFilesRecursively(folderContents.get(file.path)!, level + 1)}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    ));
  };

  if (isLoading) {
    return (
      <Card className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Loading Repository Files
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Fetching your repository structure...
        </p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="text-center border-red-200 dark:border-red-800">
        <div className="text-red-500 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
          Error Loading Files
        </h3>
        <p className="text-red-600 dark:text-red-500">{error}</p>
      </Card>
    );
  }

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Repository Files</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Select files to generate test cases for
        </p>
      </div>
      
      <div className="max-h-96 overflow-y-auto p-4">
        {files.length === 0 ? (
          <div className="text-center py-12">
            <DocumentIcon className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No files found in repository</p>
          </div>
        ) : (
          <div className="space-y-1">
            {renderFilesRecursively(files)}
          </div>
        )}
      </div>
      
      {selectedFiles.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-accent-500 rounded-full mr-3"
              />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {selectedFiles.size} file{selectedFiles.size !== 1 ? 's' : ''} selected
              </p>
            </div>
            <Button
              onClick={onNextStep}
              size="md"
              className="shadow-lg"
            >
              Next Step →
            </Button>
          </div>
        </motion.div>
      )}
    </Card>
  );
};

export default FileExplorer;