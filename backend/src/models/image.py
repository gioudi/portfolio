from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from models.database import Base


class Image(Base):
    __tablename__= 'images'
    
    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey('projects.id'))
    url = Column(String, nullable=False)
    
    
    project = relationship("Project", back_populates="images")