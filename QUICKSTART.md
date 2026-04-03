# 🚀 SmartAI-Hub Quick Start Guide

Get SmartAI-Hub up and running in 5 minutes!

---

## 📋 Prerequisites

✅ **Node.js** v18+ (Frontend)  
✅ **Python** 3.8+ (Backend)  
✅ **API Keys** (OpenAI or Groq)  

---

## ⚡ Quick Start (5 minutes)

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/SmartAI-Hub.git
cd SmartAI-Hub
```

### Step 2: Setup Backend

```bash
cd backend

# Create & activate virtual environment
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
# OR
venv\Scripts\activate     # Windows

# Install & configure
pip install -r requirements.txt
cp .env.example .env
# Edit .env and add your API keys
```

### Step 3: Setup Frontend

```bash
cd ../frontend

# Install & configure
npm install
cp .env.example .env.local
# Edit .env.local with backend URL
```

### Step 4: Start Services

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # Activate venv
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 5: Access Application

Open browser: **http://localhost:3026**

---

## 🎯 Environment Setup

### Backend (.env)

```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-key-here
FRONT_END_URL=http://localhost:3026
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8002
NEXT_PUBLIC_APP_NAME=SmartAI-Hub
```

---

## ✨ Available Tools

### 🤖 Chatbot
- Real-time conversations
- Context-aware responses
- Multi-turn support

### ✍️ Content Generator
- Create articles
- Generate social posts
- Write marketing copy

### 📊 Data Extractor
- Parse documents
- Extract key information
- Summarize content

---

## 📚 Documentation

- **[Main README](./README.md)** - Complete project documentation
- **[Frontend README](./frontend/README.md)** - Frontend setup & dev guide
- **[Backend README](./backend/README.md)** - Backend setup & API docs
- **[Contributing Guide](./CONTRIBUTING.md)** - Contribution guidelines

---

## 🛠️ API Documentation

When backend is running, visit:
- **Swagger UI**: http://localhost:8002/docs
- **ReDoc**: http://localhost:8002/redoc

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3026 in use | `npm run dev -- -p 3027` |
| Port 8002 in use | Change port in backend config |
| CORS errors | Check `FRONT_END_URL` in backend `.env` |
| API key errors | Verify key format and spaces |
| Module errors | Run `npm install` or `pip install -r requirements.txt` |

---

## 🚀 Next Steps

1. ✅ Access application at http://localhost:3026
2. 🧪 Test each tool (Chatbot, Generator, Extractor)
3. 📖 Read full documentation for advanced features
4. 🎨 Add screenshots to `docs/screenshots/`
5. 🤝 Contribute improvements

---

## 💡 Tips

- Keep terminal windows open to see logs
- Use Swagger UI to test API endpoints
- Check browser console for frontend errors
- Backend Swagger UI shows all API specifications
- Use `.env` for local configuration

---

## 📞 Support

- 🐛 Report issues on GitHub
- 💬 Start a discussion
- 📧 Email: support@smartai-hub.com

---

**Happy coding! 🎉**

*For complete setup instructions, see [README.md](./README.md)*
