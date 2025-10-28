from openai import OpenAI
from app.core.config import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)


def extract_field_from_document(document_text):
    """
    Use LLM to extract specific field from document text.

    Args:
        document_text: Text from the document

    Returns:
        str: Extracted field value
    """

    prompt = f"Extract the data from the following documents:\n\n{document_text}"

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that extracts structured data from documents."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=500,
        temperature=0.3
    )
    return response.choices[0].message.content.strip()
