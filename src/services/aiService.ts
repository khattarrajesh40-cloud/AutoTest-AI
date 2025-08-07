import { TestCaseSummary, TestCaseCode, GitHubFile } from '../types';

class AIService {
  private mockTestCases = [
    {
      id: '1',
      title: 'Unit Tests for User Authentication',
      description: 'Comprehensive unit tests for user login, registration, and authentication flow',
      framework: 'Jest',
      files: ['auth.js', 'user.js'],
      estimatedTime: '2-3 hours',
      complexity: 'Medium' as const,
    },
    {
      id: '2',
      title: 'API Integration Tests',
      description: 'End-to-end API testing for REST endpoints with proper error handling',
      framework: 'Supertest',
      files: ['api.js', 'routes.js'],
      estimatedTime: '1-2 hours',
      complexity: 'Low' as const,
    },
    {
      id: '3',
      title: 'Component Testing for React',
      description: 'React component testing with user interactions and state management',
      framework: 'React Testing Library',
      files: ['components/Button.jsx', 'components/Form.jsx'],
      estimatedTime: '3-4 hours',
      complexity: 'High' as const,
    },
    {
      id: '4',
      title: 'Database Integration Tests',
      description: 'Database connection and query testing with proper cleanup',
      framework: 'Jest + SQLite',
      files: ['database.js', 'models.js'],
      estimatedTime: '2-3 hours',
      complexity: 'Medium' as const,
    },
    {
      id: '5',
      title: 'Selenium Web Automation',
      description: 'Browser automation tests for web application functionality',
      framework: 'Selenium WebDriver',
      files: ['pages/HomePage.js', 'pages/LoginPage.js'],
      estimatedTime: '4-5 hours',
      complexity: 'High' as const,
    },
  ];

