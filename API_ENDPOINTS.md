# API Endpoints Documentation

## Available Endpoints

### 1. GET `/`
- **Location:** app/main.py:9
- **Purpose:** Root endpoint / health check
- **Returns:** `{"message": "Welcome to the Document Processing API"}`
- **Usage:** Verify the API is running

### 2. POST `/process-documents`
- **Location:** app/api/routes.py:25
- **Purpose:** Upload and process Ocean Shipment Form documents to extract structured data using AI
- **Accepts:** Multiple files (supports PDF and Excel files)
- **What it does:**
  1. Accepts uploaded files
  2. Saves them temporarily
  3. Extracts text from documents:
     - PDFs: app/utils/pdf_utils.py
     - Excel: app/utils/excel_utils.py:33
  4. Uses OpenAI LLM to extract specific fields from Ocean Shipment Forms (app/services/llm_service.py:8)
  5. Returns structured data with extracted fields
  6. Cleans up temporary files
- **Returns:** Structured `OceanShipmentData` object (app/api/routes.py:13) containing:
  - `bill_of_lading_number`: Bill of lading number from the shipment form
  - `container_number`: Container number
  - `consignee_name`: Name of the consignee
  - `consignee_address`: Address of the consignee
  - `date_of_export`: Export date in mm/dd/yyyy format
  - `line_items_count`: Number of line items (integer)
  - `average_gross_weight`: Average gross weight with unit
  - `average_price`: Average price with currency
- **Use case:** Upload Ocean Shipment Form documents (PDF or Excel) to automatically extract and structure key shipment information

## How to Test

You can test these endpoints at:
- **Interactive docs:** http://localhost:8000/docs (Swagger UI - can upload files directly)
- **Alternative docs:** http://localhost:8000/redoc

## Notes

- The `/process-documents` endpoint requires an OpenAI API key (app/services/llm_service.py:5)
- Configure your OpenAI API key in app/core/config.py or via environment variables before using the document processing functionality
- The LLM uses GPT-3.5-turbo model for field extraction with JSON mode enabled for structured output
