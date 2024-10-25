from repositories.project_type_repository import ProjectTypeRepository
from models.project_types import ProjectType



class ProjectTypeService:
    def __init__(self, project_type_repository: ProjectTypeRepository):
        self.project_type_repository = project_type_repository
        
    def get_all_project_types(self):
        return self.project_type_repository.get_all_project_types()
    
    def get_project_type_by_id(self, project_type_id: int):
        return self.project_type_repository.get_project_type_by_id(project_type_id)