  async generateTestCaseSummaries(files: GitHubFile[]): Promise<TestCaseSummary[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Generating test cases for files:', files.map(f => f.name));
    
    // Generate test cases based on file types and content
    const testCases: TestCaseSummary[] = [];
    let counter = 0;
    
    for (const file of files) {
      const fileName = file.name.toLowerCase();
      counter++;
      
      // JavaScript/TypeScript files
      if (fileName.endsWith('.js') || fileName.endsWith('.ts') || fileName.endsWith('.jsx') || fileName.endsWith('.tsx')) {
        if (fileName.includes('calculator') || fileName.includes('math') || fileName.includes('calc')) {
          // Multiple test cases for calculator files
          testCases.push({
            id: `calc-unit-${Date.now()}-${counter}`,
            title: 'Calculator Unit Tests',
            description: 'Comprehensive unit tests for mathematical functions including edge cases and error handling',
            framework: 'Jest',
            files: [file.name],
            estimatedTime: '2-3 hours',
            complexity: 'Medium' as const,
          });
          
          testCases.push({
            id: `calc-integration-${Date.now()}-${counter}`,
            title: 'Calculator Integration Tests',
            description: 'Integration tests for calculator workflows and complex calculations',
            framework: 'Jest',
            files: [file.name],
            estimatedTime: '1-2 hours',
            complexity: 'Medium' as const,
          });
          
          testCases.push({
            id: `calc-performance-${Date.now()}-${counter}`,
            title: 'Calculator Performance Tests',
            description: 'Performance testing for large calculations and memory usage',
            framework: 'Jest',
            files: [file.name],
            estimatedTime: '1-2 hours',
            complexity: 'High' as const,
          });
        } else if (fileName.includes('user') || fileName.includes('profile') || fileName.includes('form')) {
          // Multiple test cases for React components
          testCases.push({
            id: `react-component-${Date.now()}-${counter}`,
            title: 'React Component Tests',
            description: 'Component testing with user interactions, form validation, and state management',
            framework: 'React Testing Library',
            files: [file.name],
            estimatedTime: '3-4 hours',
            complexity: 'High' as const,
          });
          
          testCases.push({
            id: `react-hooks-${Date.now()}-${counter}`,
            title: 'React Hooks Tests',
            description: 'Testing custom hooks, useEffect, useState, and other React hooks',
            framework: 'React Testing Library',
            files: [file.name],
            estimatedTime: '2-3 hours',
            complexity: 'Medium' as const,
          });
          
          testCases.push({
            id: `react-accessibility-${Date.now()}-${counter}`,
            title: 'React Accessibility Tests',
            description: 'Accessibility testing with jest-axe and screen reader compatibility',
            framework: 'React Testing Library + jest-axe',
            files: [file.name],
            estimatedTime: '2-3 hours',
            complexity: 'Medium' as const,
          });
        } else {
          // Multiple test cases for general JavaScript files
          testCases.push({
            id: `js-unit-${Date.now()}-${counter}`,
            title: 'JavaScript Unit Tests',
            description: 'Unit tests for JavaScript functions and modules',
            framework: 'Jest',
            files: [file.name],
            estimatedTime: '1-2 hours',
            complexity: 'Low' as const,
          });
          
          testCases.push({
            id: `js-integration-${Date.now()}-${counter}`,
            title: 'JavaScript Integration Tests',
            description: 'Integration tests for module interactions and data flow',
            framework: 'Jest',
            files: [file.name],
            estimatedTime: '2-3 hours',
            complexity: 'Medium' as const,
          });
          
          testCases.push({
            id: `js-error-${Date.now()}-${counter}`,
            title: 'JavaScript Error Handling Tests',
            description: 'Error handling and edge case testing for robust code',
            framework: 'Jest',
            files: [file.name],
            estimatedTime: '1-2 hours',
            complexity: 'Medium' as const,
          });
        }
      }
      
      // Python files
      else if (fileName.endsWith('.py')) {
        if (fileName.includes('data') || fileName.includes('process') || fileName.includes('analysis')) {
          // Multiple test cases for data processing files
          testCases.push({
            id: `python-data-${Date.now()}-${counter}`,
            title: 'Python Data Processing Tests',
            description: 'Unit tests for data processing, validation, and analysis functions',
            framework: 'pytest',
            files: [file.name],
            estimatedTime: '2-3 hours',
            complexity: 'Medium' as const,
          });
          
          testCases.push({
            id: `python-performance-${Date.now()}-${counter}`,
            title: 'Python Performance Tests',
            description: 'Performance testing for data processing with large datasets',
            framework: 'pytest + pytest-benchmark',
            files: [file.name],
            estimatedTime: '2-3 hours',
            complexity: 'High' as const,
          });
          
          testCases.push({
            id: `python-memory-${Date.now()}-${counter}`,
            title: 'Python Memory Tests',
            description: 'Memory usage testing and optimization validation',
            framework: 'pytest + memory-profiler',
            files: [file.name],
            estimatedTime: '1-2 hours',
            complexity: 'High' as const,
          });
        } else {
          // Multiple test cases for general Python files
          testCases.push({
            id: `python-unit-${Date.now()}-${counter}`,
            title: 'Python Unit Tests',
            description: 'Comprehensive unit tests for Python functions and classes',
            framework: 'pytest',
            files: [file.name],
            estimatedTime: '1-2 hours',
            complexity: 'Low' as const,
          });
          
          testCases.push({
            id: `python-mock-${Date.now()}-${counter}`,
            title: 'Python Mock Tests',
            description: 'Mock testing for external dependencies and API calls',
            framework: 'pytest + pytest-mock',
            files: [file.name],
            estimatedTime: '2-3 hours',
            complexity: 'Medium' as const,
          });
          
          testCases.push({
            id: `python-async-${Date.now()}-${counter}`,
            title: 'Python Async Tests',
            description: 'Asynchronous testing for async/await functions',
            framework: 'pytest + pytest-asyncio',
            files: [file.name],
            estimatedTime: '2-3 hours',
            complexity: 'Medium' as const,
          });
        }
      }
      
      // API/Backend files
      else if (fileName.includes('api') || fileName.includes('route') || fileName.includes('controller')) {
        // Multiple test cases for API files
        testCases.push({
          id: `api-integration-${Date.now()}-${counter}`,
          title: 'API Integration Tests',
          description: 'End-to-end API testing for REST endpoints with proper error handling',
          framework: 'Supertest',
          files: [file.name],
          estimatedTime: '1-2 hours',
          complexity: 'Low' as const,
        });
        
        testCases.push({
          id: `api-unit-${Date.now()}-${counter}`,
          title: 'API Unit Tests',
          description: 'Unit tests for API controllers and business logic',
          framework: 'Jest',
          files: [file.name],
          estimatedTime: '2-3 hours',
          complexity: 'Medium' as const,
        });
        
        testCases.push({
          id: `api-security-${Date.now()}-${counter}`,
          title: 'API Security Tests',
          description: 'Security testing for authentication, authorization, and input validation',
          framework: 'Jest + Supertest',
          files: [file.name],
          estimatedTime: '2-3 hours',
          complexity: 'High' as const,
        });
      }
      
      // Web automation files
      else if (fileName.includes('page') || fileName.includes('e2e') || fileName.includes('selenium')) {
        // Multiple test cases for web automation files
        testCases.push({
          id: `selenium-e2e-${Date.now()}-${counter}`,
          title: 'Selenium E2E Tests',
          description: 'End-to-end browser automation tests for web application functionality',
          framework: 'Selenium WebDriver',
          files: [file.name],
          estimatedTime: '4-5 hours',
          complexity: 'High' as const,
        });
        
        testCases.push({
          id: `selenium-performance-${Date.now()}-${counter}`,
          title: 'Selenium Performance Tests',
          description: 'Performance testing for web page load times and user interactions',
          framework: 'Selenium WebDriver + pytest',
          files: [file.name],
          estimatedTime: '3-4 hours',
          complexity: 'High' as const,
        });
        
        testCases.push({
          id: `selenium-cross-browser-${Date.now()}-${counter}`,
          title: 'Cross-Browser Tests',
          description: 'Cross-browser compatibility testing with Chrome, Firefox, Safari',
          framework: 'Selenium WebDriver + pytest',
          files: [file.name],
          estimatedTime: '5-6 hours',
          complexity: 'High' as const,
        });
      }
      
      // Database files
      else if (fileName.includes('db') || fileName.includes('database') || fileName.includes('model')) {
        testCases.push({
          id: `db-unit-${Date.now()}-${counter}`,
          title: 'Database Unit Tests',
          description: 'Unit tests for database models and queries',
          framework: 'Jest + SQLite',
          files: [file.name],
          estimatedTime: '2-3 hours',
          complexity: 'Medium' as const,
        });
        
        testCases.push({
          id: `db-integration-${Date.now()}-${counter}`,
          title: 'Database Integration Tests',
          description: 'Integration tests for database operations and transactions',
          framework: 'Jest + PostgreSQL',
          files: [file.name],
          estimatedTime: '3-4 hours',
          complexity: 'High' as const,
        });
      }
      
      // Configuration files
      else if (fileName.includes('config') || fileName.includes('env') || fileName.includes('settings')) {
        testCases.push({
          id: `config-validation-${Date.now()}-${counter}`,
          title: 'Configuration Validation Tests',
          description: 'Tests for configuration validation and environment setup',
          framework: 'Jest',
          files: [file.name],
          estimatedTime: '1-2 hours',
          complexity: 'Low' as const,
        });
      }
    }
    
    // If no specific test cases found, provide generic ones
    if (testCases.length === 0) {
      testCases.push({
        id: `generic-unit-${Date.now()}-${counter}`,
        title: 'Generic Unit Tests',
        description: 'Basic unit tests for the selected files',
        framework: 'Jest',
        files: files.map(f => f.name),
        estimatedTime: '1-2 hours',
        complexity: 'Low' as const,
      });
      
      testCases.push({
        id: `generic-integration-${Date.now()}-${counter}`,
        title: 'Generic Integration Tests',
        description: 'Integration tests for file interactions and workflows',
        framework: 'Jest',
        files: files.map(f => f.name),
        estimatedTime: '2-3 hours',
        complexity: 'Medium' as const,
      });
    }
    
    console.log('Generated test cases:', testCases.length);
    return testCases;
  }

