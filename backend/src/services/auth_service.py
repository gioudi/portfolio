import os

import bcrypt
from repositories.user_repository import UserRepository
from models.user import User
import jwt
import base64
class AuthService: 
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository
    def login(self, username: str, password: str) -> str: 
        try: 
            SECRET_API_KEY = os.getenv("SECRET_API_KEY")
            user = self.user_repository.get_user_by_username(username)
            if user:
                print(f"User fetched: {user.username}, Password: {user.password}")
            else:
                print("User not found.")
            
            if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
                token = jwt.encode({'user_id': user.id}, f"{SECRET_API_KEY}", algorithm='HS256')
                print(f"Generated token: {token}")
                return token
            return None
        except Exception as e:
            print(f"Error ocurred {e}" )
        