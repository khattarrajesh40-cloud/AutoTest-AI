export interface GitHubFile {
  name: string;
  path: string;
  type: 'file' | 'dir' | 'symlink' | 'submodule'; // extended to match GitHub API
  size: number;
  sha: string;
  url: string;
  content?: string;
  language?: string;
}

export interface TestCaseSummary {
  id: string;
  title: string;
  description: string;
  framework: string;
  files: string[];
  estimatedTime: string;
  complexity: 'Low' | 'Medium' | 'High';
}

export interface TestCaseCode {
  id: string;
  code: string;
  framework: string;
  fileName: string;
  dependencies?: string[];
}

export interface GitHubConfig {
  owner: string;
  repo: string;
  branch: string;
  token: string;
}

export interface RepositoryInfo {
  name: string;
  owner: string;
  description: string;
  defaultBranch: string;
  language: string;
}
