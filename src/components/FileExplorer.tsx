import React, { useState, useEffect, useCallback } from 'react';
import { Folder, File, Check, ChevronRight, ChevronDown } from 'lucide-react';
import { GitHubFile } from '../types';
import GitHubService from '../services/githubService';

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
    } catch (err) {
      setError('Failed to load repository files');
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
          setError('Failed to load folder contents');
          return;
        }
      }
      
      newExpanded.add(folderPath);
      setExpandedFolders(newExpanded);
    }
  };

  const isFolderExpanded = (folderPath: string) => expandedFolders.has(folderPath);
  const isFileSelected = (filePath: string) => selectedFiles.has(filePath);

  const renderFileItem = (file: GitHubFile, level: number = 0) => {
    const indent = level * 20;
    
    return (
      <div key={file.path} className="flex items-center py-1 hover:bg-gray-50 rounded">
        <button
          onClick={() => file.type === 'dir' ? toggleFolderExpansion(file.path) : toggleFileSelection(file.path)}
          className="flex items-center flex-1 text-left px-2 py-1 rounded hover:bg-gray-100"
          style={{ paddingLeft: `${indent + 8}px` }}
        >
          <div className="flex items-center flex-1">
            {file.type === 'dir' && getFileIcon(file)}
            {getFileTypeIcon(file)}
            <span className="ml-2 text-sm text-gray-700">{file.name}</span>
          </div>
          
          {file.type === 'file' && (
            <div className="flex items-center">
              {isFileSelected(file.path) && (
                <Check className="w-4 h-4 text-green-500" />
              )}
            </div>
          )}
        </button>
      </div>
    );
  };

  const renderFilesRecursively = (fileList: GitHubFile[], level: number = 0) => {
    return fileList.map((file) => (
      <div key={file.path}>
        {renderFileItem(file, level)}
        {file.type === 'dir' && isFolderExpanded(file.path) && folderContents.has(file.path) && (
          <div>
            {renderFilesRecursively(folderContents.get(file.path)!, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  const getFileIcon = (file: GitHubFile) => {
    if (file.type === 'dir') {
      return isFolderExpanded(file.path) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />;
    }
    return <File className="w-4 h-4" />;
  };

  const getFileTypeIcon = (file: GitHubFile) => {
    if (file.type === 'dir') {
      return <Folder className="w-4 h-4 text-blue-500" />;
    }
    return <File className="w-4 h-4 text-gray-500" />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="loading-spinner mr-2"></div>
        <span>Loading repository files...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Repository Files</h3>
        <p className="text-sm text-gray-500 mt-1">
          Select files to generate test cases for
        </p>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {files.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No files found in repository
          </div>
        ) : (
          <div className="p-2">
            {renderFilesRecursively(files)}
          </div>
        )}
      </div>
      
      {selectedFiles.size > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {selectedFiles.size} file{selectedFiles.size !== 1 ? 's' : ''} selected
            </p>
            <button
              onClick={onNextStep}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Next Step →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;