from flask import request, jsonify
from services.media_service import MediaService

media_service = MediaService()

def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    file = request.files['file']
    
    file_path = f"/tmp/{file.filename}"
    file.save(file_path)
    
    
    
    image_url = media_service.upload_image(file_path)
    
    if image_url: 
        return jsonify({"image_url": image_url}), 200
    else:
        return jsonify({"error": "Failed to upload image"}), 500