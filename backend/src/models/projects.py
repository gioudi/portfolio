from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON
from models.database import Base
from sqlalchemy.orm import relationship


class Project(Base):
    __tablename__ = 'projects'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    project_type_id = Column(Integer, ForeignKey('project_types.id'))
    link = Column(String(255), nullable=False)
    technologies = Column(JSON)
    tags = Column(JSON)
    responsibilities = Column(Text)
    user_id = Column(Integer, ForeignKey('users.id'))

    
    project_type = relationship("ProjectType")
    images = relationship("Image", back_populates="project")
    videos = relationship("Video", back_populates="project")