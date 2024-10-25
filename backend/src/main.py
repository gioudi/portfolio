import os
import bcrypt
from flask import Blueprint, Flask
from models.project_types import ProjectType
from controllers import auth_controller, project_type_controller, project_controller
from models.database import engine, Base
from models.user import User
from flask_cors import CORS
from models.database import Session


def create_default_user():
    session = Session()
    
    existing_user = session.query(User).filter_by(username='sergiopenagos').first()
    DEFAULT_PASSWORD = os.getenv("DEFAULT_PASSWORD")
    DEFAULT_USER = os.getenv("DEFAULT_USER")
    DEFAULT_EMAIL = os.getenv("DEFAULT_EMAIL")
    if existing_user is None:
        hashed_password = bcrypt.hashpw(f"{DEFAULT_PASSWORD}".encode('utf-8'), bcrypt.gensalt())
        new_user = User(username=f'{DEFAULT_USER}', password= hashed_password.decode('utf-8'), email=f"{DEFAULT_EMAIL}")
        
        session.add(new_user)
        session.commit()
        print("Default user created.")
    else: 
        print("User already exits.")
        
def create_default_project_types():
    session = Session()
    
    default_types = [os.getenv("DEFAULT_PROJECT_TYPE_1"),os.getenv("DEFAULT_PROJECT_TYPE_2"),os.getenv("DEFAULT_PROJECT_TYPE_3")]
    existing_types = session.query(ProjectType).all()
    if not existing_types:
       for type_name in default_types:
           project_type = ProjectType(name=type_name) 
           session.add(project_type)
           session.commit()
           
       # print("Default project types created.")
    else: 
        print("Default project types already exits.")

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins":  "*"}})



project_blueprint = Blueprint('projects', __name__, url_prefix='/api')
types_project_blueprint = Blueprint('project-types', __name__, url_prefix='/api')
auth_blueprint = Blueprint('auth', __name__, url_prefix='/api')

# Auth Routes
auth_blueprint.route('/login', methods=['POST'])(auth_controller.login)
    
# Project Routes

project_blueprint.route('/projects', methods=['POST'])(project_controller.create_project)
project_blueprint.route('/projects', methods=['GET'])(project_controller.get_projects)


# Type Projects Routes

types_project_blueprint.route('/project-types', methods=['GET'])(project_type_controller.get_project_types)


app.register_blueprint(auth_blueprint)
app.register_blueprint(project_blueprint)
app.register_blueprint(types_project_blueprint)


if __name__ == '__main__':
    
    #Create tables 
    Base.metadata.create_all(engine)
    
    #Create user
    
    create_default_user()
    
    #Create project types
    create_default_project_types()
    
    app.run(debug=True) 
 