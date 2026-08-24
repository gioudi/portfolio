import os
import jwt
import datetime


SECRET_API_KEY = os.getenv("SECRET_API_KEY")

if not SECRET_API_KEY:
    raise Exception("SECRET_API_KEY is missing")

def decode_jwt(token):
    try:
        payload = jwt.decode(token, SECRET_API_KEY, algorithms=['HS256'])
        return payload.get('user_id')
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
