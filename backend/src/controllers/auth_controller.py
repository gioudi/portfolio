from flask import request, jsonify
from services.auth_service import AuthService
from repositories.user_repository import UserRepository
from models.database import Session
from utils.validators import validate_required_fields, validate_string_length, sanitize_dict


session = Session()

user_repository = UserRepository(session)


auth_service = AuthService(user_repository)

STRING_FIELDS = ['username', 'password']

def login():
    try:
        data = request.get_json()

        valid, error = validate_required_fields(data, ['username', 'password'])
        if not valid:
            return jsonify({"message": error}), 400

        data = sanitize_dict(data, STRING_FIELDS)

        valid, error = validate_string_length(data['username'], 'Username', min_len=3, max_len=50)
        if not valid:
            return jsonify({"message": error}), 400

        valid, error = validate_string_length(data['password'], 'Password', min_len=1, max_len=128)
        if not valid:
            return jsonify({"message": error}), 400

        token = auth_service.login(data['username'], data['password'])

        if token:
            return jsonify({"message": "Login successful!", "token": token}), 200
        else:
            return jsonify({"message": "Invalid credentials!"}), 401
    except Exception:
        return jsonify({"message": "An error occurred"}), 500
