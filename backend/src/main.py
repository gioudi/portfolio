from flask import Flask
from controllers import auth_controller, media_controller

app = Flask(__name__)

#Login route
@app.route('/login', methods=['POST'])
def login():
    return auth_controller.login()

#Media route
@app.route('/upload-image', methods=['POST'])
def upload_image():
    return media_controller.upload_image()

if __name__ == '__main__':
    app.run(debug=True)
    

