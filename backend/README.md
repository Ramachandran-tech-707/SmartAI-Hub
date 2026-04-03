# 🧠 SmartAI-Hub Backend

> Powerful FastAPI backend service providing AI-driven capabilities for the SmartAI-Hub application including Chatbot, Content Generator, and Data Extraction.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.8%2B-3776AB?style=flat-square&logo=python)](https://www.python.org/)
[![API](https://img.shields.io/badge/API-REST-4A90E2?style=flat-square)](https://restfulapi.net/)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Server](#-running-the-server)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [Troubleshooting](#-troubleshooting)

---

## 🎯 Overview

The SmartAI-Hub backend is a robust **FastAPI service** that powers all AI capabilities in the SmartAI-Hub application. It provides RESTful APIs for:

- 🤖 **Intelligent Chatbot** - Conversational AI with context understanding
- ✍️ **Content Generator** - Multi-format content creation
- 📊 **Data Extraction** - Document parsing and info extraction

### Key Features

✨ **FastAPI Framework** - Modern, fast, production-ready Python web framework  
🔐 **CORS Enabled** - Secure cross-origin resource sharing  
🤖 **Multiple AI Models** - Support for OpenAI and Groq models  
📄 **Document Processing** - Advanced text parsing and extraction  
🔄 **Scalable Architecture** - Ready for production deployment  
📚 **Auto-Generated Docs** - Swagger UI and ReDoc documentation  

---

## ✨ Features

### 🤖 Chatbot Service
- Real-time conversational responses
- Context-aware interactions
- Support for multiple AI models
- Conversation streaming
- Error handling and fallbacks

### ✍️ Content Generation Service
- Multi-format content creation
- Template-based generation
- Customizable tone and style
- Batch processing capability
- Quality validation

### 📊 Data Extraction Service
- Document parsing (PDF, DOCX, TXT)
- Structured data extraction
- Information summarization
- Key entity identification
- Multiple output formats

---

## 🏗️ Architecture

```
FastAPI Backend
│
├── 🔌 CORS Middleware (Cross-Origin Requests)
├── 🔑 Environment Configuration
├── 🤖 AI Model Management
│   ├── OpenAI Integration
│   └── Groq Integration
│
├── 📡 API Routes
│   ├── /chat - Chatbot endpoint
│   ├── /generate - Content generation endpoint
│   ├── /extract - Data extraction endpoint
│   └── /health - Health check endpoint
│
├── 🔧 Utility Functions
│   ├── Text chunking
│   ├── Document parsing
│   └── Response formatting
│
└── 📊 Error Handling & Logging
```

---

## 📋 Prerequisites

Before setting up the backend, ensure you have:

### Required
- **Python 3.8 or higher**
- **pip** (Python package manager)
- **Git** (for version control)
- **API Keys** (OpenAI or Groq)

### Optional
- **Virtual Environment Manager** (venv, virtualenv, conda)
- **Postman** or **curl** for API testing
- **Docker** (for containerized deployment)

### Verify Installation

```bash
# Check Python version
python3 --version        # Should be 3.8 or higher

# Check pip version
pip3 --version

# Check Git version
git --version
```

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/SmartAI-Hub.git
cd SmartAI-Hub/backend
```

### Step 2: Create a Virtual Environment

Creating a virtual environment isolates project dependencies.

#### Using venv (Built-in)
```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On Linux/macOS:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

#### Using virtualenv
```bash
# Install virtualenv
pip install virtualenv

# Create and activate
virtualenv venv
source venv/bin/activate  # Linux/macOS
# or
venv\Scripts\activate  # Windows
```

#### Using conda
```bash
# Create environment
conda create -n smartai-hub python=3.8

# Activate environment
conda activate smartai-hub
```

### Step 3: Verify Virtual Environment

```bash
# You should see (venv) in your terminal prompt
# Test Python access
python --version
pip --version
```

### Step 4: Install Dependencies

```bash
# Upgrade pip first
pip install --upgrade pip

# Install all required packages
pip install -r requirements.txt
```

### Step 5: Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit the file with your credentials
nano .env
# or open in your editor
```

### Step 6: Verify Setup

```bash
# Test Python imports
python -c "import fastapi, openai; print('All dependencies OK!')"
```

---

## ⚙️ Configuration

### Environment Variables (.env)

Create a `.env` file in the backend directory with the following configuration:

```env
# ============================================
# 🤖 AI Provider Configuration
# ============================================

# AI Provider: 'openai' or 'groq'
AI_PROVIDER=openai

# OpenAI Configuration (if using OpenAI)
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_MODEL=gpt-3.5-turbo

# Groq Configuration (if using Groq)
GROQ_API_KEY=your-groq-api-key-here
GROQ_API_URL=https://api.groq.com/openai/v1
GROQ_MODEL=llama-3.1-8b-instant

# ============================================
# 🌐 Server Configuration
# ============================================

# Frontend URL (for CORS)
FRONT_END_URL=http://localhost:3026

# Backend Server Port
BACKEND_PORT=8002

# ============================================
# 🔧 Application Settings
# ============================================

# Debug Mode (True for development, False for production)
DEBUG=False

# Log Level
LOG_LEVEL=INFO

# ============================================
# 📊 Feature Flags (Optional)
# ============================================

# Enable/disable features
ENABLE_CHATBOT=True
ENABLE_GENERATOR=True
ENABLE_EXTRACTOR=True

# Max file size for uploads (in MB)
MAX_UPLOAD_SIZE=50

# Request timeout (in seconds)
REQUEST_TIMEOUT=30
```

### Getting API Keys

#### 🔑 OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to "API Keys" -> "Create new secret key"
4. Copy the key and add to `.env`:
   ```env
   OPENAI_API_KEY=sk-...
   ```

#### 🔑 Groq API Key

1. Go to [Groq Console](https://console.groq.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Add to `.env`:
   ```env
   GROQ_API_KEY=gsk_...
   ```

---

## ▶️ Running the Server

### Start Development Server

```bash
# Make sure virtual environment is activated
source venv/bin/activate  # Linux/macOS

# Run the server
python main.py
```

**Expected Output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8002
INFO:     Application startup complete
```

### Access the Server

- **API Root**: http://localhost:8002
- **Swagger UI Docs**: http://localhost:8002/docs
- **ReDoc Docs**: http://localhost:8002/redoc
- **OpenAPI Schema**: http://localhost:8002/openapi.json

### Production Deployment

```bash
# Using Gunicorn with Uvicorn workers
pip install gunicorn

# Run with multiple workers
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8002
```

---

## 📡 API Endpoints

### 1. Health Check

**Endpoint:**
```
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "ai_provider": "openai",
  "model": "gpt-3.5-turbo"
}
```

---

### 2. Chatbot Endpoint

**Endpoint:**
```
POST /chat
```

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "message": "What is machine learning?",
  "conversation_id": "optional_unique_id",
  "temperature": 0.7
}
```

**Response Example:**
```json
{
  "response": "Machine learning is a subset of artificial intelligence...",
  "conversation_id": "conv_12345",
  "tokens_used": 156
}
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| message | string | Yes | User's question or message |
| conversation_id | string | No | For maintaining conversation context |
| temperature | float | No | Response creativity (0.0-1.0) |

---

### 3. Content Generator Endpoint

**Endpoint:**
```
POST /generate
```

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "prompt": "Write a blog post about AI trends",
  "format": "article",
  "tone": "professional",
  "length": "medium"
}
```

**Response Example:**
```json
{
  "content": "# AI Trends 2024\n\n...",
  "metadata": {
    "word_count": 450,
    "reading_time_minutes": 3,
    "format": "article"
  },
  "success": true
}
```

**Parameters:**
| Parameter | Type | Options | Required | Description |
|-----------|------|---------|----------|-------------|
| prompt | string | - | Yes | Content description/requirements |
| format | string | article, social, copy, email | Yes | Content format |
| tone | string | professional, casual, friendly, formal | Yes | Writing tone |
| length | string | short, medium, long | No | Estimated content length |

---

### 4. Data Extraction Endpoint

**Endpoint:**
```
POST /extract
```

**Request Headers:**
```
Content-Type: multipart/form-data
```

**Request Body:**
```
file: [binary file content]
extraction_type: structured|summary|keywords
```

**Response Example:**
```json
{
  "extracted_data": {
    "title": "Document Title",
    "key_points": ["Point 1", "Point 2"],
    "entities": ["Entity 1", "Entity 2"]
  },
  "file_name": "document.pdf",
  "extraction_type": "structured",
  "success": true
}
```

**Parameters:**
| Parameter | Type | Options | Required | Description |
|-----------|------|---------|----------|-------------|
| file | file | PDF, DOCX, TXT | Yes | Document to extract from |
| extraction_type | string | structured, summary, keywords | Yes | Type of extraction |

---

## 🛠️ Common Tasks

### Testing Endpoints with curl

```bash
# Test health endpoint
curl http://localhost:8002/health

# Test chatbot
curl -X POST http://localhost:8002/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'

# Test content generator
curl -X POST http://localhost:8002/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a welcome message",
    "format": "article",
    "tone": "friendly"
  }'

