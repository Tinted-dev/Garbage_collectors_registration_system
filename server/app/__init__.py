from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from app.database import db
from app.routes import auth_bp, company_bp, admin_bp
import os

def create_app():
    app = Flask(__name__)

    # Configurations
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///your_database.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your_secret_key')  # Preferably from .env
    app.config['JWT_TOKEN_LOCATION'] = ['headers']
    app.config['JWT_HEADER_NAME'] = 'Authorization'
    app.config['JWT_HEADER_TYPE'] = 'Bearer'

    # Initialize extensions
    db.init_app(app)
    jwt = JWTManager(app)  # Moved inside create_app to be initialized with the app instance
    CORS(app)
    migrate = Migrate(app, db)

    # Register Blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(company_bp, url_prefix='/companies')
    app.register_blueprint(admin_bp, url_prefix='/admin')

    return app
