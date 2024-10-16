from flask import request, jsonify
from services.auth_service import AuthService

auth_service = AuthService()

def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    
    if auth_service.login(username, password): 
        return jsonify({"message": "Login successful!"}, 200)
    else:
        return jsonify({"message": "Invalid credentials!"}, 401)