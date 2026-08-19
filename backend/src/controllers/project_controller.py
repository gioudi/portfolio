from flask import request, jsonify
from services.project_service import ProjectService
from repositories.project_repository import ProjectRepository
from models.database import Session
from utils.auth_decorator import token_required

session = Session()

project_repository = ProjectRepository(session)

project_service = ProjectService(project_repository)


@token_required
def create_project(user_id):

    data = request.get_json()
    data['user_id'] = user_id
    project = project_service.create_project(data)
    return jsonify({"message": "Project created successfully", "project": project}), 201

def get_projects():
    projects = project_service.get_all_projects()
    return jsonify([project.to_dict() for project in projects])
