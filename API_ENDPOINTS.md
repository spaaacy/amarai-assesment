# API Endpoints Documentation

## Available Endpoints

### 1. GET `/`
- **Location:** app/main.py:9
- **Purpose:** Root endpoint / health check
- **Returns:** `{"message": "Welcome to the Document Processing API"}`
- **Usage:** Verify the API is running

### 2. POST `/process-documents`
- **Location:** app/api/routes.py:11
- **Purpose:** Upload and process documents to extract data using AI
- **Accepts:** Multiple files (currently supports PDF files)
- **What it does:**
  1. Accepts uploaded files
  2. Saves them temporarily
  3. Extracts text from PDFs (app/services/document_processor.py:18)
  4. Uses OpenAI LLM to extract and analyze data (app/services/llm_service.py:7)
  5. Returns the extracted data
  6. Cleans up temporary files
- **Returns:** `{"extracted_data": <extracted text>}`
- **Use case:** Upload invoices, forms, or documents to automatically extract structured data

## How to Test

You can test these endpoints at:
- **Interactive docs:** http://localhost:8000/docs (Swagger UI - can upload files directly)
- **Alternative docs:** http://localhost:8000/redoc

## Notes

- The `/process-documents` endpoint currently has an empty API key (app/services/llm_service.py:4)
- Configure your OpenAI API key before using the document processing functionality
