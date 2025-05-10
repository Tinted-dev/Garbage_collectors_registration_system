from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from routes import auth_bp, company_bp, admin_bp

# Initialize Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

# Set up JWT
app.config['JWT_SECRET_KEY'] = 'your_secret_key'
jwt = JWTManager(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(company_bp, url_prefix='/companies')
app.register_blueprint(admin_bp, url_prefix='/admin')

if __name__ == '__main__':
    app.run(debug=True)
