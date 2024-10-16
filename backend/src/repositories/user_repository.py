from sqlalchemy.orm import Session
from models.user import User


class UserRepository: 
    def __init__(self, session: Session):
        self.session = session
    def get_user_by_username(self, username:str)-> User:
        return self.session.query(User).filter_by(username=username).first()
    def add_user(self, user:User): 
        self.session.add(User)
        self.session.commit()