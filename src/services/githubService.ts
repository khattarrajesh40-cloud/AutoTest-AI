import { Octokit } from '@octokit/rest';
import { GitHubFile, GitHubConfig, RepositoryInfo } from '../types';

class GitHubService {
  private octokit: Octokit;

  constructor(token: string) {
    this.octokit = new Octokit({ auth: token });
  }

  async getRepositoryInfo(owner: string, repo: string): Promise<RepositoryInfo> {
    try {
      const response = await this.octokit.repos.get({ owner, repo });
      return {
        name: response.data.name,
        owner: response.data.owner.login,
        description: response.data.description || '',
        defaultBranch: response.data.default_branch,
        language: response.data.language || 'Unknown',
      };
    } catch (error) {
      console.error('Error fetching repository info:', error);
      throw new Error('Failed to fetch repository information');
    }
  }

  async getRepositoryFiles(owner: string, repo: string, path: string = ''): Promise<GitHubFile[]> {
    try {
      const response = await this.octokit.repos.getContent({ owner, repo, path });

      if (Array.isArray(response.data)) {
        return response.data.map((item: any) => ({
          name: item.name,
          path: item.path,
          type: item.type,
          size: item.size,
          sha: item.sha,
          url: item.url,
        }));
      } else {
        return [{
          name: response.data.name,
          path: response.data.path,
          type: response.data.type,
          size: response.data.size,
          sha: response.data.sha,
          url: response.data.url,
        }];
      }
    } catch (error) {
      console.error('Error fetching repository files:', error);
      throw new Error('Failed to fetch repository files');
    }
  }

  async getFileContent(owner: string, repo: string, path: string): Promise<string> {
    try {
      const response = await this.octokit.repos.getContent({ owner, repo, path });

      if ('content' in response.data) {
        return Buffer.from(response.data.content, 'base64').toString('utf-8');
      }
      throw new Error('File content not found');
    } catch (error) {
      console.error('Error fetching file content:', error);
      throw new Error('Failed to fetch file content');
    }
  }

  async createPullRequest(
    config: GitHubConfig,
    title: string,
    body: string,
    files: { path: string; content: string }[]
  ): Promise<string> {
    try {
      const branchName = `test-case-${Date.now()}`;

      const { data: ref } = await this.octokit.git.getRef({
        owner: config.owner,
        repo: config.repo,
        ref: `heads/${config.branch}`,
      });

      await this.octokit.git.createRef({
        owner: config.owner,
        repo: config.repo,
        ref: `refs/heads/${branchName}`,
        sha: ref.object.sha,
      });

      for (const file of files) {
        await this.octokit.repos.createOrUpdateFileContents({
          owner: config.owner,
          repo: config.repo,
          path: file.path,
          message: `Add test case: ${title}`,
          content: Buffer.from(file.content).toString('base64'),
          branch: branchName,
        });
      }

      const { data: pr } = await this.octokit.pulls.create({
        owner: config.owner,
        repo: config.repo,
        title,
        body,
        head: branchName,
        base: config.branch,
      });

      return pr.html_url;
    } catch (error) {
      console.error('Error creating pull request:', error);
      throw new Error('Failed to create pull request');
    }
  }
}

export default GitHubService;
