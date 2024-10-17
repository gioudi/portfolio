from flask import request, jsonify
from services.project_service import ProjectService

project_service = ProjectService()


def create_project():
    data = request.get_json()
    project = project_service.create_project(data)
    return jsonify({"message": "Project created successfully", "project": project}), 201

def get_projects():
    projects = project_service.get_all_projects()
    return jsonify([project.to_dict() for project in projects])
    
    