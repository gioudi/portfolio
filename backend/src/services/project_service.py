from models.projects import Project
from repositories.project_repository import ProjectRepository


class ProjectService:
    def __int__(self, project_repository: ProjectRepository):
        self.project_repository = project_repository
    
    def create_project(self, data):
        project = Project(
            name= data['name'],
            description = data['description'],
            project_type_id = data['project_type_id'],
            link = data['link'],
            technologies=data['technologies'],
            tags=data['tags'],
            responsibilities=data['responsibilities'],
            user_id=data['user_id']  
        )
        
        self.project_repository.add_project(project)
        return project
    
    def get_all_projects(self):
        return self.project_repository.get_all_projects()