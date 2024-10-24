from flask import request, jsonify
from services.project_service import ProjectService
from utils.jwt_utils import decode_jwt

project_service = ProjectService()


def token_required(f):
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"message": "Token is missing!"}), 403
        
        user_id = decode_jwt(token)
        if not user_id:
            return jsonify({"message": "Token is invalid or expired!"}), 403
        
        return f(user_id, *args, **kwargs)
    return decorated


@token_required
def create_project(user_id):
    
    data = request.get_json()
    data['user_id'] = user_id
    project = project_service.create_project(data)
    return jsonify({"message": "Project created successfully", "project": project}), 201

def get_projects():
    projects = project_service.get_all_projects()
    return jsonify([project.to_dict() for project in projects])
    
    