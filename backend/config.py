import os
from dotenv import load_dotenv
import cloudinary

# Load enviroment variables from .env

load_dotenv()

class Config: 
    CLOUDINARY_NAME = os.getenv('CLOUDINARY_NAME')
    CLOUDINARY_API_KEY = os.getenv('CLOUDINARY_API_KEY')
    CLOUDINARY_API_SECRET = os.getenv('CLOUDINARY_API_SECRET')


cloudinary.config(
    cloud_name = Config.CLOUDINARY_NAME,
    api_key = Config.CLOUDINARY_API_KEY,
    api_secret = Config.CLOUDINARY_API_SECRET
)
