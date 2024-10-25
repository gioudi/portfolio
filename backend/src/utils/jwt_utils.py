import os
import jwt
import datetime



SECRET_API_KEY = os.getenv("SECRET_API_KEY")

if not SECRET_API_KEY: 
    raise Exception("SECRET_API_KEY is missing")

def encode_jwt(user_id):
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
        'iat': datetime.datetime.utcnow(),
        'sub': user_id
    }
    return jwt.encode(payload, SECRET_API_KEY, algorithm='HS256')

def decode_jwt(token):
    try: 
        payload = jwt.decode(token, SECRET_API_KEY, algorithms=['HS256'])
        print(payload)
        return payload.get('user_id')
    except jwt.ExpiredSignatureError: 
        print("Token has expired")
        return None
    except jwt.InvalidTokenError as e:
        print(f"Token has invalid: {e}")
        return None