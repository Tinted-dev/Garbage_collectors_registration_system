from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.database import db
from app.models.user import User

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')  # 'admin' or 'company_owner'

    if not email or not password or not role:
        return jsonify({"msg": "Email, password, and role are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "User already exists"}), 409

    # Create a new user (password is hashed automatically in the constructor)
    new_user = User(email=email, password=password, role=role)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        # If the user is a collector, check approval from their associated company
        is_approved = False
        if user.role == 'collector' and user.companies:
            is_approved = user.companies[0].is_approved  # assuming one company per collector

        # Use primitive type for identity and additional_claims for custom fields
        token = create_access_token(
            identity=user.id,
            additional_claims={
                "role": user.role,
                "is_approved": is_approved
            }
        )

        return jsonify(access_token=token), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

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



@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_user_info():
    # Get current user's identity (user ID)
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({
        "email": user.email,
        "role": user.role,
        "companies": [company.to_dict() for company in user.companies]
    })
