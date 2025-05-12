from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from app.routes import auth_bp, company_bp, admin_bp
from app.database import db
from app.models.user import User  # Make sure this import exists

# Initialize Flask app
app = Flask(__name__)

# Configure the app
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_super_secret_key_123'  # Change this!
app.config['JWT_TOKEN_LOCATION'] = ['headers']
app.config['JWT_HEADER_NAME'] = 'Authorization'
app.config['JWT_HEADER_TYPE'] = 'Bearer'

# Initialize extensions
db.init_app(app)

# After `app = Flask(__name__)`
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)



# Allow all routes and methods for localhost development
CORS(app, origins="*", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"], allow_headers="*")


CORS(app, resources={
    r"/auth/*": {"origins": "http://localhost:5173"},
    r"/companies/*": {"origins": "http://localhost:5173"},
    r"/admin/*": {"origins": "http://localhost:5173"}
})
jwt = JWTManager(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(company_bp, url_prefix='/companies')
app.register_blueprint(admin_bp, url_prefix='/admin')

# Temporary login route for testing
@app.route('/auth/login', methods=['POST'])
def temp_login():
    data = request.get_json()
    # Mock response for now (replace with real authentication logic)
    access_token = create_access_token(identity={
        "sub": "123",
        "role": "admin",
        "is_approved": True
    })
    return jsonify(access_token=access_token)

def create_tables():
    with app.app_context():
        db.create_all()

if __name__ == '__main__':
    create_tables()
    app.run(debug=True, port=5000)
