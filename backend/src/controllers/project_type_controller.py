from flask import request, jsonify
from repositories.project_type_repository import ProjectTypeRepository
from models.database import Session
from services.project_type_service import ProjectTypeService
from utils.jwt_utils import decode_jwt

session = Session()

project_type_repository = ProjectTypeRepository(session)

project_type_service = ProjectTypeService(project_type_repository)


def token_required(f):
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        print(token)
        if not token:
            return jsonify({"message": "Token is missing!"}), 403
        
        if token.startswith("Bearer "):
            token = token.split(" ")[1]
        
        user_id = decode_jwt(token)
        print(user_id)
        if not user_id:
            return jsonify({"message": "Token is invalid or expired!"}), 403
        
        return f(user_id, *args, **kwargs)
    return decorated


@token_required
def get_project_types(user_id):
    project_types = project_type_service.get_all_project_types()
    return jsonify([project_type.to_dict() for project_type in project_types])
    