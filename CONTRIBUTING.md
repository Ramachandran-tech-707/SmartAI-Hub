# 🤝 Contributing to SmartAI-Hub

Thank you for your interest in contributing to SmartAI-Hub! This document provides guidelines and instructions for contributing to this project.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Style Guide](#style-guide)
- [Testing](#testing)

---

## 📜 Code of Conduct

All contributors are expected to:
- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Respect different opinions and experiences
- Help maintain a welcoming community

---

## 🎯 Ways to Contribute

### 🐛 Report Bugs
- Search existing issues to avoid duplicates
- Provide clear description with steps to reproduce
- Include screenshots or error messages if applicable
- Specify your environment (OS, Node.js/Python version, etc.)

### ✨ Suggest Features
- Describe the use case and benefit
- Provide examples if possible
- Explain how it aligns with project goals
- Be open to feedback and refinement

### 📚 Improve Documentation
- Fix typos and grammatical errors
- Add missing documentation
- Improve clarity of existing docs
- Add usage examples

### 💻 Write Code
- Implement features or fix bugs
- Write tests for your changes
- Follow the existing code style
- Update documentation as needed

### 🔍 Code Review
- Review pull requests
- Provide constructive feedback
- Test proposed changes
- Help maintain code quality

---

## 🚀 Getting Started

### 1. Fork the Repository

Click the "Fork" button on GitHub to create your copy of the repository.

```bash
git clone https://github.com/yourusername/SmartAI-Hub.git
cd SmartAI-Hub
```

### 2. Create an Issue

Before starting major work:
- Check existing issues
- Create a new issue describing what you plan to do
- Wait for feedback from maintainers

### 3. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

**Branch Naming Convention:**
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions

---

## 🛠️ Development Setup

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

**Frontend Stack:**
- Next.js 14
- React 18
- CSS Modules
- ESLint (if configured)

### Backend Development

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Run development server
python main.py
```

**Backend Stack:**
- FastAPI
- Python 3.8+
- Uvicorn
- pydantic

---

## ✏️ Making Changes

### Code Standards

#### Frontend (React/Next.js)
```javascript
// ✅ Good
const handleClick = () => {
  setCount(count + 1);
};

// ❌ Bad
const handleClick=()=>{setCount(count+1)};
```

- Use functional components with hooks
- Use CSS Modules for component styling
- Name components and functions descriptively
- Keep components focused and reusable
- Add comments for complex logic

#### Backend (FastAPI/Python)
```python
# ✅ Good
async def get_chat_response(
    message: str,
    conversation_id: Optional[str] = None
) -> dict:
    """Get AI response for user message."""
    pass

# ❌ Bad
def get_response(m, id=None):
    pass
```

- Follow PEP 8 style guide
- Use type hints
- Add docstrings to functions
- Keep functions focused
- Use meaningful variable names

### Writing Commits

```bash
# Good commit message
git commit -m "Add export functionality to results"

# Clear commit message with description
git commit -m "Add export functionality to results

- Export results as PDF
- Export results as TXT
- Include date and tool name in export"
```

**Commit Message Guidelines:**
- Use present tense ("Add feature" not "Added feature")
- Be descriptive but concise
- Reference issue numbers: "Fixes #123"
- Separate subject from body with blank line
- Limit subject to 50 characters
- Wrap body at 72 characters

---

## 📤 Submitting Changes

### Before You Submit

- [ ] Ensure code follows style guide
- [ ] Add/update tests for your changes
- [ ] Update documentation if needed
- [ ] Run linting and tests locally
- [ ] Rebase on latest main branch
- [ ] Squash related commits

### Create Pull Request

1. Push to your fork:
```bash
git push origin feature/your-feature
```

2. Go to GitHub and create a Pull Request

3. Fill in the PR template with:
   - Description of changes
   - Related issues (closes #123)
   - Screenshots (if applicable)
   - Testing notes

### PR Review Process

- Maintainers will review your changes
- Address any requested changes
- Be open to feedback and suggestions
- Update PR based on reviews
- Once approved, your PR will be merged

---

## 🧪 Testing

### Frontend Testing

```bash
cd frontend

# Run tests (if configured)
npm test

# Check for linting errors
npm run lint

# Build for production
npm run build
```

### Backend Testing

```bash
cd backend

# Run tests
pytest

# Check style
flake8

# Type checking
mypy .
```

### Manual Testing

1. Test your changes locally
2. Test in different browsers (frontend)
3. Test with different inputs
4. Test error cases
5. Document testing steps in PR

---

## 🎨 Style Guide

### Naming Conventions

**Frontend (JavaScript/JSX):**
- Components: `PascalCase` (e.g., `ChatbotForm`)
- Functions: `camelCase` (e.g., `handleSubmit`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `API_URL`)
- CSS Classes: `camelCase` (e.g., `.chatContainer`)

**Backend (Python):**
- Classes: `PascalCase` (e.g., `ChatbotService`)
- Functions: `snake_case` (e.g., `get_response`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_FILE_SIZE`)
- Private members: `_leading_underscore`

### Documentation

```javascript
/**
 * Generates content based on prompt and parameters
 * @param {string} prompt - The content prompt
 * @param {string} format - The output format (article, social, copy)
 * @param {string} tone - The writing tone (professional, casual, etc)
 * @returns {Promise<Object>} Generated content with metadata
 */
async function generateContent(prompt, format, tone) {
  // Implementation
}
```

```python
def generate_content(
    prompt: str,
    format: str,
    tone: str
) -> dict:
    """
    Generate content based on prompt and parameters.
    
    Args:
        prompt: The content prompt
        format: The output format (article, social, copy)
        tone: The writing tone (professional, casual, etc)
    
    Returns:
        Generated content with metadata
    """
    pass
```

---

## 🐛 Debugging Tips

### Frontend
- Use React Developer Tools
- Check browser console for errors
- Use `console.log()` for debugging
- Check Network tab for API calls
- Verify `.env.local` configuration

### Backend
- Check terminal output for errors
- Use `print()` or logging module
- Check FastAPI Swagger UI: http://localhost:8002/docs
- Verify `.env` configuration
- Use Postman to test endpoints

---

## 📝 Keeping Your Fork Updated

```bash
# Add upstream remote
git remote add upstream https://github.com/original-owner/SmartAI-Hub.git

# Fetch latest changes
git fetch upstream

# Rebase your branch
git rebase upstream/main

# Force push to your fork
git push origin feature/your-feature --force
```

---

## ❓ Questions?

- Check existing issues and discussions
- Ask in GitHub Discussions
- Email: support@smartai-hub.com
- Read the main README.md

---

## 🎉 Thank You!

Thank you for contributing to SmartAI-Hub! Your work helps make this project better for everyone.

**Happy coding! 🚀**

---

**Last Updated:** April 2026
