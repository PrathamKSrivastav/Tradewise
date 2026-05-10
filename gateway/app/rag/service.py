# gateway/app/rag/service.py
from sentence_transformers import SentenceTransformer
from app.rag.qdrant_client import search_knowledge
from typing import List

_model = None

def get_embedder():
    global _model
    if _model is None:
        _model = SentenceTransformer('all-MiniLM-L6-v2')
    return _model

def preload_embedder():
    """Initializes the model in memory."""
    get_embedder()

async def get_relevant_context(question: str) -> str:
    """Fetches relevant chunks from Qdrant based on the question."""
    try:
        model = get_embedder()
        query_vector = model.encode(question).tolist()
        
        # Increased limit slightly but we will rely on prompt grounding
        chunks = await search_knowledge(query_vector, limit=4)
        if not chunks:
            return ""
        
        # Filter out very short/noise chunks if any
        valid_chunks = [c.strip() for c in chunks if len(c.strip()) > 50]
        if not valid_chunks:
            return ""

        context_header = "--- EDUCATIONAL KNOWLEDGE BASE (SEBI CERTIFICATION) ---\n"
        return context_header + "\n\n---\n\n".join(valid_chunks)
    except Exception as e:
        print(f"Error fetching RAG context: {e}")
        return ""
