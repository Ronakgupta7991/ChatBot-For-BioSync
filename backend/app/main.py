from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from app.models.schemas import HealthQuery, ChatResponse
from app.services.gemini_handler import GeminiHandler
from app.config.settings import settings

app = FastAPI()
gemini_handler = GeminiHandler()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(health_query: HealthQuery):
    response = await gemini_handler.generate_response(
        health_query.query,
        health_query.vital_signs
    )
    return ChatResponse(response=response)

@app.post("/chat/stream")
async def chat_stream_endpoint(health_query: HealthQuery):
    return StreamingResponse(
        gemini_handler.generate_response_stream(
            health_query.query,
            health_query.vital_signs
        ),
        media_type="text/event-stream"
    )