# Test data extraction
curl -X POST http://localhost:8002/extract \
  -F "file=@document.pdf" \
  -F "extraction_type=summary"
```

### Testing with Postman

1. Open Postman
2. Create new requests for each endpoint
3. Set request method (GET/POST)
4. Add headers: `Content-Type: application/json`
5. Add request body (JSON)
6. Send request

### Viewing Live Documentation

1. Start the backend server
2. Open http://localhost:8002/docs in browser
3. All endpoints listed with:
   - Request parameters
   - Response schemas
   - Live testing interface

---

## 🐛 Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'fastapi'"

```bash
# Ensure virtual environment is activated
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

### Issue: Port 8002 Already in Use

```bash
# Find process using port 8002 (Linux/macOS)
lsof -ti:8002 | xargs kill -9

# Run on different port
python main.py --port 8003
```

### Issue: "API Key invalid" Error

```env
# Check .env file:
# 1. Correct API key from provider
# 2. Remove any extra spaces or quotes
# 3. Use raw key, not JSON format
```

### Issue: CORS Errors

```env
# Update .env with correct frontend URL
FRONT_END_URL=http://localhost:3026
```

### Issue: Connection Refused

```bash
# Ensure backend is running
# Check if server started successfully on port 8002

# Test connection
curl http://localhost:8002/health
```

