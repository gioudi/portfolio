from sqlalchemy import Column, Integer, String, Text, ForeignKey, ARRAY
from models.database import Base
from sqlalchemy.orm import relationship


class Project(Base):
    __tablename__ = 'projects'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    project_type_id = Column(Integer, ForeignKey('project_types.id'))
    link = Column(String(255), nullable=False)
    technologies = Column(ARRAY(String))
    tags = Column(ARRAY(String))
    responsibilities = Column(Text)
    user_id = Column(Integer, ForeignKey('user.id'))

    
    project_type = relationship("ProjectType")
    images = relationship("Image", back_populates="project")
    videos = relationship("Video", back_populates="project")