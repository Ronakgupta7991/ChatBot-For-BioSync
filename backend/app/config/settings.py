from pydantic import BaseSettings

class Settings(BaseSettings):
    GEMINI_API_KEY: str
    ALLOWED_ORIGINS: str

    class Config:
        env_file = ".env"

settings = Settings()