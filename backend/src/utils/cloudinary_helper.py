import cloudinary.uploader
from cloudinary.utils import cloudinary_url

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
        
  