# AI — OCR

## Estrategia

Extracción automática de datos de documentos escaneados: facturas de proveedores, órdenes de compra de clientes, recibos.

## Stack

| Componente | Tecnología | Uso |
|------------|-----------|-----|
| OCR Engine | Tesseract 5 + PaddleOCR | Extracción de texto de imágenes/PDF |
| Document parsing | LayoutLMv3 (fine-tuned) | Estructura de documentos comerciales |
| Post-processing | Reglas + LLM | Corrección y estructuración de datos extraídos |
| Preprocessing | OpenCV | Mejora de imagen (rotación, contraste, ruido) |

## Pipeline

```
Documento PDF/Imagen
  → Preprocessing (deskew, denoise, binarize)
  → OCR (Tesseract / PaddleOCR)
  → Layout Analysis (LayoutLM → identificar campos)
  → Field Extraction (reglas + regex)
  → LLM Validation (corregir errores, estructurar)
  → Confidence Check
    → if > 90%: auto-create en ERP
    → if 70-90%: sugerir al usuario
    → if < 70%: marcar para revisión manual
```

## Documentos Soportados

| Tipo | Campos Extraídos | Acción en ERP |
|------|-----------------|---------------|
| Factura proveedor | supplier, date, lines[], totals, tax | Crear/confirmar PO |
| Orden de compra cliente | customer, po_number, lines[], totals | Crear orden de venta |
| Recibo / ticket | date, amount, vendor | Crear gasto |
| Carta porte | origin, destination, items | Logística |

## Confianza y Supervisión

| Rango | Acción |
|-------|--------|
| 95-100% | Automático, sin revisión |
| 85-94% | Automático + notificación "revisar" |
| 70-84% | Sugerencia al usuario con resaltado de campos dudosos |
| < 70% | Rechazar, solicitar documento limpio |

## Reglas

- Los documentos procesados se almacenan en MinIO (no en DB)
- El resultado del OCR se guarda como JSON en `ai.ocr_results` para auditoría
- El modelo se re-entrena trimestralmente con datos corregidos por usuarios
- Los documentos con información sensible se procesan in-house (no APIs externas)
