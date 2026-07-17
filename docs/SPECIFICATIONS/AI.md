# AI — Business Specification

## Objective
Leverage artificial intelligence to provide predictive insights, automate data entry, and enhance decision-making across all modules.

## Actors
- All users (consume AI features)
- Admin (configure AI settings)
- Data scientist (train models — future)

## AI Features

### Demand Forecasting
- Predict future product demand at SKU-branch level.
- Time horizon: 30, 60, 90 days.
- Factors: historical sales, seasonality, promotions, trends.
- Output: expected quantity + confidence interval.
- Use cases: reorder planning, stock optimization, markdown decisions.

### Client Insights
- **Next-best-action**: Recommend the best action for each customer (call, email, offer).
- **Churn prediction**: Identify customers likely to stop buying.
- **Customer lifetime value (CLV)**: Predict total value of a customer.
- **Segmentation**: Automatically group customers by behavior.
- **Product recommendation**: Suggest products based on purchase history.

### Document OCR
- Extract data from supplier invoices (auto-create PO).
- Extract data from customer purchase orders.
- Extract data from receipts and bills.
- Supported formats: PDF, JPEG, PNG.
- Fallback: manual entry if confidence < 90%.

### Smart Search
- Semantic search across products, customers, orders, and invoices.
- Understands natural language: "red dress by Gucci under $2000".
- Returns ranked results with relevance score.
- Supports typos and synonyms.

### Anomaly Detection
- Detect unusual stock movements (possible theft).
- Detect unusual discount patterns (possible fraud).
- Detect unusual order patterns (possible test/abuse).
- Alerts are sent to admin for review.

## Business Rules
- All AI features have confidence scores shown to the user.
- Users can accept or reject AI suggestions.
- AI models are retrained monthly.
- Training data never leaves the company's data boundary.
- AI features can be disabled per company.
- Predictions are stored and tracked for accuracy measurement.

## Accuracy Tracking
| Feature | Target Accuracy | Minimum |
|---------|----------------|---------|
| Demand forecast | 85% | 70% |
| Churn prediction | 80% | 65% |
| OCR extraction | 95% | 85% |
| Anomaly detection | 90% | 80% |
