from flask import request, jsonify
from services.project_service import ProjectService
from repositories.project_repository import ProjectRepository
from models.database import Session
from utils.auth_decorator import token_required
from utils.validators import validate_required_fields, validate_string_length, validate_url, sanitize_dict
from utils.cloudinary_helper import upload_stream_to_cloudinary

session = Session()

project_repository = ProjectRepository(session)

project_service = ProjectService(project_repository)

STRING_FIELDS = ['name', 'description', 'link', 'responsibilities']


def _parse_multipart_payload():
    """The admin form posts multipart/form-data (FilePond files attached).

    Text fields arrive in request.form; images/video as file streams that we
    push straight to Cloudinary and convert into the same shape as JSON calls.
    """
    data = {
        "name": request.form.get("name", ""),
        "description": request.form.get("description", ""),
        "link": request.form.get("link", ""),
        "responsibilities": request.form.get("responsibilities", ""),
        "technologies": [t for t in request.form.getlist("technologies") if t],
        "tags": [t for t in request.form.getlist("tags") if t],
        "images": [],
        "videos": [],
    }

    raw_type = request.form.get("project_type_id", "")
    try:
        data["project_type_id"] = int(raw_type)
    except (TypeError, ValueError):
        data["project_type_id"] = raw_type

    for image_file in request.files.getlist("images"):
        url = upload_stream_to_cloudinary(image_file.stream)
        if url:
            data["images"].append({"url": url})

    video_file = request.files.get("video")
    if video_file:
        url = upload_stream_to_cloudinary(video_file.stream, resource_type="video")
        if url:
            data["videos"].append({"url": url})

    return data


@token_required
def create_project(user_id):

    is_json = bool(request.content_type) and "application/json" in request.content_type
    data = request.get_json(silent=True) if is_json else _parse_multipart_payload()

    if not isinstance(data, dict):
        return jsonify({"message": "Invalid request body"}), 400

    valid, error = validate_required_fields(data, ['name', 'link', 'project_type_id', 'technologies', 'tags'])
    if not valid:
        return jsonify({"message": error}), 400

    data = sanitize_dict(data, STRING_FIELDS)

    valid, error = validate_string_length(data['name'], 'Project name', min_len=1, max_len=255)
    if not valid:
        return jsonify({"message": error}), 400

    valid, error = validate_url(data['link'], 'Project link')
    if not valid:
        return jsonify({"message": error}), 400

    if 'description' in data and data['description']:
        valid, error = validate_string_length(data['description'], 'Description', max_len=2000)
        if not valid:
            return jsonify({"message": error}), 400

    if 'responsibilities' in data and data['responsibilities']:
        valid, error = validate_string_length(data['responsibilities'], 'Responsibilities', max_len=2000)
        if not valid:
            return jsonify({"message": error}), 400

    if not isinstance(data.get('technologies'), list) or len(data['technologies']) == 0:
        return jsonify({"message": "Technologies must be a non-empty list"}), 400

    if not isinstance(data.get('tags'), list) or len(data['tags']) == 0:
        return jsonify({"message": "Tags must be a non-empty list"}), 400

    if 'images' in data:
        if not isinstance(data['images'], list) or len(data['images']) == 0:
            return jsonify({"message": "Images must be a non-empty list"}), 400
        for img in data['images']:
            if not isinstance(img, dict) or not img.get('url'):
                return jsonify({"message": "Each image must have a 'url' field"}), 400
            valid, error = validate_url(img['url'], 'Image URL')
            if not valid:
                return jsonify({"message": error}), 400

    if 'videos' in data and data['videos']:
        if not isinstance(data['videos'], list):
            return jsonify({"message": "Videos must be a list"}), 400
        for vid in data['videos']:
            if not isinstance(vid, dict) or not vid.get('url'):
                return jsonify({"message": "Each video must have a 'url' field"}), 400
            valid, error = validate_url(vid['url'], 'Video URL')
            if not valid:
                return jsonify({"message": error}), 400

    data['user_id'] = user_id
    try:
        project = project_service.create_project(data)
    except ValueError as exc:
        return jsonify({"message": str(exc)}), 400
    return jsonify({"message": "Project created successfully", "project": project.to_dict()}), 201

def get_projects():
    projects = project_service.get_all_projects()
    return jsonify([project.to_dict() for project in projects])
