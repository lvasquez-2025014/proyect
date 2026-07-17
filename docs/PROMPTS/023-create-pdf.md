# Prompt: Create PDF

```
Create a PDF generation function for {documentType}.

## Location (Backend)
services/backend/src/main/java/com/luxury/{module}/infrastructure/pdf/{Document}PdfGenerator.java

## Technology
- Thymeleaf + Flying Saucer (HTML → PDF)
- Or iText 7 (for complex layouts)

## Structure
public class {Document}PdfGenerator {
    public byte[] generate({Entity} data) {
        var context = new Context();
        context.setVariable("data", data);
        context.setVariable("company", companySettings);
        String html = templateEngine.process("{module}/{document}", context);
        return PdfRenderer.render(html);
    }
}

## Template Location
services/backend/src/main/resources/templates/{module}/{document}.html

## Content
- Company logo and branding
- Document number and date
- Customer/supplier information
- Line items table
- Totals section
- Footer with legal notes
- QR code for verification (future)

## Rules
- PDF generation is async (not in HTTP request thread)
- Use company branding (colors, logo, fonts from BRANDING/)
- Responsive table layout (survives PDF conversion)
- Page numbers and total pages
- Generate and store in MinIO, return URL
```
