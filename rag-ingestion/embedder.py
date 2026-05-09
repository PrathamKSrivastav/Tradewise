# rag-ingestion/embedder.py
from sentence_transformers import SentenceTransformer
from typing import List

_model = None

def get_model():
    global _model
    if _model is None:
        # Using a fast and small model suitable for local RAG
        _model = SentenceTransformer('all-MiniLM-L6-v2')
    return _model

def generate_embeddings(texts: List[str]) -> List[List[float]]:
    """Generates vector embeddings for a list of strings."""
    model = get_model()
    embeddings = model.encode(texts)
    return embeddings.tolist()
