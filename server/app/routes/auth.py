from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.database import db
from app.models.user import User

auth_bp = Blueprint('auth_bp', __name__)

# ✅ Register a new user (admin or company owner)
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')  # 'admin' or 'company'

    if not email or not password or not role:
        return jsonify({"msg": "Email, password, and role are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "User already exists"}), 409

    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, role=role)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201

# ✅ Login user and return JWT
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        is_approved = False
        if user.role == 'collector' and user.companies:
            is_approved = user.companies[0].is_approved

        token = create_access_token(
            identity=user.id,
            additional_claims={
                "role": user.role,
                "is_approved": is_approved
            }
        )

        return jsonify(access_token=token), 200

    return jsonify({"error": "Invalid email or password"}), 401

# ✅ Get current logged-in user info (basic)
@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({
        "email": user.email,
        "role": user.role,
        "name": user.name,
    })

# ✅ Get user info with associated companies
@auth_bp.route('/me/details', methods=['GET'])
@jwt_required()
def get_user_info():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({
        "email": user.email,
        "role": user.role,
        "companies": [company.to_dict() for company in user.companies]
    })
