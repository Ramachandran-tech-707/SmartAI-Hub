from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import openai, httpx, os, json
from bs4 import BeautifulSoup

# =====================================================
# 🔹 Load Environment Variables
# =====================================================
load_dotenv()

FRONTEND_URL = os.getenv("FRONT_END_URL", "")
AI_PROVIDER = os.getenv("AI_PROVIDER", "openai").lower()

# =====================================================
# 🔹 Configure API keys and Models Dynamically
# =====================================================
if AI_PROVIDER == "groq":
    openai.api_key = os.getenv("GROQ_API_KEY")
    openai.base_url = os.getenv("GROQ_API_URL", "https://api.groq.com/openai/v1")
    MODEL_NAME = "llama-3.1-8b-instant"
else:
    openai.api_key = os.getenv("OPENAI_API_KEY")
    openai.base_url = "https://api.openai.com/v1"
    MODEL_NAME = "gpt-3.5-turbo"

# print(f"Using AI Provider: {AI_PROVIDER.upper()} | Model: {MODEL_NAME}")

# =====================================================
# 🔹 Initialize FastAPI
# =====================================================
app = FastAPI(title="AI Tools Suite")

# =====================================================
# 🔹 CORS Configuration
# =====================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL or "*"],  # Fallback for local testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================================
# 🔹 Utilities
# =====================================================
def chunk_text(text, chunk_size=4000):
    return [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]

def merge_extractions(extractions):
    merged = {
        "summary": "",
        "key_points": [],
        "keywords": [],
        "entities": {"people": [], "places": [], "organizations": []},
        "important_numbers": [],
        "action_items": []
    }
    for ext in extractions:
        merged["summary"] += ext.get("summary", "") + " "
        merged["key_points"] += ext.get("key_points", [])
        merged["keywords"] += ext.get("keywords", [])
        merged["entities"]["people"] += ext["entities"].get("people", [])
        merged["entities"]["places"] += ext["entities"].get("places", [])
        merged["entities"]["organizations"] += ext["entities"].get("organizations", [])
        merged["important_numbers"] += ext.get("important_numbers", [])
        merged["action_items"] += ext.get("action_items", [])
    return merged

async def extract_chunk(chunk, ai_client):
    prompt = f"""
You are a strict JSON extraction engine.
Extract structured data ONLY from the text below.
Return ONLY valid JSON. No markdown, code blocks, or explanations.

TEXT:
{chunk}

FORMAT:
{{
    "summary": "",
    "key_points": [],
    "keywords": [],
    "entities": {{
        "people": [],
        "places": [],
        "organizations": []
    }},
    "important_numbers": [],
    "action_items": []
}}
"""
    response = ai_client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {"role": "system", "content": "Return only valid JSON."},
            {"role": "user", "content": prompt},
        ],
    )
    try:
        return json.loads(response.choices[0].message.content)
    except json.JSONDecodeError:
        return {
            "summary": "",
            "key_points": [],
            "keywords": [],
            "entities": {"people": [], "places": [], "organizations": []},
            "important_numbers": [],
            "action_items": []
        }

async def fetch_text_from_url(url):
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                          "AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/120.0.0.0 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
        }
        async with httpx.AsyncClient(verify=False, timeout=40.0, headers=headers) as client:
            resp = await client.get(url)
            if resp.status_code != 200:
                return {"error": f"Failed to fetch URL: {resp.status_code}"}

            from bs4 import BeautifulSoup
            soup = BeautifulSoup(resp.text, "html.parser")
            for tag in soup(["script", "style", "noscript", "header", "footer", "nav"]):
                tag.decompose()

            text = soup.get_text(separator="\n", strip=True)
            text = "\n".join([line.strip() for line in text.splitlines() if line.strip()])
            return text
    except Exception as e:
        return {"error": f"Error fetching URL: {e}"}
    
    
# =====================================================
# 🔹 Routes
# =====================================================
@app.get("/")
async def home():
    """Basic health check."""
    return {"message": f"AI backend is running with {AI_PROVIDER.upper()} ({MODEL_NAME})"}


# =====================================================
# 🔹 CHAT ENDPOINT
# =====================================================
@app.post("/chat")
async def chat_endpoint(request: Request):
    """Chatbot conversational endpoint."""
    data = await request.json()
    user_message = data.get("message", "")

    if not user_message:
        return {"reply": "Please provide a message to chat."}

    try:
        client = openai.OpenAI(api_key=openai.api_key, base_url=openai.base_url, http_client=httpx.Client(verify=False))
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": "You are a helpful AI assistant that responds conversationally."},
                {"role": "user", "content": user_message},
            ],
        )
        reply = response.choices[0].message.content
        return {"reply": reply}

    except Exception as e:
        import traceback
        print("Chat Error Traceback:")
        traceback.print_exc()
        return {"reply": f"Error: Unable to connect to {AI_PROVIDER.upper()} ({str(e)})"}


# =====================================================
# 🔹 CONTENT GENERATOR ENDPOINT
# =====================================================
@app.post("/generate")
async def generate_content(request: Request):
    """Generate AI content based on topic, tone, and length."""
    data = await request.json()
    topic = data.get("topic")
    tone = data.get("tone", "neutral")
    length = int(data.get("length", 100))

    if not topic:
        return {"error": "Missing required field: topic"}

    try:
        client = openai.OpenAI(api_key=openai.api_key, base_url=openai.base_url, http_client=httpx.Client(verify=False))
        prompt = (
            f"Write a {tone} article about '{topic}' with around {length} words. "
            "Ensure it is creative, engaging, and well-structured."
        )

        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": "You are an AI content generation assistant."},
                {"role": "user", "content": prompt},
            ],
        )

        ai_content = response.choices[0].message.content
        return {"content": ai_content}

    except Exception as e:
        import traceback
        print("Generate Error Traceback:")
        traceback.print_exc()
        return {"error": f"Error generating content from {AI_PROVIDER.upper()}: {e}"}
    
# =====================================================
# 🔹 Data extraction endpoint
# =====================================================
@app.post("/extract")
async def extract_content(request: Request):
    data = await request.json()
    input_type = data.get("type", "text")
    content = data.get("content", "")
    file_name = data.get("name")

    if input_type in ["text", "url"] and not content:
        return {"error": f"Missing {input_type} content"}

    if input_type == "url":
        content = await fetch_text_from_url(content)
        if isinstance(content, dict) and content.get("error"):
            return content

    chunks = chunk_text(content, chunk_size=4000)

    ai_client = openai.OpenAI(api_key=openai.api_key, base_url=openai.base_url,
                              http_client=httpx.Client(verify=False))
    partial_results = []
    for i, chunk in enumerate(chunks):
        try:
            partial_json = await extract_chunk(chunk, ai_client)
            partial_results.append(partial_json)
        except Exception as e:
            return {"error": f"Chunk {i+1} processing failed: {e}"}

    final_json = merge_extractions(partial_results)
    final_json["input_type"] = input_type
    final_json["file_name"] = file_name
    final_json["url"] = data.get("content") if input_type == "url" else ""
    if input_type == "url":
        final_json["url_summary"] = f"Website '{data.get('content')}' processed successfully."
    if input_type == "file" and file_name:
        final_json["file_summary"] = f"File '{file_name}' processed successfully."

    return final_json

# =====================================================
# 🔹 Start server
# =====================================================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "127.0.0.1"),
        port=int(os.getenv("PORT", 8002)),
        reload=True
    )
