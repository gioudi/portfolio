from sqlalchemy import Column, Integer, String
from models.database import Base

class ProjectType(Base):
    __tablename__ = 'project_types'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(255),nullable=False)
    
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }