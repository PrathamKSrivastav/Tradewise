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
        
        chunks = await search_knowledge(query_vector)
        if not chunks:
            return ""
        
        return "\n---\n".join(chunks)
    except Exception as e:
        print(f"Error fetching RAG context: {e}")
        return ""
