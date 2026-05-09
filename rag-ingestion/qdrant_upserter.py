# rag-ingestion/qdrant_upserter.py
import uuid
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from typing import List, Dict

class QdrantUpserter:
    def __init__(self, host: str = "localhost", port: int = 6333, collection_name: str = "tradewise_rag"):
        self.client = QdrantClient(host=host, port=port)
        self.collection_name = collection_name
        self.vector_size = 384  # Size for all-MiniLM-L6-v2

    def ensure_collection(self):
        """Creates the collection if it doesn't exist."""
        collections = self.client.get_collections().collections
        exists = any(c.name == self.collection_name for c in collections)
        
        if not exists:
            print(f"Creating collection: {self.collection_name}")
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(size=self.vector_size, distance=Distance.COSINE),
            )
        else:
            print(f"Collection {self.collection_name} already exists.")

    def upsert_chunks(self, chunks: List[str], embeddings: List[List[float]], metadata: Dict = None):
        """Upserts text chunks and their embeddings into Qdrant."""
        points = []
        for i, (chunk, vector) in enumerate(zip(chunks, embeddings)):
            point_id = str(uuid.uuid4())
            payload = {"text": chunk}
            if metadata:
                payload.update(metadata)
            
            points.append(PointStruct(id=point_id, vector=vector, payload=payload))
        
        self.client.upsert(collection_name=self.collection_name, points=points)
        print(f"Upserted {len(points)} points to {self.collection_name}")
