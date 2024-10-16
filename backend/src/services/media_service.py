from utils.cloudinary_helper import upload_image_to_cloudinary

class MediaService:
    def upload_image(self, file_path: str)-> str:
        return upload_image_to_cloudinary(file_path)