### Issue: Slow Response Times

1. Check API key provider's rate limits
2. Reduce request timeout if needed
3. Implement caching for common requests
4. Consider upgrading to a faster AI model

---

## 📊 Monitoring & Logging

### View Logs

```bash
# Logs are printed to console by default
# For production, redirect to file:
python main.py > backend.log 2>&1
```

### Enable Debug Mode

In `.env`:
```env
DEBUG=True
LOG_LEVEL=DEBUG
```

### Performance Monitoring

Monitor these metrics:
- API response times
- Error rates
- Token usage (for AI APIs)
- Request queue length

---

## 🔒 Security Best Practices

✅ **API Keys**: Never commit `.env` to version control  
✅ **CORS**: Configure allowed origins properly  
✅ **Rate Limiting**: Implement rate limiting for production  
✅ **Input Validation**: Validate all user inputs  
✅ **HTTPS**: Use HTTPS in production  
✅ **Dependencies**: Keep dependencies updated  

---

## 📚 Dependencies

### Key Packages

| Package | Version | Purpose |
|---------|---------|---------|
| **fastapi** | Latest | Web framework |
| **uvicorn** | Latest | ASGI server |
| **python-dotenv** | Latest | Environment variables |
| **openai** | Latest | OpenAI integration |
| **httpx** | Latest | HTTP client |
| **beautifulsoup4** | Latest | HTML/XML parsing |
| **pydantic** | Latest | Data validation |

### View Installed Packages

```bash
pip list
```

### Update Packages

```bash
pip install --upgrade -r requirements.txt
```

---

## 🚀 Deployment

### Docker Deployment

```dockerfile
# Dockerfile
FROM python:3.8-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8002

CMD ["python", "main.py"]
```

Build and run:
```bash
docker build -t smartai-hub-backend .
docker run -p 8002:8002 --env-file .env smartai-hub-backend
```

### Environment Variables for Production

