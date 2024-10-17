from flask import request, jsonify
from services.auth_service import AuthService
from repositories.user_repository import UserRepository
from models.database import Session
from utils.jwt_utils import encode_jwt


session = Session()

user_repository = UserRepository(session)


auth_service = AuthService(user_repository)

def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    
    if auth_service.login(username, password): 
        user_id = auth_service.get_user_id(username)
        token = encode_jwt(user_id) 
        return jsonify({"message": "Login successful!", "token": token}, 200)
    else:
        return jsonify({"message": "Invalid credentials!"}, 401)