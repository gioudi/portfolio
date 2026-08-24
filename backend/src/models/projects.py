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

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "project_type_id": self.project_type_id,
            "link": self.link,
            "technologies": self.technologies or [],
            "tags": self.tags or [],
            "responsibilities": self.responsibilities,
            "user_id": self.user_id,
            "images": [{"id": img.id, "url": img.url} for img in self.images],
            "videos": [{"id": vid.id, "url": vid.url} for vid in self.videos],
        }