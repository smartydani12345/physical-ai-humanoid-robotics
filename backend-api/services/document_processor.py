import os
import asyncio
from pathlib import Path
from typing import List, Dict, Any
import logging
import re
from qdrant_client import QdrantClient
from qdrant_client.http import models
import cohere
from dataclasses import dataclass
from config import settings

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class DocumentChunk:
    id: str
    content: str
    metadata: Dict[str, Any]

class DocumentProcessor:
    def __init__(self):
        # Initialize Cohere client for embeddings
        self.cohere_client = cohere.Client(settings.cohere_api_key)

        # Initialize Qdrant client
        self.qdrant_client = QdrantClient(
            url=settings.qdrant_url,
            api_key=settings.qdrant_api_key,
        )

        # Collection name for textbook content
        self.collection_name = settings.qdrant_collection_name

        # Ensure collection exists
        self._ensure_collection_exists()

    def _ensure_collection_exists(self):
        """Ensure the Qdrant collection exists with the correct configuration"""
        try:
            # Check if collection exists
            collections = self.qdrant_client.get_collections()
            collection_names = [collection.name for collection in collections.collections]

            if self.collection_name not in collection_names:
                # Create collection with specified payload schema
                self.qdrant_client.create_collection(
                    collection_name=self.collection_name,
                    vectors_config=models.VectorParams(
                        size=1024,  # Cohere embed v3 has 1024 dimensions
                        distance=models.Distance.COSINE
                    )
                )
                logger.info(f"Created Qdrant collection: {self.collection_name}")
            else:
                logger.info(f"Qdrant collection exists: {self.collection_name}")
        except Exception as e:
            logger.error(f"Error ensuring collection exists: {str(e)}")
            raise

    def _extract_chapter_info(self, file_path: str) -> Dict[str, str]:
        """Extract chapter information from file path"""
        path_parts = Path(file_path).parts
        chapter_info = {}

        # Look for chapter patterns in the path
        for part in path_parts:
            if 'chapter' in part.lower():
                # Extract chapter number from filename like 'chapter-1.md'
                match = re.search(r'chapter-(\d+)', part.lower())
                if match:
                    chapter_info['chapter'] = f"Chapter {match.group(1)}"
                    chapter_info['section'] = os.path.splitext(part)[0]
                    break

        if not chapter_info:
            chapter_info['chapter'] = 'General'
            chapter_info['section'] = os.path.splitext(os.path.basename(file_path))[0]

        return chapter_info

    def _chunk_text(self, text: str, chunk_size: int = 1000, overlap: int = 100) -> List[str]:
        """Split text into overlapping chunks"""
        chunks = []

        # Split text into sentences to avoid cutting in the middle of sentences
        sentences = re.split(r'(?<=[.!?])\s+', text)

        current_chunk = ""
        for sentence in sentences:
            # If adding the next sentence would exceed chunk size
            if len(current_chunk) + len(sentence) > chunk_size and current_chunk:
                chunks.append(current_chunk.strip())

                # Create overlapping chunk
                if overlap > 0:
                    # Find the last 'overlap' characters from the current chunk
                    overlap_text = current_chunk[-overlap:]
                    current_chunk = overlap_text + " " + sentence
                else:
                    current_chunk = sentence
            else:
                current_chunk += " " + sentence if current_chunk else sentence

        # Add the last chunk if it has content
        if current_chunk.strip():
            chunks.append(current_chunk.strip())

        # Filter out very short chunks
        chunks = [chunk for chunk in chunks if len(chunk) > 50]

        return chunks

    def _read_docusaurus_file(self, file_path: str) -> str:
        """Read and extract content from a Docusaurus markdown file, excluding frontmatter"""
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()

        # Remove frontmatter if present (content between --- delimiters at the start)
        if content.startswith('---'):
            # Find the end of frontmatter
            parts = content.split('---', 2)
            if len(parts) >= 3:
                content = parts[2]  # Take content after the second ---

        # Remove any other markdown artifacts that might interfere with content
        # Keep only the main content, removing special Docusaurus syntax if needed
        return content.strip()

    def _generate_embeddings(self, texts: List[str]) -> List[List[float]]:
        """Generate embeddings for a list of texts using Cohere"""
        try:
            response = self.cohere_client.embed(
                texts=texts,
                model="embed-english-v3.0",
                input_type="search_document"  # Use search_document for documents being indexed
            )
            return response.embeddings
        except Exception as e:
            logger.error(f"Error generating embeddings: {str(e)}")
            raise

    async def process_docusaurus_docs(self, docs_dir: str = "my-website/docs/my-book"):
        """Process all Docusaurus markdown files and index them in Qdrant"""
        logger.info(f"Starting to process Docusaurus documents from {docs_dir}")

        # Get all markdown files in the docs directory
        docs_path = Path(docs_dir)
        if not docs_path.exists():
            logger.error(f"Docs directory does not exist: {docs_dir}")
            return False

        markdown_files = list(docs_path.glob("*.md"))
        logger.info(f"Found {len(markdown_files)} markdown files to process")

        all_chunks = []

        for file_path in markdown_files:
            logger.info(f"Processing file: {file_path}")

            try:
                # Read the markdown file content
                content = self._read_docusaurus_file(str(file_path))

                # Extract chapter information
                chapter_info = self._extract_chapter_info(str(file_path))

                # Create source URL based on Docusaurus structure
                relative_path = str(file_path.relative_to(docs_path.parent))
                source_url = f"/docs/my-book/{os.path.splitext(os.path.basename(file_path))[0]}"

                # Chunk the content
                chunks = self._chunk_text(content)

                # Create document chunks with metadata
                import uuid
                for i, chunk in enumerate(chunks):
                    # Use UUID for Qdrant compatibility
                    chunk_id = str(uuid.uuid4())

                    document_chunk = DocumentChunk(
                        id=chunk_id,
                        content=chunk,
                        metadata={
                            "text": chunk,
                            "chapter": chapter_info.get('chapter', 'Unknown'),
                            "section": chapter_info.get('section', file_path.stem),
                            "source_url": source_url,
                            "file_path": str(file_path),
                            "chunk_index": i,
                            "original_id": f"{file_path.stem}_chunk_{i}"  # Keep original ID for reference
                        }
                    )

                    all_chunks.append(document_chunk)

            except Exception as e:
                logger.error(f"Error processing file {file_path}: {str(e)}")
                continue

        logger.info(f"Created {len(all_chunks)} document chunks for indexing")

        if not all_chunks:
            logger.warning("No content was processed. Check if the docs directory contains valid files.")
            return False

        # Batch process embeddings and upload to Qdrant
        batch_size = 50  # Process in batches to avoid rate limits

        for i in range(0, len(all_chunks), batch_size):
            batch = all_chunks[i:i + batch_size]
            logger.info(f"Processing batch {i//batch_size + 1} of {(len(all_chunks)-1)//batch_size + 1}")

            try:
                # Extract text content for embedding generation
                texts = [chunk.content for chunk in batch]

                # Generate embeddings
                embeddings = self._generate_embeddings(texts)

                # Prepare points for Qdrant
                points = []
                for j, (chunk, embedding) in enumerate(zip(batch, embeddings)):
                    point = models.PointStruct(
                        id=chunk.id,
                        vector=embedding,
                        payload=chunk.metadata
                    )
                    points.append(point)

                # Upload batch to Qdrant
                self.qdrant_client.upsert(
                    collection_name=self.collection_name,
                    points=points,
                    wait=True  # Wait for the operation to complete
                )

                logger.info(f"Successfully uploaded batch of {len(points)} points to Qdrant")

            except Exception as e:
                logger.error(f"Error processing batch: {str(e)}")
                continue

        logger.info(f"Successfully processed and indexed {len(all_chunks)} document chunks")
        return True

    def get_collection_stats(self) -> Dict[str, Any]:
        """Get statistics about the collection"""
        try:
            collection_info = self.qdrant_client.get_collection(self.collection_name)
            return {
                "collection_name": self.collection_name,
                "vector_count": collection_info.points_count,
                "status": "healthy"
            }
        except Exception as e:
            logger.error(f"Error getting collection stats: {str(e)}")
            return {
                "collection_name": self.collection_name,
                "vector_count": 0,
                "status": "error",
                "error": str(e)
            }

    async def reindex_all_documents(self, docs_dir: str = "my-website/docs/my-book"):
        """Clear existing collection and reindex all documents"""
        logger.info("Starting reindexing process...")

        try:
            # Delete existing collection if it exists
            try:
                self.qdrant_client.delete_collection(self.collection_name)
                logger.info(f"Deleted existing collection: {self.collection_name}")
            except Exception as e:
                logger.info(f"Collection may not have existed, continuing: {str(e)}")

            # Recreate collection
            self._ensure_collection_exists()

            # Process and index documents
            success = await self.process_docusaurus_docs(docs_dir)

            if success:
                stats = self.get_collection_stats()
                logger.info(f"Reindexing completed. Collection stats: {stats}")
                return stats
            else:
                logger.error("Reindexing failed during document processing")
                return {"status": "error", "message": "Document processing failed"}

        except Exception as e:
            logger.error(f"Error during reindexing: {str(e)}")
            return {"status": "error", "message": str(e)}

# Example usage
async def main():
    processor = DocumentProcessor()

    # Process all Docusaurus docs
    success = await processor.process_docusaurus_docs()

    if success:
        stats = processor.get_collection_stats()
        print(f"Indexing completed successfully! Stats: {stats}")
    else:
        print("Indexing failed!")

if __name__ == "__main__":
    asyncio.run(main())