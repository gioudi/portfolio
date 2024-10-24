import jwt
import datetime
import secrets


SECRET_KEY = secrets.token_urlsafe(60)


def encode_jwt(user_id):
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
        'iat': datetime.datetime.utcnow(),
        'sub': user_id
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def decode_jwt(token):
    try: 
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload['sub']
    except jwt.ExpiredSignatureError: 
        return None
    except jwt.InvalidTokenError:
        return None