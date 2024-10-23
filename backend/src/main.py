from flask import Blueprint, Flask
from controllers import auth_controller, media_controller, project_controller
from models.database import engine, Base
from models.user import User
app = Flask(__name__)

Base.metadata.create_all(engine)

project_blueprint = Blueprint('projects', __name__, url_prefix='/api')
types_project_blueprint = Blueprint('types-projects', __name__, url_prefix='/api')
auth_blueprint = Blueprint('auth', __name__, url_prefix='/api')

# Auth Routes
auth_blueprint.route('/login', methods=['POST'])(auth_controller.login)
    
# Project Routes

project_blueprint.route('/projects', methods=['POST'])(project_controller.create_project)
project_blueprint.route('/projects', methods=['GET'])(project_controller.get_projects)


# Type Projects Routes

types_project_blueprint.route('/project-types', methods=['GET'])(project_controller.get_projects)


app.register_blueprint(auth_blueprint)
app.register_blueprint(project_blueprint)


if __name__ == '__main__':
    app.run(debug=True) 
