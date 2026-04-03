# 🎨 SmartAI-Hub Frontend

> Modern, responsive Next.js 14 frontend for the SmartAI-Hub application featuring Chatbot, Content Generator, and Data Extraction tools.

[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js)](https://nodejs.org/)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Development](#-development)
- [Component Documentation](#-component-documentation)
- [Styling Guide](#-styling-guide)
- [Troubleshooting](#-troubleshooting)

---

## 🎯 Overview

The SmartAI-Hub frontend is a modern, responsive web application built with **Next.js 14**. It provides an intuitive interface for accessing three powerful AI tools through a unified dashboard and dedicated pages for each tool.

### Key Highlights

✨ **Modern Design** - Clean, responsive interface that works on all devices  
⚡ **Next.js 14** - Latest Next.js features for optimal performance  
🎯 **User-Centric** - Intuitive navigation and seamless user experience  
📱 **Responsive** - Mobile-first design that adapts to any screen size  
🔌 **API Integration** - Seamless communication with FastAPI backend  
🎨 **CSS Modules** - Scoped styling for component isolation  

---

## ✨ Features

### 🏠 Dashboard (Home Page)
- Quick overview of available tools
- Navigation cards for easy access
- Visual introduction to SmartAI-Hub
- Featured use cases and benefits

### 🤖 Chatbot Page
- Real-time chat interface
- Message history display
- Clean conversation layout
- Instant response handling
- Copy-to-clipboard functionality

### ✍️ Content Generator Page
- Dynamic form for content creation
- Multiple format support
- Customizable tone and style options
- Real-time content generation
- Export/download results

### 📊 Data Extraction Page
- Document upload interface
- File preview support (PDF, DOCX, TXT)
- Structured data extraction
- Results in multiple formats
- Copy and download options

### 🧭 Navigation Component
- Responsive navigation bar
- Logo and branding
- Quick access menu
- Mobile-friendly hamburger menu (if applicable)

---

## 📁 Project Structure

```
frontend/
│
├── 📄 package.json                # Node.js dependencies
├── 📄 next.config.mjs             # Next.js configuration
├── 📄 jsconfig.json               # JavaScript/TypeScript config
├── 📄 .env.example               # Environment template
├── 📄 README.md                   # Frontend documentation (this file)
│
├── public/                        # Static assets
│   └── [Images, fonts, etc.]
│
├── src/
│   ├── app/                      # Next.js app directory
│   │   ├── layout.jsx            # Root layout component
│   │   ├── page.jsx              # Dashboard/Home page
│   │   ├── globals.css           # Global styles
│   │   ├── home.module.css       # Home page styles
│   │   │
│   │   ├── chatbot/              # Chatbot feature
│   │   │   ├── page.jsx          # Chatbot main page
│   │   │   └── chatbot.module.css # Chatbot styles
│   │   │
│   │   ├── content_generator/    # Content generator feature
│   │   │   ├── page.jsx          # Generator main page
│   │   │   └── content_generator.module.css
│   │   │
│   │   └── data_extraction/      # Data extraction feature
│   │       ├── page.jsx          # Extraction main page
│   │       └── data_extraction.module.css
│   │
│   └── components/               # Reusable components
│       ├── Navbar.jsx            # Navigation component
│       ├── GeneratorForm.jsx     # Content generator form
│       ├── ExtractorForm.jsx     # Data extractor form
│       ├── ResultBox.jsx         # Generic result display
│       └── ExtractorResultBox.jsx # Specialized result display

```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required
- **Node.js** v18.x or higher
- **npm** v8.x or **yarn** v3.x (Node package manager)
- **Git** (for version control)

### Optional
- **VSCode** with ES7+ React/Redux/React-Native snippets extension
- **Postman** or similar tool for API testing

### Verify Installation

```bash
# Check Node.js version
node --version        # Should be v18.x or higher

# Check npm version
npm --version         # Should be v8.x or higher

# Check Git version
git --version
```

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/SmartAI-Hub.git
cd SmartAI-Hub/frontend
```

### Step 2: Verify Node.js Version

```bash
node --version
```

**Required**: Node.js v18.x or higher  
**If version is lower, upgrade:**

#### On Ubuntu/Debian:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### On macOS (with Homebrew):
```bash
brew install node@18
brew link node@18
```

#### On Windows:
Download and install from [nodejs.org](https://nodejs.org/)

#### Using NVM (Recommended):
```bash
# Install NVM first (if not installed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node.js 18
nvm install 18
nvm use 18
```

### Step 3: Install Dependencies

```bash
# Using npm
npm install

# OR using yarn
yarn install
```

### Step 4: Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit the file with your configuration
nano .env.local
# or open in your editor
```

**Environment Variables (.env.local):**

```env
# Backend API URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:8002
BACK_END_URL=http://127.0.0.1:8002

# Application Name
NEXT_PUBLIC_APP_NAME=SmartAI-Hub

# Frontend URL (optional)
FRONT_END_URL=http://localhost:3026
```

### Step 5: Run the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at: **http://localhost:3026**

### Step 6: Build for Production

```bash
# Build the production-ready application
npm run build

# Start the production server
npm start
```

---

## 🛠️ Development

### Running the Development Server

```bash
npm run dev
```

Features:
- Hot module reloading
- Live code updates without page refresh
- Fast refresh for components
- Compiled without breaking on errors

Open [http://localhost:3026](http://localhost:3026) in your browser to see the application.

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Production server
npm start

# Linting (if configured)
npm run lint

# Testing (if configured)
npm test
```

### Code Style & Best Practices

- Use functional components with hooks
- Implement CSS Modules for scoped styling
- Keep components small and focused
- Use meaningful variable and function names
- Comment complex logic and API calls

---

## 🧩 Component Documentation

### 1. **Navbar Component** (`Navbar.jsx`)

Main navigation component displayed at the top of the application.

```jsx
<Navbar />
```

**Props**: None (uses routing context)  
**Features**:
- Logo display
- Navigation links to main tools
- Responsive design
- Active page highlighting

---

### 2. **GeneratorForm Component** (`GeneratorForm.jsx`)

Form for content generation with customizable options.

```jsx
<GeneratorForm onSubmit={handleGenerate} />
```

**Props**:
- `onSubmit` (function) - Callback when form is submitted

**Features**:
- Multi-line prompt input
- Format selection (article, social, copy)
- Tone customization
- Submit button with loading state
- Error handling

---

### 3. **ExtractorForm Component** (`ExtractorForm.jsx`)

Form for data extraction with file upload support.

```jsx
<ExtractorForm onSubmit={handleExtract} />
```

**Props**:
- `onSubmit` (function) - Callback when extraction is submitted

**Features**:
- File upload (PDF, DOCX, TXT)
- File preview
- Extraction type selection
- Submit button with loading state
- File validation

---

### 4. **ResultBox Component** (`ResultBox.jsx`)

Generic result display component.

```jsx
<ResultBox 
  title="Generation Results"
  content={generatedContent}
  onCopy={handleCopy}
  onDownload={handleDownload}
/>
```

**Props**:
- `title` (string) - Result box heading
- `content` (string) - Result text content
- `onCopy` (function) - Copy to clipboard handler
- `onDownload` (function) - Download handler

**Features**:
- Content display with formatting
- Copy to clipboard button
- Download as text file
- Full-screen view option

---

### 5. **ExtractorResultBox Component** (`ExtractorResultBox.jsx`)

Specialized result display for extracted data.

```jsx
<ExtractorResultBox 
  data={extractedData}
  format="table"
  onExport={handleExport}
/>
```

**Props**:
- `data` (object) - Extracted data
- `format` (string) - Display format
- `onExport` (function) - Export handler

**Features**:
- Structured data display
- Table/List/JSON views
- Data export options
- Advanced filtering (if applicable)

---

## 🎨 Styling Guide

### CSS Modules

All components use **CSS Modules** for scoped, component-specific styling.

**Example:**

```css
/* chatbot.module.css */
.chatContainer {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.messageList {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.inputArea {
  display: flex;
  gap: 10px;
  padding: 20px;
  background: white;
}

@media (max-width: 768px) {
  .chatContainer {
    height: auto;
  }
}
```

### Global Styles

Global styles are defined in `globals.css`:

```css
/* globals.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

a {
  color: inherit;
  text-decoration: none;
}
```

### Responsive Design

Use CSS media queries for responsive layout:

```css
/* Mobile First Approach */
.container {
  width: 100%;
  padding: 10px;
}

@media (min-width: 768px) {
  .container {
    width: 768px;
    padding: 20px;
  }
}

@media (min-width: 1024px) {
  .container {
    width: 1024px;
    padding: 40px;
  }
}
```

---

## 🔌 API Integration

### Making API Calls

Use the Fetch API or create a utility function for API calls:

```jsx
// Example: Making a POST request to the backend
const generateContent = async (prompt) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/generate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    }
  );

  if (!response.ok) {
    throw new Error('Generation failed');
  }

  return response.json();
};
```

### Environment Variables

Access environment variables in components:

```jsx
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
```

**Note**: Only variables prefixed with `NEXT_PUBLIC_` are accessible in the browser.

---

## 📦 Dependencies

### Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| **next** | 14.1.0 | React framework |
| **react** | 18.x | UI library |
| **react-dom** | 18.x | React DOM bindings |
| **pdfjs-dist** | 5.4.530 | PDF processing |
| **mammoth** | 1.11.0 | DOCX to HTML conversion |
| **react-toastify** | 11.0.5 | Toast notifications |

### Installing Additional Packages

```bash
npm install package-name
# or
yarn add package-name
```

---

## 🐛 Troubleshooting

### Issue: Port 3026 Already in Use

```bash
# Kill process using port 3026 (Linux/macOS)
lsof -ti:3026 | xargs kill -9

# Or run on a different port
npm run dev -- -p 3027
```

### Issue: CORS Errors

**Solution**: Ensure backend is running and `NEXT_PUBLIC_BACKEND_URL` in `.env.local` is correct.

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8002
```

### Issue: Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### Issue: Hot Reload Not Working

```bash
# Restart the development server
npm run dev
```

### Issue: Build Fails

```bash
# Check for TypeScript errors
npm run build

# Clear Next.js cache
rm -rf .next

# Try building again
npm run build
```

---

## 📚 Additional Resources

- **[Next.js Documentation](https://nextjs.org/docs)** - Official Next.js docs
- **[React Documentation](https://react.dev/)** - Official React docs
- **[Next.js App Router](https://nextjs.org/docs/app)** - App Router guide
- **[CSS Modules](https://nextjs.org/docs/basic-features/module-css)** - Next.js CSS Modules

---

## 🔍 Performance Tips

- Use `next/Image` for optimized images
- Implement lazy loading for components
- Use React.memo for expensive components
- Optimize bundle size with code splitting
- Use next/dynamic for route-based code splitting

---

## 📝 Development Checklist

- [ ] Node.js v18+ installed and verified
- [ ] Dependencies installed with `npm install`
- [ ] Environment variables configured in `.env.local`
- [ ] Backend server running on port 8002
- [ ] Development server started with `npm run dev`
- [ ] Application accessible at http://localhost:3026
- [ ] All three tools (Chatbot, Generator, Extractor) functional
- [ ] Navigation between pages working
- [ ] API calls returning expected responses

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test thoroughly
4. Create a pull request with a clear description

---

**Made with ❤️ by You**

*For backend setup, see [Backend README](../backend/README.md)*
NODE_ENV=development
```

### Step 6: Build the Application

```bash
npm run build
```

### Step 7: Start the Application

```bash
npm start
```

The application will be available at `http://localhost:3000`

## 🧪 Development Mode

To run the application in development mode with hot-reload:

```bash
npm run dev
```

## 🌐 Application Pages

### Main Dashboard

Access at: `http://localhost:3000/`

- Overview of all AI tools
- Quick access links to individual tools
- Recent activity and statistics

### Chatbot

Access at: `http://localhost:3000/chatbot`

- Interactive conversational AI interface
- Real-time message processing
- Chat history and context management

### Content Generator

Access at: `http://localhost:3000/content-generator`

- AI-powered content creation
- Multiple content types support
- Customizable generation parameters

### Data Extraction Tool

Access at: `http://localhost:3000/data-extraction`

- Intelligent data parsing
- Multiple format support
- Batch processing capabilities

## 🔌 Backend Integration

This frontend application connects to an AI service backend for:

- Natural language processing
- Content generation algorithms
- Data extraction and analysis

Ensure your backend API is running and properly configured in the `.env` file.

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Node Modules Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 🤝 Contributing

1. Create a new branch from `combined_frontend`
2. Make your changes
3. Test thoroughly
4. Submit a pull request


## 🔄 Version History

- **v1.0.0** - Initial release with combined frontend
  - Chatbot integration
  - Content generator
  - Data extraction tool
  - Unified dashboard

---

**Built with ❤️ using Next.js and AI Services**
