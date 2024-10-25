from sqlalchemy.orm import Session
from models.project_types import ProjectType


class ProjectTypeRepository:
    def __init__(self, session: Session):
        self.session = session
            
    def get_project_type_by_id(self, project_type_id: int)-> ProjectType:
        return self.session.query(ProjectType).filter_by(id=project_type_id).first()
    
    def get_all_project_types(self):
        return self.session.query(ProjectType).all()