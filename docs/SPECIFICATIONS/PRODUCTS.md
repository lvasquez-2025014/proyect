# Products — Business Specification

## Objective
Manage the product catalog with rich attributes, variations, pricing, and media — designed for luxury goods.

## Actors
- Product manager
- Inventory manager
- Sales associate

## Use Cases
- Create product (SKU, name, description, price, cost, tax, images)
- Edit product details
- Delete product (soft delete)
- Activate / deactivate product
- Duplicate product
- Search products (by SKU, name, barcode, category)
- Scan barcode (camera / scanner)
- Manage variants (size, color, material)
- Manage product images (upload, reorder, set primary)
- Set product categories and brands
- Manage product lots and serial numbers
- View product history (changes, movements, sales)

## Business Rules
- SKU must be unique within a company.
- A product can have unlimited variants.
- Each variant has its own SKU and price adjustment.
- A product cannot be deleted if it has stock or open orders.
- Deactivating a product hides it from sales but keeps existing data.
- Base price is in company's default currency.
- Tax rate is a decimal (e.g., 0.21 for 21% VAT).
- Product images must be high resolution (min 1200px).
- Product description supports rich text (limited HTML).

## Product Attributes
| Attribute | Type | Required |
|-----------|------|----------|
| SKU | string | yes |
| Name | string | yes |
| Description | text | no |
| Barcode | string | no |
| Category | UUID | yes |
| Brand | UUID | no |
| Base price | decimal | yes |
| Cost price | decimal | no |
| Tax rate | decimal | yes |
| Unit | string | yes |
| Weight | decimal | no |
| Status | enum | yes |

## Variant Attributes (examples)
- Size: XS, S, M, L, XL
- Color: Red, Black, Gold, Silver
- Material: Leather, Silk, Cotton, Wool
- Any custom attribute is supported via JSON.

## States
```
Draft → Active → Inactive
Active → Discontinued
```