```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...
FRONT_END_URL=https://app.smartai-hub.com
DEBUG=False
LOG_LEVEL=INFO
```

---

## 📝 Development Checklist

- [ ] Python 3.8+ installed and verified
- [ ] Virtual environment created and activated
- [ ] Dependencies installed: `pip install -r requirements.txt`
- [ ] `.env` file created with API keys
- [ ] Backend server running: `python main.py`
- [ ] Health endpoint accessible: http://localhost:8002/health
- [ ] Swagger UI accessible: http://localhost:8002/docs
- [ ] All three endpoints tested and functional
- [ ] CORS configured correctly
- [ ] Frontend can connect to backend

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Create a pull request

---

## 📚 Additional Resources

- **[FastAPI Documentation](https://fastapi.tiangolo.com/)** - Official FastAPI docs
- **[Python Documentation](https://docs.python.org/3/)** - Python 3 docs
- **[OpenAI API Docs](https://platform.openai.com/docs)** - OpenAI API reference
- **[Groq API Docs](https://console.groq.com/docs)** - Groq API reference
- **[REST API Best Practices](https://restfulapi.net/)** - REST design guide

---

**Made with ❤️ by You**

*For frontend setup, see [Frontend README](../frontend/README.md)*

Activate the virtual environment using the following command:

### Linux / macOS

```bash
source venv/bin/activate
```

### Windows

```bash
venv\Scripts\activate
```

After activation, you should see the `(venv)` prefix in your terminal prompt, indicating that the virtual environment is active.

<br>

---

<br>

## ⬆️ Step 6: Upgrade pip

Upgrade `pip` to the latest version using the following command:

```bash
pip install --upgrade pip
```

## 📦 Step 7: Install Dependencies

Install all required Python packages from `requirements.txt`:

```bash
pip install -r requirements.txt
```

<br>

---

<br>

## ▶️ Step 8: Run the Application (Development Mode)

Start the FastAPI application in development mode with auto-reload enabled:

```bash
uvicorn main:app --reload
```

The application will be available at: `http://localhost:8000`

<br>

---

<br>

## 🚀 Step 9: Run the Application (Production Mode)

To run the application and make it accessible from all network interfaces:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The application will be available at: `http://0.0.0.0:8000` or `http://your-ip-address:8000`

<br>

---

<br>

## 📝 Environment Configuration

This project requires a `.env` file for environment-specific settings. Follow these steps to set it up:

1. Copy the example file:

```bash
cp .env.example .env
```

2. Open the `.env` file in your editor and configure the values as per your setup:

```bash
# FRONTEND
FRONT_END_URL=http://localhost:3026
PORT=3000

# Choose which AI provider to use: openai or groq
AI_PROVIDER=

# OpenAI credentials
OPENAI_API_KEY=

# Groq credentials
GROQ_API_KEY=
GROQ_API_URL=
```

3. Replace the placeholders in your `.env` file with your actual credentials and settings:

- `AI_PROVIDER` → `openai` or `groq`  
- `OPENAI_API_KEY` → Your OpenAI API key  
- `GROQ_API_KEY` → Your Groq API key  
- `GROQ_API_URL` → Your Groq API URL (if using Groq)  

> ⚠️ Make sure **not to commit your `.env` file** to version control as it contains sensitive information.


<br>

---

<br>

## ⚡ Quick Start Summary

```bash
# Clone and navigate
git clone git@lab.pixelwebsolutions.net:bala.pixelweb/chatbot.git
cd chatbot

# Switch branch
git checkout combined_backend

# Check Python version
python3 --version

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
# OR
venv\Scripts\activate     # Windows

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Run application
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

<br>

---

<br>

## ⚠️ Troubleshooting

### Permission Denied Error

If you encounter permission errors while installing dependencies, try using the `--user` flag:

```bash
pip install --user -r requirements.txt
```

### Port Already in Use

If port `8000` is already in use, change the port number:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8001
```

### Virtual Environment Not Activating

Ensure you're in the correct directory and that the `venv` folder exists before attempting to activate it.

<br>

---

<br>

### Deactivating Virtual Environment

To deactivate the virtual environment when you're done:

```bash
deactivate
```

