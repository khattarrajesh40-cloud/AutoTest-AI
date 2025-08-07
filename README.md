# Test Case Generator

An AI-powered test case generator application that integrates with GitHub to automatically generate test cases for your code files. The application provides a modern, intuitive interface for connecting to GitHub repositories, selecting files, and generating comprehensive test cases using various testing frameworks.

## Features

### 🚀 Core Features
- **GitHub Integration**: Connect to any GitHub repository using personal access tokens
- **File Selection**: Browse and select multiple files from your repository
- **AI-Powered Test Generation**: Generate test case summaries and full test code
- **Multiple Testing Frameworks**: Support for Jest, Supertest, React Testing Library, and Selenium WebDriver
- **Pull Request Creation**: Automatically create pull requests with generated test cases
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS

### 📋 Test Case Types
- **Unit Tests**: Comprehensive unit testing with Jest
- **API Integration Tests**: End-to-end API testing with Supertest
- **Component Tests**: React component testing with React Testing Library
- **Web Automation**: Browser automation with Selenium WebDriver
- **Database Tests**: Database integration testing with proper cleanup

### 🎯 Workflow
1. **Connect**: Link your GitHub repository
2. **Select**: Choose files to generate tests for
3. **Generate**: AI suggests test case summaries
4. **Code**: Generate and view complete test code
5. **Deploy**: Create pull requests directly to GitHub

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- GitHub Personal Access Token

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd test-case-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### GitHub Token Setup

1. Go to [GitHub Settings > Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select the following scopes:
   - `repo` (Full control of private repositories)
   - `read:org` (Read organization data)
4. Copy the generated token and use it in the application

## Usage

### Step 1: Connect to GitHub
- Enter your GitHub username/organization
- Enter the repository name
- Provide your personal access token
- Click "Connect Repository"

### Step 2: Select Files
- Browse through your repository files
- Select the files you want to generate tests for
- The application will automatically analyze selected files

### Step 3: Generate Test Cases
- Review AI-generated test case summaries
- Each summary includes:
  - Test case title and description
  - Testing framework used
  - Estimated implementation time
  - Complexity level
  - Files covered

### Step 4: Generate Code
- Click "Generate Code" on any test case summary
- View the complete test code with syntax highlighting
- Copy code to clipboard or create a pull request

### Step 5: Create Pull Request (Optional)
- Click "Create PR" to automatically create a pull request
- The PR will include the generated test file
- Review and merge the changes

## Supported Testing Frameworks

### Jest
- Unit testing for JavaScript/TypeScript
- React component testing
- Mocking and assertions
- Test coverage reporting

### Supertest
- API endpoint testing
- HTTP request/response validation
- Database integration testing
- Authentication testing

### React Testing Library
- Component behavior testing
- User interaction simulation
- Accessibility testing
- Integration testing

### Selenium WebDriver
- Browser automation
- Cross-browser testing
- UI element interaction
- End-to-end testing

## Project Structure

```
src/
├── components/          # React components
│   ├── GitHubConnect.tsx
│   ├── FileExplorer.tsx
│   ├── TestCaseSummaries.tsx
│   └── TestCaseCode.tsx
├── services/           # API services
│   ├── githubService.ts
│   └── aiService.ts
├── types/             # TypeScript type definitions
│   └── index.ts
├── App.tsx            # Main application component
└── index.tsx          # Application entry point
```

## Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_GITHUB_API_URL=https://api.github.com
REACT_APP_AI_SERVICE_URL=your-ai-service-url
```

### Customization
- Modify `aiService.ts` to integrate with your preferred AI service
- Update test case templates in the AI service
- Customize UI components in the `components/` directory

## Development

### Available Scripts
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Adding New Testing Frameworks
1. Update the `AIService` class with new framework templates
2. Add framework-specific dependencies
3. Update the UI components to display new framework options

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Review the troubleshooting guide

## Roadmap

- [ ] Integration with more AI services (OpenAI, Claude, etc.)
- [ ] Support for more testing frameworks (PyTest, Mocha, etc.)
- [ ] Test case customization options
- [ ] Batch test generation
- [ ] Test case templates and presets
- [ ] Integration with CI/CD pipelines
- [ ] Test coverage analysis
- [ ] Performance testing support 