from sqlalchemy import Column, ForeignKey, Integer, String
from models.database import Base

class Media(Base):
    __tablename__ = 'media'
    
    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey('projects.id'))
    url = Column(String, nullable=False)
    media_type = Column(String(50))