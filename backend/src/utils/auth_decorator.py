from functools import wraps
from flask import request, jsonify
from utils.jwt_utils import decode_jwt


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"message": "Token is missing!"}), 403

        if token.startswith("Bearer "):
            token = token.split(" ")[1]

        user_id = decode_jwt(token)
        if not user_id:
            return jsonify({"message": "Token is invalid or expired!"}), 403

        return f(user_id, *args, **kwargs)
    return decorated
