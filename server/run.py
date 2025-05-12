from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from app.routes import auth_bp, company_bp, admin_bp
from app.database import db
from app.models.company import Company
from app.models.region import Region
from app.models.user import User
from app.models.service_request import ServiceRequest

# Initialize Flask app
app = Flask(__name__)

@app.route('/')
def index():
    return "Flask app is running"

# Configure the app
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_secret_key'
app.config['JWT_TOKEN_LOCATION'] = ['headers']
app.config['JWT_HEADER_NAME'] = 'Authorization'
app.config['JWT_HEADER_TYPE'] = 'Bearer'

# Initialize extensions
db.init_app(app)
CORS(app)
jwt = JWTManager(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(company_bp, url_prefix='/companies')
app.register_blueprint(admin_bp, url_prefix='/admin')

# Create tables if they don't exist
def create_tables():
    with app.app_context():
        db.create_all()

if __name__ == '__main__':
    create_tables()
    app.run(debug=True)
