from flask import request, jsonify
from services.project_service import ProjectService
from repositories.project_repository import ProjectRepository
from models.database import Session
from utils.auth_decorator import token_required
from utils.validators import validate_required_fields, validate_string_length, validate_url, sanitize_dict

session = Session()

project_repository = ProjectRepository(session)

project_service = ProjectService(project_repository)

STRING_FIELDS = ['name', 'description', 'link', 'responsibilities']


@token_required
def create_project(user_id):

    data = request.get_json()

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
    project = project_service.create_project(data)
    return jsonify({"message": "Project created successfully", "project": project.to_dict()}), 201

def get_projects():
    projects = project_service.get_all_projects()
    return jsonify([project.to_dict() for project in projects])
