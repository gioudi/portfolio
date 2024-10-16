from repositories.user_repository import UserRepository
from models.user import User

class AuthService: 
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository
    def login(self, username: str, password: str) -> bool: 
        user = self.user_repository.get_user_by_username(username)
        
        if user and user.password == password:
            return True
        return False