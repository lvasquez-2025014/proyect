# AI — Vector Database

## Tecnología: PostgreSQL + pgvector

Usamos pgvector en lugar de una vector database externa (Pinecone, Weaviate, Qdrant) por simplicidad operativa.

## Configuración

```sql
-- Instalar extensión
CREATE EXTENSION vector;

-- Schema para AI
CREATE SCHEMA ai;
```

## Índices

| Tipo | Cuándo usar |
|------|-------------|
| `IVFFlat` | Hasta 1M vectores, rápida construcción |
| `HNSW` | > 1M vectores, mejor recall, construcción más lenta |
| Hierarchical Navigable Small Worlds | Preferido para producción |

## Estrategia de Indexación

```sql
-- Para < 100K vectors: IVFFlat con listas = sqrt(n)
CREATE INDEX idx_embeddings_ivf ON ai.embeddings 
USING ivfflat (embedding vector_cosine_ops) WITH (lists = 300);

-- Para > 100K vectors: HNSW
CREATE INDEX idx_embeddings_hnsw ON ai.embeddings 
USING hnsw (embedding vector_cosine_ops);
```

## Búsqueda Híbrida

Combinamos búsqueda vectorial (semántica) con búsqueda textual (keyword) usando RRF (Reciprocal Rank Fusion):

```sql
WITH semantic AS (
    SELECT entity_id, 1.0 / (row_number() OVER ()) AS score
    FROM ai.embeddings
    ORDER BY embedding <=> $query_embedding
    LIMIT 20
),
keyword AS (
    SELECT id AS entity_id, 1.0 / (row_number() OVER ()) AS score
    FROM inventory.products
    WHERE search_vector @@ plainto_tsquery('spanish', $query_text)
    LIMIT 20
)
SELECT entity_id, SUM(score) AS rrf_score
FROM (
    SELECT * FROM semantic
    UNION ALL
    SELECT * FROM keyword
) combined
GROUP BY entity_id
ORDER BY rrf_score DESC
LIMIT 20;
```

## Mantenimiento

- `REINDEX INDEX CONCURRENTLY` mensual para IVFFlat
- Reconstruir embeddings cuando el modelo de embedding cambia
- Monitorear tamaño de tabla (`pg_total_relation_size`)
- Backup de la tabla `ai.embeddings` incluido en el backup general de la DB