  async generateTestCaseCode(summary: TestCaseSummary, files: GitHubFile[]): Promise<TestCaseCode> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    const mockCode = this.getMockCode(summary.framework, summary.title);
    
    return {
      id: summary.id,
      code: mockCode,
      framework: summary.framework,
      fileName: this.generateFileName(summary.title, summary.framework),
      dependencies: this.getDependencies(summary.framework),
    };
  }

  private getMockCode(framework: string, title: string): string {
    const codeTemplates: { [key: string]: string } = {
      'Jest': `import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthProvider } from '../src/contexts/AuthContext';

describe('${title}', () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <div>Test Component</div>
      </AuthProvider>
    );
  });

  test('should render authentication form', () => {
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });

  test('should handle user login', async () => {
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    
    await screen.findByText('Login successful');
    expect(screen.getByText('Login successful')).toBeInTheDocument();
  });

  test('should handle authentication errors', async () => {
    const errorButton = screen.getByRole('button', { name: /error/i });
    fireEvent.click(errorButton);
    
    await screen.findByText('Authentication failed');
    expect(screen.getByText('Authentication failed')).toBeInTheDocument();
  });
});`,

      'Supertest': `const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

describe('${title}', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await mongoose.connection.dropDatabase();
  });

  describe('GET /api/users', () => {
    it('should return list of users', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThanOrEqual(0);
    });

    it('should handle authentication errors', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(response.body.error).toBe('Unauthorized');
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body.name).toBe(userData.name);
      expect(response.body.email).toBe(userData.email);
    });
  });
});`,

      'React Testing Library': `import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Button from '../src/components/Button';
import Form from '../src/components/Form';

describe('${title}', () => {
  describe('Button Component', () => {
    test('renders button with correct text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    test('calls onClick handler when clicked', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('applies disabled state correctly', () => {
      render(<Button disabled>Click me</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('Form Component', () => {
    test('submits form with correct data', async () => {
      const handleSubmit = jest.fn();
      const user = userEvent.setup();

      render(<Form onSubmit={handleSubmit} />);
      
      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.type(screen.getByLabelText(/password/i), 'password123');
      await user.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123'
        });
      });
    });
  });
});`,

      'React Testing Library + jest-axe': `import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import Button from '../src/components/Button';
import Form from '../src/components/Form';

expect.extend(toHaveNoViolations);

describe('${title}', () => {
  describe('Accessibility Tests', () => {
    test('button should have no accessibility violations', async () => {
      const { container } = render(<Button>Click me</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('form should have no accessibility violations', async () => {
      const { container } = render(<Form onSubmit={jest.fn()} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('button should have proper ARIA attributes', () => {
      render(<Button aria-label="Submit form">Click me</Button>);
      expect(screen.getByRole('button', { name: /submit form/i })).toBeInTheDocument();
    });

    test('form should have proper labels', () => {
      render(<Form onSubmit={jest.fn()} />);
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });
  });
});`,

      'pytest + pytest-benchmark': `import pytest
import time
from unittest.mock import patch, MagicMock
import sys
import os

# Add the project root to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

class TestDataProcessorPerformance:
    """Performance tests for DataProcessor class"""
    
    def setup_method(self):
        """Setup method called before each test"""
        from data_processor import DataProcessor
        self.processor = DataProcessor()
    
    def test_large_dataset_processing_performance(self, benchmark):
        """Test performance with large dataset"""
        # Create large dataset
        large_data = [{"id": i, "value": i * 2} for i in range(10000)]
        self.processor.data = large_data
        
        def process_large_data():
            return self.processor.calculate_statistics("value")
        
        result = benchmark(process_large_data)
        assert result["count"] == 10000
    
    def test_memory_efficient_processing(self, benchmark):
        """Test memory efficiency"""
        large_data = [{"id": i, "value": i} for i in range(50000)]
        self.processor.data = large_data
        
        def memory_intensive_operation():
            return self.processor.group_by("value")
        
        result = benchmark(memory_intensive_operation)
        assert len(result) > 0
    
    def test_text_processing_performance(self, benchmark):
        """Test text processing performance"""
        large_text = "Test data " * 1000
        
        def process_text():
            return self.processor.clean_text(large_text)
        
        result = benchmark(process_text)
        assert len(result) > 0

if __name__ == "__main__":
    pytest.main([__file__, "--benchmark-only"])`,

      'pytest + memory-profiler': `import pytest
import psutil
import os
from unittest.mock import patch
import sys

# Add the project root to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

class TestDataProcessorMemory:
    """Memory usage tests for DataProcessor class"""
    
    def setup_method(self):
        """Setup method called before each test"""
        from data_processor import DataProcessor
        self.processor = DataProcessor()
        self.process = psutil.Process(os.getpid())
    
    def test_memory_usage_with_large_data(self):
        """Test memory usage with large dataset"""
        initial_memory = self.process.memory_info().rss / 1024 / 1024  # MB
        
        # Load large dataset
        large_data = [{"id": i, "value": i * 2} for i in range(100000)]
        self.processor.data = large_data
        
        memory_after_load = self.process.memory_info().rss / 1024 / 1024  # MB
        memory_increase = memory_after_load - initial_memory
        
        # Memory increase should be reasonable (< 100MB for this test)
        assert memory_increase < 100
        
        # Process data
        stats = self.processor.calculate_statistics("value")
        memory_after_process = self.process.memory_info().rss / 1024 / 1024  # MB
        
        # Memory should not increase significantly during processing
        process_memory_increase = memory_after_process - memory_after_load
        assert process_memory_increase < 50
    
    def test_memory_cleanup_after_processing(self):
        """Test that memory is properly cleaned up"""
        initial_memory = self.process.memory_info().rss / 1024 / 1024  # MB
        
        # Process large data
        large_data = [{"id": i, "value": i} for i in range(50000)]
        self.processor.data = large_data
        self.processor.calculate_statistics("value")
        
        # Clear data
        self.processor.data = []
        
        final_memory = self.process.memory_info().rss / 1024 / 1024  # MB
        memory_difference = final_memory - initial_memory
        
        # Memory should be close to initial (within 10MB)
        assert abs(memory_difference) < 10
    
    def test_memory_efficient_text_processing(self):
        """Test memory efficiency of text processing"""
        initial_memory = self.process.memory_info().rss / 1024 / 1024  # MB
        
        # Process large text
        large_text = "Test data " * 10000
        self.processor.clean_text(large_text)
        
        final_memory = self.process.memory_info().rss / 1024 / 1024  # MB
        memory_increase = final_memory - initial_memory
        
        # Memory increase should be minimal
        assert memory_increase < 10

if __name__ == "__main__":
    pytest.main([__file__])`,

      'pytest + pytest-asyncio': `import pytest
import asyncio
from unittest.mock import patch, AsyncMock
import sys
import os

# Add the project root to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

class TestDataProcessorAsync:
    """Async tests for DataProcessor class"""
    
    def setup_method(self):
        """Setup method called before each test"""
        from data_processor import DataProcessor
        self.processor = DataProcessor()
    
    @pytest.mark.asyncio
    async def test_async_data_loading(self):
        """Test async data loading functionality"""
        mock_data = [{"id": 1, "value": 10}, {"id": 2, "value": 20}]
        
        with patch('builtins.open', create=True) as mock_open:
            mock_open.return_value.__enter__.return_value.read.return_value = '{"data": mock_data}'
            
            with patch('json.load', return_value={"data": mock_data}):
                result = await self.async_load_data("test.json")
                assert result == True
                assert self.processor.data == {"data": mock_data}
    
    @pytest.mark.asyncio
    async def test_async_data_processing(self):
        """Test async data processing"""
        self.processor.data = [{"id": 1, "value": 10}, {"id": 2, "value": 20}]
        
        result = await self.async_calculate_statistics("value")
        assert result["count"] == 2
        assert result["sum"] == 30
    
    @pytest.mark.asyncio
    async def test_concurrent_data_processing(self):
        """Test concurrent data processing"""
        datasets = [
            [{"id": 1, "value": 10}],
            [{"id": 2, "value": 20}],
            [{"id": 3, "value": 30}]
        ]
        
        tasks = []
        for data in datasets:
            task = self.async_process_dataset(data)
            tasks.append(task)
        
        results = await asyncio.gather(*tasks)
        
        assert len(results) == 3
        assert all(result["count"] == 1 for result in results)
    
    async def async_load_data(self, file_path):
        """Async version of load_json_data"""
        await asyncio.sleep(0.1)  # Simulate async operation
        return self.processor.load_json_data(file_path)
    
    async def async_calculate_statistics(self, field):
        """Async version of calculate_statistics"""
        await asyncio.sleep(0.1)  # Simulate async operation
        return self.processor.calculate_statistics(field)
    
    async def async_process_dataset(self, data):
        """Async dataset processing"""
        await asyncio.sleep(0.1)  # Simulate async operation
        self.processor.data = data
        return self.processor.calculate_statistics("value")

if __name__ == "__main__":
    pytest.main([__file__, "--asyncio-mode=auto"])`,

      'Jest + SQLite': `const sqlite3 = require('sqlite3').verbose();
const path = require('path');

describe('${title}', () => {
  let db;
  let testDbPath;

  beforeAll(() => {
    testDbPath = path.join(__dirname, 'test.db');
    db = new sqlite3.Database(testDbPath);
    
    // Create test tables
    db.serialize(() => {
      db.run(\`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )\`);
      
      db.run(\`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,
        title TEXT NOT NULL,
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )\`);
    });
  });

  afterAll((done) => {
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
      }
      // Clean up test database
      const fs = require('fs');
      if (fs.existsSync(testDbPath)) {
        fs.unlinkSync(testDbPath);
      }
      done();
    });
  });

  beforeEach((done) => {
    // Clear test data before each test
    db.serialize(() => {
      db.run('DELETE FROM posts', done);
      db.run('DELETE FROM users', done);
    });
  });

  describe('User Model Tests', () => {
    test('should create a new user', (done) => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com'
      };

      db.run(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [userData.name, userData.email],
        function(err) {
          expect(err).toBeNull();
          expect(this.lastID).toBeGreaterThan(0);
          done();
        }
      );
    });

    test('should not create user with duplicate email', (done) => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com'
      };

      // Insert first user
      db.run(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [userData.name, userData.email],
        function(err) {
          expect(err).toBeNull();
          
          // Try to insert duplicate
          db.run(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [userData.name, userData.email],
            function(err) {
              expect(err).not.toBeNull();
              expect(err.message).toContain('UNIQUE constraint failed');
              done();
            }
          );
        }
      );
    });

    test('should find user by email', (done) => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com'
      };

      db.run(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [userData.name, userData.email],
        function(err) {
          expect(err).toBeNull();
          
          db.get(
            'SELECT * FROM users WHERE email = ?',
            [userData.email],
            (err, row) => {
              expect(err).toBeNull();
              expect(row).not.toBeNull();
              expect(row.name).toBe(userData.name);
              expect(row.email).toBe(userData.email);
              done();
            }
          );
        }
      );
    });
  });

  describe('Post Model Tests', () => {
    test('should create a new post with user relationship', (done) => {
      const userData = { name: 'Test User', email: 'test@example.com' };
      const postData = { title: 'Test Post', content: 'Test content' };

      db.run(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [userData.name, userData.email],
        function(err) {
          expect(err).toBeNull();
          const userId = this.lastID;
          
          db.run(
            'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
            [userId, postData.title, postData.content],
            function(err) {
              expect(err).toBeNull();
              expect(this.lastID).toBeGreaterThan(0);
              done();
            }
          );
        }
      );
    });

    test('should get posts with user information', (done) => {
      const userData = { name: 'Test User', email: 'test@example.com' };
      const postData = { title: 'Test Post', content: 'Test content' };

      db.run(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [userData.name, userData.email],
        function(err) {
          expect(err).toBeNull();
          const userId = this.lastID;
          
          db.run(
            'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
            [userId, postData.title, postData.content],
            function(err) {
              expect(err).toBeNull();
              
              db.all(
                \`SELECT p.*, u.name as user_name 
                 FROM posts p 
                 JOIN users u ON p.user_id = u.id\`,
                (err, rows) => {
                  expect(err).toBeNull();
                  expect(rows).toHaveLength(1);
                  expect(rows[0].title).toBe(postData.title);
                  expect(rows[0].user_name).toBe(userData.name);
                  done();
                }
              );
            }
          );
        }
      );
    });
  });
});`,

      'Jest + PostgreSQL': `const { Pool } = require('pg');

describe('${title}', () => {
  let pool;
  let client;

  beforeAll(async () => {
    pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'test_db',
      user: process.env.DB_USER || 'test_user',
      password: process.env.DB_PASSWORD || 'test_password',
    });
    
    client = await pool.connect();
    
    // Create test tables
    await client.query(\`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    \`);
    
    await client.query(\`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    \`);
  });

  afterAll(async () => {
    if (client) {
      client.release();
    }
    if (pool) {
      await pool.end();
    }
  });

  beforeEach(async () => {
    // Clear test data
    await client.query('DELETE FROM posts');
    await client.query('DELETE FROM users');
  });

  describe('Database Integration Tests', () => {
    test('should handle concurrent user creation', async () => {
      const userPromises = [];
      
      for (let i = 0; i < 10; i++) {
        userPromises.push(
          client.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id',
            [\`User \${i}\`, \`user\${i}@example.com\`]
          )
        );
      }
      
      const results = await Promise.all(userPromises);
      expect(results).toHaveLength(10);
      
      const countResult = await client.query('SELECT COUNT(*) FROM users');
      expect(parseInt(countResult.rows[0].count)).toBe(10);
    });

    test('should handle transactions correctly', async () => {
      const userData = { name: 'Test User', email: 'test@example.com' };
      const postData = { title: 'Test Post', content: 'Test content' };
      
      await client.query('BEGIN');
      
      try {
        const userResult = await client.query(
          'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id',
          [userData.name, userData.email]
        );
        
        const userId = userResult.rows[0].id;
        
        const postResult = await client.query(
          'INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING id',
          [userId, postData.title, postData.content]
        );
        
        await client.query('COMMIT');
        
        expect(userResult.rows[0].id).toBeGreaterThan(0);
        expect(postResult.rows[0].id).toBeGreaterThan(0);
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      }
    });

    test('should handle connection pooling', async () => {
      const queries = [];
      
      for (let i = 0; i < 20; i++) {
        queries.push(
          client.query('SELECT NOW()')
        );
      }
      
      const results = await Promise.all(queries);
      expect(results).toHaveLength(20);
      
      results.forEach(result => {
        expect(result.rows[0].now).toBeDefined();
      });
    });
  });
});`,

      'pytest': `import pytest
from unittest.mock import patch, MagicMock
import sys
import os

# Add the project root to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

class TestDataProcessor:
    """Test cases for DataProcessor class"""
    
    def setup_method(self):
        """Setup method called before each test"""
        from data_processor import DataProcessor
        self.processor = DataProcessor()
    
    def test_validate_email_valid(self):
        """Test email validation with valid email"""
        assert self.processor.validate_email("test@example.com") == True
        assert self.processor.validate_email("user.name@domain.co.uk") == True
    
    def test_validate_email_invalid(self):
        """Test email validation with invalid email"""
        assert self.processor.validate_email("invalid-email") == False
        assert self.processor.validate_email("test@") == False
        assert self.processor.validate_email("@domain.com") == False
    
    def test_validate_phone_valid(self):
        """Test phone validation with valid phone numbers"""
        assert self.processor.validate_phone("1234567890") == True
        assert self.processor.validate_phone("+1-234-567-8900") == True
        assert self.processor.validate_phone("(123) 456-7890") == True
    
    def test_validate_phone_invalid(self):
        """Test phone validation with invalid phone numbers"""
        assert self.processor.validate_phone("123") == False  # Too short
        assert self.processor.validate_phone("12345678901234567890") == False  # Too long
    
    def test_clean_text(self):
        """Test text cleaning functionality"""
        assert self.processor.clean_text("  Hello   World!  ") == "Hello World!"
        assert self.processor.clean_text("Test@#$%^&*()") == "Test"
        assert self.processor.clean_text("") == ""
        assert self.processor.clean_text(None) == ""
    
    def test_extract_numbers(self):
        """Test number extraction from text"""
        assert self.processor.extract_numbers("Price: $123.45 and $67.89") == [123.45, 67.89]
        assert self.processor.extract_numbers("No numbers here") == []
        assert self.processor.extract_numbers("Temperature: -5.5°C") == [-5.5]
    
    @patch('builtins.open', create=True)
    def test_load_json_data_success(self, mock_open):
        """Test successful JSON data loading"""
        mock_data = [{"id": 1, "name": "Test"}]
        mock_open.return_value.__enter__.return_value.read.return_value = '{"data": [{"id": 1, "name": "Test"}]}'
        
        with patch('json.load', return_value={"data": mock_data}):
            result = self.processor.load_json_data("test.json")
            assert result == True
            assert self.processor.data == {"data": mock_data}
    
    def test_calculate_statistics(self):
        """Test statistics calculation"""
        self.processor.data = [
            {"id": 1, "value": 10},
            {"id": 2, "value": 20},
            {"id": 3, "value": 30}
        ]
        
        stats = self.processor.calculate_statistics("value")
        assert stats["count"] == 3
        assert stats["sum"] == 60
        assert stats["mean"] == 20
        assert stats["min"] == 10
        assert stats["max"] == 30
    
    def test_calculate_statistics_empty_data(self):
        """Test statistics calculation with empty data"""
        self.processor.data = []
        
        with pytest.raises(ValueError, match="No data loaded"):
            self.processor.calculate_statistics("value")
    
    def test_calculate_statistics_invalid_field(self):
        """Test statistics calculation with invalid field"""
        self.processor.data = [{"id": 1, "value": 10}]
        
        with pytest.raises(ValueError, match="Field 'invalid' not found"):
            self.processor.calculate_statistics("invalid")
    
    def test_group_by(self):
        """Test data grouping functionality"""
        self.processor.data = [
            {"id": 1, "category": "A", "value": 10},
            {"id": 2, "category": "B", "value": 20},
            {"id": 3, "category": "A", "value": 30}
        ]
        
        grouped = self.processor.group_by("category")
        assert "A" in grouped
        assert "B" in grouped
        assert len(grouped["A"]) == 2
        assert len(grouped["B"]) == 1

if __name__ == "__main__":
    pytest.main([__file__])`,

      'Selenium WebDriver': `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import unittest

class ${title.replace(/\s+/g, '')}Test(unittest.TestCase):
    def setUp(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        
        self.driver = webdriver.Chrome(options=chrome_options)
        self.driver.implicitly_wait(10)
        self.wait = WebDriverWait(self.driver, 10)

    def tearDown(self):
        self.driver.quit()

    def test_homepage_loads(self):
        """Test that homepage loads correctly"""
        self.driver.get("http://localhost:3000")
        
        # Check if page title is correct
        self.assertIn("Test App", self.driver.title)
        
        # Check if main content is present
        main_content = self.wait.until(
            EC.presence_of_element_located((By.TAG_NAME, "main"))
        )
        self.assertTrue(main_content.is_displayed())

    def test_user_login(self):
        """Test user login functionality"""
        self.driver.get("http://localhost:3000/login")
        
        # Find and fill login form
        email_input = self.wait.until(
            EC.presence_of_element_located((By.NAME, "email"))
        )
        password_input = self.driver.find_element(By.NAME, "password")
        
        email_input.send_keys("test@example.com")
        password_input.send_keys("password123")
        
        # Submit form
        submit_button = self.driver.find_element(By.XPATH, "//button[@type='submit']")
        submit_button.click()
        
        # Check if redirected to dashboard
        self.wait.until(
            EC.url_contains("/dashboard")
        )
        
        # Verify user is logged in
        welcome_message = self.wait.until(
            EC.presence_of_element_located((By.CLASS_NAME, "welcome-message"))
        )
        self.assertIn("Welcome", welcome_message.text)

if __name__ == "__main__":
    unittest.main()`,
    };

    return codeTemplates[framework] || codeTemplates['Jest'];
  }

  private generateFileName(title: string, framework: string): string {
    const cleanTitle = title.replace(/[^a-zA-Z0-9]/g, '');
    const extensions: { [key: string]: string } = {
      'Jest': '.test.js',
      'Supertest': '.test.js',
      'React Testing Library': '.test.jsx',
      'Selenium WebDriver': '.py',
      'pytest': '.py',
    };
    
    return `${cleanTitle}${extensions[framework] || '.test.js'}`;
  }

  private getDependencies(framework: string): string[] {
    const dependencies: { [key: string]: string[] } = {
      'Jest': ['@testing-library/react', '@testing-library/jest-dom', '@testing-library/user-event'],
      'Supertest': ['supertest', 'jest'],
      'React Testing Library': ['@testing-library/react', '@testing-library/jest-dom', '@testing-library/user-event'],
      'React Testing Library + jest-axe': ['@testing-library/react', '@testing-library/jest-dom', '@testing-library/user-event', 'jest-axe'],
      'Selenium WebDriver': ['selenium', 'webdriver-manager'],
      'Selenium WebDriver + pytest': ['selenium', 'webdriver-manager', 'pytest'],
      'pytest': ['pytest', 'pytest-mock'],
      'pytest + pytest-benchmark': ['pytest', 'pytest-benchmark', 'pytest-mock'],
      'pytest + memory-profiler': ['pytest', 'memory-profiler', 'psutil', 'pytest-mock'],
      'pytest + pytest-asyncio': ['pytest', 'pytest-asyncio', 'pytest-mock'],
      'Jest + SQLite': ['sqlite3', 'jest'],
      'Jest + PostgreSQL': ['pg', 'jest'],
      'Jest + Supertest': ['jest', 'supertest'],
    };
    
    return dependencies[framework] || [];
  }
}

export default AIService; 