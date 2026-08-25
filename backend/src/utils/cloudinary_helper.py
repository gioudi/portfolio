import os

import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url

# The SDK is configured here (not only in config.py) because this module is
# the single entry point used by controllers/services at request time.
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
)

def upload_image_to_cloudinary(file_path: str): 
    try:
        response = cloudinary.uploader.upload(file_path)
        return response['secure_url']
    except Exception as e:
        print(f"Error uploading to Cloudinary: {str(e)}")
        return None
def get_cloudinary_url(public_id:str):
    url, _ = cloudinary_url(public_id)
    return url

def upload_stream_to_cloudinary(stream, resource_type: str = "image"):
    """Upload an in-memory file stream (multipart form upload) to Cloudinary."""
    try:
        response = cloudinary.uploader.upload(stream, resource_type=resource_type)
        return response["secure_url"]
    except Exception as e:
        print(f"Error uploading to Cloudinary: {str(e)}")
        return None