# gateway/app/rag/qdrant_client.py
from qdrant_client import QdrantClient
from app.config import settings

_client = None

def get_qdrant_client():
    global _client
    if _client is None:
        # Use localhost for local dev if not in docker, or settings.qdrant_url
        url = settings.qdrant_url
        if "qdrant" in url and "localhost" not in url:
            # Check if reachable, else fallback to localhost
            import socket
            try:
                # Basic check to see if we can resolve 'qdrant'
                socket.gethostbyname("qdrant")
            except socket.gaierror:
                url = "http://localhost:6333"
        
        _client = QdrantClient(url=url)
    return _client

async def search_knowledge(query_vector: list[float], collection_name: str = "tradewise_knowledge", limit: int = 3):
    """Searches for relevant chunks in Qdrant."""
    client = get_qdrant_client()
    try:
        results = client.search(
            collection_name=collection_name,
            query_vector=query_vector,
            limit=limit,
        )
        return [r.payload.get("text", "") for r in results]
    except Exception as e:
        print(f"Qdrant search error: {e}")
        return []
