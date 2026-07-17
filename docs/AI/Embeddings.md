# AI — Embeddings

## Estrategia

Usamos embeddings vectoriales para búsqueda semántica y clustering de productos, clientes, y documentos.

## Stack

| Componente | Tecnología |
|------------|-----------|
| Embedding model | `text-embedding-3-small` (OpenAI) / `bge-small-en-v1.5` (local) |
| Vector database | PostgreSQL + pgvector |
| Dimensiones | 1536 (OpenAI) / 384 (BGE) |
| Distancia | Cosine similarity |

## Qué Indexamos

| Entidad | Texto a Embedder | Uso |
|---------|-----------------|-----|
| Productos | `name + " " + description + " " + category + " " + brand` | Búsqueda semántica de productos |
| Clientes | `name + " " + company + " " + notes + " " + tags` | Smart search de CRM |
| Órdenes | `orderNumber + " " + customerName + " " + status` | Búsqueda de órdenes |
| Documentos | Contenido completo | Búsqueda en docs técnicos |

## Pipeline

```
Entity created/updated
  → EmbeddingService.generateEmbedding(text)
  → VectorRepository.save(entityId, embedding)
  
Search query
  → EmbeddingService.generateEmbedding(query)
  → VectorRepository.search(queryEmbedding, limit=20)
  → Combine with keyword search (hybrid)
  → Ranked results
```

## Almacenamiento

```sql
CREATE TABLE ai.embeddings (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL,   -- 'product', 'customer', 'order', 'document'
    entity_id   UUID NOT NULL,
    embedding   VECTOR(1536) NOT NULL,
    chunk_index INT DEFAULT 0,          -- For documents split into chunks
    content     TEXT,                   -- Original text (for debugging)
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(entity_type, entity_id, chunk_index)
);

CREATE INDEX idx_embeddings_vector ON ai.embeddings USING hnsw (embedding vector_cosine_ops);
```

## Reglas

- Los embeddings se generan de forma asíncrona después de crear/actualizar la entidad
- Se regeneran cuando el contenido relevante cambia
- El índice HNSW se reconstruye periódicamente para mantener performance
- Soporte multi-idioma (Spanish + English para catálogo de lujo)
