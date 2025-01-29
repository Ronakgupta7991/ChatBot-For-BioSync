import google.generativeai as genai
from app.config.settings import settings

class GeminiHandler:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-pro')

    def generate_response(self, query: str, vital_signs: dict = None) -> str:
        try:
            # Construct prompt with vital signs if available
            if vital_signs:
                vital_info = ", ".join(f"{k}: {v}" for k, v in vital_signs.items())
                prompt = f"""Context: User's vital signs: {vital_info}
                           Query: {query}
                           Please provide relevant health information based on these vitals."""
            else:
                prompt = query

            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"Error generating response: {str(e)}"

    async def generate_response_stream(self, query: str, vital_signs: dict = None):
        try:
            if vital_signs:
                vital_info = ", ".join(f"{k}: {v}" for k, v in vital_signs.items())
                prompt = f"Context: User's vital signs: {vital_info}\nQuery: {query}"
            else:
                prompt = query

            response = await self.model.generate_content(prompt, stream=True)
            async for chunk in response:
                yield chunk.text
        except Exception as e:
            yield f"Error generating response: {str(e)}"