import os
import bcrypt
from flask import Blueprint, Flask
from models.project_types import ProjectType
from controllers import auth_controller, project_type_controller, project_controller
from models.database import engine, Base
from models.user import User
from flask_cors import CORS
from models.database import Session
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from utils.validators import validate_password_complexity


def create_default_user():
    session = Session()

    existing_user = session.query(User).filter_by(username='sergiopenagos').first()
    DEFAULT_PASSWORD = os.getenv("DEFAULT_PASSWORD")
    DEFAULT_USER = os.getenv("DEFAULT_USER")
    DEFAULT_EMAIL = os.getenv("DEFAULT_EMAIL")
    if existing_user is None:
        valid, error = validate_password_complexity(DEFAULT_PASSWORD)
        if not valid:
            print(f"[WARN] Default password does not meet complexity requirements: {error}")
            print("[WARN] Skipping default user creation. Set a stronger DEFAULT_PASSWORD in .env")
            return

        hashed_password = bcrypt.hashpw(f"{DEFAULT_PASSWORD}".encode('utf-8'), bcrypt.gensalt())
        new_user = User(username=f'{DEFAULT_USER}', password=hashed_password.decode('utf-8'), email=f"{DEFAULT_EMAIL}")

        session.add(new_user)
        session.commit()

def create_default_project_types():
    session = Session()

    default_types = [os.getenv("DEFAULT_PROJECT_TYPE_1"), os.getenv("DEFAULT_PROJECT_TYPE_2"), os.getenv("DEFAULT_PROJECT_TYPE_3")]
    existing_types = session.query(ProjectType).all()
    if not existing_types:
       for type_name in default_types:
           project_type = ProjectType(name=type_name)
           session.add(project_type)
           session.commit()

app = Flask(__name__)

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:8080").split(",")
CORS(app, resources={r"/*": {"origins": ALLOWED_ORIGINS}})

limiter = Limiter(get_remote_address, app=app)

project_blueprint = Blueprint('projects', __name__, url_prefix='/api')
types_project_blueprint = Blueprint('project-types', __name__, url_prefix='/api')
auth_blueprint = Blueprint('auth', __name__, url_prefix='/api')

# Auth Routes
auth_blueprint.route('/login', methods=['POST'])(limiter.limit("5 per minute")(auth_controller.login))

# Project Routes
project_blueprint.route('/projects', methods=['POST'])(project_controller.create_project)
project_blueprint.route('/projects', methods=['GET'])(project_controller.get_projects)

# Type Projects Routes
types_project_blueprint.route('/project-types', methods=['GET'])(project_type_controller.get_project_types)

app.register_blueprint(auth_blueprint)
app.register_blueprint(project_blueprint)
app.register_blueprint(types_project_blueprint)


@app.after_request
def add_security_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['Content-Security-Policy'] = "default-src 'self'"
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    return response


if __name__ == '__main__':

    #Create tables
    Base.metadata.create_all(engine)

    #Create user
    create_default_user()

    #Create project types
    create_default_project_types()

    DEBUG = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    app.run(debug=DEBUG)
