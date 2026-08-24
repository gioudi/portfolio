from flask import jsonify
from repositories.project_type_repository import ProjectTypeRepository
from models.database import Session
from services.project_type_service import ProjectTypeService
from utils.auth_decorator import token_required

session = Session()

project_type_repository = ProjectTypeRepository(session)

project_type_service = ProjectTypeService(project_type_repository)


@token_required
def get_project_types(user_id):
    project_types = project_type_service.get_all_project_types()
    return jsonify([project_type.to_dict() for project_type in project_types])
