from sqlalchemy.orm import Session
from models.projects import Project


class ProjectRepository:
    def __init__(self, session: Session):
        self.session = session
    
    def add_project(self, project: Project):
        self.session.add(project)
        self.session.commit()
        
    def get_project_by_id(self, project_id: int)-> Project:
        return self.session.query(Project).filter_by(id=project_id).first()
    
    def get_all_projects(self):
        return self.session.query(Project).all()