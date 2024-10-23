from repositories.user_repository import UserRepository
from models.user import User
import jwt
class AuthService: 
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository
    def login(self, username: str, password: str) -> bool: 
        user = self.user_repository.get_user_by_username(username)
        
        if user and user.password == password:
            token = jwt.encode({'user_id': user.id}, 'secret_key', algorithm='HS256')
            return token
        return None