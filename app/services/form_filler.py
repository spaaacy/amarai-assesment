import requests
from app.core.config import settings

def fill_form(extracted_data):
    """
    Fill out the form with extracted data.

    Args:
        extracted_data: Dictionary containing extracted data

    Returns:
        bool: True if form was filled successfully, False otherwise
    """
    # TODO: Implement form filler
    form_url = settings.FORM_URL

    return True
