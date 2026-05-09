# rag-ingestion/ingest.py
import os
import sys
from pdf_parser import parse_pdf, chunk_text
from embedder import generate_embeddings
from qdrant_upserter import QdrantUpserter

def main():
    # Configuration
    pdf_path = os.path.join("..", "course content", "Sebi", "SEBI - Investor Certification Examination - Financial Education Booklet.pdf")
    collection_name = "tradewise_knowledge"
    
    if not os.path.exists(pdf_path):
        print(f"PDF not found: {pdf_path}")
        # Try finding any PDF in the folder if the specific one is missing
        folder = os.path.join("..", "course content", "Sebi")
        pdfs = [f for f in os.listdir(folder) if f.endswith(".pdf")]
        if pdfs:
            pdf_path = os.path.join(folder, pdfs[0])
            print(f"Using alternative PDF: {pdf_path}")
        else:
            return

    print(f"Processing: {pdf_path}")
    
    # 1. Parse
    text = parse_pdf(pdf_path)
    if not text:
        print("No text extracted.")
        return
    
    chunks = chunk_text(text)
    print(f"Created {len(chunks)} chunks.")
    
    # 2. Embed
    print("Generating embeddings (this may take a minute)...")
    embeddings = generate_embeddings(chunks)
    
    # 3. Upsert
    upserter = QdrantUpserter(collection_name=collection_name)
    upserter.ensure_collection()
    upserter.upsert_chunks(chunks, embeddings, metadata={"source": os.path.basename(pdf_path)})
    
    print("✓ Ingestion complete.")

if __name__ == "__main__":
    main()
